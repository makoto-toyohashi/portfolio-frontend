
"use client";

import { useState } from "react";
import Link from "next/link";

import { PageHeading } from "@/components/ui/page-heading";
import { ContactForm } from "@/components/contact/contact-form";

import {
  contactConfig,
  type ContactMode,
} from "@/config/contact";

import { FaGithub } from "react-icons/fa";

import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Code2,
  Briefcase,
  MessageSquare,
  ShieldCheck,
  Clock,
  Plus,
  CheckCircle2,
  Layers,
  Server,
  Monitor,
  Database,
  FlaskConical,
  Send,
  Settings2,
  MinusCircle,
  AlertCircle,
  Lock,
} from "lucide-react";

// ========================================
// お問い合わせ種別
// ========================================

const contactCategories = [
  {
    icon: Code2,
    title: "Technical Inquiry",
    subtitle: "技術に関するご質問",
    description:
      "プログラミング、システム設計、認証基盤などに関するお問い合わせ。",
  },
  {
    icon: Briefcase,
    title: "Project Consultation",
    subtitle: "開発・案件のご相談",
    description:
      "Webアプリケーション開発、システム設計、業務効率化などに関するご相談。",
  },
  {
    icon: Monitor,
    title: "Portfolio",
    subtitle: "ポートフォリオ・制作物について",
    description:
      "公開している制作物や開発実績に関するお問い合わせ。",
  },
  {
    icon: Layers,
    title: "Collaboration",
    subtitle: "共同開発・コラボレーション",
    description:
      "個人開発、共同制作、技術交流などに関するお問い合わせ。",
  },
  {
    icon: MessageSquare,
    title: "General Inquiry",
    subtitle: "その他のお問い合わせ",
    description:
      "上記以外のお問い合わせやご質問。",
  },
];

// ========================================
// 使用技術
// ========================================

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "React Hooks",
  "Client Component",
  "Form Validation",
  "Service Layer",
  "REST API",
];

// ========================================
// デモモード：実装機能
// ========================================

const demoFeatures = [
  {
    title: "State Management",
    subtitle: "状態管理",
    description:
      "フォームの入力値、画面状態、送信状態をReact Hooksで管理します。",
  },
  {
    title: "Form Validation",
    subtitle: "入力値検証",
    description:
      "必須項目、入力形式、文字数、お問い合わせ種別などを検証します。",
  },
  {
    title: "Screen Transition",
    subtitle: "画面遷移制御",
    description:
      "入力、確認、完了画面を状態に応じて切り替えます。",
  },
  {
    title: "Asynchronous Processing",
    subtitle: "非同期処理",
    description:
      "送信処理、ローディング表示、例外処理を実装しています。",
  },
  {
    title: "Component Design",
    subtitle: "コンポーネント設計",
    description:
      "ページ表示、フォーム処理、サービス処理を分離しています。",
  },
  {
    title: "Responsive Design",
    subtitle: "レスポンシブデザイン",
    description:
      "PC、タブレット、スマートフォンに対応した画面構成です。",
  },
  {
    title: "Service Abstraction",
    subtitle: "サービス層の分離",
    description:
      "画面処理とAPI通信処理を分離し、保守性を高めています。",
  },
  {
    title: "Mode Switching",
    subtitle: "動作モード切り替え",
    description:
      "デモモードと本番モードを動的に切り替えられます。",
  },
  {
    title: "Submission Lock",
    subtitle: "二重送信防止",
    description:
      "送信中の再送信や動作モードの変更を防止します。",
  },
  {
    title: "Extensibility",
    subtitle: "拡張性",
    description:
      "将来的なバックエンドAPI、データベース、メール通知との連携を想定しています。",
  },
];

// ========================================
// デモモード用FAQ
// ========================================

const demoFaqs = [
  {
    question:
      "実際にお問い合わせは送信されますか？",
    answer:
      "デモモードでは、入力された情報が外部に送信されたり、データベースに保存されたりすることはありません。",
  },
  {
    question:
      "どのような機能を体験できますか？",
    answer:
      "フォーム入力、バリデーション、入力内容確認、入力内容修正、疑似送信処理、完了画面への遷移を体験できます。",
  },
  {
    question:
      "個人情報を入力する必要はありますか？",
    answer:
      "実際の個人情報を入力する必要はありません。サンプルデータの自動入力機能をご利用ください。",
  },
  {
    question:
      "本番モードとの違いは何ですか？",
    answer:
      "デモモードでは疑似送信処理を実行します。本番モードでは、送信機能が有効な場合に限り、実際のバックエンドAPIへ情報を送信します。",
  },
  {
    question:
      "モードを切り替えると入力内容はどうなりますか？",
    answer:
      "誤送信防止のため、モード切り替え時には入力内容とフォームの進行状態を初期化します。",
  },
];

