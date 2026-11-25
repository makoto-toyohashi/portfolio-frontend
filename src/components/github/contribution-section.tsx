import { getContributions } from "@/lib/api/github";
import { ContributionGraph } from "./contribution-graph";

export async function ContributionSection() {
  try {
    const data = await getContributions();
    return <ContributionGraph data={data}/>;
  } catch {
    return <section className="rounded-2xl border border-white/10 bg-slate-900 p-6" role="status"><h2 className="text-xl font-semibold">GitHub Contributions</h2><p className="mt-2 text-sm text-slate-400">現在、開発活動を取得できません。時間をおいて再読み込みしてください。</p></section>;
  }
}
