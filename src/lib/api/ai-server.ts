import "server-only";
import { auth0 } from "@/lib/auth0";
import { NextResponse } from "next/server";

/** 認証済みユーザーのみ許可。共有キーはサーバー内に保持する。 */
export async function forwardAi(path: string, body?: unknown) {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ message: "ログインしてください。" }, { status: 401 });
  }

  const key = process.env.AI_ACCESS_KEY;
  const base = process.env.API_BASE_URL ?? "http://localhost:8080/api/v1";
  if (!key) {
    return NextResponse.json({ message: "AI機能が未設定です。" }, { status: 503 });
  }

  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/ai/${path}`, {
      method: body === undefined ? "GET" : "POST",
      headers: { "X-AI-Key": key, "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(120_000),
    });

    if (!response.ok) {
      const limited = response.status === 429;
      return NextResponse.json({
        message: limited ? "AIの利用上限に達しました。時間をおいてお試しください。" :
          "AIサービスを利用できません。バックエンドの設定をご確認ください。",
      }, { status: limited ? 429 : response.status === 400 ? 400 : 503 });
    }

    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json({ message: "AIサーバーとの通信に失敗しました。" }, { status: 503 });
  }
}
