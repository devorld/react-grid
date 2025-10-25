import { NextResponse } from "next/server";
import { fetchWmsData } from "../../../src/shared/api/wms";

export async function GET(req: Request) {
  try {
    const pic = await fetchWmsData(req);

    return new NextResponse(pic, {
      headers: {
        "Content-Type": "image/png",
        "Access-Control-Allow-Origin": "*", // temporary presentation solution, not for production
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({error: "Failed to get WMS"}, {status: 500});
  }
}
