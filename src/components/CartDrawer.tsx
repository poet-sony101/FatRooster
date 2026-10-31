"use client";

import React, { useState } from "react";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  MapPin,
  Flame,
  Send,
  PhoneCall,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { BRAND_INFO, MenuItem, SpiceLevel, formatNaira } from "@/data/menu";

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  spiceLevel?: SpiceLevel;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

type FulfillmentOption =
  | "delivery-ikate"
  | "beach-elegushi"
  | "pickup-ikate";

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [fulfillment, setFulfillment] =
    useState<FulfillmentOption>("delivery-ikate");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [addressOrCabana, setAddressOrCabana] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0
  );
  const totalItems = cart.reduce((sum, entry) => sum + entry.quantity, 0);

  const fulfillmentLabels: Record<FulfillmentOption, string> = {
    "delivery-ikate": "Doorstep Delivery (Dispatched from Ikate Lekki)",
    "beach-elegushi": "Sol Beach Elegushi, Gate 2 (Cabana / Beach Spot)",
    "pickup-ikate": "Self Pickup at Richmond Estate, Ikate Lekki",
  };

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const lines: string[] = [
      `🐓 *NEW ORDER — FAT ROOSTER (@fatrooster.ng)* 🔥`,
      `----------------------------------------`,
      `*Customer:* ${customerName.trim() || "Guest"}`,
      customerPhone.trim() ? `*Phone:* ${customerPhone.trim()}` : "",
      `*Order Type:* ${fulfillmentLabels[fulfillment]}`,
      addressOrCabana.trim()
        ? `*Location / Cabana:* ${addressOrCabana.trim()}`
        : "",
      `----------------------------------------`,
      `*ORDER ITEMS (${totalItems}):*`,
      ...cart.map(
        (c, idx) =>
          `${idx + 1}. *${c.quantity}x ${c.item.name}*${
            c.spiceLevel ? ` [${c.spiceLevel}]` : ""
          } — ${formatNaira(c.item.price * c.quantity)}`
      ),
      `----------------------------------------`,
      `*SUBTOTAL:* *${formatNaira(subtotal)}*`,
      fulfillment === "delivery-ikate"
        ? `_(Please confirm delivery rider fee to my address)_`
        : "",
      orderNotes.trim() ? `\n*Kitchen Notes:* ${orderNotes.trim()}` : "",
      `\nPlease confirm availability and payment details. Thank you!`,
    ].filter(Boolean);

    const encodedText = encodeURIComponent(lines.join("\n"));
    const whatsappUrl = `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm transition-opacity">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-label="Close cart backdrop"
      />

      <aside className="relative z-10 flex h-full w-full max-w-lg flex-col border-l border-amber-500/20 bg-zinc-950 text-zinc-100 shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/70 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-orange-600/25">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-white">
                Your Rooster Basket
              </h2>
              <p className="text-xs text-zinc-400">
                Direct WhatsApp Checkout • {BRAND_INFO.phoneDisplay}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 transition hover:border-zinc-700 hover:text-white"
            aria-label="Close basket"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Content */}
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400">
              <Flame className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Your basket is hungry!
            </h3>
            <p className="mt-2 max-w-xs text-sm text-zinc-400">
              Add crispy chicken fillets, spicy peppered wings, or wood-fired
              pizzas to build your instant WhatsApp order.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-600/30 transition hover:brightness-110"
            >
              Explore the Menu
            </button>

            <div className="mt-10 w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Prefer App Delivery?
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                You can also find Fat Rooster live on Glovo and Mano daily from
                12pm – 10pm.
              </p>
              <div className="mt-3 flex gap-2">
                {BRAND_INFO.deliveryPartners.map((partner) => (
                  <a
                    key={partner.name}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/90 px-3 py-2 text-xs font-bold text-white transition hover:border-amber-400"
                  >
                    Order on {partner.name}
                    <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* Items List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Selected Items ({totalItems})
                </span>
                <button
                  onClick={onClearCart}
                  className="inline-flex items-center gap-1 text-xs font-medium text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear All
                </button>
              </div>

              {cart.map((entry) => (
                <div
                  key={entry.cartItemId}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-800/90 bg-zinc-900/70 p-3.5"
                >
                  <img
                    src={entry.item.image}
                    alt={entry.item.name}
                    className="h-16 w-16 rounded-xl object-cover border border-zinc-800"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="truncate text-sm font-bold text-white">
                      {entry.item.name}
                    </h4>
                    {entry.spiceLevel && (
                      <span className="mt-0.5 inline-block rounded-md bg-orange-500/15 px-2 py-0.5 text-[11px] font-medium text-orange-300">
                        {entry.spiceLevel}
                      </span>
                    )}
                    <p className="mt-1 text-sm font-extrabold text-amber-400">
                      {formatNaira(entry.item.price * entry.quantity)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950 p-1">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(entry.cartItemId, -1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-white">
                      {entry.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(entry.cartItemId, 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(entry.cartItemId)}
                    className="p-1.5 text-zinc-500 hover:text-red-400"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Fulfillment Branch Selector */}
            <form
              id="whatsapp-checkout-form"
              onSubmit={handleWhatsAppCheckout}
              className="space-y-4 border-t border-zinc-800/80 pt-5"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  1. Choose Location & Fulfillment
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {(
                    [
                      {
                        id: "delivery-ikate",
                        title: "Doorstep Delivery (Ikate / Lekki)",
                        sub: "Dispatched hot from Richmond Estate, Ikate Lekki",
                      },
                      {
                        id: "beach-elegushi",
                        title: "Sol Beach Elegushi, Gate 2",
                        sub: "Beach cabana drop-off or walk-up pickup",
                      },
                      {
                        id: "pickup-ikate",
                        title: "Pickup — Richmond Estate, Ikate Lekki",
                        sub: "Skip the wait, collect fresh from our kitchen",
                      },
                    ] as const
                  ).map((opt) => {
                    const active = fulfillment === opt.id;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setFulfillment(opt.id)}
                        className={`flex items-start gap-3 rounded-xl border p-3 text-left transition ${
                          active
                            ? "border-orange-500 bg-orange-500/10 text-white"
                            : "border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:border-zinc-700"
                        }`}
                      >
                        <CheckCircle2
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            active ? "text-orange-400" : "text-zinc-600"
                          }`}
                        />
                        <div>
                          <div className="text-xs font-bold">{opt.title}</div>
                          <div className="text-[11px] text-zinc-400">
                            {opt.sub}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Customer Details */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                  2. Your Delivery / Pickup Details
                </label>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number (Optional)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    required={fulfillment !== "pickup-ikate"}
                    placeholder={
                      fulfillment === "beach-elegushi"
                        ? "Cabana Number, Tent or Gate 2 Spot *"
                        : fulfillment === "delivery-ikate"
                        ? "Delivery Address & Estate / Landmark *"
                        : "Estimated Pickup Time (e.g., in 20 mins)"
                    }
                    value={addressOrCabana}
                    onChange={(e) => setAddressOrCabana(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Extra notes? (e.g., extra pepper sauce, no onions, gate code)"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
                />
              </div>
            </form>
          </div>
        )}

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="border-t border-zinc-800 bg-zinc-900/90 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">
                Order Subtotal ({totalItems} items)
              </span>
              <span className="text-xl font-black text-amber-400">
                {formatNaira(subtotal)}
              </span>
            </div>

            <button
              type="submit"
              form="whatsapp-checkout-form"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 px-6 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-emerald-600/30 transition hover:brightness-110"
            >
              <Send className="h-4 w-4" />
              Send Order on WhatsApp ({BRAND_INFO.phoneDisplay})
            </button>

            <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
              <span>Open 12pm – 10pm Daily</span>
              <a
                href={`tel:${BRAND_INFO.phoneRaw}`}
                className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:underline"
              >
                <PhoneCall className="h-3 w-3" />
                Or call kitchen directly
              </a>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
