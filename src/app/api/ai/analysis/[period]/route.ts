import { NextResponse } from "next/server";
import { forwardAi } from "@/lib/api/ai-server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ period: string }> },
) {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json({ message: "許可されていない要求です。" }, { status: 403 });
  }
  const { period } = await params;
  if (period !== "weekly" && period !== "monthly") {
    return NextResponse.json({ message: "期間が不正です。" }, { status: 400 });
  }
  return forwardAi(`analysis/${period}`);
}
