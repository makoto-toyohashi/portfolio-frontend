
import type { Metadata } from "next";
import Link from "next/link";

import { PageHeading } from "@/components/ui/page-heading";

import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Monitor,
  Server,
  Database,
  Cloud,
  ShieldCheck,
  GitBranch,
  Layers,
  Users,
  Workflow,
  FileText,
  CheckCircle2,
  Search,
  ClipboardList,
  Rocket,
  Settings,
  Network,
  Terminal,
  GitPullRequest,
} from "lucide-react";

import {
  FaJava,
  FaPhp,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaAws,
  FaDocker,
  FaGithub,
  FaGitAlt,
  FaLinux,
  FaNodeJs,
  FaSwift,
  FaAngular,
} from "react-icons/fa";

import {
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiSpringboot,
  SiLaravel,
  SiMysql,
  SiPostgresql,
  SiAuth0,
  SiKotlin,
  SiNginx,
  SiApachetomcat,
  SiGitlab,
  SiFigma,
  SiMui,
} from "react-icons/si";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "技術スタック・開発経験・システム設計・エンジニアリングスキル",
};

// ========================================
// 技術スタック
// ========================================

const skillCategories = [
  {
    number: "01",
    title: "Programming Languages",
    subtitle: "プログラミング言語",
    description:
      "Webシステム開発を中心に、複数のプログラミング言語を使用した開発・技術検証に対応します。",
    icon: Code2,
    skills: [
      {
        name: "Java",
        icon: FaJava,
        color: "#f89820",
        usage: "業務システム・バックエンド",
      },
      {
        name: "PHP",
        icon: FaPhp,
        color: "#a5b4fc",
        usage: "Web・ゲームサーバー",
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        color: "#3178c6",
        usage: "Webフロントエンド",
      },
      {
        name: "JavaScript",
        icon: SiJavascript,
        color: "#f7df1e",
        usage: "Webアプリケーション",
      },
      {
        name: "C#",
        icon: Code2,
        color: "#a78bfa",
        usage: "ASP.NET・Unity",
      },
      {
        name: "Kotlin",
        icon: SiKotlin,
        color: "#a78bfa",
        usage: "Android・技術検証",
      },
      {
        name: "Swift",
        icon: FaSwift,
        color: "#f05138",
        usage: "iOS・技術検証",
      },
    ],
  },
  {
    number: "02",
    title: "Frontend Development",
    subtitle: "フロントエンド開発",
    description:
      "ユーザーインターフェースの設計・実装、コンポーネント開発、API連携に対応します。",
    icon: Monitor,
    skills: [
      {
        name: "React",
        icon: FaReact,
        color: "#61dafb",
        usage: "コンポーネント開発",
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        color: "#ffffff",
        usage: "Webアプリケーション",
      },
      {
        name: "AngularJS",
        icon: FaAngular,
        color: "#dd0031",
        usage: "Webフロントエンド",
      },
      {
        name: "MUI",
        icon: SiMui,
        color: "#007fff",
        usage: "UIコンポーネント",
      },
      {
        name: "React Router",
        icon: Network,
        color: "#f87171",
        usage: "画面遷移・ルーティング",
      },
      {
        name: "HTML",
        icon: FaHtml5,
        color: "#e34f26",
        usage: "マークアップ",
      },
      {
        name: "CSS",
        icon: FaCss3Alt,
        color: "#60a5fa",
        usage: "スタイリング",
      },
      {
        name: "Tailwind CSS",
        icon: Layers,
        color: "#38bdf8",
        usage: "UIスタイリング",
      },
    ],
  },
  {
    number: "03",
    title: "Backend Development",
    subtitle: "バックエンド開発",
    description:
      "業務ロジック、REST API、データベース連携など、サーバーサイドの設計・開発を行います。",
    icon: Server,
    skills: [
      {
        name: "Spring Boot",
        icon: SiSpringboot,
        color: "#6db33f",
        usage: "Java Web開発",
      },
      {
        name: "Laravel",
        icon: SiLaravel,
        color: "#ff2d20",
        usage: "PHP Web開発",
      },
      {
        name: "Phalcon",
        icon: FaPhp,
        color: "#a5b4fc",
        usage: "ゲームサーバー開発",
      },
      {
        name: "ASP.NET",
        icon: Code2,
        color: "#a78bfa",
        usage: "Web開発・技術検証",
      },
      {
        name: "Node.js",
        icon: FaNodeJs,
        color: "#83cd29",
        usage: "サーバーサイド開発",
      },
      {
        name: "REST API",
        icon: Network,
        color: "#38bdf8",
        usage: "API設計・システム連携",
      },
    ],
  },
  {
    number: "04",
    title: "Database & Search",
    subtitle: "データベース・検索基盤",
    description:
      "テーブル設計、SQL開発、インデックス設計、データアクセスの最適化に対応します。",
    icon: Database,
    skills: [
      {
        name: "MySQL",
        icon: SiMysql,
        color: "#38bdf8",
        usage: "DB設計・データ管理",
      },
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        color: "#699eca",
        usage: "リレーショナルDB",
      },
      {
        name: "SQL",
        icon: Database,
        color: "#fbbf24",
        usage: "クエリ・データ処理",
      },
      {
        name: "Apache Solr",
        icon: Search,
        color: "#f97316",
        usage: "全文検索・形態素解析",
      },
    ],
  },
  {
    number: "05",
    title: "Cloud & Infrastructure",
    subtitle: "クラウド・インフラストラクチャ",
    description:
      "クラウドサービスやコンテナを活用した開発環境、サーバー環境の構築・運用に対応します。",
    icon: Cloud,
    skills: [
      {
        name: "AWS",
        icon: FaAws,
        color: "#ff9900",
        usage: "クラウド環境",
      },
      {
        name: "Amazon EC2",
        icon: Server,
        color: "#ff9900",
        usage: "仮想サーバー",
      },
      {
        name: "Amazon RDS",
        icon: Database,
        color: "#a78bfa",
        usage: "マネージドDB",
      },
      {
        name: "Amazon SES",
        icon: Cloud,
        color: "#ff9900",
        usage: "メール配信",
      },
      {
        name: "Docker",
        icon: FaDocker,
        color: "#2496ed",
        usage: "コンテナ・開発環境",
      },
      {
        name: "Linux",
        icon: FaLinux,
        color: "#fbbf24",
        usage: "サーバー環境",
      },
      {
        name: "Nginx",
        icon: SiNginx,
        color: "#009639",
        usage: "Webサーバー",
      },
      {
        name: "Apache Tomcat",
        icon: SiApachetomcat,
        color: "#f8dc75",
        usage: "Java実行環境",
      },
    ],
  },
  {
    number: "06",
    title: "Authentication & Security",
    subtitle: "認証基盤・セキュリティ",
    description:
      "認証基盤の移行検討、認証・認可の設計、各種認証方式の技術調査・実装検証を行います。",
    icon: ShieldCheck,
    skills: [
      {
        name: "Auth0",
        icon: SiAuth0,
        color: "#eb5424",
        usage: "認証基盤・技術検証",
      },
      {
        name: "OAuth 2.0",
        icon: ShieldCheck,
        color: "#38bdf8",
        usage: "認可フロー",
      },
      {
        name: "OpenID Connect",
        icon: ShieldCheck,
        color: "#fb923c",
        usage: "ユーザー認証",
      },
      {
        name: "SSO",
        icon: Network,
        color: "#34d399",
        usage: "シングルサインオン",
      },
      {
        name: "JWT",
        icon: FileText,
        color: "#c084fc",
        usage: "トークンベースの認証",
      },
      {
        name: "M2M",
        icon: Server,
        color: "#60a5fa",
        usage: "システム間認証",
      },
    ],
  },
  {
    number: "07",
    title: "Development Tools",
    subtitle: "開発ツール・バージョン管理",
    description:
      "ソースコード管理、コードレビュー、チーム開発、UI設計などの開発業務に使用するツールです。",
    icon: GitBranch,
    skills: [
      {
        name: "Git",
        icon: FaGitAlt,
        color: "#f05032",
        usage: "バージョン管理",
      },
      {
        name: "GitHub",
        icon: FaGithub,
        color: "#ffffff",
        usage: "リポジトリ管理",
      },
      {
        name: "GitLab",
        icon: SiGitlab,
        color: "#fc6d26",
        usage: "チーム開発",
      },
      {
        name: "AWS CodeCommit",
        icon: GitBranch,
        color: "#ff9900",
        usage: "ソースコード管理",
      },
      {
        name: "Figma",
        icon: SiFigma,
        color: "#a78bfa",
        usage: "UI設計・仕様確認",
      },
      {
        name: "VS Code",
        icon: Terminal,
        color: "#38bdf8",
        usage: "開発環境",
      },
    ],
  },
];

