"use client";
export default function ErrorPage({reset}:{error:Error & {digest?:string};reset:()=>void}){return <div role="alert"><h2 className="text-2xl font-bold">エラーが発生しました</h2><button onClick={reset} className="mt-5 rounded-lg bg-sky-400 px-4 py-2 text-slate-950">再試行</button></div>;}
