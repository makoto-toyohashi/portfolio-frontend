import "server-only";
import { apiFetch } from "./client";
import type { ContributionResponse } from "@/types/github";

// Java側で5分間キャッシュするため、Next.js側では二重キャッシュしない。
export async function getContributions(): Promise<ContributionResponse> {
  const data = await apiFetch<ContributionResponse>("/github/contributions");
  if (!data || !Array.isArray(data.weeks) || !data.weeks.length || typeof data.username !== "string") {
    throw new Error("Invalid contribution response");
  }
  return data;
}
