import { NextResponse, connection } from "next/server";
import { BRAND_INFO, MENU_CATEGORIES, MENU_ITEMS } from "@/data/menu";

export async function GET() {
  await connection();
  // Calculate live kitchen status in Lagos timezone (UTC+1)
  const now = new Date();
  const lagosTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Africa/Lagos" })
  );
  const hour = lagosTime.getHours();
  const isOpen = hour >= 12 && hour < 22;

  return NextResponse.json({
    brand: BRAND_INFO,
    categories: MENU_CATEGORIES,
    items: MENU_ITEMS,
    kitchenStatus: {
      isOpen,
      currentHourWAT: hour,
      label: isOpen
        ? "OPEN NOW • Kitchens Firing (12pm – 10pm)"
        : "OPENS AT 12:00 PM • Pre-Orders Welcome",
    },
  });
}
