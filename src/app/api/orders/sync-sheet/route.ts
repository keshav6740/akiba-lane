import { NextResponse } from "next/server";
import { appendSheetOrder, Order } from "@/lib/sheets";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const order = body?.order as Order | undefined;
    if (!order?.id) {
      return NextResponse.json({ error: "Missing order." }, { status: 400 });
    }
    await appendSheetOrder(order);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Sheet sync failed." }, { status: 500 });
  }
}
