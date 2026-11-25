
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import {
  UserRound,
  FolderCode,
  Code2,
  BookOpen,
  Mail,
  ArrowUpRight,
} from "lucide-react";

// ========================================
// ナビゲーション
// ========================================

const navigation = [
  {
    number: "01",
    title: "About",
    description: "プロフィール・職務経歴",
    href: "/about",
    icon: UserRound,
    external: false,
  },
  {
    number: "02",
    title: "Works",
    description: "開発実績・制作物",
    href: "/works",
    icon: FolderCode,
    external: false,
  },
  {
    number: "03",
    title: "Skills",
    description: "技術スタック・開発環境",
    href: "/skills",
    icon: Code2,
    external: false,
  },
  {
    number: "04",
    title: "Blog",
    description: "技術記事・開発記録",
    href: "/blog",
    icon: BookOpen,
    external: false,
  },
  {
    number: "05",
    title: "Contact",
    description: "お問い合わせ",
    href: "/contact",
    icon: Mail,
    external: false,
  },
  {
    number: "06",
    title: "GitHub",
    description: "ソースコード・リポジトリ",
    href: "https://github.com/YOUR_USERNAME",
    icon: FaGithub,
    external: true,
  },
];

// ========================================
// ナビゲーションカード
// ========================================

function NavigationCard({
  item,
}: {
  item: (typeof navigation)[number];
}) {
  const Icon = item.icon;

  const className =
    "group relative block overflow-hidden rounded-2xl " +
    "border border-slate-800 bg-slate-900/50 p-6 sm:p-8 " +
    "transition-all duration-500 " +
    "hover:-translate-y-1 hover:border-sky-400/50 " +
    "hover:bg-slate-900/90 " +
    "hover:shadow-[0_0_40px_rgba(56,189,248,0.08)] " +
    "focus-visible:outline-2 focus-visible:outline-sky-400";

  const content = (
    <>
      {/* ホバー時の背景発光 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* 背景の番号 */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-4 font-mono text-8xl font-bold text-slate-800/30 transition-colors duration-500 group-hover:text-sky-500/10"
      >
        {item.number}
      </span>

      <div className="relative">

        {/* アイコン・遷移マーク */}
        <div className="flex items-center justify-between">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10 text-sky-400 transition-all duration-500 group-hover:border-sky-400/40 group-hover:bg-sky-500/20">

            <Icon
              size={24}
              className="transition-transform duration-500 group-hover:scale-110"
            />

          </div>

          <ArrowUpRight
            size={20}
            className="text-slate-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sky-400"
          />

        </div>

        {/* タイトル */}
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-sky-300">
          {item.title}
        </h2>

        {/* 説明 */}
        <p className="mt-2 text-sm leading-7 text-slate-400">
          {item.description}
        </p>

        {/* アクセントライン */}
        <div className="mt-6 h-px w-8 bg-slate-700 transition-all duration-500 group-hover:w-16 group-hover:bg-sky-400" />

      </div>
    </>
  );

  // 外部リンク
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  // サイト内リンク
  return (
    <Link
      href={item.href}
      className={className}
    >
      {content}
    </Link>
  );
}

// ========================================
// トップページ
// ========================================

export default function Home() {
  return (
    <div className="relative isolate min-h-[80vh] pb-16">

      {/* ==================================
          背景エフェクト
      ================================== */}

      {/* グリッドパターン */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(56,189,248,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_80%)]"
      />

      {/* 左側の発光 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-20 -z-10 h-64 w-64 rounded-full bg-blue-600/10 blur-[120px]"
      />

      {/* 右側の発光 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-40 -z-10 h-64 w-64 rounded-full bg-sky-400/10 blur-[120px]"
      />

      {/* ==================================
          キャッチコピー
      ================================== */}

      <section className="relative px-4 pb-16 pt-24 text-center sm:pb-20 sm:pt-32">

        {/* サブタイトル */}
        <div className="inline-flex items-center gap-3 rounded-full border border-sky-500/20 bg-sky-500/5 px-5 py-2">

          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />

          <span className="font-mono text-[10px] tracking-[0.2em] text-sky-400 sm:text-xs">
            ENGINEERING × CREATIVITY
          </span>

        </div>

        {/* メインキャッチコピー */}
        <h1 className="mt-10 text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-6xl lg:text-7xl">

          Engineering the

          <span className="mt-2 block bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Next Possibility.
          </span>

        </h1>

        {/* 日本語キャッチコピー */}
        <p className="mt-8 text-xl font-medium tracking-wider text-slate-200 sm:text-2xl">
          技術の力で、可能性を形に。
        </p>

        <p className="mt-5 font-mono text-[10px] tracking-[0.15em] text-slate-500 sm:text-xs">
          SOFTWARE ENGINEER / FULL STACK DEVELOPER
        </p>

        {/* 装飾ライン */}
        <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-sky-400 to-transparent" />

      </section>

      {/* ==================================
          各画面へのナビゲーション
      ================================== */}

      <section
        aria-label="ページナビゲーション"
        className="mx-auto max-w-5xl"
      >

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {navigation.map((item) => (
            <NavigationCard
              key={item.title}
              item={item}
            />
          ))}

        </div>

      </section>

      {/* ==================================
          下部装飾
      ================================== */}

      <div className="mt-16 flex items-center justify-center gap-5">

        <span className="h-px w-12 bg-slate-800" />

        <p className="text-center font-mono text-[10px] tracking-[0.2em] text-slate-600">
          DESIGN. DEVELOP. INNOVATE.
        </p>

        <span className="h-px w-12 bg-slate-800" />

      </div>

    </div>
  );
}
