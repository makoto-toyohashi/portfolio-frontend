import { auth0 } from "@/lib/auth0";
import { ChatPanel } from "@/components/ai/chat/chat-panel";
import { AnalysisPanel } from "@/components/ai/analysis/analysis-panel";

export default async function AssistantPage() {
  const session = await auth0.getSession();

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-10 text-slate-100">
      <header>
        <h1 className="text-3xl font-bold">AI Assistant</h1>
        <p className="mt-2 text-slate-400">Gemini × RAG × GitHub</p>
      </header>
      {session ? (
        <>
          <ChatPanel />
          <AnalysisPanel />
        </>
      ) : (
        <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
          <p className="mb-4 text-sm">AI機能を利用するにはログインが必要です。</p>
          <a href="/auth/login?returnTo=%2Fassistant" className="text-sky-400 hover:underline">ログインする</a>
        </section>
      )}
    </main>
  );
}
