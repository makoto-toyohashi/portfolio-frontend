
"use client";

import {
  useState,
  useRef,
  type FormEvent,
} from "react";

import {
  ArrowRight,
  ArrowLeft,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  FlaskConical,
} from "lucide-react";

import {
  contactConfig,
  type ContactMode,
} from "@/config/contact";

import { submitContact } from "@/services/contact";

import type {
  ContactFormData,
  ContactCategory,
  FormErrors,
  FormStep,
} from "@/types/contact";

// ========================================
// Props定義
// ========================================

type ContactFormProps = {
  mode: ContactMode;
  acceptingProjects: boolean;
  onBusyChange?: (busy: boolean) => void;
};

// ========================================
// フォーム初期値
// ========================================

const initialFormData: ContactFormData = {
  name: "",
  company: "",
  email: "",
  category: "",
  subject: "",
  message: "",
  consent: false,
};

// ========================================
// お問い合わせ種別
// ========================================

const categories: {
  value: ContactCategory;
  label: string;
}[] = [
  {
    value: "technical",
    label: "技術に関するご質問",
  },
  {
    value: "project",
    label: "開発・案件のご相談",
  },
  {
    value: "portfolio",
    label: "ポートフォリオ・制作物について",
  },
  {
    value: "collaboration",
    label: "共同開発・コラボレーション",
  },
  {
    value: "other",
    label: "その他",
  },
];

// ========================================
// 共通スタイル
// ========================================

const inputStyle =
  "w-full rounded-xl border border-slate-700 " +
  "bg-slate-950/60 px-4 py-3.5 text-sm " +
  "text-slate-200 outline-none " +
  "placeholder:text-slate-600 " +
  "transition-all duration-200 " +
  "focus:border-sky-400 " +
  "focus:ring-2 focus:ring-sky-400/20 " +
  "disabled:cursor-not-allowed";

const labelStyle =
  "mb-2.5 block text-sm font-medium text-slate-200";

const secondaryButton =
  "inline-flex items-center justify-center gap-3 " +
  "rounded-xl border border-slate-700 " +
  "px-6 py-4 text-sm font-medium text-slate-300 " +
  "transition-all hover:border-sky-400 " +
  "hover:text-sky-400 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

// ========================================
// 必須マーク
// ========================================

function RequiredMark() {
  return (
    <span className="ml-1 text-sky-400">
      *
    </span>
  );
}

// ========================================
// エラーメッセージ
// ========================================

function ErrorMessage({
  message,
}: {
  message?: string;
}) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className="mt-2 flex items-center gap-2 text-xs text-red-400"
    >
      <AlertCircle
        size={14}
        className="shrink-0"
      />

      {message}
    </p>
  );
}

// ========================================
// お問い合わせフォーム
// ========================================

