"use client";

import { useRef, useState } from "react";
import { getReport } from "@/lib/api/ai";
import type { Period, Report } from "@/types/ai";

export function AnalysisPanel() {
  const [report, setReport] = useState<Report>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const lock = useRef(false);

  async function load(period: Period) {
    if (lock.current) return;
    lock.current = true;
    setPending(true);
    setError("");
    try {
      setReport(await getReport(period));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "取得に失敗しました。");
    } finally {
      lock.current = false;
      setPending(false);
    }
  }

  return (
    <section className="space-y-5 rounded-2xl border border-white/10 bg-slate-900 p-5">
      <h2 className="text-xl font-semibold">AI Development Report</h2>
      <p className="text-sm text-slate-400">公開GitHubリポジトリの活動をAIで分析します。</p>
      <div className="flex flex-wrap gap-2">
        {(["weekly", "monthly"] as const).map(period => (
          <button key={period} disabled={pending} onClick={() => load(period)}
            className="rounded-xl border border-sky-800 px-4 py-2 text-sm text-sky-300 disabled:opacity-50">
            {period === "weekly" ? "直近7日間" : "直近30日間"}
          </button>
        ))}
      </div>
      {pending && <p role="status" className="text-sm text-sky-300">分析中…</p>}
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      {report && <ReportView report={report} />}
    </section>
  );
}

function ReportView({ report }: { report: Report }) {
  const totals = report.projects.reduce((sum, project) => ({
    commits: sum.commits + project.commits,
    issues: sum.issues + project.closedIssues,
    pulls: sum.pulls + project.mergedPullRequests,
  }), { commits: 0, issues: 0, pulls: 0 });

  const format = (date: string) => new Date(date).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-400">{format(report.from)} ～ {format(report.to)} (JST)</p>
      <div className="grid grid-cols-3 gap-2">
        {([["コミット", totals.commits], ["完了Issue", totals.issues], ["マージPR", totals.pulls]] as const).map(([label, value]) => (
          <div key={label} className="rounded-xl bg-slate-950 p-3">
            <p className="text-xs text-slate-400">{label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-slate-800 p-4">
        <h3 className="mb-3 font-semibold">AI分析・改善提案</h3>
        <p className="whitespace-pre-wrap break-words text-sm leading-7">{report.analysis}</p>
      </div>
      <h3 className="font-semibold">プロジェクト別活動</h3>
      {report.projects.map(project => (
        <details key={project.name} className="rounded-xl border border-white/10 p-3">
          <summary className="cursor-pointer text-sm">{project.name} — {project.commits} commits / {project.closedIssues} issues / {project.mergedPullRequests} PRs</summary>
          <ul className="mt-3 space-y-2 text-xs text-slate-400">
            {project.samples.map((sample, index) => <li key={index} className="break-words">{sample}</li>)}
          </ul>
        </details>
      ))}
      <p className="text-xs text-slate-500">AIの分析は参考情報です。集計値は生産性を直接示すものではありません。</p>
    </div>
  );
}
