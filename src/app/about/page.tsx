
import type { Metadata } from "next";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import { PageHeading } from "@/components/ui/page-heading";
import { Panel } from "@/components/ui/panel";

export const metadata: Metadata = {
  title: "About",
  description: "プロフィール・職務経歴・技術スタック",
};

// プロフィール情報
const profile = {
  name: "豊橋 真",
  role: "Full Stack Engineer",
  description:
    "要件定義から設計、開発、運用まで。\n技術とコミュニケーションを通じて、ビジネスの課題を解決します。",
  github: "https://github.com/makoto-toyohashi",
};

// プロフィール概要
const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "Full Stack", label: "Development" },
  { value: "Japan", label: "Location" },
];

// 技術スタック
const skills = [
  {
    category: "Frontend",
    items: ["TypeScript", "JavaScript", "Angular.js", "Next.js", "HTML", "CSS"],
  },
  {
    category: "Backend",
    items: ["Java", "PHP", "C#", "ASP.NET","Phalcon", "Laravel", "Spring boot", "Node.js", "Swift", "Kotlin"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MySQL", "SQL"],
  },
  {
    category: "Infrastructure",
    items: ["AWS", "Docker", "Git", "GitHub"],
  },
  {
    category: "Authentication",
    items: ["Auth0", "OAuth 2.0", "OpenID Connect", "SSO"],
  },
  {
    category: "Game Development",
    items: ["Unity", "C#", "UdonSharp"],
  },
];

// 職務経歴
const careers = [
  {
    id: "authentication",
    period: "2026.01 - Present",
    duration: "参画中",
    title: "認証基盤リプレイス",
    role: "システムエンジニア",
    team: "開発5名 / 全体約10名",
    current: true,
    description:
      "既存のフルスクラッチで構築された認証基盤を、Auth0へ移行するための要件定義および技術検証を担当。",
    responsibilities: [
      "顧客からのQAに対する技術調査・実装検証・回答案作成",
      "公式ドキュメントの調査および業務フローの整理",
      "認証機能の実装案内書作成",
      "プロトタイプ環境の設計・構築",
      "既存認証基盤からの移行方式の検討",
      "アカウントロック等の認証仕様の調査",
      "顧客との打ち合わせ・仕様調整",
    ],
    technologies: [
      "Auth0",
      "Java 8",
      "Java 17",
      "PHP",
      "ASP.NET (C#)",
      "Kotlin",
      "Swift",
      "Angular.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "AWS EC2",
      "AWS RDS",
      "AWS SES",
      "AWS CodeCommit",
      "Docker",
      "GitLab",
    ],
    phases: ["要件定義"],
    achievement:
      "複数の言語・フレームワークを対象とした認証基盤の移行に向け、技術調査からプロトタイプ構築、実装案内書の作成まで担当。",
  },
  {
    id: "crm",
    period: "2025.05 - 2025.11",
    duration: "7ヶ月",
    title: "金融機関向けCRM更改",
    role: "フロントエンドエンジニア",
    team: "開発5〜10名 / 全体約20名",
    current: false,
    description:
      "金融機関向け顧客管理システムのフロントエンド開発。APIレスポンスを想定したモックデータの作成から画面実装まで担当。",
    responsibilities: [
      "Figmaおよび受け入れ基準に基づくUI開発",
      "APIレスポンスを想定したモックデータ作成",
      "Reactコンポーネントの設計・実装",
      "デザイナーとの仕様調整・改善提案",
      "コードレビュー",
      "バグ調査および改修対応",
      "アジャイル開発・モブプログラミング",
    ],
    technologies: [
      "TypeScript",
      "React",
      "React Router 7",
      "MUI",
      "PostgreSQL",
      "Node.js",
      "Docker",
      "Figma",
      "Windows",
    ],
    phases: ["詳細設計", "実装・単体"],
    achievement:
      "アジャイル開発やモブプログラミングを通じて、チーム全体で品質を高めながらフロントエンド開発を推進。",
  },
  {
    id: "game-engine",
    period: "2023.05 - 2025.03",
    duration: "23ヶ月",
    title: "ゲームエンジン・ソーシャルゲーム開発",
    role: "バックエンドエンジニア / コードレビュアー",
    team: "開発25名 / 全体100名",
    current: false,
    description:
      "既存ソーシャルゲームおよび自社ゲームエンジンを利用した新規タイトルの開発。運営チームとの仕様調整やシステム設計、コードレビューを担当。",
    responsibilities: [
      "新規機能要望・不具合報告の調査",
      "対応方針の策定およびタスク化",
      "運営チームとの仕様調整",
      "画面設計・データベース設計",
      "状態遷移図・シーケンス図・クラス図・ER図の作成",
      "7機能の設計・実装・単体テスト",
      "コードレビューおよび開発メンバーからの質問対応",
      "バグ調査および改修対応",
    ],
    technologies: [
      "PHP 7",
      "Phalcon 3",
      "MySQL",
      "Nginx",
      "AWS EC2",
      "macOS",
    ],
    phases: [
      "調査分析",
      "要件定義",
      "基本設計",
      "詳細設計",
      "実装・単体",
    ],
    achievement:
      "数十万人規模のユーザーを抱えるタイトルの開発を通じ、インデックス設計、キャッシュ管理、DBアクセス最適化などの実践的な知見を習得。",
  },
  {
    id: "inquiry-system",
    period: "2021.03 - 2023.04",
    duration: "26ヶ月",
    title: "店舗・業務間問い合わせシステム",
    role: "テックリーダー / リードエンジニア",
    team: "開発10名 / 全体70名",
    current: false,
    description:
      "店舗と本部業務部門間のコミュニケーションを支援するWebアプリケーションの改善・保守開発。検索機能やチャット形式の問い合わせ管理機能を備えたシステム。",
    responsibilities: [
      "開発チーム10名規模の技術リード",
      "エンドユーザーとの打ち合わせ・仕様ヒアリング",
      "機能一覧・画面構成・工数見積もりの作成",
      "クラス図・シーケンス図・ER図等の設計資料作成",
      "プロジェクトマネージャーと連携したタスク分割",
      "開発メンバーからの質疑対応",
      "コードレビュー・マージ・テスト仕様書レビュー",
      "9機能の設計・実装・単体テスト・結合テスト",
      "リリース手順書の作成およびリリース作業",
      "不具合調査・改修・サーバー脆弱性対応",
    ],
    technologies: [
      "Java 8",
      "JavaScript",
      "Spring",
      "MySQL",
      "Apache",
      "Tomcat",
      "Solr",
      "Linux",
      "Windows",
      "オンプレミス",
    ],
    phases: [
      "調査分析",
      "要件定義",
      "基本設計",
      "詳細設計",
      "実装・単体",
      "テスト",
      "保守・運用",
    ],
    achievement:
      "入社2年目からテックリーダーを担当。顧客折衝、チームマネジメント、品質管理、設計・開発からリリースまで一貫して経験。",
  },
];


// 対応可能な業務
const services = [
  {
    number: "01",
    title: "Webアプリケーション開発",
    description:
      "業務システムやWebサービスの新規開発・既存システムの改修に対応します。フロントエンドからバックエンドまで、一貫した開発が可能です。",
  },
  {
    number: "02",
    title: "システム設計・要件定義",
    description:
      "業務課題やご要望を整理し、システムの仕様策定、機能設計、画面設計、技術選定、工数見積もりを行います。",
  },
  {
    number: "03",
    title: "API開発・外部システム連携",
    description:
      "REST APIの設計・開発、外部サービスとの連携、既存システム間のデータ連携を行います。",
  },
  {
    number: "04",
    title: "データベース設計・最適化",
    description:
      "データベースの設計、SQLの改善、インデックス設計など、データ処理の効率化やパフォーマンス改善を支援します。",
  },
  {
    number: "05",
    title: "認証基盤・セキュリティ",
    description:
      "Auth0を活用した認証基盤の導入・移行検討、SSO、認証・認可の設計、技術検証を支援します。",
  },
  {
    number: "06",
    title: "業務効率化・自動化",
    description:
      "定型業務、データ集計、情報転記、システム間のデータ連携など、手作業を削減するためのツールを開発します。",
  },
  {
    number: "07",
    title: "既存システムの改修・保守",
    description:
      "既存システムのソースコード調査、不具合の原因分析、機能追加、リファクタリング、保守運用に対応します。",
  },
  {
    number: "08",
    title: "技術調査・プロトタイプ開発",
    description:
      "新規サービスや技術の導入に向けた実現性調査、技術検証、PoC、プロトタイプ環境の構築を行います。",
  },
  {
    number: "09",
    title: "クラウド・開発環境構築",
    description:
      "AWSやDockerを活用した開発環境の構築、アプリケーションの公開、デプロイ環境の整備を支援します。",
  },
  {
    number: "10",
    title: "開発支援・テクニカルリード",
    description:
      "設計レビュー、コードレビュー、技術相談、タスク分割、開発メンバーのサポートなど、開発チームの品質向上を支援します。",
  },
];

export default function Page() {
  return (
    <div className="space-y-12">

      {/* ページ見出し */}
      <PageHeading
        title="About"
        description="プロフィール・職務経歴"
      />

      {/* プロフィール */}
      <Panel>
        <div className="space-y-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row">

            {/* プロフィールアイコン */}
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">
              <span className="font-mono text-3xl font-bold text-blue-400">
                {"</>"}
              </span>
            </div>

            {/* プロフィール情報 */}
            <div className="space-y-2 text-center sm:text-left">
              <p className="text-xs font-semibold tracking-widest text-blue-400">
                SOFTWARE ENGINEER
              </p>

              <h2 className="text-3xl font-bold text-white">
                {profile.name}
              </h2>

              <p className="text-slate-400">
                {profile.role}
              </p>

              {/* SNS・外部リンク */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2 sm:justify-start">
                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-blue-500 hover:bg-slate-700 hover:text-white"
                    >
                        <FaGithub size={20} />
                        <span>GitHub</span>
                        <ExternalLink size={14} />
                    </a>
                </div>

              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                <span className="text-sm text-green-400">
                  Available for work
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800" />

          <p className="whitespace-pre-lineleading-8 text-slate-300">
            {profile.description}
          </p>

          {/* プロフィール概要 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-800 bg-slate-950/50 p-5 text-center"
              >
                <p className="text-2xl font-bold text-blue-400">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* 技術スタック */}
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-white">
            技術スタック
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            使用技術・開発環境
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {skills.map((skill) => (
            <div
              key={skill.category}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 transition-colors hover:border-blue-500/50"
            >
              <h3 className="mb-4 font-semibold text-blue-400">
                {skill.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 職務経歴 */}
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-white">
            職務経歴
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            これまでの業務経験
          </p>
        </div>

        <Panel>
          <div className="space-y-10">
            {careers.map((career) => (
              <div
                key={career.title}
                className="relative ml-2 border-l border-slate-700 pl-7"
              >
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-blue-400 ring-4 ring-blue-500/10" />

                <h3 className="text-lg font-semibold text-white">
                  {career.title}
                </h3>

                <p className="mt-1 text-sm text-blue-400">
                  {career.role}
                </p>

                <p className="mt-4 leading-7 text-slate-400">
                  {career.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {career.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      {/* 対応可能な業務 */}
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-white">
            対応可能な業務
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            対応可能な業務
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.number}
              className="group rounded-xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50"
            >
              <p className="font-mono text-2xl font-bold text-blue-400/60">
                {service.number}
              </p>

              <h3 className="mt-4 text-lg font-semibold text-white">
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* お問い合わせ */}
      <section className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/60 to-slate-900 p-8 text-center sm:p-12">
        <p className="text-xs font-semibold tracking-widest text-blue-400">
          CONTACT
        </p>

        <h2 className="mt-4 text-3xl font-bold text-white">
          Let&apos;s Work Together.
        </h2>

        <p className="mt-4 text-slate-400">
          開発のご相談・お仕事のご依頼をお待ちしております。
          ※現在、新規案件は受け付けておりません。
        </p>

        <Link
          href="/contact"
          className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-500"
        >
          お問い合わせ →
        </Link>
      </section>

    </div>
  );
}
