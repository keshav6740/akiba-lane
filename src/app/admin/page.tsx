"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
};

type Order = {
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

const ADMIN_KEY = "akiba_admin_authed";
const ADMIN_PIN_KEY = "akiba_admin_pin";

export default function AdminPage() {
  const [pin, setPin] = useState("");
  const [adminPin, setAdminPin] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Record<string, boolean>>({});
  const [editValues, setEditValues] = useState<Record<string, Partial<Order>>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPaid, setFilterPaid] = useState<"all" | "paid" | "unpaid">("all");
  const [filterFulfilled, setFilterFulfilled] = useState<"all" | "fulfilled" | "unfulfilled">("all");
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  const autoSaveTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    const saved = sessionStorage.getItem(ADMIN_KEY);
    const savedPin = sessionStorage.getItem(ADMIN_PIN_KEY);
    if (saved === "true") {
      setIsAuthed(true);
    }
    if (savedPin) {
      setAdminPin(savedPin);
    }
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/orders", {
        headers: { "x-admin-pin": adminPin },
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error || "Failed to load orders.");
        setLoading(false);
        return;
      }
      setOrders((json.orders as Order[]) || []);
    } catch {
      setError("Failed to load orders.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthed) {
      fetchOrders();
    }
  }, [isAuthed]);

  const totals = useMemo(() => {
    const totalOrders = orders.length;
    const totalAmount = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalPaid = orders.reduce(
      (sum, o) => sum + (o.status_paid ? o.total || 0 : 0),
      0
    );
    return { totalOrders, totalAmount, totalPaid };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return orders.filter((o) => {
      if (filterPaid === "paid" && !o.status_paid) return false;
      if (filterPaid === "unpaid" && o.status_paid) return false;
      if (filterFulfilled === "fulfilled" && !o.status_fulfilled) return false;
      if (filterFulfilled === "unfulfilled" && o.status_fulfilled) return false;
      if (!q) return true;
      const haystack = [
        o.id,
        o.name,
        o.phone,
        o.address,
        ...(o.items || []).map((i) => i.name),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [orders, searchQuery, filterPaid, filterFulfilled]);

  const filteredTotals = useMemo(() => {
    const count = filteredOrders.length;
    const totalAmount = filteredOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalPaid = filteredOrders.reduce(
      (sum, o) => sum + (o.status_paid ? o.total || 0 : 0),
      0
    );
    return { count, totalAmount, totalPaid };
  }, [filteredOrders]);

  const handleLogin = () => {
    const publicPin = process.env.NEXT_PUBLIC_ADMIN_PIN || "";
    if (pin === publicPin) {
      sessionStorage.setItem(ADMIN_KEY, "true");
      sessionStorage.setItem(ADMIN_PIN_KEY, pin);
      setAdminPin(pin);
      setIsAuthed(true);
      setPin("");
    } else {
      setError("Invalid PIN.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_KEY);
    sessionStorage.removeItem(ADMIN_PIN_KEY);
    setIsAuthed(false);
  };

  const toggleStatus = async (
    id: string,
    field: "status_paid" | "status_fulfilled",
    value: boolean
  ) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": adminPin,
        },
        body: JSON.stringify({ id, [field]: value }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error || "Update failed.");
        return;
      }
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, [field]: value } : o))
      );
    } catch {
      setError("Update failed.");
    }
  };

  const startEdit = (order: Order) => {
    setEditing((prev) => ({ ...prev, [order.id]: true }));
    setEditValues((prev) => ({
      ...prev,
      [order.id]: {
        name: order.name,
        phone: order.phone,
        address: order.address,
        items: order.items,
        total: order.total,
        currency: order.currency,
      },
    }));
  };

  const cancelEdit = (id: string) => {
    setEditing((prev) => ({ ...prev, [id]: false }));
    setEditValues((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const patchOrder = async (id: string, payload: Partial<Order>, stayEditing = false) => {
    if (!payload) return;
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": adminPin,
        },
        body: JSON.stringify({ id, ...payload }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error || "Update failed.");
        return;
      }
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, ...payload } as Order : o))
      );
      if (!stayEditing) {
        cancelEdit(id);
      }
    } catch {
      setError("Update failed.");
    }
  };

  const saveEdit = async (id: string) => {
    const payload = editValues[id];
    if (!payload) return;
    await patchOrder(id, payload, false);
  };

  const scheduleAutoSave = (id: string, payload: Partial<Order>) => {
    if (autoSaveTimers.current[id]) {
      clearTimeout(autoSaveTimers.current[id]);
    }
    autoSaveTimers.current[id] = setTimeout(() => {
      patchOrder(id, payload, true);
    }, 700);
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Delete this order? This cannot be undone.")) return;
    try {
      const res = await fetch("/api/admin/orders", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": adminPin,
        },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error || "Delete failed.");
        return;
      }
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch {
      setError("Delete failed.");
    }
  };

  const recalcTotal = (orderId: string) => {
    setEditValues((prev) => {
      const current = (prev[orderId]?.items as OrderItem[]) || [];
      const total = current.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0);
      return {
        ...prev,
        [orderId]: {
          ...prev[orderId],
          total,
        },
      };
    });
  };

  const updateItem = (orderId: string, index: number, patch: Partial<OrderItem>) => {
    setEditValues((prev) => {
      const current = (prev[orderId]?.items as OrderItem[]) || [];
      const next = current.map((it, i) => (i === index ? { ...it, ...patch } : it));
      const total = next.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0);
      const updated = { ...prev[orderId], items: next, total };
      scheduleAutoSave(orderId, updated);
      return { ...prev, [orderId]: updated };
    });
  };

  const addItem = (orderId: string) => {
    setEditValues((prev) => {
      const current = (prev[orderId]?.items as OrderItem[]) || [];
      const next = [
        ...current,
        { id: `custom-${Date.now()}`, name: "", price: 0, currency: "Rs.", quantity: 1 },
      ];
      const total = next.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0);
      const updated = { ...prev[orderId], items: next, total };
      scheduleAutoSave(orderId, updated);
      return { ...prev, [orderId]: updated };
    });
  };

  const removeItem = (orderId: string, index: number) => {
    setEditValues((prev) => {
      const current = (prev[orderId]?.items as OrderItem[]) || [];
      const next = current.filter((_, i) => i !== index);
      const total = next.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0);
      const updated = { ...prev[orderId], items: next, total };
      scheduleAutoSave(orderId, updated);
      return { ...prev, [orderId]: updated };
    });
  };

  const toggleSelect = (id: string, value: boolean) => {
    setSelectedIds((prev) => ({ ...prev, [id]: value }));
  };

  const selectAllFiltered = (value: boolean) => {
    const next: Record<string, boolean> = {};
    filteredOrders.forEach((o) => {
      next[o.id] = value;
    });
    setSelectedIds(next);
  };

  const bulkUpdate = async (field: "status_paid" | "status_fulfilled", value: boolean) => {
    const ids = filteredOrders.filter((o) => selectedIds[o.id]).map((o) => o.id);
    if (ids.length === 0) return;
    for (const id of ids) {
      await toggleStatus(id, field, value);
    }
  };

  const exportCsv = () => {
    const headers = [
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

    const rows = filteredOrders.map((o) => [
      o.id,
      o.created_at,
      o.name,
      o.phone,
      o.address,
      JSON.stringify(o.items || []),
      String(o.total ?? 0),
      o.currency || "Rs.",
      o.status_paid ? "TRUE" : "FALSE",
      o.status_fulfilled ? "TRUE" : "FALSE",
      o.source || "",
    ]);

    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthed) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 cursor-auto relative overflow-hidden">
        <div className="parallax-bg" />
        <div className="w-full max-w-lg border border-white/10 bg-gray-900/50 p-8 clip-card paper-texture relative z-10">
          <div className="text-center mb-6">
            <p className="font-mono text-xs tracking-[0.4em] text-anime-pink">AKIBA CONTROL</p>
            <h1 className="text-5xl font-bangers text-white uppercase">Admin Panel</h1>
            <div className="sakura-divider mt-4" />
          </div>
          <p className="text-gray-400 text-sm mb-6 font-mono text-center">
            Enter admin PIN to access orders and operations.
          </p>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full bg-black border border-white/20 p-3 text-white font-mono mb-4"
            placeholder="Admin PIN"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-anime-pink text-white font-black py-3 clip-button"
          >
            ACCESS
          </button>
          {error && <p className="text-red-400 text-xs mt-3 text-center">{error}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-2 pb-6 cursor-auto relative overflow-hidden">
      <div className="parallax-bg" />
      <div className="max-w-6xl mx-auto">
        <div className="mb-3 -mt-4">
          <p className="font-mono text-xs tracking-[0.4em] text-anime-pink">AKIBA CONTROL</p>
          <h1 className="text-5xl md:text-6xl font-bangers text-white uppercase">Admin Panel</h1>
          <div className="sakura-divider mt-3" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex items-center gap-4 bg-black/80 border border-anime-pink/50 px-6 py-4 clip-card backdrop-blur-xl shadow-[0_0_60px_rgba(255,77,126,0.35)]">
            <div className="w-14 h-14 rounded-full bg-anime-pink/55 border border-anime-pink flex items-center justify-center font-bangers text-3xl text-white shadow-[0_0_35px_rgba(255,77,126,0.8)]">
              A
            </div>
            <div>
              <div className="text-xs font-mono tracking-[0.4em] text-anime-pink">ADMIN PANEL</div>
              <div className="text-white font-bangers text-4xl md:text-5xl drop-shadow-[0_0_24px_rgba(255,183,197,0.7)]">
                ORDER COMMAND
              </div>
              <div className="text-gray-200 font-mono text-xs">Orders, payments, and fulfillment tracking.</div>
            </div>
          </div>
          <div className="flex gap-3 ml-0">
            <button
              onClick={fetchOrders}
              className="px-4 py-2 border border-anime-cyan text-anime-cyan font-mono text-xs clip-button"
            >
              SYNC NOW
            </button>
            <button
              onClick={exportCsv}
              className="px-4 py-2 border border-white/20 text-white font-mono text-xs clip-button"
            >
              EXPORT CSV
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-white/20 text-white font-mono text-xs clip-button"
            >
              LOGOUT
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            className="bg-black border border-white/20 p-3 text-white font-mono text-sm"
            placeholder="Search name, phone, address, item, order ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="bg-black border border-white/20 p-3 text-white font-mono text-sm"
            value={filterPaid}
            onChange={(e) => setFilterPaid(e.target.value as any)}
          >
            <option value="all">Paid: All</option>
            <option value="paid">Paid: Yes</option>
            <option value="unpaid">Paid: No</option>
          </select>
          <select
            className="bg-black border border-white/20 p-3 text-white font-mono text-sm"
            value={filterFulfilled}
            onChange={(e) => setFilterFulfilled(e.target.value as any)}
          >
            <option value="all">Fulfilled: All</option>
            <option value="fulfilled">Fulfilled: Yes</option>
            <option value="unfulfilled">Fulfilled: No</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => selectAllFiltered(true)}
              className="px-3 py-2 border border-white/20 text-white text-xs font-mono clip-button"
            >
              SELECT ALL
            </button>
            <button
              onClick={() => selectAllFiltered(false)}
              className="px-3 py-2 border border-white/20 text-white text-xs font-mono clip-button"
            >
              CLEAR SELECT
            </button>
            <button
              onClick={() => bulkUpdate("status_paid", true)}
              className="px-3 py-2 border border-anime-cyan text-anime-cyan text-xs font-mono clip-button"
            >
              MARK PAID
            </button>
            <button
              onClick={() => bulkUpdate("status_paid", false)}
              className="px-3 py-2 border border-anime-cyan text-anime-cyan text-xs font-mono clip-button"
            >
              MARK UNPAID
            </button>
            <button
              onClick={() => bulkUpdate("status_fulfilled", true)}
              className="px-3 py-2 border border-anime-pink text-anime-pink text-xs font-mono clip-button"
            >
              MARK FULFILLED
            </button>
            <button
              onClick={() => bulkUpdate("status_fulfilled", false)}
              className="px-3 py-2 border border-anime-pink text-anime-pink text-xs font-mono clip-button"
            >
              MARK UNFULFILLED
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="border border-white/10 bg-gray-900/50 p-4 clip-card">
            <p className="text-gray-500 font-mono text-xs">TOTAL ORDERS</p>
            <p className="text-3xl font-bangers">{totals.totalOrders}</p>
          </div>
          <div className="border border-white/10 bg-gray-900/50 p-4 clip-card">
            <p className="text-gray-500 font-mono text-xs">TOTAL VALUE</p>
            <p className="text-3xl font-bangers">Rs. {totals.totalAmount}</p>
          </div>
          <div className="border border-white/10 bg-gray-900/50 p-4 clip-card">
            <p className="text-gray-500 font-mono text-xs">TOTAL PAID</p>
            <p className="text-3xl font-bangers text-anime-cyan">
              Rs. {totals.totalPaid}
            </p>
          </div>
        </div>

        {error && (
          <div className="border border-red-500/30 bg-red-900/20 p-3 mb-4 text-red-200 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {loading ? (
            <div className="text-gray-400 font-mono">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-gray-500 font-mono">No orders yet.</div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="border border-white/10 bg-gray-900/50 p-4 clip-card"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={!!selectedIds[order.id]}
                      onChange={(e) => toggleSelect(order.id, e.target.checked)}
                    />
                    <div className="space-y-1">
                      <p className="font-mono text-xs text-gray-500">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                      {!editing[order.id] ? (
                        <>
                          <p className="text-lg font-bold">{order.name}</p>
                          <p className="text-sm text-gray-400">
                            {order.phone} · {order.address}
                          </p>
                        </>
                      ) : (
                        <div className="space-y-2">
                          <input
                            className="w-full bg-black border border-white/20 p-2 text-white text-sm font-mono"
                            value={editValues[order.id]?.name || ""}
                            onChange={(e) =>
                              setEditValues((prev) => {
                                const updated = {
                                  ...prev[order.id],
                                  name: e.target.value,
                                };
                                scheduleAutoSave(order.id, updated);
                                return { ...prev, [order.id]: updated };
                              })
                            }
                          />
                          <input
                            className="w-full bg-black border border-white/20 p-2 text-white text-sm font-mono"
                            value={editValues[order.id]?.phone || ""}
                            onChange={(e) =>
                              setEditValues((prev) => {
                                const updated = {
                                  ...prev[order.id],
                                  phone: e.target.value,
                                };
                                scheduleAutoSave(order.id, updated);
                                return { ...prev, [order.id]: updated };
                              })
                            }
                          />
                          <textarea
                            className="w-full bg-black border border-white/20 p-2 text-white text-sm font-mono"
                            rows={2}
                            value={editValues[order.id]?.address || ""}
                            onChange={(e) =>
                              setEditValues((prev) => {
                                const updated = {
                                  ...prev[order.id],
                                  address: e.target.value,
                                };
                                scheduleAutoSave(order.id, updated);
                                return { ...prev, [order.id]: updated };
                              })
                            }
                          />
                        </div>
                      )}
                      <p className="text-sm text-gray-400">
                        Order ID: {order.id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {!editing[order.id] ? (
                      <p className="text-2xl font-bangers text-anime-pink">
                        {order.currency || "Rs."} {order.total}
                      </p>
                    ) : (
                      <div className="flex items-center gap-2 justify-end">
                        <input
                          className="w-16 bg-black border border-white/20 p-1 text-white text-sm font-mono"
                          value={editValues[order.id]?.currency || "Rs."}
                          onChange={(e) =>
                            setEditValues((prev) => {
                              const updated = {
                                ...prev[order.id],
                                currency: e.target.value,
                              };
                              scheduleAutoSave(order.id, updated);
                              return { ...prev, [order.id]: updated };
                            })
                          }
                        />
                        <input
                          className="w-24 bg-black border border-white/20 p-1 text-white text-sm font-mono text-right"
                          value={editValues[order.id]?.total ?? 0}
                          onChange={(e) =>
                            setEditValues((prev) => {
                              const updated = {
                                ...prev[order.id],
                                total: Number(e.target.value) || 0,
                              };
                              scheduleAutoSave(order.id, updated);
                              return { ...prev, [order.id]: updated };
                            })
                          }
                        />
                      </div>
                    )}
                    <p className="text-xs text-gray-500 font-mono">
                      {order.source || "web"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-mono text-gray-500 mb-2">ITEMS</p>
                    {!editing[order.id] ? (
                      <ul className="text-sm text-gray-300 space-y-1">
                        {order.items?.map((item, idx) => (
                          <li key={`${order.id}-${idx}`}>
                            {item.name} x{item.quantity} ({item.currency}
                            {item.price})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="space-y-3">
                        {(editValues[order.id]?.items as OrderItem[] | undefined)?.map(
                          (item, idx) => (
                            <div key={`${order.id}-item-${idx}`} className="grid grid-cols-12 gap-2">
                              <input
                                className="col-span-5 bg-black border border-white/20 p-2 text-white text-xs font-mono"
                                placeholder="Name"
                                value={item.name}
                                onChange={(e) => updateItem(order.id, idx, { name: e.target.value })}
                              />
                              <input
                                className="col-span-2 bg-black border border-white/20 p-2 text-white text-xs font-mono"
                                placeholder="Qty"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateItem(order.id, idx, { quantity: Number(e.target.value) || 0 })
                                }
                              />
                              <input
                                className="col-span-2 bg-black border border-white/20 p-2 text-white text-xs font-mono"
                                placeholder="Price"
                                value={item.price}
                                onChange={(e) =>
                                  updateItem(order.id, idx, { price: Number(e.target.value) || 0 })
                                }
                              />
                              <input
                                className="col-span-2 bg-black border border-white/20 p-2 text-white text-xs font-mono"
                                placeholder="Curr"
                                value={item.currency}
                                onChange={(e) =>
                                  updateItem(order.id, idx, { currency: e.target.value })
                                }
                              />
                              <button
                                className="col-span-1 text-red-400 text-xs border border-red-400/40"
                                onClick={() => removeItem(order.id, idx)}
                              >
                                X
                              </button>
                            </div>
                          )
                        )}
                        <button
                          className="text-xs text-anime-cyan border border-anime-cyan/40 px-3 py-1 clip-button"
                          onClick={() => addItem(order.id)}
                        >
                          ADD ITEM
                        </button>
                        <button
                          className="text-xs text-white/80 border border-white/20 px-3 py-1 clip-button ml-2"
                          onClick={() => recalcTotal(order.id)}
                        >
                          RECALC TOTAL
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={!!order.status_paid}
                        onChange={(e) =>
                          toggleStatus(order.id, "status_paid", e.target.checked)
                        }
                      />
                      Paid
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={!!order.status_fulfilled}
                        onChange={(e) =>
                          toggleStatus(
                            order.id,
                            "status_fulfilled",
                            e.target.checked
                          )
                        }
                      />
                      Fulfilled
                    </label>
                    {!editing[order.id] ? (
                      <button
                        onClick={() => startEdit(order)}
                        className="ml-auto text-xs text-anime-cyan border border-anime-cyan/40 px-3 py-1 clip-button"
                      >
                        EDIT
                      </button>
                    ) : (
                      <div className="ml-auto flex gap-2">
                        <button
                          onClick={() => saveEdit(order.id)}
                          className="text-xs text-green-400 border border-green-400/40 px-3 py-1 clip-button"
                        >
                          SAVE
                        </button>
                        <button
                          onClick={() => cancelEdit(order.id)}
                          className="text-xs text-gray-300 border border-white/20 px-3 py-1 clip-button"
                        >
                          CANCEL
                        </button>
                      </div>
                    )}
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="text-xs text-red-400 border border-red-400/40 px-3 py-1 clip-button"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {!loading && filteredOrders.length > 0 && (
          <div className="mt-8 border border-white/10 bg-gray-900/50 p-4 clip-card">
            <div className="flex flex-wrap gap-6 text-sm font-mono text-gray-300">
              <span>Filtered Orders: {filteredTotals.count}</span>
              <span>Total Value: Rs. {filteredTotals.totalAmount}</span>
              <span>Total Paid: Rs. {filteredTotals.totalPaid}</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