// ========================================
// 開発工程
// ========================================

const developmentPhases = [
  {
    number: "01",
    title: "Research & Analysis",
    subtitle: "調査・分析",
    icon: Search,
    description:
      "既存システムの調査、課題分析、技術調査、実現性の検証。",
    tasks: [
      "既存システム調査",
      "技術調査",
      "不具合原因分析",
      "実現性検証",
    ],
  },
  {
    number: "02",
    title: "Requirements",
    subtitle: "要件定義",
    icon: ClipboardList,
    description:
      "顧客の要望や業務課題を整理し、システムに必要な機能・仕様を明確化。",
    tasks: [
      "顧客ヒアリング",
      "仕様策定",
      "機能一覧作成",
      "工数見積もり",
    ],
  },
  {
    number: "03",
    title: "Basic Design",
    subtitle: "基本設計",
    icon: Layers,
    description:
      "システム全体の構成、画面構成、機能間の連携方法を設計。",
    tasks: [
      "システム構成設計",
      "画面設計",
      "機能設計",
      "データ設計",
    ],
  },
  {
    number: "04",
    title: "Detailed Design",
    subtitle: "詳細設計",
    icon: FileText,
    description:
      "実装に必要な処理仕様、データ構造、クラス構成などを具体化。",
    tasks: [
      "クラス図",
      "シーケンス図",
      "ER図",
      "状態遷移図",
    ],
  },
  {
    number: "05",
    title: "Implementation",
    subtitle: "実装・単体テスト",
    icon: Code2,
    description:
      "設計内容に基づく実装、単体テスト、コードレビューを実施。",
    tasks: [
      "コーディング",
      "単体テスト",
      "コードレビュー",
      "リファクタリング",
    ],
  },
  {
    number: "06",
    title: "Integration Testing",
    subtitle: "結合テスト",
    icon: CheckCircle2,
    description:
      "機能間の連携やシステム全体の動作を確認し、品質を担保。",
    tasks: [
      "テスト仕様書作成",
      "結合テスト",
      "不具合調査",
      "改修対応",
    ],
  },
  {
    number: "07",
    title: "Release",
    subtitle: "リリース",
    icon: Rocket,
    description:
      "リリース手順の整理、アプリケーションのデプロイ、リリース作業。",
    tasks: [
      "リリース手順書",
      "デプロイ",
      "リリース作業",
      "動作確認",
    ],
  },
  {
    number: "08",
    title: "Maintenance",
    subtitle: "保守・運用",
    icon: Settings,
    description:
      "既存システムの機能改善、不具合対応、継続的な品質向上。",
    tasks: [
      "障害・不具合調査",
      "機能改善",
      "脆弱性対応",
      "保守開発",
    ],
  },
];

