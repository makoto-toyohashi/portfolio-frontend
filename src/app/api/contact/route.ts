import { NextResponse } from "next/server";

/**
 * お問い合わせ受付API
 * 現在は未実装のため、501を返却する。
 */
export async function POST() {
  return NextResponse.json(
    {
      message: "お問い合わせ機能は現在準備中です。",
    },
    {
      status: 501,
    }
  );
}