export type MenuCategory =
  | "All"
  | "Signature Chicken & Bites"
  | "Wood-Fired Pizzas"
  | "Platters & Combos"
  | "Sides & Dips"
  | "Drinks & Shakes";

export type SpiceLevel = "Mild" | "Medium Rooster Heat" | "Lagos Pepper Hot 🔥";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in NGN (₦)
  category: Exclude<MenuCategory, "All">;
  image: string;
  badge?: string;
  popular?: boolean;
  customizableSpice?: boolean;
  prepTime?: string;
}

export const BRAND_INFO = {
  name: "Fat Rooster",
  handle: "@fatrooster.ng",
  tagline: "Big bites. Bold flavour.",
  subTagline:
    "Lagos' boldest crispy chicken, spicy peppered wings, artisan pizzas & beachside cravings — served fresh daily in Ikate Lekki and Sol Beach Elegushi.",
  phoneDisplay: "+234 916 955 9000",
  phoneRaw: "+2349169559000",
  whatsappNumber: "2349169559000",
  instagramUrl: "https://www.instagram.com/fatrooster.ng/",
  openingHours: "Open 12:00 PM – 10:00 PM Daily",
  deliveryPartners: [
    {
      name: "Glovo",
      tagline: "Fast riders across Lekki Phase 1, Ikate, Chevron & VI",
      badgeColor: "#FFC244",
      textColor: "#111111",
      url: "https://glovoapp.com/ng/en/lagos/",
    },
    {
      name: "Mano",
      tagline: "Instant doorstep delivery in Lekki & Victoria Island",
      badgeColor: "#FF3B30",
      textColor: "#FFFFFF",
      url: "https://www.manoapp.com/",
    },
  ],
  locations: [
    {
      id: "ikate",
      name: "Ikate Lekki Kitchen",
      shortName: "Richmond Estate, Ikate Lekki",
      address: "Richmond Estate, Ikate Elegushi, Lekki, Lagos",
      type: "Flagship Kitchen • Pickup & Delivery Hub",
      hours: "12:00 PM – 10:00 PM Daily",
      highlight: "Fastest dispatch for Ikate, Lekki Phase 1, Osapa & Chevron",
      mapQuery:
        "https://www.google.com/maps/search/?api=1&query=Richmond+Estate+Ikate+Lekki+Lagos",
    },
    {
      id: "elegushi",
      name: "Sol Beach Elegushi Outpost",
      shortName: "Sol Beach Elegushi, Gate 2",
      address: "Sol Beach, Elegushi Beach Road, Gate 2, Lekki, Lagos",
      type: "Beachfront Spot • Cabana Delivery & Walk-up",
      hours: "12:00 PM – 10:00 PM Daily",
      highlight: "Order straight to your beach cabana, lounge bed, or pickup at Gate 2",
      mapQuery:
        "https://www.google.com/maps/search/?api=1&query=Sol+Beach+Elegushi+Gate+2+Lekki+Lagos",
    },
  ],
};

export const MENU_CATEGORIES: MenuCategory[] = [
  "All",
  "Signature Chicken & Bites",
  "Wood-Fired Pizzas",
  "Platters & Combos",
  "Sides & Dips",
  "Drinks & Shakes",
];