// ========================================
// エンジニアリングスキル
// ========================================

const engineeringSkills = [
  {
    title: "System Architecture",
    subtitle: "システム設計",
    icon: Layers,
    description:
      "システム全体の構成や機能間の関係を整理し、保守性・拡張性を考慮した設計を行います。",
    items: [
      "システム構成設計",
      "機能分割・責務分離",
      "クラス設計",
      "画面・処理設計",
    ],
  },
  {
    title: "API Engineering",
    subtitle: "API設計・開発",
    icon: Network,
    description:
      "アプリケーション間のデータ連携や外部サービスとの接続に必要なAPIを設計・開発します。",
    items: [
      "REST API設計",
      "リクエスト・レスポンス設計",
      "外部API連携",
      "エラーハンドリング",
    ],
  },
  {
    title: "Database Engineering",
    subtitle: "データベース設計・最適化",
    icon: Database,
    description:
      "データの整合性や処理性能を考慮したデータベース設計・データアクセスの改善を行います。",
    items: [
      "テーブル設計",
      "ER図作成",
      "インデックス設計",
      "SQL・DBアクセス最適化",
    ],
  },
  {
    title: "Authentication",
    subtitle: "認証・認可設計",
    icon: ShieldCheck,
    description:
      "認証基盤の導入・移行に向けた仕様調査、認証フローの設計、技術検証を行います。",
    items: [
      "Auth0技術検証",
      "認証・認可フロー設計",
      "SSO",
      "既存認証基盤の移行検討",
    ],
  },
  {
    title: "Quality Engineering",
    subtitle: "品質管理・レビュー",
    icon: GitPullRequest,
    description:
      "設計・実装・テストのレビューを通じて、不具合の予防と開発品質の向上を支援します。",
    items: [
      "設計レビュー",
      "コードレビュー",
      "テスト仕様書レビュー",
      "不具合原因分析",
    ],
  },
  {
    title: "Technical Leadership",
    subtitle: "テクニカルリード",
    icon: Users,
    description:
      "顧客と開発チームの橋渡しを行い、技術的な課題解決と開発チームの進行を支援します。",
    items: [
      "顧客折衝・仕様調整",
      "タスク分割",
      "開発メンバーの技術支援",
      "技術課題の整理",
    ],
  },
  {
    title: "Performance Engineering",
    subtitle: "パフォーマンス改善",
    icon: Settings,
    description:
      "大規模サービスの開発経験を通じて得た知見を活用し、システムの処理効率を考慮します。",
    items: [
      "SQLパフォーマンス",
      "インデックス最適化",
      "キャッシュ活用",
      "DBアクセスの効率化",
    ],
  },
  {
    title: "Agile Development",
    subtitle: "アジャイル・チーム開発",
    icon: Workflow,
    description:
      "チーム内での情報共有や継続的な改善を重視し、協調的な開発を行います。",
    items: [
      "アジャイル開発",
      "モブプログラミング",
      "チーム内レビュー",
      "デザイナーとの仕様調整",
    ],
  },
];

