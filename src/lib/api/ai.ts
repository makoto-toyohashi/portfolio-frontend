import type { ChatResponse, Report, Period, Turn } from "@/types/ai";

async function post<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(`/api/ai/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message ?? "通信に失敗しました。");
  return data as T;
}

export function sendChat(message: string, history: Turn[]) {
  return post<ChatResponse>("chat", { message, history });
}

export function getReport(period: Period) {
  return post<Report>(`analysis/${period}`);
}
