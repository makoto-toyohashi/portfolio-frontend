export type DashboardProject = {
  name: string; url: string; updatedAt: string; stars: number; forks: number;
  openIssues: number; closedIssues: number; openPullRequests: number; closedPullRequests: number;
  issueCompletionPercent: number | null;
};
export type GithubDashboard = {
  repositories: number; stars: number; forks: number; openIssues: number; closedIssues: number;
  openPullRequests: number; closedPullRequests: number; languages: Record<string, number>;
  monthlyCommits: { month: string; count: number }[]; projects: DashboardProject[]; fetchedAt: string;
};
