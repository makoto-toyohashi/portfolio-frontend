"use client";

import { useRef, useState } from "react";
import { sendChat } from "@/lib/api/ai";
import type { Turn } from "@/types/ai";

export type Message = Turn & { sources?: string[] };

export function useAiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const lock = useRef(false);

  async function send(input: string) {
    const message = input.trim();
    if (!message || message.length > 1000 || lock.current) return;
    lock.current = true;
    setPending(true);
    setError("");
    // Java側の履歴上限に合わせる。失敗した質問は履歴に追加しない。
    const history = messages.slice(-6).map(({ role, content }) => ({
      role, content: content.slice(0, 1000),
    }));
    try {
      const result = await sendChat(message, history);
      setMessages(previous => [...previous,
        { role: "user", content: message },
        { role: "assistant", content: result.answer, sources: result.sources },
      ]);
      return true;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "通信に失敗しました。");
      return false;
    } finally {
      lock.current = false;
      setPending(false);
    }
  }

  function clear() {
    if (!lock.current) {
      setMessages([]);
      setError("");
    }
  }

  return { messages, pending, error, send, clear };
}