// ========================================
// 作成可能な設計資料
// ========================================

const documentCategories = [
  {
    title: "Requirements & Planning",
    subtitle: "要件定義・企画",
    documents: [
      "機能一覧",
      "業務フロー",
      "工数見積書",
    ],
  },
  {
    title: "System Design",
    subtitle: "システム設計",
    documents: [
      "画面設計書",
      "画面遷移図",
      "クラス図",
      "シーケンス図",
      "ER図",
      "状態遷移図",
    ],
  },
  {
    title: "Quality & Operation",
    subtitle: "品質管理・運用",
    documents: [
      "テスト仕様書",
      "リリース手順書",
      "実装案内書",
    ],
  },
];

// ========================================
// 共通スタイル
// ========================================

const cardStyle =
  "group relative overflow-hidden rounded-2xl " +
  "border border-slate-800 bg-slate-900/40 " +
  "transition-all duration-300 " +
  "hover:border-sky-500/40 " +
  "hover:shadow-[0_0_30px_rgba(56,189,248,0.05)]";

// ========================================
// 共通セクション見出し
// ========================================

function SectionHeading({
  number,
  label,
  title,
  description,
}: {
  number: string;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10">

      <div className="flex items-center gap-3">

        <span className="font-mono text-xs text-sky-400">
          {number}
        </span>

        <span className="h-px w-8 bg-sky-400/50" />

        <span className="font-mono text-xs tracking-[0.2em] text-sky-400">
          {label}
        </span>

      </div>

      <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-400">
        {description}
      </p>

    </div>
  );
}

// ========================================
// Skillsページ
// ========================================

