import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { appendSheetOrder, Order } from "@/lib/sheets";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const required = ["name", "phone", "address", "items", "total"];
    const missing = required.filter((k) => body?.[k] === undefined);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const orderPayload = {
      name: String(body.name),
      phone: String(body.phone),
      address: String(body.address),
      items: body.items || [],
      total: Number(body.total) || 0,
      currency: String(body.currency || "Rs."),
      status_paid: false,
      status_fulfilled: false,
      source: String(body.source || "web"),
    };

    // Try Supabase with a 5-second timeout
    let savedOrder: any = null;
    let supabaseOk = false;
    try {
      const supabasePromise = supabase
        .from("orders")
        .insert(orderPayload)
        .select("*")
        .single();

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Supabase timeout (5s)")), 5000)
      );

      const { data, error } = await Promise.race([supabasePromise, timeoutPromise]) as any;

      if (!error && data) {
        savedOrder = data;
        supabaseOk = true;
      } else {
        console.error("[orders] Supabase error:", error?.message, error?.code);
      }
    } catch (e) {
      console.error("[orders] Supabase unreachable:", e instanceof Error ? e.message : e);
    }

    // If Supabase failed, save directly to Google Sheets as fallback
    if (!supabaseOk) {
      const fallbackOrder: Order = {
        id: randomUUID(),
        created_at: now,
        ...orderPayload,
      };
      try {
        await appendSheetOrder(fallbackOrder);
        savedOrder = fallbackOrder;
        console.log("[orders] Saved to Google Sheets as fallback, id:", fallbackOrder.id);
      } catch (sheetErr) {
        console.error("[orders] Google Sheets fallback also failed:", sheetErr instanceof Error ? sheetErr.message : sheetErr);
        return NextResponse.json(
          { error: "Failed to save order to any backend." },
          { status: 500 }
        );
      }
    }

    // If Supabase succeeded, also sync to sheets in background
    if (supabaseOk && savedOrder) {
      appendSheetOrder(savedOrder).catch((e) =>
        console.error("[orders] Sheet sync failed:", e instanceof Error ? e.message : e)
      );
    }

    return NextResponse.json({ ok: true, id: savedOrder?.id, order: savedOrder });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[orders] Unexpected error:", message);
    return NextResponse.json({ error: "Invalid request.", details: message }, { status: 400 });
  }
}
