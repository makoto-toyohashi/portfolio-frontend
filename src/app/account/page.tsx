import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
export const metadata: Metadata = {title:'Account'};
export default async function AccountPage() {
  const session = await auth0.getSession();
  if (!session) redirect('/auth/login?returnTo=/account');
  const {user} = session;
  const fields = [['ユーザーID',user.sub],['名前',user.name ?? '未設定'],['メールアドレス',user.email ?? '未設定'],['メール認証',user.email_verified === true ? '確認済み' : '未確認']];
  return <main className="mx-auto max-w-3xl px-4 py-16">
    <p className="text-xs tracking-widest text-sky-400">MY ACCOUNT</p>
    <h1 className="mt-4 text-4xl font-bold text-white">Your Profile.</h1>
    <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
      <p className="text-sm text-emerald-400">● ログイン中</p>
      <dl className="mt-6 divide-y divide-slate-800">{fields.map(([label,value])=><div key={label} className="py-4"><dt className="text-sm text-slate-400">{label}</dt><dd className="mt-1 break-all text-white">{value}</dd></div>)}</dl>
      <a className="mt-6 inline-block rounded-lg border border-slate-600 px-5 py-3 text-white" href="/auth/logout">ログアウト</a>
    </section>
    <Link href="/" className="mt-6 inline-block text-sky-400">ホームへ戻る</Link>
  </main>;
}
