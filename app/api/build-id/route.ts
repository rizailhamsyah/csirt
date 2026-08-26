import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const buildId = process.env.NEXT_PUBLIC_BUILD_ID || "unknown";
  return NextResponse.json(
    { buildId },
    {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
      },
    },
  );
}
