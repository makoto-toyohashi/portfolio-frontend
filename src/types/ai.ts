export type Turn = { role: "user" | "assistant"; content: string };
export type ChatResponse = { answer: string; sources: string[] };
export type Period = "weekly" | "monthly";
export type Report = {
  period: Period;
  from: string;
  to: string;
  projects: {
    name: string;
    commits: number;
    closedIssues: number;
    mergedPullRequests: number;
    samples: string[];
  }[];
  analysis: string;
};
