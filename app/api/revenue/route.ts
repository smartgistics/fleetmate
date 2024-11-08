import { getWeeklyRevenue } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getWeeklyRevenue();
  return NextResponse.json(data);
}
