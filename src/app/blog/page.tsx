import type { Metadata } from "next";
import { PageHeading } from "@/components/ui/page-heading";
import { Panel } from "@/components/ui/panel";
export const metadata: Metadata = {title:"Blog"};
export default function Page(){return <><PageHeading title="Blog" description="技術記事"/><Panel><p className="text-slate-400">準備中です。今後コンテンツを追加します。</p></Panel></>;}