export const MENU_ITEMS: MenuItem[] = [
  // Signature Chicken & Bites
  {
    id: "crispy-fillet-chips",
    name: "Golden Crispy Fillet & Chips",
    description:
      "Panko-crusted golden chicken breast fillet served with thick-cut skin-on fries, fresh lemon wedge, and signature Rooster pepper sauce.",
    price: 9500,
    category: "Signature Chicken & Bites",
    image: "/images/ig-1.png",
    badge: "As Seen on IG",
    popular: true,
    customizableSpice: true,
    prepTime: "15-20 mins",
  },
  {
    id: "peppered-rooster-wings",
    name: "Sticky Peppered Rooster Wings (8 pcs)",
    description:
      "Wok-tossedjumbo wings glazed in caramelized onions, fiery Ata Rodo chili reduction, spring onions, and smoky house spices.",
    price: 10500,
    category: "Signature Chicken & Bites",
    image: "/images/ig-3.png",
    badge: "Bestseller 🔥",
    popular: true,
    customizableSpice: true,
    prepTime: "15-20 mins",
  },
  {
    id: "flame-grilled-half-rooster",
    name: "Flame-Grilled Half Rooster & Fries",
    description:
      "24-hour marinated half chicken flame-grilled to juicy perfection, brushed with herb peri-peri glaze, served with fries and coleslaw.",
    price: 14500,
    category: "Signature Chicken & Bites",
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=80",
    badge: "Chef's Special",
    popular: true,
    customizableSpice: true,
    prepTime: "20-25 mins",
  },
  {
    id: "honey-sriracha-tenders",
    name: "Honey-Sriracha Crunch Tenders (6 pcs)",
    description:
      "Double-dredged buttermilk chicken tenders drizzled with warm honey-sriracha glaze and toasted sesame seeds.",
    price: 8800,
    category: "Signature Chicken & Bites",
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80",
    customizableSpice: true,
    prepTime: "15 mins",
  },

  // Wood-Fired Pizzas
  {
    id: "four-cheese-gold-pizza",
    name: "Artisan Four-Cheese Gold Pizza (12\")",
    description:
      "Hand-stretched sourdough crust baked with bubbling mozzarella, aged cheddar, provolone, parmesan, and roasted garlic herb oil.",
    price: 13500,
    category: "Wood-Fired Pizzas",
    image: "/images/ig-2.png",
    badge: "As Seen on IG",
    popular: true,
    customizableSpice: false,
    prepTime: "18-22 mins",
  },
  {
    id: "peri-peri-rooster-pizza",
    name: "Spicy Peri-Peri Chicken Pizza (12\")",
    description:
      "Loaded with flame-roasted chicken strips, sweet bell peppers, red onions, mozzarella, and a swirl of Fat Rooster peri-peri crema.",
    price: 15500,
    category: "Wood-Fired Pizzas",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
    badge: "Crowd Favorite",
    popular: true,
    customizableSpice: true,
    prepTime: "20 mins",
  },
  {
    id: "suya-beef-chicken-supreme",
    name: "Lagos Suya & Chicken Supreme (12\")",
    description:
      "Yaji-spiced grilled chicken & suya beef strips, caramelized onions, sweetcorn, chili flakes, and triple mozzarella blend.",
    price: 16500,
    category: "Wood-Fired Pizzas",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
    customizableSpice: true,
    prepTime: "20-25 mins",
  },
  {
    id: "double-pepperoni-hot-honey",
    name: "Double Pepperoni & Hot Honey (12\")",
    description:
      "Crispy cup-and-char beef pepperoni over rich San Marzano tomato base, mozzarella, oregano, and chili-infused hot honey drizzle.",
    price: 15000,
    category: "Wood-Fired Pizzas",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80",
    customizableSpice: true,
    prepTime: "18-22 mins",
  },

  // Platters & Combos
  {
    id: "sol-beach-squad-platter",
    name: "Sol Beach Squad Platter (Serves 3–4)",
    description:
      "12 Peppered Wings, 6 Crispy Tenders, 12\" Four-Cheese or Peri-Peri Pizza, Double Loaded Fries, Fried Plantain (Dodo), and 4 Signature Dips.",
    price: 38000,
    category: "Platters & Combos",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80",
    badge: "Beach Cabana Hit",
    popular: true,
    customizableSpice: true,
    prepTime: "25-30 mins",
  },
  {
    id: "big-rooster-duo-box",
    name: "Big Rooster Duo Feast (Serves 2)",
    description:
      "Golden Crispy Fillet, 6 Sticky Peppered Wings, Double Chunky Fries, Sweet Plantain Cubes, Coleslaw & 2 Chilled Drinks.",
    price: 22500,
    category: "Platters & Combos",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=80",
    badge: "Best Value",
    customizableSpice: true,
    prepTime: "20 mins",
  },

  // Sides & Dips
  {
    id: "cajun-steak-fries",
    name: "Crispy Cajun Steak Fries",
    description:
      "Thick-cut golden potato fries tossed in smoky Cajun rooster dust, served with garlic aioli or spicy ketchup.",
    price: 4000,
    category: "Sides & Dips",
    image:
      "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=900&q=80",
    customizableSpice: true,
    prepTime: "10 mins",
  },
  {
    id: "spicy-dodo-cubes",
    name: "Caramelized Sweet Plantain (Dodo)",
    description:
      "Ripe golden plantain cubes fried to sweet perfection with an optional toss of peppered rooster sauce.",
    price: 3500,
    category: "Sides & Dips",
    image:
      "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=80",
    customizableSpice: false,
    prepTime: "10 mins",
  },

  // Drinks & Shakes
  {
    id: "rooster-oreo-milkshake",
    name: "Thick Oreo & Vanilla Bean Shake",
    description:
      "Hand-spun creamy vanilla ice cream blended with crushed Oreo cookies, chocolate fudge swirl, and whipped cream.",
    price: 6500,
    category: "Drinks & Shakes",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80",
    badge: "Beach Cooler",
    customizableSpice: false,
    prepTime: "5 mins",
  },
  {
    id: "lagos-island-chapman",
    name: "Lagos Sunset Citrus Chapman",
    description:
      "Refreshing house-mixed citrus punch with grenadine, aromatic bitters, cucumber ribbons, lemon, and crushed ice.",
    price: 4500,
    category: "Drinks & Shakes",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80",
    customizableSpice: false,
    prepTime: "5 mins",
  },
];

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
