"use client";

import React, { useState, useMemo } from "react";
import {
  ShoppingBag,
  Flame,
  MapPin,
  Clock,
  Phone,
  Search,
  Plus,
  Check,
  Sparkles,
  ExternalLink,
  Utensils,
  Waves,
  Truck,
  ChevronRight,
  Star,
  MessageCircle,
} from "lucide-react";

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
import {
  BRAND_INFO,
  MENU_CATEGORIES,
  MENU_ITEMS,
  MenuCategory,
  MenuItem,
  SpiceLevel,
  formatNaira,
} from "@/data/menu";
import CartDrawer, { CartItem } from "@/components/CartDrawer";

const SPICE_OPTIONS: SpiceLevel[] = [
  "Mild",
  "Medium Rooster Heat",
  "Lagos Pepper Hot 🔥",
];

export default function FatRoosterStorefront() {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [spiceSelections, setSpiceSelections] = useState<
    Record<string, SpiceLevel>
  >({});
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCat =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getItemSpice = (item: MenuItem): SpiceLevel | undefined => {
    if (!item.customizableSpice) return undefined;
    return spiceSelections[item.id] || "Medium Rooster Heat";
  };

  const handleAddToCart = (item: MenuItem) => {
    const spiceLevel = getItemSpice(item);
    const cartItemId = spiceLevel ? `${item.id}__${spiceLevel}` : item.id;

    setCart((prev) => {
      const existing = prev.find((c) => c.cartItemId === cartItemId);
      if (existing) {
        return prev.map((c) =>
          c.cartItemId === cartItemId ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { cartItemId, item, quantity: 1, spiceLevel }];
    });

    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === item.id ? null : curr));
    }, 1100);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.cartItemId === cartItemId
            ? { ...c, quantity: c.quantity + delta }
            : c
        )
        .filter((c) => c.quantity > 0)
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((c) => c.cartItemId !== cartItemId));
  };

  const handleClearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, c) => acc + c.quantity, 0);
  const subtotal = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-orange-500 selection:text-white">
      {/* Top Location & Hours Ticker Bar */}
      <div className="border-b border-orange-500/20 bg-gradient-to-r from-zinc-950 via-orange-950/40 to-zinc-950 px-4 py-2 text-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4 text-zinc-300">
            <span className="inline-flex items-center gap-1.5 font-semibold text-amber-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {BRAND_INFO.openingHours}
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-zinc-400">
              <MapPin className="h-3.5 w-3.5 text-orange-400" />
              Richmond Estate, Ikate Lekki
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-zinc-400">
              <Waves className="h-3.5 w-3.5 text-amber-400" />
              Sol Beach Elegushi, Gate 2
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${BRAND_INFO.phoneRaw}`}
              className="inline-flex items-center gap-1.5 font-bold text-white hover:text-amber-400 transition"
            >
              <Phone className="h-3.5 w-3.5 text-orange-400" />
              {BRAND_INFO.phoneDisplay}
            </a>
            <a
              href={BRAND_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-zinc-300 hover:text-white transition"
            >
              <InstagramIcon className="h-3.5 w-3.5 text-pink-400" />
              <span>{BRAND_INFO.handle}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Main Navbar */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-amber-400/80 shadow-lg shadow-orange-500/20 transition group-hover:scale-105">
              <img
                src="/images/logo.png"
                alt="Fat Rooster Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <span className="block text-xl font-black tracking-tight text-white sm:text-2xl">
                FAT <span className="text-orange-500">ROOSTER</span>
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-amber-400/90">
                Big Bites • Bold Flavour
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-zinc-300 lg:flex">
            <a href="#menu" className="transition hover:text-orange-400">
              Menu
            </a>
            <a
              href="#delivery-apps"
              className="transition hover:text-orange-400"
            >
              Mano & Glovo
            </a>
            <a href="#locations" className="transition hover:text-orange-400">
              Locations (Ikate & Elegushi)
            </a>
            <a href="#instagram" className="transition hover:text-orange-400">
              Instagram
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(
                "Hi Fat Rooster! I'd like to place an order."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2 text-xs font-bold text-emerald-300 transition hover:bg-emerald-500/20"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 px-4 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-orange-600/30 transition hover:brightness-110"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Order Basket</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black/40 px-1.5 text-xs font-black text-amber-300">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-900 pt-10 pb-16 md:py-20">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-orange-600/20 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-0 right-10 h-80 w-80 rounded-full bg-amber-500/15 blur-[120px]" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12">
          {/* Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1.5 text-xs font-bold text-orange-300">
              <Flame className="h-4 w-4 text-orange-400" />
              <span>LAGOS&apos; ULTIMATE CRISPY CHICKEN, WINGS & PIZZA SPOT</span>
            </div>

            <h1 className="text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Big Bites.{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Bold Flavour.
              </span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              From golden panko-crusted chicken & chips and fiery wok-tossed
              peppered wings to bubbling four-cheese wood-fired pizzas. Order
              straight to your doorstep in{" "}
              <strong className="text-white">Ikate Lekki</strong> or your beach
              cabana at{" "}
              <strong className="text-white">Sol Beach Elegushi, Gate 2</strong>.
            </p>

            {/* Location Badges */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-xl">
              <a
                href="#locations"
                className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3.5 transition hover:border-orange-500/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Location 1 • Lekki Kitchen
                  </div>
                  <div className="text-sm font-bold text-white">
                    Richmond Estate, Ikate Lekki
                  </div>
                </div>
              </a>

              <a
                href="#locations"
                className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3.5 transition hover:border-amber-500/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
                  <Waves className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Location 2 • Beach Outpost
                  </div>
                  <div className="text-sm font-bold text-white">
                    Sol Beach Elegushi, Gate 2
                  </div>
                </div>
              </a>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-7 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-orange-600/30 transition hover:scale-[1.02] hover:brightness-110"
              >
                <Utensils className="h-4 w-4" />
                Order From Menu
              </a>

              <a
                href="#delivery-apps"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-6 py-4 text-sm font-bold text-white transition hover:border-amber-400 hover:bg-zinc-800"
              >
                <Truck className="h-4 w-4 text-amber-400" />
                Order on Mano & Glovo
              </a>
            </div>
          </div>

          {/* Hero Visual Collage (Using Authentic @fatrooster.ng Dishes + Mascot) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Floating Mascot Badge */}
              <div className="absolute -top-5 -left-4 z-20 flex items-center gap-3 rounded-2xl border border-amber-400/40 bg-zinc-950/95 p-2.5 pr-4 shadow-2xl backdrop-blur-md">
                <img
                  src="/images/logo.png"
                  alt="Fat Rooster Mascot"
                  className="h-12 w-12 rounded-full border border-amber-400 object-cover"
                />
                <div>
                  <div className="flex items-center gap-1 text-xs font-black text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span>@fatrooster.ng</span>
                  </div>
                  <p className="text-[11px] font-medium text-zinc-300">
                    Open 12pm – 10pm Daily
                  </p>
                </div>
              </div>

              {/* 3-Card Dish Grid from their Instagram */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="col-span-2 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl group relative">
                  <img
                    src="/images/ig-1.png"
                    alt="Golden Crispy Fillet & Chips"
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-64"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                        Signature Dish
                      </span>
                      <h3 className="mt-1 text-lg font-black text-white">
                        Golden Crispy Fillet & Chips
                      </h3>
                    </div>
                    <button
                      onClick={() => handleAddToCart(MENU_ITEMS[0])}
                      className="rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-black text-zinc-950 shadow-md transition hover:bg-amber-400"
                    >
                      + {formatNaira(MENU_ITEMS[0].price)}
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl group relative">
                  <img
                    src="/images/ig-2.png"
                    alt="Four-Cheese Gold Pizza"
                    className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-xs font-extrabold text-white">
                      Four-Cheese Pizza
                    </p>
                    <p className="text-[11px] font-bold text-amber-400">
                      {formatNaira(MENU_ITEMS[4].price)}
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl group relative">
                  <img
                    src="/images/ig-3.png"
                    alt="Sticky Peppered Rooster Wings"
                    className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-xs font-extrabold text-white">
                      Peppered Wings 🔥
                    </p>
                    <p className="text-[11px] font-bold text-amber-400">
                      {formatNaira(MENU_ITEMS[1].price)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Menu Section */}
      <section id="menu" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-orange-400">
              <Sparkles className="h-4 w-4" />
              <span>Freshly Made To Order</span>
            </div>
            <h2 className="mt-1 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Explore The Fat Rooster Menu
            </h2>
            <p className="mt-2 max-w-xl text-sm text-zinc-400">
              Select your favourite dishes, customize your Lagos spice level,
              and checkout directly via WhatsApp or order on Mano & Glovo.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wings, pizza, chips..."
              className="w-full rounded-full border border-zinc-800 bg-zinc-900/90 pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {MENU_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-extrabold tracking-wide transition ${
                  active
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-600/25"
                    : "border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-700 hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const isAdded = justAddedId === item.id;
            const currentSpice = getItemSpice(item);

            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-800/90 bg-zinc-900/50 transition duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-zinc-900/90 hover:shadow-2xl hover:shadow-orange-950/30"
              >
                <div>
                  {/* Dish Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-zinc-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

                    {item.badge && (
                      <span className="absolute top-3.5 left-3.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md">
                        {item.badge}
                      </span>
                    )}

                    {item.prepTime && (
                      <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-[11px] font-semibold text-zinc-200 backdrop-blur-md">
                        <Clock className="h-3 w-3 text-amber-400" />
                        {item.prepTime}
                      </span>
                    )}

                    <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        {item.category}
                      </span>
                      <span className="rounded-xl bg-black/80 px-3 py-1 text-base font-black text-white backdrop-blur-md border border-white/10">
                        {formatNaira(item.price)}
                      </span>
                    </div>
                  </div>

                  {/* Dish Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-extrabold text-white group-hover:text-amber-400 transition">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                      {item.description}
                    </p>

                    {/* Spice Level Selector */}
                    {item.customizableSpice && (
                      <div className="mt-4">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                          Choose Heat Level:
                        </span>
                        <div className="grid grid-cols-3 gap-1.5">
                          {SPICE_OPTIONS.map((spice) => {
                            const selected = currentSpice === spice;
                            return (
                              <button
                                key={spice}
                                type="button"
                                onClick={() =>
                                  setSpiceSelections((prev) => ({
                                    ...prev,
                                    [item.id]: spice,
                                  }))
                                }
                                className={`rounded-lg border px-2 py-1.5 text-[10px] font-bold transition truncate ${
                                  selected
                                    ? "border-orange-500 bg-orange-500/20 text-orange-300"
                                    : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700"
                                }`}
                              >
                                {spice}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add to Basket Button */}
                <div className="px-5 pb-5 pt-2">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(item)}
                    className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs font-extrabold uppercase tracking-wider transition ${
                      isAdded
                        ? "bg-emerald-500 text-white"
                        : "bg-zinc-800 text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-4 w-4" />
                        Added to Rooster Basket!
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 text-amber-400" />
                        Add to Order • {formatNaira(item.price)}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mano & Glovo Delivery Banner */}
      <section
        id="delivery-apps"
        className="border-y border-zinc-800/80 bg-gradient-to-b from-zinc-900/60 to-zinc-950 py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-3xl border border-orange-500/30 bg-gradient-to-r from-zinc-900 via-orange-950/30 to-zinc-900 p-8 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-300">
                  <Truck className="h-3.5 w-3.5" />
                  Official Delivery Partners
                </span>
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Order on <span className="text-amber-400">Glovo</span> &{" "}
                  <span className="text-red-500">Mano</span>
                </h2>
                <p className="max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                  Craving Fat Rooster right now? Search{" "}
                  <strong className="text-white">&ldquo;Fat Rooster&rdquo;</strong>{" "}
                  on the Mano or Glovo app for live rider tracking across Ikate,
                  Lekki Phase 1, Victoria Island, Oniru, and Chevron — or order
                  directly with us on WhatsApp for beach cabana drop-offs and
                  large platter orders!
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {BRAND_INFO.deliveryPartners.map((partner) => (
                  <a
                    key={partner.name}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950/90 p-5 transition hover:-translate-y-1 hover:border-amber-400/60"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className="inline-block rounded-lg px-3 py-1 text-xs font-black uppercase"
                          style={{
                            backgroundColor: partner.badgeColor,
                            color: partner.textColor,
                          }}
                        >
                          {partner.name}
                        </span>
                        <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-amber-400 transition" />
                      </div>
                      <h3 className="mt-4 text-lg font-extrabold text-white">
                        Order via {partner.name}
                      </h3>
                      <p className="mt-1 text-xs text-zinc-400">
                        {partner.tagline}
                      </p>
                    </div>
                    <div className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-amber-400">
                      <span>Open {partner.name}</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Locations Section */}
      <section id="locations" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-orange-400">
            Find Us In Lagos
          </span>
          <h2 className="mt-1 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Two Prime Spots. Same Bold Flavour.
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Open every single day from{" "}
            <strong className="text-zinc-200">12:00 PM – 10:00 PM</strong>.
            Walk in, pick up, or have your order brought straight to your
            doorstep or beach cabana.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {BRAND_INFO.locations.map((loc, index) => (
            <div
              key={loc.id}
              className="flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-900/60 p-7 shadow-xl transition hover:border-orange-500/40"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 px-3.5 py-1 text-xs font-bold text-orange-300">
                    {index === 0 ? (
                      <MapPin className="h-3.5 w-3.5" />
                    ) : (
                      <Waves className="h-3.5 w-3.5" />
                    )}
                    {loc.type}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    ● {loc.hours}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-black text-white">
                  {loc.shortName}
                </h3>
                <p className="mt-1 text-sm text-zinc-300">{loc.address}</p>

                <div className="mt-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-4 text-xs text-zinc-300">
                  <strong className="text-amber-400">Best for:</strong>{" "}
                  {loc.highlight}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-800/80">
                <a
                  href={loc.mapQuery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-800 px-4 py-3 text-xs font-bold text-white transition hover:bg-zinc-700"
                >
                  <MapPin className="h-4 w-4 text-orange-400" />
                  Get Directions
                </a>
                <a
                  href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(
                    `Hi Fat Rooster! I'm ordering from the ${loc.shortName} branch.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-4 py-3 text-xs font-bold text-white transition hover:brightness-110"
                >
                  <MessageCircle className="h-4 w-4" />
                  Order From Branch
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Feed Section (@fatrooster.ng) */}
      <section
        id="instagram"
        className="border-t border-zinc-900 bg-zinc-950/80 py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <img
                src="/images/logo.png"
                alt="@fatrooster.ng"
                className="h-14 w-14 rounded-full border-2 border-pink-500 object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-white sm:text-2xl">
                    fatrooster.ng
                  </h2>
                  <span className="rounded-full bg-pink-500/15 px-2.5 py-0.5 text-[11px] font-bold text-pink-400">
                    Instagram
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Order on Mano & Glovo. Big bites. Bold flavour • Richmond
                  Estate, Ikate Lekki • Sol Beach Elegushi, Gate 2
                </p>
              </div>
            </div>

            <a
              href={BRAND_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-amber-500 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg transition hover:brightness-110"
            >
              <InstagramIcon className="h-4 w-4" />
              Follow @fatrooster.ng
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              {
                img: "/images/ig-1.png",
                caption:
                  "Golden Crispy Chicken Fillet & thick-cut fries served hot with lemon & signature pepper dip 🍋🍟",
              },
              {
                img: "/images/ig-2.png",
                caption:
                  "Cheese pull goals! Freshly baked Artisan Four-Cheese Gold Pizza straight out the oven 🍕🧀",
              },
              {
                img: "/images/ig-3.png",
                caption:
                  "Sticky, fiery, wok-tossed Peppered Rooster Wings glazed with caramelized onions & Ata Rodo 🔥🍗",
              },
            ].map((post, i) => (
              <a
                key={i}
                href={BRAND_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
              >
                <img
                  src={post.img}
                  alt={post.caption}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className=" inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 flex flex-col justify-end">
                  <p className="text-xs text-zinc-200 line-clamp-2">
                    {post.caption}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-amber-400">
                    View on Instagram <ExternalLink className="h-3 w-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black py-12 text-zinc-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo.png"
                  alt="Fat Rooster Logo"
                  className="h-10 w-10 rounded-full border border-amber-400"
                />
                <span className="text-xl font-black text-white">
                  FAT <span className="text-orange-500">ROOSTER</span>
                </span>
              </div>
              <p className="max-w-sm text-xs leading-relaxed text-zinc-400">
                Big bites. Bold flavour. Serving crispy chicken & chips, fiery
                peppered wings, wood-fired pizzas, and beachside platters daily
                in Lagos.
              </p>
              <p className="text-xs font-bold text-amber-400">
                🕒 {BRAND_INFO.openingHours}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                Our Locations
              </h4>
              <ul className="mt-3 space-y-2 text-xs">
                <li>📍 Richmond Estate, Ikate Lekki, Lagos</li>
                <li>📍 Sol Beach Elegushi, Gate 2, Lagos</li>
                <li className="pt-1">
                  <a
                    href={`tel:${BRAND_INFO.phoneRaw}`}
                    className="font-bold text-white hover:text-amber-400"
                  >
                    📞 {BRAND_INFO.phoneDisplay}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                Order Channels
              </h4>
              <ul className="mt-3 space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="hover:text-amber-400 transition"
                  >
                    Direct WhatsApp Checkout
                  </button>
                </li>
                {BRAND_INFO.deliveryPartners.map((p) => (
                  <li key={p.name}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-400 transition"
                    >
                      Order on {p.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={BRAND_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition"
                  >
                    Instagram ({BRAND_INFO.handle})
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-zinc-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500">
            <p>© 2026 Fat Rooster Nigeria. All rights reserved.</p>
            <p className="mt-2 sm:mt-0">
              Big bites. Bold flavour. • Ikate Lekki & Sol Beach Elegushi
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Checkout Pill when Cart has items */}
      {totalItems > 0 && !isCartOpen && (
        <div className="fixed bottom-5 inset-x-0 z-40 mx-auto max-w-md px-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex w-full items-center justify-between rounded-2xl border border-amber-300/30 bg-gradient-to-r from-orange-600 via-red-600 to-amber-500 p-4 text-white shadow-2xl shadow-orange-600/40 transition hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/30 text-sm font-black">
                {totalItems}
              </span>
              <div className="text-left">
                <div className="text-xs font-extrabold uppercase tracking-wider">
                  View Rooster Basket
                </div>
                <div className="text-[11px] text-amber-100">
                  Checkout via WhatsApp ({BRAND_INFO.phoneDisplay})
                </div>
              </div>
            </div>
            <div className="text-base font-black">{formatNaira(subtotal)}</div>
          </button>
        </div>
      )}

      {/* Slide-over Cart & WhatsApp Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
