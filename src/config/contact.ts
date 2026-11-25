
export type ContactMode = "demo" | "production";

export type ContactConfig = {
  defaultMode: ContactMode;
  productionEnabled: boolean;
  acceptingProjects: boolean;
  github: string;
  endpoint: string;
  demoDelay: number;
};

export const contactConfig: ContactConfig = {
  // 初期表示モード
  defaultMode: "demo",

  // 本番送信機能の有効化
  productionEnabled: false,

  // 新規案件の受付状況
  acceptingProjects: false,

  // GitHub URL
  github: "https://github.com/YOUR_USERNAME",

  // 本番APIエンドポイント
  endpoint: "/api/contact",

  // デモ送信の待機時間（ミリ秒）
  demoDelay: 1000,
};