export default function Page() {
  return (
    <div className="space-y-24 pb-16">

      {/* ==================================
          ページ見出し
      ================================== */}

      <section className="relative isolate overflow-hidden py-8 sm:py-12">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 -z-10 h-64 w-64 rounded-full bg-sky-500/10 blur-[100px]"
        />

        <p className="mb-4 font-mono text-xs tracking-[0.2em] text-sky-400">
          TECHNICAL EXPERTISE
        </p>

        <PageHeading
          title="Skills"
          description="技術スタック・開発経験・専門領域"
        />

        <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-400 sm:text-base">
          フロントエンドからバックエンド、データベース、
          認証基盤、クラウド環境まで。
          さまざまな技術を組み合わせ、
          システム全体を見据えた開発に取り組んでいます。
        </p>

        {/* ページ内ナビゲーション */}
        <div className="mt-8 flex flex-wrap gap-3">

          {[
            { title: "Technology", href: "#technology" },
            { title: "Development", href: "#development" },
            { title: "Engineering", href: "#engineering" },
            { title: "Documentation", href: "#documentation" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-xs text-slate-300 transition-colors hover:border-sky-400 hover:text-sky-400"
            >
              {item.title}
              <ArrowUpRight size={13} />
            </a>
          ))}

        </div>

      </section>

      {/* ==================================
          スキル概要
      ================================== */}

      <section className="grid gap-4 sm:grid-cols-3">

        {[
          {
            value: "5+",
            label: "YEARS EXPERIENCE",
            description: "システム開発の実務経験",
            icon: Terminal,
          },
          {
            value: "Full Stack",
            label: "DEVELOPMENT",
            description: "フロントエンド・バックエンド",
            icon: Code2,
          },
          {
            value: "All Phases",
            label: "ENGINEERING",
            description: "要件定義から保守運用まで",
            icon: Layers,
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className={`${cardStyle} p-7`}
            >

              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />

              <Icon
                size={24}
                strokeWidth={1.5}
                className="text-sky-400"
              />

              <p className="mt-6 text-3xl font-bold tracking-tight text-white">
                {stat.value}
              </p>

              <p className="mt-3 font-mono text-[10px] tracking-widest text-sky-400">
                {stat.label}
              </p>

              <p className="mt-3 text-xs leading-6 text-slate-400">
                {stat.description}
              </p>

            </div>
          );
        })}

      </section>

      {/* ==================================
          技術スタック
      ================================== */}

      <section
        id="technology"
        className="scroll-mt-28"
      >

        <SectionHeading
          number="01"
          label="TECHNOLOGY STACK"
          title="Technologies."
          description="実務経験、個人開発、技術検証を通じて使用しているプログラミング言語・フレームワーク・開発環境です。"
        />

        <div className="space-y-6">

          {skillCategories.map((category) => {
            const CategoryIcon = category.icon;

            return (
              <article
                key={category.number}
                className={`${cardStyle} p-6 sm:p-8`}
              >

                {/* カテゴリ番号 */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-6 top-0 font-mono text-8xl font-bold text-slate-800/30"
                >
                  {category.number}
                </span>

                <div className="relative">

                  {/* カテゴリ見出し */}
                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10">

                      <CategoryIcon
                        size={24}
                        strokeWidth={1.5}
                        className="text-sky-400"
                      />

                    </div>

                    <div>

                      <h3 className="text-lg font-bold text-white sm:text-xl">
                        {category.title}
                      </h3>

                      <p className="mt-1 text-xs text-sky-400">
                        {category.subtitle}
                      </p>

                    </div>

                  </div>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400">
                    {category.description}
                  </p>

                  {/* 技術カード */}
                  <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">

                    {category.skills.map((skill) => {
                      const SkillIcon = skill.icon;

                      return (
                        <div
                          key={skill.name}
                          className="group/skill flex min-h-36 flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40 hover:bg-slate-800/50"
                        >

                          <SkillIcon
                            size={36}
                            style={{ color: skill.color }}
                            className="transition-transform duration-300 group-hover/skill:scale-110"
                          />

                          <h4 className="mt-4 text-sm font-semibold text-slate-200">
                            {skill.name}
                          </h4>

                          <p className="mt-2 text-[10px] leading-5 text-slate-500">
                            {skill.usage}
                          </p>

                        </div>
                      );
                    })}

                  </div>

                </div>

              </article>
            );
          })}

        </div>

      </section>

      {/* ==================================
          開発工程
      ================================== */}

      <section
        id="development"
        className="scroll-mt-28"
      >

        <SectionHeading
          number="02"
          label="DEVELOPMENT LIFECYCLE"
          title="Development Phases."
          description="調査・分析から要件定義、設計、実装、テスト、リリース、保守運用まで、システム開発の各工程を経験しています。"
        />

        <div className="grid gap-4 md:grid-cols-2">

          {developmentPhases.map((phase) => {
            const Icon = phase.icon;

            return (
              <article
                key={phase.number}
                className={`${cardStyle} p-6 sm:p-8`}
              >

                <div className="flex items-center justify-between gap-3">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10">

                      <Icon
                        size={22}
                        strokeWidth={1.5}
                        className="text-sky-400"
                      />

                    </div>

                    <span className="font-mono text-xs tracking-wider text-slate-500">
                      PHASE {phase.number}
                    </span>

                  </div>

                  <CheckCircle2
                    size={20}
                    className="text-emerald-400"
                  />

                </div>

                <h3 className="mt-6 text-xl font-bold text-white">
                  {phase.title}
                </h3>

                <p className="mt-2 text-sm text-sky-400">
                  {phase.subtitle}
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {phase.description}
                </p>

                <div className="mt-6 grid gap-3 border-t border-slate-800 pt-5 sm:grid-cols-2">

                  {phase.tasks.map((task) => (
                    <div
                      key={task}
                      className="flex items-center gap-2"
                    >

                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/70" />

                      <span className="text-xs text-slate-300">
                        {task}
                      </span>

                    </div>
                  ))}

                </div>

              </article>
            );
          })}

        </div>

      </section>

      {/* ==================================
          エンジニアリングスキル
      ================================== */}

      <section
        id="engineering"
        className="scroll-mt-28"
      >

        <SectionHeading
          number="03"
          label="ENGINEERING SKILLS"
          title="Engineering Capabilities."
          description="プログラミング言語やフレームワークだけでなく、システム設計、品質管理、技術支援など、開発全体を支えるスキルを紹介します。"
        />

        <div className="grid gap-5 md:grid-cols-2">

          {engineeringSkills.map((skill) => {
            const Icon = skill.icon;

            return (
              <article
                key={skill.title}
                className={`${cardStyle} flex flex-col p-7 sm:p-8`}
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10">

                  <Icon
                    size={25}
                    strokeWidth={1.5}
                    className="text-sky-400"
                  />

                </div>

                <h3 className="mt-6 text-xl font-bold text-white">
                  {skill.title}
                </h3>

                <p className="mt-2 text-sm font-medium text-sky-400">
                  {skill.subtitle}
                </p>

                <p className="mt-4 flex-1 text-sm leading-8 text-slate-400">
                  {skill.description}
                </p>

                <div className="mt-6 space-y-3 border-t border-slate-800 pt-6">

                  {skill.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >

                      <CheckCircle2
                        size={15}
                        className="shrink-0 text-sky-400/80"
                      />

                      <span className="text-sm text-slate-300">
                        {item}
                      </span>

                    </div>
                  ))}

                </div>

              </article>
            );
          })}

        </div>

      </section>

      {/* ==================================
          ドキュメント作成
      ================================== */}

      <section
        id="documentation"
        className="scroll-mt-28"
      >

        <SectionHeading
          number="04"
          label="DOCUMENTATION"
          title="Technical Documentation."
          description="要件定義、システム設計、開発、テスト、リリースに必要な各種ドキュメントの作成経験があります。"
        />

        <div className="grid gap-5 lg:grid-cols-3">

          {documentCategories.map((category) => (
            <article
              key={category.title}
              className={`${cardStyle} p-6`}
            >

              <FileText
                size={28}
                strokeWidth={1.5}
                className="text-sky-400"
              />

              <h3 className="mt-5 text-lg font-bold text-white">
                {category.title}
              </h3>

              <p className="mt-2 text-xs text-sky-400">
                {category.subtitle}
              </p>

              <div className="mt-6 space-y-3">

                {category.documents.map((document) => (
                  <div
                    key={document}
                    className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/50 px-4 py-3"
                  >

                    <FileText
                      size={16}
                      className="shrink-0 text-slate-500"
                    />

                    <span className="text-sm text-slate-300">
                      {document}
                    </span>

                  </div>
                ))}

              </div>

            </article>
          ))}

        </div>

      </section>

      {/* ==================================
          他ページへの導線
      ================================== */}

      <section className="relative isolate overflow-hidden rounded-3xl border border-sky-500/20 bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-950 px-6 py-16 text-center sm:py-24">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[100px]"
        />

        <p className="font-mono text-xs tracking-[0.2em] text-sky-400">
          FROM KNOWLEDGE TO CREATION
        </p>

        <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Skills into

          <span className="ml-2 bg-gradient-to-r from-sky-300 to-blue-500 bg-clip-text text-transparent">
            Reality.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-sm leading-8 text-slate-400">
          これらの技術を活用した開発実績や、
          これまでの職務経歴をご覧いただけます。
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">

          <Link
            href="/works"
            className="inline-flex items-center gap-3 rounded-lg bg-sky-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-sky-300"
          >
            View Projects
            <ArrowRight size={17} />
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-900/50 px-6 py-3.5 text-sm font-medium text-slate-200 transition-all hover:border-sky-400 hover:bg-sky-500/10"
          >
            About Me
            <ArrowRight size={17} />
          </Link>

        </div>

      </section>

    </div>
  );
}
