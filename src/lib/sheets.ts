import { google } from "googleapis";

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
};

export type Order = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  currency: string;
  status_paid: boolean;
  status_fulfilled: boolean;
  source?: string | null;
};

type SheetOrder = Order & { _rowIndex?: number };

export const SHEET_HEADERS = [
  "id",
  "created_at",
  "name",
  "phone",
  "address",
  "items",
  "total",
  "currency",
  "status_paid",
  "status_fulfilled",
  "source",
];

async function getAuth() {
  const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || "";
  let clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "";
  let privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "";

  if (rawJson) {
    try {
      const parsed = JSON.parse(rawJson);
      if (parsed && parsed.client_email && parsed.private_key) {
        const auth = new google.auth.GoogleAuth({
          credentials: parsed,
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });
        return auth;
      }
      clientEmail = parsed.client_email || clientEmail;
      privateKey = parsed.private_key || privateKey;
    } catch {
      throw new Error("Invalid GOOGLE_SERVICE_ACCOUNT_JSON.");
    }
  }

  if (privateKey.startsWith("\"") && privateKey.endsWith("\"")) {
    privateKey = privateKey.slice(1, -1);
  }
  privateKey = privateKey.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Missing Google service account credentials. Set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: clientEmail, private_key: privateKey },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return auth;
}

async function getSheetTabId(sheets: ReturnType<typeof google.sheets>, sheetId: string, tab: string) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
  const sheet = meta.data.sheets?.find((s) => s.properties?.title === tab);
  return sheet?.properties?.sheetId ?? 0;
}

async function getSheets() {
  const sheetId = process.env.GOOGLE_SHEET_ID || "";
  const tab = process.env.GOOGLE_SHEET_TAB || "Orders";
  if (!sheetId) {
    throw new Error("Missing GOOGLE_SHEET_ID.");
  }
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const tabId = await getSheetTabId(sheets, sheetId, tab);
  return { sheets, sheetId, tab, tabId };
}

function normalizeBool(value: unknown) {
  if (typeof value === "boolean") return value;
  const v = String(value || "").toLowerCase().trim();
  return v === "true" || v === "1" || v === "yes";
}

function normalizeNumber(value: unknown) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function normalizeItems(value: unknown): OrderItem[] {
  if (Array.isArray(value)) return value as OrderItem[];
  const raw = String(value || "").trim();
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function orderToRow(order: Order) {
  return [
    order.id,
    order.created_at,
    order.name,
    order.phone,
    order.address,
    JSON.stringify(order.items || []),
    String(order.total ?? 0),
    order.currency || "Rs.",
    order.status_paid ? "TRUE" : "FALSE",
    order.status_fulfilled ? "TRUE" : "FALSE",
    order.source || "",
  ];
}

export async function ensureSheetHeader() {
  const { sheets, sheetId, tab } = await getSheets();
  const headerRange = `${tab}!A1:K1`;
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: headerRange,
  });
  const current = res.data.values?.[0] || [];
  const normalized = current.map((v) => String(v).trim());
  const expected = SHEET_HEADERS;

  const matches =
    normalized.length === expected.length &&
    normalized.every((v, i) => v === expected[i]);

  if (!matches) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: headerRange,
      valueInputOption: "RAW",
      requestBody: { values: [expected] },
    });
  }
}

export async function getSheetOrders(): Promise<SheetOrder[]> {
  const { sheets, sheetId, tab } = await getSheets();
  await ensureSheetHeader();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${tab}!A1:K`,
  });

  const rows = res.data.values || [];
  if (rows.length <= 1) return [];

  const header = rows[0].map((v) => String(v).trim());
  const idx = (key: string) => header.indexOf(key);

  const orders: SheetOrder[] = [];
  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i] || [];
    const id = row[idx("id")] || "";
    if (!id) continue;

    const order: SheetOrder = {
      id: String(id),
      created_at: String(row[idx("created_at")] || new Date().toISOString()),
      name: String(row[idx("name")] || ""),
      phone: String(row[idx("phone")] || ""),
      address: String(row[idx("address")] || ""),
      items: normalizeItems(row[idx("items")]),
      total: normalizeNumber(row[idx("total")]),
      currency: String(row[idx("currency")] || "Rs."),
      status_paid: normalizeBool(row[idx("status_paid")]),
      status_fulfilled: normalizeBool(row[idx("status_fulfilled")]),
      source: String(row[idx("source")] || ""),
      _rowIndex: i + 1,
    };
    orders.push(order);
  }

  return orders;
}

export async function appendSheetOrder(order: Order) {
  const { sheets, sheetId, tab } = await getSheets();
  await ensureSheetHeader();

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${tab}!A1`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [orderToRow(order)] },
  });
}

export async function updateSheetOrder(id: string, patch: Partial<Order>) {
  const { sheets, sheetId, tab } = await getSheets();
  const orders = await getSheetOrders();
  const existing = orders.find((o) => o.id === id);
  if (!existing || !existing._rowIndex) return;

  const updated: Order = {
    ...existing,
    ...patch,
    items: patch.items ? patch.items : existing.items,
    status_paid:
      patch.status_paid !== undefined ? patch.status_paid : existing.status_paid,
    status_fulfilled:
      patch.status_fulfilled !== undefined
        ? patch.status_fulfilled
        : existing.status_fulfilled,
  };

  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `${tab}!A${existing._rowIndex}:K${existing._rowIndex}`,
    valueInputOption: "RAW",
    requestBody: { values: [orderToRow(updated)] },
  });
}

export async function deleteSheetOrder(id: string) {
  const { sheets, sheetId, tabId } = await getSheets();
  const orders = await getSheetOrders();
  const existing = orders.find((o) => o.id === id);
  if (!existing || !existing._rowIndex) return;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: sheetId,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: tabId,
              dimension: "ROWS",
              startIndex: existing._rowIndex - 1,
              endIndex: existing._rowIndex,
            },
          },
        },
      ],
    },
  });
}
