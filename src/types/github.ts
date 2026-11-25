export type ContributionDay = { date: string; count: number; level: string; color: string };
export type ContributionResponse = {
  username: string; totalContributions: number; monthlyContributions: number;
  activeDays: number; currentStreak: number; longestStreak: number;
  weeks: { days: ContributionDay[] }[]; fetchedAt: string;
};
