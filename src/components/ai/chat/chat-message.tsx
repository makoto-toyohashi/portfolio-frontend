import type { Message } from "@/hooks/use-ai-chat";

export function ChatMessage({ message }: { message: Message }) {
  const user = message.role === "user";
  return (
    <article className={`rounded-2xl p-4 ${user ? "ml-8 bg-sky-950" : "mr-8 bg-slate-800"}`}>
      <p className="mb-2 text-xs font-semibold text-sky-300">
        {user ? "You" : "Portfolio AI"}
      </p>
      <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-100">
        {message.content}
      </p>
      {!!message.sources?.length && (
        <div className="mt-3 border-t border-white/10 pt-3 text-xs text-slate-400">
          検索された資料：{message.sources.join("、")}
        </div>
      )}
    </article>
  );
}
