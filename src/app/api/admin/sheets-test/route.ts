import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || "";
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "";
  let key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "";

  let parsedOk = false;
  let parsedEmail = "";
  let parsedKeyLen = 0;
  let parsedKeyStart = "";

  if (rawJson) {
    try {
      const parsed = JSON.parse(rawJson);
      parsedOk = true;
      parsedEmail = parsed.client_email || "";
      const pk = parsed.private_key || "";
      parsedKeyLen = pk.length;
      parsedKeyStart = pk.slice(0, 30);
    } catch {
      parsedOk = false;
    }
  }

  if (key.startsWith("\"") && key.endsWith("\"")) {
    key = key.slice(1, -1);
  }
  key = key.replace(/\\n/g, "\n");

  return NextResponse.json({
    hasJson: Boolean(rawJson),
    jsonParsed: parsedOk,
    jsonEmail: parsedEmail ? `${parsedEmail.slice(0, 6)}...` : "",
    jsonKeyLen: parsedKeyLen,
    jsonKeyStart: parsedKeyStart ? `${parsedKeyStart}...` : "",
    hasEmail: Boolean(email),
    email: email ? `${email.slice(0, 6)}...` : "",
    keyLen: key.length,
    keyStart: key.slice(0, 30) ? `${key.slice(0, 30)}...` : "",
  });
}