// ========================================
// 本番モード用FAQ
// ========================================

const productionFaqs = [
  {
    question:
      "現在、お問い合わせは可能ですか？",
    answer: contactConfig.productionEnabled
      ? "お問い合わせフォームからご連絡いただけます。"
      : "現在、実際のお問い合わせ機能は準備中です。デモモードをご利用いただけます。",
  },
  {
    question:
      "現在、開発案件の依頼は可能ですか？",
    answer:
      contactConfig.productionEnabled &&
      contactConfig.acceptingProjects
        ? "現在、新規案件を受け付けております。"
        : "現在、新規案件の受付は行っておりません。",
  },
  {
    question:
      "技術的な相談は可能ですか？",
    answer: contactConfig.productionEnabled
      ? "技術に関するご質問や個人開発についてのお問い合わせも受け付けております。"
      : "お問い合わせ機能の公開後にご利用いただけます。",
  },
  {
    question:
      "個人情報はどのように取り扱われますか？",
    answer:
      "本番機能の公開後は、お問い合わせへの回答および必要な連絡を行う目的で使用します。",
  },
];

// ========================================
// 共通スタイル
// ========================================

const cardStyle =
  "relative overflow-hidden rounded-2xl " +
  "border border-slate-800 bg-slate-900/40 " +
  "transition-all duration-300 " +
  "hover:border-sky-500/30";

// ========================================
// セクション見出し
// ========================================

function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">

      <div className="flex items-center gap-3">

        <span className="h-px w-8 bg-sky-400/50" />

        <p className="font-mono text-xs tracking-[0.2em] text-sky-400">
          {label}
        </p>

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
// モード切り替えコンポーネント
// ========================================

type ModeToggleProps = {
  mode: ContactMode;
  onChange: (mode: ContactMode) => void;
  disabled?: boolean;
};

