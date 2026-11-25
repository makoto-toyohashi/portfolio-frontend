import { getGithubDashboard } from "@/lib/api/github-dashboard";
import { DashboardView } from "./dashboard-view";
export async function DashboardSection() {
  try { return <DashboardView data={await getGithubDashboard()} />; }
  catch (error) {
    console.error("GitHub dashboard request failed", error instanceof Error ? error.message : "Unknown error");
    return <section className="rounded-2xl border border-white/10 bg-slate-900 p-6" role="status"><h2 className="text-xl font-semibold">GitHub Dashboard</h2><p className="mt-2 text-sm text-slate-400">統計情報を取得できません。時間をおいて再読み込みしてください。</p></section>;
  }
}
