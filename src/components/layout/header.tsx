
import Link from "next/link";
import { site } from "@/config/site";
import { AuthNavigation } from "@/components/auth/auth-navigation";

export function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-5">

        {/* サイト名 */}
        <Link
          href="/"
          className="font-mono text-xl font-bold text-sky-400"
        >
          {site.name}
        </Link>

        {/* ナビゲーション */}
        <nav className="flex flex-wrap items-center gap-6">
          {site.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300 transition-colors hover:text-sky-400"
            >
              {item.label}
            </Link>
          ))}

          {/* ログイン・ログアウトボタン */}
          <div className="border-l border-slate-700 pl-6">
            <AuthNavigation />
          </div>
        </nav>

      </div>
    </header>
  );
}