function ModeToggle({
  mode,
  onChange,
  disabled = false,
}: ModeToggleProps) {

  const isDemo = mode === "demo";

  const productionEnabled =
    contactConfig.productionEnabled;

  const isProductionReady =
    !isDemo && productionEnabled;

  // ========================================
  // モード別配色
  // ========================================

  const theme = isDemo
    ? {
        text: "text-sky-400",
        border: "border-sky-500/30",
        background: "bg-sky-500/5",
        dot: "bg-sky-400 shadow-[0_0_12px_#38bdf8]",
        divider: "border-sky-500/20",
      }
    : isProductionReady
      ? {
          text: "text-emerald-400",
          border: "border-emerald-500/30",
          background: "bg-emerald-500/5",
          dot: "bg-emerald-400 shadow-[0_0_12px_#34d399]",
          divider: "border-emerald-500/20",
        }
      : {
          text: "text-amber-400",
          border: "border-amber-500/30",
          background: "bg-amber-500/5",
          dot: "bg-amber-400 shadow-[0_0_12px_#fbbf24]",
          divider: "border-amber-500/20",
        };

  // ========================================
  // モード別機能ステータス
  // ========================================

  const statuses = [
    {
      label: "フォーム操作",
      value:
        isDemo || isProductionReady
          ? "利用可能"
          : "閲覧のみ",
      active: isDemo || isProductionReady,
      pending: false,
    },
    {
      label: "サンプルデータ入力",
      value: isDemo ? "有効" : "無効",
      active: isDemo,
      pending: false,
    },
    {
      label: "疑似送信処理",
      value: isDemo ? "有効" : "無効",
      active: isDemo,
      pending: false,
    },
    {
      label: "実際のAPI通信",
      value: isDemo
        ? "無効"
        : isProductionReady
          ? "有効"
          : "準備中",
      active: isProductionReady,
      pending: !isDemo && !isProductionReady,
    },
    {
      label: "実際のお問い合わせ送信",
      value: isDemo
        ? "なし"
        : isProductionReady
          ? "利用可能"
          : "準備中",
      active: isProductionReady,
      pending: !isDemo && !isProductionReady,
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">

      {/* 見出し */}

      <div className="flex items-center justify-between gap-4">

        <div>

          <p className="font-mono text-xs tracking-[0.2em] text-slate-500">
            OPERATION MODE
          </p>

          <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">
            動作モード切り替え
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            ご利用になるモードを選択してください。
          </p>

        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50">

          <Settings2
            size={24}
            className="text-slate-400"
          />

        </div>

      </div>

      {/* ==================================
          トグルボタン
      ================================== */}

      <div
        role="group"
        aria-label="お問い合わせの動作モード"
        className="mt-8 grid grid-cols-2 gap-2 rounded-2xl border border-slate-800 bg-slate-950 p-2"
      >

        {/* デモモード */}

        <button
          type="button"
          aria-pressed={isDemo}
          disabled={disabled}
          onClick={() => onChange("demo")}
          className={`relative rounded-xl border p-4 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 disabled:cursor-not-allowed disabled:opacity-60 sm:p-6 ${
            isDemo
              ? "border-sky-300 bg-sky-400 text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.15)]"
              : "border-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-900"
          }`}
        >

          <div className="flex items-center justify-between gap-2">

            <FlaskConical
              size={26}
              strokeWidth={1.7}
            />

            {isDemo && (

              <span className="flex items-center gap-1.5 rounded-full bg-sky-950/10 px-2 py-1 text-[10px] font-bold">

                <CheckCircle2 size={14} />

                <span className="hidden sm:inline">
                  選択中
                </span>

              </span>

            )}

          </div>

          <p className="mt-5 text-sm font-bold sm:text-lg">
            デモモード
          </p>

          <p className={`mt-2 font-mono text-[10px] tracking-wider ${
            isDemo
              ? "text-sky-900"
              : "text-slate-500"
          }`}>
            DEMO MODE
          </p>

          <p className={`mt-4 hidden text-xs leading-6 sm:block ${
            isDemo
              ? "text-sky-950/70"
              : "text-slate-500"
          }`}>
            フォームの操作・動作確認
          </p>

        </button>

        {/* 本番モード */}

        <button
          type="button"
          aria-pressed={!isDemo}
          disabled={disabled}
          onClick={() => onChange("production")}
          className={`relative rounded-xl border p-4 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:opacity-60 sm:p-6 ${
            !isDemo
              ? productionEnabled
                ? "border-emerald-300 bg-emerald-400 text-emerald-950 shadow-[0_0_25px_rgba(52,211,153,0.15)]"
                : "border-amber-300 bg-amber-400 text-amber-950 shadow-[0_0_25px_rgba(251,191,36,0.15)]"
              : "border-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-900"
          }`}
        >

          <div className="flex items-center justify-between gap-2">

            <Send
              size={26}
              strokeWidth={1.7}
            />

            {!isDemo && (

              <span className="flex items-center gap-1.5 rounded-full bg-black/10 px-2 py-1 text-[10px] font-bold">

                <CheckCircle2 size={14} />

                <span className="hidden sm:inline">
                  選択中
                </span>

              </span>

            )}

          </div>

          <p className="mt-5 text-sm font-bold sm:text-lg">
            本番モード
          </p>

          <p className={`mt-2 font-mono text-[10px] tracking-wider ${
            !isDemo
              ? "opacity-70"
              : "text-slate-500"
          }`}>
            PRODUCTION MODE
          </p>

          <p className={`mt-4 hidden text-xs leading-6 sm:block ${
            !isDemo
              ? "opacity-70"
              : "text-slate-500"
          }`}>
            実際のお問い合わせ
          </p>

        </button>

      </div>

      {/* 送信中の切り替え制御 */}

      {disabled && (

        <div
          role="status"
          className="mt-4 flex items-center gap-2 text-xs text-amber-400"
        >

          <Lock size={15} />

          送信処理中はモードを切り替えられません。

        </div>

      )}

      {/* ==================================
          現在のモード表示
      ================================== */}

      <div
        aria-live="polite"
        className={`relative mt-6 overflow-hidden rounded-2xl border p-6 transition-colors duration-300 sm:p-8 ${theme.border} ${theme.background}`}
      >

        <div className="flex items-center gap-3">

          <span className="relative flex h-3 w-3">

            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-40 motion-safe:animate-ping ${theme.dot}`}
            />

            <span
              className={`relative inline-flex h-3 w-3 rounded-full ${theme.dot}`}
            />

          </span>

          <p className={`font-mono text-xs tracking-[0.2em] ${theme.text}`}>
            CURRENT MODE
          </p>

        </div>

        <h3 className={`mt-5 text-2xl font-bold sm:text-3xl ${theme.text}`}>

          {isDemo
            ? "デモモードで動作中"
            : isProductionReady
              ? "本番モードで動作中"
              : "本番モード・送信準備中"}

        </h3>

        <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-400">

          {isDemo
            ? "フォーム入力から送信完了までの操作をご体験いただけます。実際の情報送信やデータ保存は行われません。"
            : isProductionReady
              ? "入力されたお問い合わせ情報は、実際にサーバーへ送信されます。"
              : "実際のお問い合わせ用のモードです。現在、送信機能は準備中のため、情報を送信することはできません。"}

        </p>

        {/* 機能別ステータス */}

        <div className={`mt-7 space-y-4 border-t pt-6 ${theme.divider}`}>

          {statuses.map((status) => {

            const StatusIcon = status.active
              ? CheckCircle2
              : status.pending
                ? Clock
                : MinusCircle;

            return (

              <div
                key={status.label}
                className="flex items-center justify-between gap-4"
              >

                <span className="text-sm text-slate-400">
                  {status.label}
                </span>

                <div className={`flex shrink-0 items-center gap-2 ${
                  status.active
                    ? theme.text
                    : status.pending
                      ? "text-amber-400"
                      : "text-slate-500"
                }`}>

                  <StatusIcon size={16} />

                  <span className="text-xs font-medium sm:text-sm">
                    {status.value}
                  </span>

                </div>

              </div>

            );
          })}

        </div>

      </div>

      <p className="mt-5 text-xs leading-7 text-slate-500">
        ※ 誤送信防止のため、モードを切り替えると
        フォームの入力内容が初期化されます。
      </p>

    </section>
  );
}

// ========================================
// 本番モード：案件受付状況
// ========================================

function AvailabilityNotice() {

  const enabled =
    contactConfig.productionEnabled;

  const accepting =
    enabled && contactConfig.acceptingProjects;

  return (
    <section
      className={`rounded-2xl border p-6 sm:p-8 ${
        accepting
          ? "border-emerald-500/20 bg-emerald-500/5"
          : "border-amber-500/20 bg-amber-500/5"
      }`}
    >

      <div className="flex items-start gap-4">

        {accepting ? (

          <CheckCircle2
            size={24}
            className="shrink-0 text-emerald-400"
          />

        ) : (

          <AlertCircle
            size={24}
            className="shrink-0 text-amber-400"
          />

        )}

        <div>

          <p className="font-mono text-xs tracking-widest text-slate-400">
            AVAILABILITY STATUS
          </p>

          <h2 className={`mt-3 text-lg font-semibold ${
            accepting
              ? "text-emerald-400"
              : "text-amber-400"
          }`}>

            {!enabled
              ? "お問い合わせ機能は準備中です。"
              : accepting
                ? "現在、新規案件を受け付けております。"
                : "現在、新規案件の受付を停止しています。"}

          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">

            {!enabled
              ? "デモモードに切り替えることで、フォームの操作をご体験いただけます。"
              : accepting
                ? "システム開発や技術支援に関するご相談をお待ちしております。"
                : "技術に関するご質問やその他のお問い合わせは受け付けております。"}

          </p>

        </div>

      </div>

    </section>
  );
}

// ========================================
// デモモード：システム構成
// ========================================

function ArchitectureSection() {

  const architecture = [
    {
      icon: Monitor,
      title: "Presentation Layer",
      subtitle: "Next.js / React",
      description:
        "画面表示、ユーザー操作、状態管理",
    },
    {
      icon: ShieldCheck,
      title: "Validation Layer",
      subtitle: "TypeScript",
      description:
        "入力チェック、データ形式の検証",
    },
    {
      icon: Layers,
      title: "Service Layer",
      subtitle: "Contact Service",
      description:
        "送信処理、動作モードの切り替え",
    },
  ];

  return (
    <section>

      <SectionHeading
        label="SYSTEM ARCHITECTURE"
        title="Architecture."
        description="画面表示、入力検証、送信処理を分離し、将来的な機能拡張や保守性を考慮した構成にしています。"
      />

      <div className={`${cardStyle} p-6 sm:p-8`}>

        {/* 現在の構成 */}

        <div className="space-y-4">

          {architecture.map((item, index) => {

            const Icon = item.icon;

            return (

              <div key={item.title}>

                <div className="flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-950/50 p-5">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10">

                    <Icon
                      size={24}
                      className="text-sky-400"
                    />

                  </div>

                  <div>

                    <h3 className="text-sm font-semibold text-white sm:text-base">
                      {item.title}
                    </h3>

                    <p className="mt-1 font-mono text-xs text-sky-400">
                      {item.subtitle}
                    </p>

                    <p className="mt-2 text-xs leading-6 text-slate-400">
                      {item.description}
                    </p>

                  </div>

                </div>

                {index < architecture.length - 1 && (

                  <div className="mx-auto h-5 w-px bg-slate-700" />

                )}

              </div>

            );
          })}

        </div>

        <div className="mx-auto h-6 w-px bg-slate-700" />

        {/* モード分岐 */}

        <div className="grid gap-4 sm:grid-cols-2">

          {/* デモモード */}

          <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-6">

            <div className="flex items-center justify-between">

              <FlaskConical
                size={25}
                className="text-sky-400"
              />

              <span className="font-mono text-[10px] text-sky-400">
                AVAILABLE
              </span>

            </div>

            <h3 className="mt-5 font-bold text-white">
              Demo Mode
            </h3>

            <p className="mt-3 text-xs leading-7 text-slate-400">
              疑似送信処理を実行します。
              外部通信やデータ保存は行いません。
            </p>

          </div>

          {/* 本番モード */}

          <div className={`rounded-xl border p-6 ${
            contactConfig.productionEnabled
              ? "border-emerald-500/30 bg-emerald-500/5"
              : "border-dashed border-slate-700 bg-slate-950/30"
          }`}>

            <div className="flex items-center justify-between">

              <Server
                size={25}
                className={
                  contactConfig.productionEnabled
                    ? "text-emerald-400"
                    : "text-slate-500"
                }
              />

              <span className={`font-mono text-[10px] ${
                contactConfig.productionEnabled
                  ? "text-emerald-400"
                  : "text-slate-500"
              }`}>

                {contactConfig.productionEnabled
                  ? "AVAILABLE"
                  : "PLANNED"}

              </span>

            </div>

            <h3 className="mt-5 font-bold text-slate-300">
              Production Mode
            </h3>

            <p className="mt-3 text-xs leading-7 text-slate-400">
              Next.js APIを経由して、
              バックエンドへお問い合わせ情報を
              送信する構成です。
            </p>

          </div>

        </div>

        {/* 将来的なバックエンド構成 */}

        <div className="mt-8 border-t border-slate-800 pt-8">

          <p className="font-mono text-xs tracking-widest text-slate-500">
            FUTURE EXTENSIONS
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">

            {[
              {
                icon: Server,
                title: "Spring Boot",
                description: "REST API",
              },
              {
                icon: Database,
                title: "MySQL",
                description: "データ管理",
              },
              {
                icon: Mail,
                title: "Amazon SES",
                description: "メール通知",
              },
            ].map((item) => {

              const Icon = item.icon;

              return (

                <div
                  key={item.title}
                  className="rounded-xl border border-dashed border-slate-700 p-5 text-center"
                >

                  <Icon
                    size={25}
                    className="mx-auto text-slate-500"
                  />

                  <h4 className="mt-3 text-sm font-semibold text-slate-300">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-xs text-slate-500">
                    {item.description}
                  </p>

                </div>

              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
}

// ========================================
// Contactページ本体
// ========================================

export function ContactPage() {

  // ========================================
  // State管理
  // ========================================

  const [mode, setMode] =
    useState<ContactMode>(
      contactConfig.defaultMode
    );

  const [isFormBusy, setIsFormBusy] =
    useState(false);

  // ========================================
  // モード判定
  // ========================================

  const isDemo = mode === "demo";

  const productionEnabled =
    contactConfig.productionEnabled;

  const canSubmit =
    isDemo || productionEnabled;

  const faqs = isDemo
    ? demoFaqs
    : productionFaqs;

  // ========================================
  // モード切り替え処理
  // ========================================

  function handleModeChange(
    nextMode: ContactMode
  ) {

    // 送信中は切り替えない
    if (isFormBusy) return;

    // 同じモードの場合は処理しない
    if (mode === nextMode) return;

    setMode(nextMode);

  }

  // ========================================
  // 画面表示
  // ========================================

  return (
    <div className="space-y-20 pb-16 sm:space-y-24">

      {/* ==================================
          ページ見出し
      ================================== */}

      <section className="relative isolate py-8 sm:py-16">

        {/* 背景グリッド */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(56,189,248,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.035)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_80%)]"
        />

        {/* 背景発光 */}

        <div
          aria-hidden="true"
          className={`pointer-events-none absolute right-0 top-0 -z-10 h-72 w-72 rounded-full blur-[120px] transition-colors duration-500 ${
            isDemo
              ? "bg-sky-500/10"
              : productionEnabled
                ? "bg-emerald-500/10"
                : "bg-amber-500/10"
          }`}
        />

        <p className="mb-4 font-mono text-xs tracking-[0.2em] text-sky-400">

          {isDemo
            ? "INTERACTIVE DEMONSTRATION"
            : "GET IN TOUCH"}

        </p>

        <PageHeading
          title="Contact"
          description={
            isDemo
              ? "お問い合わせフォーム・実装デモ"
              : "お問い合わせ・案件相談"
          }
        />

        <h2 className="mt-8 text-3xl font-bold tracking-tight text-white sm:text-5xl">

          Let&apos;s{" "}

          <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
            isDemo
              ? "from-sky-300 to-blue-500"
              : productionEnabled
                ? "from-emerald-300 to-teal-500"
                : "from-amber-300 to-orange-500"
          }`}>
            Connect.
          </span>

        </h2>

        <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-400 sm:text-base">

          {isDemo
            ? "実際のWebアプリケーションを想定したお問い合わせフォームです。操作を通じて、フロントエンドの実装機能をご確認いただけます。"
            : productionEnabled
              ? "技術に関するご質問、開発のご相談、その他のお問い合わせはこちらから。"
              : "将来的なお問い合わせ機能の公開に向けて準備を進めています。"}

        </p>

      </section>

      {/* ==================================
          モード切り替え
      ================================== */}

      <ModeToggle
        mode={mode}
        onChange={handleModeChange}
        disabled={isFormBusy}
      />

      {/* ==================================
          本番モード：受付状況
      ================================== */}

      {!isDemo && <AvailabilityNotice />}

      {/* ==================================
          フォーム・サイドバー
      ================================== */}

      <section className="grid items-start gap-8 lg:grid-cols-[1fr_320px]">

        {/* お問い合わせフォーム */}

        <div className={`${cardStyle} p-6 sm:p-10`}>

          <div className="flex items-center gap-4">

            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${
              isDemo
                ? "border-sky-500/20 bg-sky-500/10"
                : productionEnabled
                  ? "border-emerald-500/20 bg-emerald-500/10"
                  : "border-amber-500/20 bg-amber-500/10"
            }`}>

              <Mail
                size={24}
                strokeWidth={1.5}
                className={
                  isDemo
                    ? "text-sky-400"
                    : productionEnabled
                      ? "text-emerald-400"
                      : "text-amber-400"
                }
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-white sm:text-2xl">
                Send a Message.
              </h2>

              <p className="mt-1 text-xs text-slate-400">

                {isDemo
                  ? "お問い合わせフォームデモ"
                  : "お問い合わせフォーム"}

              </p>

            </div>

          </div>

          <p className="mb-8 mt-6 text-sm leading-7 text-slate-400">

            {isDemo
              ? "サンプルデータを入力して、フォームの動作をご確認ください。"
              : canSubmit
                ? "以下の必要事項をご入力ください。"
                : "現在、実際のお問い合わせは送信できません。"}

            {canSubmit && (

              <>
                必須項目には
                <span className="mx-1 text-sky-400">
                  *
                </span>
                が付いています。
              </>

            )}

          </p>

          {/* ==================================
              フォームコンポーネント

              keyを指定することで、
              モード変更時にフォームを初期化
          ================================== */}

          <ContactForm
            key={mode}
            mode={mode}
            acceptingProjects={
              isDemo ||
              contactConfig.acceptingProjects
            }
            onBusyChange={setIsFormBusy}
          />

        </div>

        {/* ==================================
            サイドバー
        ================================== */}

        <aside className="space-y-6">

          {/* お問い合わせ種別 */}

          <div className={`${cardStyle} p-6`}>

            <p className="font-mono text-[10px] tracking-widest text-sky-400">
              INQUIRY TYPES
            </p>

            <h2 className="mt-3 text-lg font-bold text-white">
              お問い合わせ種別
            </h2>

            <div className="mt-6 space-y-6">

              {contactCategories.map((category) => {

                const Icon = category.icon;

                const available =
                  isDemo ||
                  (
                    productionEnabled &&
                    (
                      category.title !==
                        "Project Consultation" ||
                      contactConfig.acceptingProjects
                    )
                  );

                return (

                  <div
                    key={category.title}
                    className="border-b border-slate-800 pb-6 last:border-0 last:pb-0"
                  >

                    <div className="flex items-center gap-3">

                      <Icon
                        size={20}
                        className={`shrink-0 ${
                          available
                            ? "text-sky-400"
                            : "text-slate-600"
                        }`}
                      />

                      <h3 className="text-sm font-semibold text-slate-200">
                        {category.subtitle}
                      </h3>

                    </div>

                    <p className="mt-3 text-xs leading-7 text-slate-400">
                      {category.description}
                    </p>

                    {!available && (

                      <p className="mt-2 text-xs text-amber-400">

                        {!productionEnabled
                          ? "準備中"
                          : "受付停止中"}

                      </p>

                    )}

                  </div>

                );
              })}

            </div>

          </div>

          {/* デモモード：使用技術 */}

          {isDemo && (

            <div className={`${cardStyle} p-6`}>

              <Code2
                size={25}
                className="text-sky-400"
              />

              <h2 className="mt-4 text-sm font-semibold text-white">
                Implementation
              </h2>

              <p className="mt-3 text-xs leading-7 text-slate-400">
                本フォームはNext.jsとTypeScriptを
                使用して実装しています。
                画面と送信処理を分離し、
                将来的なAPI連携にも対応できる構成です。
              </p>

              <div className="mt-5 flex flex-wrap gap-2">

                {technologies.map((technology) => (

                  <span
                    key={technology}
                    className="rounded-md border border-slate-700 bg-slate-950/50 px-2.5 py-1.5 text-[10px] text-slate-300"
                  >
                    {technology}
                  </span>

                ))}

              </div>

            </div>

          )}

          {/* 本番モード：返信案内 */}

          {!isDemo && productionEnabled && (

            <div className={`${cardStyle} p-6`}>

              <Clock
                size={25}
                className="text-emerald-400"
              />

              <h2 className="mt-4 text-sm font-semibold text-white">
                Response Time
              </h2>

              <p className="mt-3 text-xs leading-7 text-slate-400">
                お問い合わせ内容を確認後、
                順次返信いたします。
                状況によってはお時間をいただく
                場合がございます。
              </p>

            </div>

          )}

          {/* セキュリティ案内 */}

          <div className={`${cardStyle} p-6`}>

            <ShieldCheck
              size={25}
              className={
                isDemo
                  ? "text-sky-400"
                  : productionEnabled
                    ? "text-emerald-400"
                    : "text-amber-400"
              }
            />

            <h2 className="mt-4 text-sm font-semibold text-white">
              Privacy &amp; Security
            </h2>

            <p className="mt-3 text-xs leading-7 text-slate-400">

              {isDemo
                ? "デモフォームでは入力情報の外部送信・永続化を行いません。実際の個人情報や機密情報は入力しないでください。"
                : productionEnabled
                  ? "パスワードや認証情報などの機密情報を入力しないようお願いいたします。"
                  : "現在、本番フォームから情報を送信することはできません。"}

            </p>

          </div>

        </aside>

      </section>

      {/* ==================================
          デモモード専用：実装機能
      ================================== */}

      {isDemo && (

        <section>

          <SectionHeading
            label="IMPLEMENTATION DETAILS"
            title="Behind the Form."
            description="お問い合わせフォームに実装している機能と、設計上の工夫を紹介します。"
          />

          <div className="grid gap-4 sm:grid-cols-2">

            {demoFeatures.map((feature, index) => (

              <article
                key={feature.title}
                className={`${cardStyle} p-6`}
              >

                <div className="flex items-center justify-between">

                  <CheckCircle2
                    size={22}
                    className="text-sky-400"
                  />

                  <span className="font-mono text-xs text-slate-600">

                    {String(index + 1).padStart(2, "0")}

                  </span>

                </div>

                <h3 className="mt-5 text-lg font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-2 text-xs text-sky-400">
                  {feature.subtitle}
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {feature.description}
                </p>

              </article>

            ))}

          </div>

        </section>

      )}

      {/* ==================================
          デモモード専用：技術構成
      ================================== */}

      {isDemo && <ArchitectureSection />}

      {/* ==================================
          外部リンク
      ================================== */}

      <section>

        <SectionHeading
          label="OTHER CHANNELS"
          title="Find Me Online."
          description="ソースコードや個人開発の活動については、GitHubや開発実績ページからもご覧いただけます。"
        />

        <div className="grid gap-4 md:grid-cols-2">

          {/* GitHub */}

          <a
            href={contactConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cardStyle} group block p-7 hover:-translate-y-1`}
          >

            <div className="flex items-center gap-5">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-800">

                <FaGithub
                  size={30}
                  className="text-white"
                />

              </div>

              <div className="flex-1">

                <h3 className="text-lg font-bold text-white">
                  GitHub
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  ソースコード・リポジトリ
                </p>

              </div>

              <ArrowUpRight
                size={20}
                className="text-slate-500 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sky-400"
              />

            </div>

          </a>

          {/* Works */}

          <Link
            href="/works"
            className={`${cardStyle} group block p-7 hover:-translate-y-1`}
          >

            <div className="flex items-center gap-5">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10">

                <Code2
                  size={30}
                  className="text-sky-400"
                />

              </div>

              <div className="flex-1">

                <h3 className="text-lg font-bold text-white">
                  Portfolio
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  開発実績・個人制作
                </p>

              </div>

              <ArrowRight
                size={20}
                className="text-slate-500 transition-all group-hover:translate-x-1 group-hover:text-sky-400"
              />

            </div>

          </Link>

        </div>

      </section>

      {/* ==================================
          FAQ
      ================================== */}

      <section>

        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions."
          description={
            isDemo
              ? "デモフォームに関するよくあるご質問"
              : "お問い合わせに関するよくあるご質問"
          }
        />

        <div className="space-y-4">

          {faqs.map((faq) => (

            <details
              key={`${mode}-${faq.question}`}
              className={`${cardStyle} group`}
            >

              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-sm font-medium text-slate-200 [&::-webkit-details-marker]:hidden">

                <span>
                  {faq.question}
                </span>

                <Plus
                  size={20}
                  className="shrink-0 text-sky-400 transition-transform duration-300 group-open:rotate-45"
                />

              </summary>

              <div className="border-t border-slate-800 px-6 py-5">

                <p className="text-sm leading-8 text-slate-400">
                  {faq.answer}
                </p>

              </div>

            </details>

          ))}

        </div>

      </section>

      {/* ==================================
          ページ下部ナビゲーション
      ================================== */}

      <section className="relative isolate overflow-hidden rounded-3xl border border-sky-500/20 bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-950 px-6 py-14 text-center sm:py-20">

        <p className="font-mono text-xs tracking-[0.2em] text-sky-400">
          EXPLORE MORE
        </p>

        <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Beyond the Code.
        </h2>

        <p className="mt-5 text-sm leading-8 text-slate-400">
          その他の開発実績や技術スタックも
          ご覧ください。
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">

          <Link
            href="/works"
            className="inline-flex items-center gap-3 rounded-lg bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-sky-300"
          >

            View Projects

            <ArrowRight size={17} />

          </Link>

          <Link
            href="/skills"
            className="inline-flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-900/50 px-6 py-3 text-sm font-medium text-slate-200 transition-all hover:border-sky-400"
          >

            View Skills

            <ArrowRight size={17} />

          </Link>

        </div>

      </section>

    </div>
  );
}
