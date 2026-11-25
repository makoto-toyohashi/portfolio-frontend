
import type { ContributionResponse } from "@/types/github";

/* =========================================================
 * 型定義
 * ========================================================= */

type ContributionGraphProps = {
  data: ContributionResponse;
};

type ContributionWeek = ContributionResponse["weeks"][number];

type ContributionDay = ContributionWeek["days"][number];

type ContributionCalendarProps = {
  weeks: ContributionWeek[];
  totalContributions: number;
};

type ContributionCellProps = {
  day: ContributionDay;
  weekIndex: number;
};

type ContributionStat = {
  label: string;
  value: number;
  unit: string;
};

/* =========================================================
 * 定数定義
 * ========================================================= */

/** 活動レベルごとの表示色 */
const CONTRIBUTION_COLORS: Record<string, string> = {
  NONE: "#263244",
  FIRST_QUARTILE: "#0e4429",
  SECOND_QUARTILE: "#006d32",
  THIRD_QUARTILE: "#26a641",
  FOURTH_QUARTILE: "#39d353",
};

/** カレンダーの描画設定 */
const CALENDAR_LAYOUT = {
  CELL_SIZE: 10,
  CELL_SPACING: 13,
  CELL_RADIUS: 2,
  OFFSET_X: 36,
  OFFSET_Y: 20,
  HEIGHT: 116,
  MONTH_LABEL_Y: 12,
  WEEKDAY_LABEL_Y: 28,
} as const;

/** 曜日ラベル */
const WEEKDAY_LABELS = [
  { day: 1, label: "Mon" },
  { day: 3, label: "Wed" },
  { day: 5, label: "Fri" },
] as const;

/* =========================================================
 * ユーティリティ関数
 * ========================================================= */

/**
 * 日付文字列から曜日番号を取得する。
 * 日曜日を0、土曜日を6とする。
 */
function getWeekday(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

/**
 * 日付文字列から月を取得する。
 */
function getMonth(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCMonth() + 1;
}

/**
 * 月ラベルを表示するか判定する。
 */
function shouldShowMonth(
  currentDate: string | undefined,
  previousDate: string | undefined,
): boolean {
  if (!currentDate) {
    return false;
  }

  if (!previousDate) {
    return true;
  }

  return getMonth(currentDate) !== getMonth(previousDate);
}

/**
 * 指定した週のX座標を取得する。
 */
function getWeekPositionX(weekIndex: number): number {
  return (
    CALENDAR_LAYOUT.OFFSET_X +
    weekIndex * CALENDAR_LAYOUT.CELL_SPACING
  );
}

/**
 * 指定した日付のY座標を取得する。
 */
function getDayPositionY(date: string): number {
  return (
    CALENDAR_LAYOUT.OFFSET_Y +
    getWeekday(date) * CALENDAR_LAYOUT.CELL_SPACING
  );
}

/**
 * 日時を日本時間の文字列に変換する。
 */
function formatDateTime(date: string): string {
  return new Date(date).toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
  });
}

/**
 * 活動統計情報を生成する。
 */
function createContributionStats(
  data: ContributionResponse,
): ContributionStat[] {
  return [
    {
      label: "年間活動数",
      value: data.totalContributions,
      unit: "件",
    },
    {
      label: "今月の活動数",
      value: data.monthlyContributions,
      unit: "件",
    },
    {
      label: "活動日数",
      value: data.activeDays,
      unit: "日",
    },
    {
      label: "連続活動",
      value: data.currentStreak,
      unit: "日",
    },
    {
      label: "最長連続活動",
      value: data.longestStreak,
      unit: "日",
    },
  ];
}

/* =========================================================
 * ヘッダー
 * ========================================================= */

/**
 * Contribution Graphのタイトルと
 * GitHubプロフィールへのリンクを表示する。
 */
function ContributionHeader({
  username,
}: {
  username: string;
}) {
  const profileUrl =
    `https://github.com/${encodeURIComponent(username)}`;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2
          id="github-heading"
          className="text-xl font-semibold text-white"
        >
          GitHub Contributions
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          過去1年間の開発活動
        </p>
      </div>

      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-sky-400 hover:underline"
      >
        {`@${username} ↗`}
      </a>
    </div>
  );
}

/* =========================================================
 * カレンダーセル
 * ========================================================= */

/**
 * 1日分のContributionを描画する。
 */
function ContributionCell({
  day,
  weekIndex,
}: ContributionCellProps) {
  const positionX = getWeekPositionX(weekIndex);
  const positionY = getDayPositionY(day.date);

  const color =
    CONTRIBUTION_COLORS[day.level] ??
    CONTRIBUTION_COLORS.NONE;

  const tooltip = `${day.date}: ${day.count} 件`;

  return (
    <rect
      x={positionX}
      y={positionY}
      width={CALENDAR_LAYOUT.CELL_SIZE}
      height={CALENDAR_LAYOUT.CELL_SIZE}
      rx={CALENDAR_LAYOUT.CELL_RADIUS}
      fill={color}
    >
      <title>{tooltip}</title>
    </rect>
  );
}

