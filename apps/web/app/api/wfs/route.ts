import { NextResponse } from "next/server";
import { fetchWfsData } from "../../../src/shared/api/wfs";

export async function GET() {
  try {
    const data = await fetchWfsData();

    return new NextResponse(data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch WFS" }, { status: 500 });
  }
}
