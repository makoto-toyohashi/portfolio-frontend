import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeading } from "@/components/ui/page-heading";
import { Panel } from "@/components/ui/panel";
import { ContributionSection } from "@/components/github/contribution-section";

import { DashboardSection } from "@/components/github/dashboard-section";

export const metadata: Metadata = { title: "Works" };
export const dynamic = "force-dynamic";
export default function Page() {
  return <><PageHeading title="Works" description="制作実績・個人開発"/><div className="space-y-6"><Suspense fallback={<Panel><p className="text-slate-400">GitHubの開発活動を取得しています...</p></Panel>}><ContributionSection/></Suspense><Suspense fallback={<Panel><p className="text-slate-400">GitHub統計を取得しています...</p></Panel>}><DashboardSection/></Suspense><Panel><p className="text-slate-400">制作実績は今後追加します。</p></Panel></div></>;
}
