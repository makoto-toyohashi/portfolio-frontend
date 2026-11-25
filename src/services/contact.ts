
import {
  contactConfig,
  type ContactMode,
} from "@/config/contact";

import type {
  ContactFormData,
  ContactResponse,
} from "@/types/contact";

/**
 * お問い合わせ送信処理
 */
export async function submitContact(
  data: ContactFormData,
  mode: ContactMode
): Promise<ContactResponse> {
  switch (mode) {
    case "demo":
      return submitDemoContact();

    case "production":
      return submitProductionContact(data);

    default:
      throw new Error("無効な動作モードです。");
  }
}

/**
 * デモ送信処理
 * 外部通信・データ保存は行わない。
 */
async function submitDemoContact(): Promise<ContactResponse> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, contactConfig.demoDelay);
  });

  return {
    success: true,
    message: "デモ処理が正常に完了しました。",
  };
}

/**
 * 本番送信処理
 */
async function submitProductionContact(
  data: ContactFormData
): Promise<ContactResponse> {
  if (!contactConfig.productionEnabled) {
    throw new Error(
      "お問い合わせ機能は準備中です。"
    );
  }

  if (
    data.category === "project" &&
    !contactConfig.acceptingProjects
  ) {
    throw new Error(
      "現在、新規案件は受け付けておりません。"
    );
  }

  const response = await fetch(
    contactConfig.endpoint,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    }
  );

  if (!response.ok) {
    throw new Error(
      "お問い合わせの送信に失敗しました。"
    );
  }

  const result: ContactResponse =
    await response.json();

  if (result.success !== true) {
    throw new Error(
      "お問い合わせを受け付けられませんでした。"
    );
  }

  return result;
}
