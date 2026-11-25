
import Link from "next/link";
import { LogIn, LogOut, UserRound } from "lucide-react";
import { auth0 } from "@/lib/auth0";

export async function AuthNavigation() {
  const session = await auth0.getSession();

  // 未ログイン時
  if (!session) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-400"
      >
        <LogIn size={16} />
        Login
      </Link>
    );
  }

  // ログイン済み
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/account"
        className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-sky-400 hover:text-sky-400"
      >
        <UserRound size={16} />
        Account
      </Link>

      <a
        href="/auth/logout"
        className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-red-400 hover:text-red-400"
      >
        <LogOut size={16} />
        Logout
      </a>
    </div>
  );
}