export function ContactForm({
  mode,
  acceptingProjects,
  onBusyChange,
}: ContactFormProps) {

  // ========================================
  // モード判定
  // ========================================

  const isDemo = mode === "demo";

  const canSubmit =
    isDemo || contactConfig.productionEnabled;

  const primaryButton =
    "inline-flex items-center justify-center gap-3 " +
    "rounded-xl px-6 py-4 text-sm font-semibold " +
    "transition-all duration-200 " +
    "disabled:cursor-not-allowed disabled:opacity-50 " +
    (
      isDemo
        ? "bg-sky-400 text-slate-950 hover:bg-sky-300"
        : "bg-emerald-400 text-emerald-950 hover:bg-emerald-300"
    );

  // ========================================
  // State管理
  // ========================================

  const [formData, setFormData] =
    useState<ContactFormData>(initialFormData);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [step, setStep] =
    useState<FormStep>("input");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  // 二重送信防止
  const submitLock = useRef(false);

  // ========================================
  // 入力値更新
  // ========================================

  function updateField<K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K]
  ) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));

    setSubmitError("");
  }

  // ========================================
  // サンプルデータ入力
  // ========================================

  function fillSampleData() {
    if (!isDemo) return;

    setFormData({
      name: "山田 太郎",
      company: "サンプル株式会社",
      email: "sample@example.com",
      category: "technical",
      subject: "Webアプリケーションについて",
      message:
        "ポートフォリオを拝見しました。\n\n" +
        "Webアプリケーションの開発について、" +
        "技術構成やシステム設計の方法を" +
        "お伺いしたいです。",
      consent: false,
    });

    setErrors({});
    setSubmitError("");
  }

  // ========================================
  // バリデーション
  // ========================================

  function validate(): boolean {

    const nextErrors: FormErrors = {};

    // お名前
    if (!formData.name.trim()) {
      nextErrors.name =
        "お名前を入力してください。";

    } else if (formData.name.length > 100) {
      nextErrors.name =
        "100文字以内で入力してください。";
    }

    // 会社名
    if (formData.company.length > 100) {
      nextErrors.company =
        "100文字以内で入力してください。";
    }

    // メールアドレス
    if (!formData.email.trim()) {
      nextErrors.email =
        "メールアドレスを入力してください。";

    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      nextErrors.email =
        "メールアドレスの形式が正しくありません。";

    } else if (formData.email.length > 254) {
      nextErrors.email =
        "メールアドレスが長すぎます。";
    }

    // お問い合わせ種別
    const validCategory = categories.some(
      (category) =>
        category.value === formData.category
    );

    if (!validCategory) {
      nextErrors.category =
        "お問い合わせ種別を選択してください。";

    } else if (
      formData.category === "project" &&
      !isDemo &&
      !acceptingProjects
    ) {
      nextErrors.category =
        "現在、新規案件は受け付けておりません。";
    }

    // 件名
    if (!formData.subject.trim()) {
      nextErrors.subject =
        "件名を入力してください。";

    } else if (formData.subject.length > 100) {
      nextErrors.subject =
        "100文字以内で入力してください。";
    }

    // お問い合わせ内容
    if (!formData.message.trim()) {
      nextErrors.message =
        "お問い合わせ内容を入力してください。";

    } else if (formData.message.length > 3000) {
      nextErrors.message =
        "3000文字以内で入力してください。";
    }

    // 同意確認
    if (!formData.consent) {
      nextErrors.consent = isDemo
        ? "デモ機能の注意事項をご確認ください。"
        : "個人情報の取り扱いへの同意が必要です。";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  // ========================================
  // 確認画面への遷移
  // ========================================

  function handleConfirm(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!canSubmit) return;

    if (!validate()) return;

    setSubmitError("");
    setStep("confirm");
  }

  // ========================================
  // 入力画面へ戻る
  // ========================================

  function handleBack() {
    if (isSubmitting) return;

    setSubmitError("");
    setStep("input");
  }

  // ========================================
  // 送信処理
  // ========================================

  async function handleSubmit() {

    // 二重送信・無効状態のチェック
    if (
      submitLock.current ||
      isSubmitting ||
      !canSubmit
    ) {
      return;
    }

    // 送信前の再バリデーション
    if (!validate()) {
      setStep("input");
      return;
    }

    submitLock.current = true;

    setIsSubmitting(true);
    setSubmitError("");

    // 親コンポーネントへ送信中であることを通知
    onBusyChange?.(true);

    try {

      const requestData: ContactFormData = {
        ...formData,
        name: formData.name.trim(),
        company: formData.company.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      // Service側でデモ・本番処理を切り替える
      await submitContact(
        requestData,
        mode
      );

      // 入力情報の初期化
      setFormData(initialFormData);
      setErrors({});

      // 完了画面へ遷移
      setStep("complete");

    } catch {

      setSubmitError(
        isDemo
          ? "デモ処理中にエラーが発生しました。"
          : "お問い合わせの送信に失敗しました。もう一度お試しください。"
      );

    } finally {

      submitLock.current = false;

      setIsSubmitting(false);

      // 親コンポーネントの送信中状態を解除
      onBusyChange?.(false);

    }
  }

  // ========================================
  // フォーム初期化
  // ========================================

  function resetForm() {
    setFormData(initialFormData);
    setErrors({});
    setSubmitError("");
    setStep("input");
  }

  // ========================================
  // 確認画面表示用データ
  // ========================================

  const confirmationItems = [
    {
      label: "お名前",
      value: formData.name,
    },
    {
      label: "会社名・所属",
      value: formData.company || "未入力",
    },
    {
      label: "メールアドレス",
      value: formData.email,
    },
    {
      label: "お問い合わせ種別",
      value:
        categories.find(
          (category) =>
            category.value === formData.category
        )?.label || "",
    },
    {
      label: "件名",
      value: formData.subject,
    },
    {
      label: "お問い合わせ内容",
      value: formData.message,
    },
  ];

  const currentStepIndex =
    step === "input"
      ? 0
      : step === "confirm"
        ? 1
        : 2;

  // ========================================
  // 画面表示
  // ========================================

  return (
    <div className="space-y-8">

      {/* ==================================
          現在のモード表示
      ================================== */}

      <div
        className={`flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4 ${
          isDemo
            ? "border-sky-500/30 bg-sky-500/5"
            : canSubmit
              ? "border-emerald-500/30 bg-emerald-500/5"
              : "border-amber-500/30 bg-amber-500/5"
        }`}
      >

        <div className="flex items-center gap-3">

          {isDemo ? (
            <FlaskConical
              size={23}
              className="text-sky-400"
            />
          ) : (
            <Send
              size={23}
              className={
                canSubmit
                  ? "text-emerald-400"
                  : "text-amber-400"
              }
            />
          )}

          <div>

            <p className="font-mono text-[10px] tracking-widest text-slate-500">
              CURRENT MODE
            </p>

            <p
              className={`mt-1 text-sm font-bold ${
                isDemo
                  ? "text-sky-400"
                  : canSubmit
                    ? "text-emerald-400"
                    : "text-amber-400"
              }`}
            >
              {isDemo
                ? "デモモード"
                : "本番モード"}
            </p>

          </div>

        </div>

        <span
          className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
            isDemo
              ? "border-sky-500/20 bg-sky-500/10 text-sky-400"
              : canSubmit
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                : "border-amber-500/20 bg-amber-500/10 text-amber-400"
          }`}
        >
          {isDemo
            ? "疑似送信"
            : canSubmit
              ? "実際の送信"
              : "送信機能準備中"}
        </span>

      </div>

      {/* ==================================
          ステップ表示
      ================================== */}

      <ol
        aria-label="フォームの進行状況"
        className="flex items-center"
      >

        {["入力", "確認", "完了"].map(
          (label, index) => {

            const active =
              index <= currentStepIndex;

            const completed =
              index < currentStepIndex;

            return (
              <li
                key={label}
                aria-current={
                  index === currentStepIndex
                    ? "step"
                    : undefined
                }
                className={`flex items-center ${
                  index < 2 ? "flex-1" : ""
                }`}
              >

                <div className="flex shrink-0 flex-col items-center gap-2">

                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm transition-all ${
                      active
                        ? isDemo
                          ? "border-sky-400 bg-sky-500/10 text-sky-400"
                          : "border-emerald-400 bg-emerald-500/10 text-emerald-400"
                        : "border-slate-700 bg-slate-900 text-slate-500"
                    }`}
                  >

                    {completed ? (
                      <CheckCircle2 size={19} />
                    ) : (
                      index + 1
                    )}

                  </span>

                  <span
                    className={`text-xs ${
                      active
                        ? isDemo
                          ? "text-sky-400"
                          : "text-emerald-400"
                        : "text-slate-500"
                    }`}
                  >
                    {label}
                  </span>

                </div>

                {index < 2 && (
                  <div
                    className={`mx-4 mb-6 h-px flex-1 ${
                      completed
                        ? isDemo
                          ? "bg-sky-400"
                          : "bg-emerald-400"
                        : "bg-slate-800"
                    }`}
                  />
                )}

              </li>
            );
          }
        )}

      </ol>

      {/* ==================================
          完了画面
      ================================== */}

      {step === "complete" ? (

        <div
          role="status"
          className="py-12 text-center"
        >

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">

            <CheckCircle2
              size={48}
              strokeWidth={1.5}
              className="text-emerald-400"
            />

          </div>

          <p className="mt-8 font-mono text-xs tracking-widest text-emerald-400">
            {isDemo ? "DEMO SUCCESS" : "SUCCESS"}
          </p>

          <h3 className="mt-4 text-3xl font-bold text-white">
            {isDemo
              ? "Demo Completed."
              : "Message Sent."}
          </h3>

          <p className="mt-5 text-sm font-medium text-slate-200">
            {isDemo
              ? "お問い合わせフォームのデモが完了しました。"
              : "お問い合わせを受け付けました。"}
          </p>

          <p className="mx-auto mt-4 max-w-md text-sm leading-8 text-slate-400">
            {isDemo
              ? "入力された情報は外部に送信・保存されていません。デモをご体験いただきありがとうございます。"
              : "お問い合わせ内容を確認のうえ、順次返信いたします。"}
          </p>

          <button
            type="button"
            onClick={resetForm}
            className={`${secondaryButton} mt-8`}
          >
            <ArrowLeft size={17} />
            フォームに戻る
          </button>

        </div>

      ) : step === "confirm" ? (

        /* ==================================
            確認画面
        ================================== */

        <div className="space-y-6">

          <div>

            <h3 className="text-xl font-bold text-white">
              Confirm Your Message.
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              入力内容をご確認ください。
            </p>

          </div>

          {/* 送信前の注意事項 */}

          <div
            className={`flex items-start gap-3 rounded-xl border p-4 text-xs leading-7 ${
              isDemo
                ? "border-sky-500/20 bg-sky-500/5 text-sky-300"
                : "border-emerald-500/20 bg-emerald-500/5 text-emerald-300"
            }`}
          >

            <AlertCircle
              size={18}
              className="mt-1 shrink-0"
            />

            {isDemo
              ? "デモモードで動作しています。実際の情報送信は行われません。"
              : "送信ボタンを押すと、入力された情報が実際にサーバーへ送信されます。"}

          </div>

          {/* 入力内容一覧 */}

          <dl className="divide-y divide-slate-800 overflow-hidden rounded-xl border border-slate-800">

            {confirmationItems.map((item) => (

              <div
                key={item.label}
                className="grid gap-3 bg-slate-950/30 p-5 sm:grid-cols-[140px_1fr]"
              >

                <dt className="text-xs text-slate-400">
                  {item.label}
                </dt>

                <dd className="min-w-0 whitespace-pre-wrap break-words text-sm leading-7 text-slate-200">
                  {item.value}
                </dd>

              </div>

            ))}

          </dl>

          {/* 送信エラー */}

          {submitError && (

            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm leading-7 text-red-400"
            >

              <AlertCircle
                size={18}
                className="mt-1 shrink-0"
              />

              {submitError}

            </div>

          )}

          {/* 操作ボタン */}

          <div className="grid gap-3 sm:grid-cols-2">

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleBack}
              className={secondaryButton}
            >
              <ArrowLeft size={17} />
              入力内容を修正
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                isSubmitting || !canSubmit
              }
              className={primaryButton}
            >

              {isSubmitting ? (

                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  {isDemo
                    ? "デモ処理中..."
                    : "送信中..."}
                </>

              ) : (

                <>
                  <Send size={18} />

                  {isDemo
                    ? "デモ送信する"
                    : "お問い合わせを送信する"}
                </>

              )}

            </button>

          </div>

        </div>

      ) : (

        /* ==================================
            入力画面
        ================================== */

        <form
          onSubmit={handleConfirm}
          noValidate
          className="space-y-7"
        >

          {/* 本番機能が無効な場合 */}

          {!canSubmit && (

            <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">

              <AlertCircle
                size={22}
                className="mt-0.5 shrink-0 text-amber-400"
              />

              <div>

                <h3 className="text-sm font-semibold text-amber-400">
                  お問い合わせ機能は準備中です。
                </h3>

                <p className="mt-3 text-xs leading-7 text-slate-400">
                  現在、実際のお問い合わせは送信できません。
                  デモモードに切り替えることで、
                  フォームの操作をご体験いただけます。
                </p>

              </div>

            </div>

          )}

          {/* デモ用サンプルデータ */}

          {isDemo && (

            <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-5">

              <div className="flex items-center gap-2">

                <FlaskConical
                  size={17}
                  className="text-sky-400"
                />

                <p className="font-mono text-xs tracking-widest text-sky-400">
                  QUICK DEMO
                </p>

              </div>

              <h3 className="mt-4 text-sm font-semibold text-white">
                サンプルデータで体験する
              </h3>

              <p className="mt-2 text-xs leading-7 text-slate-400">
                サンプルデータを自動入力して、
                フォームの動作を確認できます。
              </p>

              <button
                type="button"
                onClick={fillSampleData}
                className="mt-4 rounded-lg border border-sky-500/30 bg-sky-500/10 px-4 py-2.5 text-xs font-medium text-sky-400 transition-colors hover:bg-sky-500/20"
              >
                サンプルデータを入力
              </button>

            </div>

          )}

          {/* ==================================
              入力項目
          ================================== */}

          <fieldset
            disabled={!canSubmit || isSubmitting}
            className="min-w-0 space-y-7 disabled:opacity-50"
          >

            {/* お名前・会社名 */}

            <div className="grid gap-6 sm:grid-cols-2">

              {/* お名前 */}

              <div>

                <label
                  htmlFor="name"
                  className={labelStyle}
                >
                  お名前
                  <RequiredMark />
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete={
                    isDemo ? "off" : "name"
                  }
                  value={formData.name}
                  onChange={(event) =>
                    updateField(
                      "name",
                      event.target.value
                    )
                  }
                  placeholder="山田 太郎"
                  aria-invalid={
                    Boolean(errors.name)
                  }
                  className={inputStyle}
                />

                <ErrorMessage
                  message={errors.name}
                />

              </div>

              {/* 会社名 */}

              <div>

                <label
                  htmlFor="company"
                  className={labelStyle}
                >
                  会社名・所属

                  <span className="ml-2 text-xs font-normal text-slate-500">
                    任意
                  </span>

                </label>

                <input
                  id="company"
                  name="company"
                  type="text"
                  maxLength={100}
                  autoComplete={
                    isDemo
                      ? "off"
                      : "organization"
                  }
                  value={formData.company}
                  onChange={(event) =>
                    updateField(
                      "company",
                      event.target.value
                    )
                  }
                  placeholder="株式会社〇〇"
                  aria-invalid={
                    Boolean(errors.company)
                  }
                  className={inputStyle}
                />

                <ErrorMessage
                  message={errors.company}
                />

              </div>

            </div>

            {/* メールアドレス */}

            <div>

              <label
                htmlFor="email"
                className={labelStyle}
              >
                メールアドレス
                <RequiredMark />
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete={
                  isDemo ? "off" : "email"
                }
                value={formData.email}
                onChange={(event) =>
                  updateField(
                    "email",
                    event.target.value
                  )
                }
                placeholder="sample@example.com"
                aria-invalid={
                  Boolean(errors.email)
                }
                className={inputStyle}
              />

              <ErrorMessage
                message={errors.email}
              />

            </div>

            {/* お問い合わせ種別 */}

            <div>

              <label
                htmlFor="category"
                className={labelStyle}
              >
                お問い合わせ種別
                <RequiredMark />
              </label>

              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={(event) =>
                  updateField(
                    "category",
                    event.target.value as
                      ContactCategory | ""
                  )
                }
                aria-invalid={
                  Boolean(errors.category)
                }
                className={`${inputStyle} cursor-pointer [color-scheme:dark]`}
              >

                <option value="" disabled>
                  選択してください
                </option>

                {categories.map((category) => {

                  const disabled =
                    category.value === "project" &&
                    !isDemo &&
                    !acceptingProjects;

                  return (

                    <option
                      key={category.value}
                      value={category.value}
                      disabled={disabled}
                    >

                      {category.label}

                      {disabled
                        ? "（受付停止中）"
                        : ""}

                    </option>

                  );
                })}

              </select>

              <ErrorMessage
                message={errors.category}
              />

            </div>

            {/* 件名 */}

            <div>

              <label
                htmlFor="subject"
                className={labelStyle}
              >
                件名
                <RequiredMark />
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                required
                maxLength={100}
                value={formData.subject}
                onChange={(event) =>
                  updateField(
                    "subject",
                    event.target.value
                  )
                }
                placeholder="お問い合わせの件名"
                aria-invalid={
                  Boolean(errors.subject)
                }
                className={inputStyle}
              />

              <ErrorMessage
                message={errors.subject}
              />

            </div>

            {/* お問い合わせ内容 */}

            <div>

              <label
                htmlFor="message"
                className={labelStyle}
              >
                お問い合わせ内容
                <RequiredMark />
              </label>

              <textarea
                id="message"
                name="message"
                required
                rows={8}
                maxLength={3000}
                value={formData.message}
                onChange={(event) =>
                  updateField(
                    "message",
                    event.target.value
                  )
                }
                placeholder="お問い合わせ内容をご入力ください。"
                aria-invalid={
                  Boolean(errors.message)
                }
                className={`${inputStyle} min-h-48 resize-y leading-7`}
              />

              <div className="mt-2 flex items-start justify-between gap-3">

                <ErrorMessage
                  message={errors.message}
                />

                <p className="ml-auto shrink-0 font-mono text-xs text-slate-500">
                  {formData.message.length.toLocaleString()}
                  {" / 3,000"}
                </p>

              </div>

            </div>

            {/* 注意事項・同意 */}

            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">

              <div className="flex items-center gap-2">

                <ShieldCheck
                  size={18}
                  className={
                    isDemo
                      ? "text-sky-400"
                      : "text-emerald-400"
                  }
                />

                <h3 className="text-sm font-medium text-slate-200">

                  {isDemo
                    ? "デモ機能について"
                    : "個人情報の取り扱いについて"}

                </h3>

              </div>

              <p className="mt-3 text-xs leading-7 text-slate-400">

                {isDemo
                  ? "本フォームはポートフォリオ用のデモ機能です。入力情報の外部送信・永続化は行いません。実際の個人情報や機密情報は入力しないでください。"
                  : "ご入力いただいた個人情報は、お問い合わせへの回答および必要な連絡を行う目的で使用します。パスワードなどの機密情報は入力しないでください。"}

              </p>

              <label className="mt-5 flex cursor-pointer items-start gap-3 border-t border-slate-800 pt-5">

                <input
                  type="checkbox"
                  name="consent"
                  required
                  checked={formData.consent}
                  onChange={(event) =>
                    updateField(
                      "consent",
                      event.target.checked
                    )
                  }
                  aria-invalid={
                    Boolean(errors.consent)
                  }
                  className={`mt-0.5 h-4 w-4 shrink-0 ${
                    isDemo
                      ? "accent-sky-400"
                      : "accent-emerald-400"
                  }`}
                />

                <span className="text-sm leading-6 text-slate-300">

                  {isDemo
                    ? "デモ機能の注意事項を確認しました"
                    : "個人情報の取り扱いに同意する"}

                  <RequiredMark />

                </span>

              </label>

              <ErrorMessage
                message={errors.consent}
              />

            </div>

          </fieldset>

          {/* ==================================
              確認ボタン
          ================================== */}

          <button
            type="submit"
            disabled={
              !canSubmit || isSubmitting
            }
            className={`${primaryButton} w-full`}
          >

            {canSubmit
              ? "入力内容を確認する"
              : "送信機能は準備中です"}

            <ArrowRight size={18} />

          </button>

        </form>

      )}

    </div>
  );
}
