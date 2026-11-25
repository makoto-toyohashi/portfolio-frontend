"use client";

import { useState } from "react";
import { useAiChat } from "@/hooks/use-ai-chat";
import { ChatMessage } from "./chat-message";

const QUESTIONS = [
  "どのような開発経験がありますか？",
  "このサイトの使用技術は？",
  "どのような制作物がありますか？",
];

export function ChatPanel() {
  const [input, setInput] = useState("");
  const { messages, pending, error, send, clear } = useAiChat();

  return (
    <section className="space-y-5 rounded-2xl border border-white/10 bg-slate-900 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Portfolio AI Assistant</h2>
        <button type="button" disabled={pending} onClick={clear}
          className="text-sm text-slate-400 hover:text-white disabled:opacity-50">
          履歴をクリア
        </button>
      </div>
      <p className="text-sm text-slate-400">公開資料をもとに回答します。個人情報は入力しないでください。</p>
      <div className="flex flex-wrap gap-2">
        {QUESTIONS.map(question => (
          <button key={question} type="button" disabled={pending}
            onClick={() => setInput(question)}
            className="rounded-full border border-sky-800 px-3 py-2 text-xs text-sky-300 disabled:opacity-50">
            {question}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="max-h-[480px] space-y-3 overflow-y-auto">
        {messages.length === 0 && <p className="text-sm text-slate-400">質問を入力して会話を始めてください。</p>}
        {messages.map((message, index) => <ChatMessage key={index} message={message} />)}
        {pending && <p className="animate-pulse text-sm text-sky-300">資料を検索し、回答を生成しています…</p>}
      </div>
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      <form className="space-y-2" onSubmit={async event => {
        event.preventDefault();
        if (await send(input)) setInput("");
      }}>
        <textarea aria-label="質問" value={input} maxLength={1000} disabled={pending}
          onChange={event => setInput(event.target.value)} rows={3}
          placeholder="質問を入力してください"
          className="w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-sm text-white" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">{input.length}/1000</span>
          <button disabled={pending || !input.trim()}
            className="rounded-xl bg-sky-600 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50">
            {pending ? "生成中…" : "送信"}
          </button>
        </div>
      </form>
    </section>
  );
}
