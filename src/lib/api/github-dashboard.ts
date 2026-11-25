import "server-only";
import { apiFetch } from "./client";
import type { GithubDashboard } from "@/types/github-dashboard";
export async function getGithubDashboard() {
  const data = await apiFetch<GithubDashboard>("/github/dashboard", { signal: AbortSignal.timeout(60000) });
  if (!data || !Array.isArray(data.projects) || !Array.isArray(data.monthlyCommits) || !data.languages) throw new Error("Invalid dashboard response");
  return data;
}
