import { redirect } from 'next/navigation';
import { auth0 } from '@/lib/auth0';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Login' };
export default async function LoginPage() {
  if (await auth0.getSession()) redirect('/account');
  return <main className="mx-auto max-w-xl py-20 px-4">
    <p className="text-xs tracking-widest text-sky-400">IDENTITY / SECURITY</p>
    <h1 className="mt-4 text-5xl font-bold text-white">Welcome back.</h1>
    <p className="mt-5 text-slate-400">Auth0による安全な認証でポートフォリオにログインします。</p>
    <section className="mt-8 space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
      <a className="block rounded-xl bg-sky-500 p-4 text-center font-semibold text-slate-950 hover:bg-sky-400" href="/auth/login?returnTo=/account">ログイン</a>
      <a className="block rounded-xl border border-slate-700 p-4 text-center text-white" href="/auth/login?screen_hint=signup&returnTo=/account">新規アカウント登録</a>
      <p className="text-xs text-slate-400">OAuth 2.0 / OpenID Connect · Universal Login</p>
    </section>
  </main>;
}
