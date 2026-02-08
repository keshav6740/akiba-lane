import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  appendSheetOrder,
  deleteSheetOrder,
  getSheetOrders,
  Order,
  updateSheetOrder,
} from "@/lib/sheets";

export const runtime = "nodejs";

function authOrReject(req: Request) {
  const pin = req.headers.get("x-admin-pin") || "";
  const expected = process.env.ADMIN_PIN || "";
  return expected && pin === expected;
}

function normalizeOrder(o: any): Order {
  return {
    id: String(o.id),
    created_at: String(o.created_at || new Date().toISOString()),
    name: String(o.name || ""),
    phone: String(o.phone || ""),
    address: String(o.address || ""),
    items: Array.isArray(o.items) ? o.items : [],
    total: Number(o.total) || 0,
    currency: String(o.currency || "Rs."),
    status_paid: Boolean(o.status_paid),
    status_fulfilled: Boolean(o.status_fulfilled),
    source: o.source ? String(o.source) : "",
  };
}

async function syncOrders(sheetWins: boolean) {
  const [{ data: supaData }, sheetData] = await Promise.all([
    supabase.from("orders").select("*").order("created_at", { ascending: false }),
    getSheetOrders(),
  ]);

  const supa = (supaData || []).map(normalizeOrder);
  const supaMap = new Map(supa.map((o) => [o.id, o]));
  const sheetMap = new Map(sheetData.map((o) => [o.id, o]));

  for (const [id, supaOrder] of supaMap) {
    if (!sheetMap.has(id)) {
      await appendSheetOrder(supaOrder);
    }
  }

  for (const [id, sheetOrder] of sheetMap) {
    if (!supaMap.has(id)) {
      await supabase.from("orders").upsert(sheetOrder, { onConflict: "id" });
      continue;
    }

    if (sheetWins) {
      await supabase
        .from("orders")
        .update({
          name: sheetOrder.name,
          phone: sheetOrder.phone,
          address: sheetOrder.address,
          items: sheetOrder.items,
          total: sheetOrder.total,
          currency: sheetOrder.currency,
          status_paid: sheetOrder.status_paid,
          status_fulfilled: sheetOrder.status_fulfilled,
          source: sheetOrder.source,
          created_at: sheetOrder.created_at,
        })
        .eq("id", id);
    }
  }

  const merged = new Map<string, Order>();
  for (const order of supa) merged.set(order.id, order);
  for (const order of sheetData) merged.set(order.id, normalizeOrder(order));

  return Array.from(merged.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function GET(req: Request) {
  if (!authOrReject(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await syncOrders(true);
    return NextResponse.json({ orders });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!authOrReject(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const id = String(body.id || "");
    if (!id) {
      return NextResponse.json({ error: "Missing id." }, { status: 400 });
    }

    const patch: Partial<Order> = {};
    if (body.status_paid !== undefined) patch.status_paid = !!body.status_paid;
    if (body.status_fulfilled !== undefined) patch.status_fulfilled = !!body.status_fulfilled;
    if (body.name !== undefined) patch.name = String(body.name || "");
    if (body.phone !== undefined) patch.phone = String(body.phone || "");
    if (body.address !== undefined) patch.address = String(body.address || "");
    if (body.items !== undefined) patch.items = Array.isArray(body.items) ? body.items : [];
    if (body.total !== undefined) patch.total = Number(body.total) || 0;
    if (body.currency !== undefined) patch.currency = String(body.currency || "Rs.");

    await supabase.from("orders").update(patch).eq("id", id);
    await updateSheetOrder(id, patch);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!authOrReject(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const id = String(body.id || "");
    if (!id) {
      return NextResponse.json({ error: "Missing id." }, { status: 400 });
    }

    await supabase.from("orders").delete().eq("id", id);
    await deleteSheetOrder(id);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