/* =========================================================
 * カレンダー
 * ========================================================= */

/**
 * 曜日ラベルを描画する。
 */
function WeekdayLabels() {
  return (
    <>
      {WEEKDAY_LABELS.map(({ day, label }) => (
        <text
          key={day}
          x={0}
          y={
            CALENDAR_LAYOUT.WEEKDAY_LABEL_Y +
            day * CALENDAR_LAYOUT.CELL_SPACING
          }
          fill="#94a3b8"
          fontSize={10}
        >
          {label}
        </text>
      ))}
    </>
  );
}

/**
 * 1週間分のContributionを描画する。
 */
function ContributionWeekColumn({
  week,
  weekIndex,
  previousWeek,
}: {
  week: ContributionWeek;
  weekIndex: number;
  previousWeek?: ContributionWeek;
}) {
  const firstDate = week.days[0]?.date;
  const previousDate = previousWeek?.days[0]?.date;

  const showMonth = shouldShowMonth(
    firstDate,
    previousDate,
  );

  return (
    <g>
      {showMonth && firstDate && (
        <text
          x={getWeekPositionX(weekIndex)}
          y={CALENDAR_LAYOUT.MONTH_LABEL_Y}
          fill="#94a3b8"
          fontSize={10}
        >
          {`${getMonth(firstDate)}月`}
        </text>
      )}

      {week.days.map((day) => (
        <ContributionCell
          key={day.date}
          day={day}
          weekIndex={weekIndex}
        />
      ))}
    </g>
  );
}

/**
 * 過去1年間のContribution Calendarを表示する。
 */
function ContributionCalendar({
  weeks,
  totalContributions,
}: ContributionCalendarProps) {
  const width =
    CALENDAR_LAYOUT.OFFSET_X +
    weeks.length * CALENDAR_LAYOUT.CELL_SPACING;

  return (
    <div
      className="overflow-x-auto pb-2"
      tabIndex={0}
      aria-label="活動カレンダー（横スクロール可能）"
    >
      <svg
        width={width}
        height={CALENDAR_LAYOUT.HEIGHT}
        viewBox={`0 0 ${width} ${CALENDAR_LAYOUT.HEIGHT}`}
        className="block max-w-none"
        role="img"
        aria-label={`過去1年間の活動数 ${totalContributions} 件`}
      >
        <WeekdayLabels />

        {weeks.map((week, weekIndex) => (
          <ContributionWeekColumn
            key={week.days[0]?.date ?? weekIndex}
            week={week}
            weekIndex={weekIndex}
            previousWeek={weeks[weekIndex - 1]}
          />
        ))}
      </svg>
    </div>
  );
}

/* =========================================================
 * 凡例
 * ========================================================= */

/**
 * Contributionの活動レベルを示す凡例を表示する。
 */
function ContributionLegend() {
  return (
    <div className="flex items-center justify-end gap-1 text-xs text-slate-400">
      <span>Less</span>

      {Object.entries(CONTRIBUTION_COLORS).map(
        ([level, color]) => (
          <span
            key={level}
            className="h-3 w-3 rounded-sm"
            style={{ backgroundColor: color }}
          />
        ),
      )}

      <span>More</span>
    </div>
  );
}

/* =========================================================
 * 統計情報
 * ========================================================= */

/**
 * 個別の統計情報をカードとして表示する。
 */
function ContributionStatCard({
  label,
  value,
  unit,
}: ContributionStat) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-semibold tabular-nums text-white">
        {value.toLocaleString("ja-JP")}

        <span className="ml-1 text-xs text-slate-400">
          {unit}
        </span>
      </p>
    </div>
  );
}

/**
 * Contributionの統計情報を一覧表示する。
 */
function ContributionStatistics({
  data,
}: ContributionGraphProps) {
  const stats = createContributionStats(data);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((stat) => (
        <ContributionStatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          unit={stat.unit}
        />
      ))}
    </div>
  );
}

/* =========================================================
 * メインコンポーネント
 * ========================================================= */

/**
 * GitHubの開発活動を可視化するコンポーネント。
 *
 * Javaバックエンドから取得したContribution情報を基に、
 * 活動カレンダーおよび統計情報を表示する。
 */
export function ContributionGraph({
  data,
}: ContributionGraphProps) {
  return (
    <section
      aria-labelledby="github-heading"
      className="space-y-5 rounded-2xl border border-white/10 bg-slate-900 p-4 sm:p-6"
    >
      <ContributionHeader
        username={data.username}
      />

      <ContributionCalendar
        weeks={data.weeks}
        totalContributions={data.totalContributions}
      />

      <ContributionLegend />

      <ContributionStatistics
        data={data}
      />

      <p className="text-xs text-slate-500">
        {`最終取得: ${formatDateTime(data.fetchedAt)} (JST)`}
      </p>
    </section>
  );
}
