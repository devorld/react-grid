import { NextResponse } from "next/server";

export async function GET() {
  try {
    const statusInfo = {
      status: "👍",
      time: new Date().toISOString().split(/[TZ]/)[1]
    };

    return NextResponse.json(statusInfo);
  } catch {
    return NextResponse.json({error: "Internal error"}, {status: 500});
  }
}
