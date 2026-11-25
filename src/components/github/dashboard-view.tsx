import type { GithubDashboard } from "@/types/github-dashboard";
const palette = ["#38bdf8", "#f59e0b", "#a78bfa", "#34d399", "#f472b6", "#94a3b8"];
const panel = "rounded-2xl border border-white/10 bg-slate-900 p-4 sm:p-6";
const fmt = (n: number) => n.toLocaleString("ja-JP");
export function DashboardView({ data }: { data: GithubDashboard }) {
  const stats = [["Repositories",data.repositories],["Stars",data.stars],["Forks",data.forks],["Issues",data.openIssues+data.closedIssues],["Pull Requests",data.openPullRequests+data.closedPullRequests]] as const;
  const languages = Object.entries(data.languages).filter(([,n])=>n>0).sort((a,b)=>b[1]-a[1]);
  const total = languages.reduce((s,[,n])=>s+n,0);
  const max = Math.max(1,...data.monthlyCommits.map(m=>m.count));
  let offset=0;
  return <section className="space-y-4" aria-label="GitHub Dashboard">
    <div className={panel}><h2 className="text-xl font-semibold">GitHub Statistics</h2><p className="mt-1 text-sm text-slate-400">設定済みの公開リポジトリのみ</p>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-5">{stats.map(([label,value])=><div key={label} className="rounded-xl bg-slate-950/60 p-3"><p className="text-xs text-slate-400">{label}</p><p className="mt-1 text-2xl font-semibold tabular-nums">{fmt(value)}</p></div>)}</div>
      <p className="mt-3 text-xs text-slate-400">{`Issue: Open ${data.openIssues} / Closed ${data.closedIssues}　PR: Open ${data.openPullRequests} / Closed ${data.closedPullRequests}`}</p>
    </div>
    <div className="grid gap-4 lg:grid-cols-2">
      <section className={panel}><h3 className="font-semibold">Commit Activity</h3><p className="mt-1 text-xs text-slate-400">直近12暦月・デフォルトブランチ・全作者・UTC</p>
        <div className="mt-4 overflow-x-auto"><svg viewBox="0 0 360 150" className="w-full min-w-[300px]" role="img" aria-label="月別コミット数">
          <path d="M8 120H352" stroke="#475569"/>
          {data.monthlyCommits.map((m,i)=>{const h=m.count/max*95;return <g key={m.month}><rect x={10+i*29} y={120-h} width={19} height={h} rx={2} fill="#38bdf8"><title>{`${m.month}: ${m.count} commits`}</title></rect><text x={19+i*29} y={Math.max(12,115-h)} fill="#cbd5e1" textAnchor="middle" fontSize={9}>{String(m.count)}</text><text x={19+i*29} y={137} fill="#94a3b8" textAnchor="middle" fontSize={9}>{m.month.slice(5)}</text></g>;})}
        </svg></div><p className="text-xs text-slate-400">{`${data.monthlyCommits[0]?.month ?? ""} ～ ${data.monthlyCommits.at(-1)?.month ?? ""}`}</p>
      </section>
      <section className={panel}><h3 className="font-semibold">Languages</h3><p className="mt-1 text-xs text-slate-400">GitHub Languages APIのコードバイト数による割合</p>
        {total===0 ? <p className="mt-4 text-sm text-slate-400">言語データがありません。</p> : <div className="mt-4 flex flex-wrap items-center gap-4"><svg viewBox="0 0 120 120" className="w-32 shrink-0" role="img" aria-label="使用言語の割合"><circle cx={60} cy={60} r={43} fill="none" stroke="#334155" strokeWidth={16}/>{languages.map(([name,n],i)=>{const pct=n/total*100;const start=offset;offset+=pct;return <circle key={name} cx={60} cy={60} r={43} fill="none" stroke={palette[i%palette.length]} strokeWidth={16} pathLength={100} strokeDasharray={`${pct} ${100-pct}`} strokeDashoffset={-start} transform="rotate(-90 60 60)"><title>{`${name}: ${pct.toFixed(1)}%`}</title></circle>;})}</svg><div className="min-w-0 flex-1 space-y-2">{languages.map(([name,n],i)=><div key={name} className="flex items-center gap-2 text-sm"><span className="h-3 w-3 shrink-0 rounded-full" style={{backgroundColor:palette[i%palette.length]}}/><span className="break-all">{name}</span><span className="ml-auto tabular-nums text-slate-400">{`${(n/total*100).toFixed(1)}%`}</span></div>)}</div></div>}
      </section>
    </div>
    <section className={panel}><h3 className="font-semibold">Project Progress</h3><p className="mt-1 text-xs text-slate-400">Issue完了率（開発工数の進捗率ではありません）</p>
      <div className="mt-4 space-y-4">{data.projects.length===0 && <p className="text-sm text-slate-400">対象の公開リポジトリがありません。</p>}{data.projects.map(p=><article key={p.name} className="rounded-xl border border-white/10 p-4"><div className="flex flex-wrap justify-between gap-2"><a href={p.url} target="_blank" rel="noopener noreferrer" className="break-all text-sky-400 hover:underline">{p.name}</a><span className="text-sm tabular-nums">{p.issueCompletionPercent===null ? "Issue未登録" : `${p.issueCompletionPercent.toFixed(1)}%`}</span></div>{p.issueCompletionPercent!==null && <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700" role="progressbar" aria-label={`${p.name} Issue完了率`} aria-valuenow={p.issueCompletionPercent} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-sky-400" style={{width:`${p.issueCompletionPercent}%`}}/></div>}<p className="mt-2 text-xs text-slate-400">{`Issue ${p.closedIssues}/${p.openIssues+p.closedIssues} 完了 ・ Star ${p.stars} ・ Fork ${p.forks}`}</p><p className="mt-1 text-xs text-slate-400">{`最終push: ${p.updatedAt ? new Date(p.updatedAt).toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"}) : "なし"}`}</p></article>)}</div>
    </section><p className="text-xs text-slate-500">{`最終取得: ${new Date(data.fetchedAt).toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"})} JST`}</p>
  </section>;
}
