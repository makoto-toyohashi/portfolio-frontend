import { getGithubDashboard } from "@/lib/api/github-dashboard";
import { DashboardView } from "./dashboard-view";

/**
 * GitHubの統計情報を取得・表示するコンポーネント
 */
export async function DashboardSection() {
  // GitHubの統計データ
  let data: Awaited<ReturnType<typeof getGithubDashboard>>;

  try {
    // APIから統計データを取得
    data = await getGithubDashboard();
  } catch (error) {
    // API取得失敗時のログ出力
    console.error(
      "GitHub dashboard request failed",
      error instanceof Error ? error.message : "Unknown error"
    );

    // API取得失敗時の代替表示
    return (
      <section
        className="rounded-2xl border border-white/10 bg-slate-900 p-6"
        role="status"
      >
        <h2 className="text-xl font-semibold">
          GitHub Dashboard
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          統計情報を取得できません。
          時間をおいて再読み込みしてください。
        </p>
      </section>
    );
  }

  // API取得成功時にダッシュボードを表示
  return <DashboardView data={data} />;
}