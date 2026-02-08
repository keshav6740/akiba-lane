import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

    const { data, error } = await supabase
      .from("orders")
      .insert(orderPayload)
      .select("*")
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Failed to save order." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: data.id, order: data });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
