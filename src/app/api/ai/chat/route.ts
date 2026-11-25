import { NextResponse } from "next/server";
import { forwardAi } from "@/lib/api/ai-server";

export async function POST(request: Request) {
  // クロスサイトからのブラウザ経由の呼び出しを拒否する。
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json({ message: "許可されていない要求です。" }, { status: 403 });
  }
  const raw = await request.text();
  if (raw.length > 16000) {
    return NextResponse.json({ message: "入力が長すぎます。" }, { status: 400 });
  }
  try {
    return await forwardAi("chat", JSON.parse(raw));
  } catch {
    return NextResponse.json({ message: "不正なリクエストです。" }, { status: 400 });
  }
}
