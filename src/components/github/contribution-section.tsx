import { getContributions } from "@/lib/api/github";
import { ContributionGraph } from "./contribution-graph";

/**
 * GitHubの開発活動を取得・表示するコンポーネント
 */
export async function ContributionSection() {
  // GitHubの開発活動データ
  let data: Awaited<ReturnType<typeof getContributions>>;

  try {
    // APIから開発活動データを取得
    data = await getContributions();
  } catch (error) {
    // API取得失敗時のログ出力
    console.error(
      "GitHub contributions request failed",
      error instanceof Error ? error.message : "Unknown error"
    );

    // API取得失敗時の代替表示
    return (
      <section
        className="rounded-2xl border border-white/10 bg-slate-900 p-6"
        role="status"
      >
        <h2 className="text-xl font-semibold">
          GitHub Contributions
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          現在、開発活動を取得できません。
          時間をおいて再読み込みしてください。
        </p>
      </section>
    );
  }

  // API取得成功時にグラフを表示
  return <ContributionGraph data={data} />;
}