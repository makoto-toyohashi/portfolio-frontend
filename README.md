# Portfolio Frontend

Next.js App Router / TypeScript / Tailwind CSS のポートフォリオ基盤。

## ローカル起動（Node.js 22 推奨）

```bash
npm install
npm run dev
```

http://localhost:3000 を開く。初回 npm install で生成される package-lock.json は Git に登録すること。

## 品質チェック

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

## API連携

Java APIが未完成でも画面は動作する。接続時に `.env.example` を `.env.local` にコピーし、`API_BASE_URL` を設定する（例: `https://api.example.com/api/v1`）。
Spring Boot側には `GET /api/v1/health` を作り、`{"status":"UP"}` を返す想定。
- `/api/health`: フロントエンド自身の稼働確認
- `/api/backend-health`: Java APIの接続確認（未設定・接続失敗は503）
- `src/lib/api/client.ts`: サーバー専用の共通通信処理。ブラウザからはNext.jsのRoute Handlerを経由する。任意URLを中継する汎用プロキシは作らない。
- 認証・認可、入力検証、レート制限は業務API実装時に追加する。型定義は実行時のレスポンス検証を代替しない。

## Vercel公開

GitHubにリポジトリを作成し、ソースと package-lock.json をpushする。VercelでAdd New Projectからリポジトリを選択し、Next.jsとしてDeploy。Java API完成後、VercelのEnvironment VariablesにAPI_BASE_URLを設定して再デプロイする。Hobbyは非商用用途に限定される。

## 現在の範囲

トップページ、共通ヘッダー・フッター、5つの準備中ページ、404・エラー・ローディング、API接続基盤、CI設定。認証・DB・問い合わせ送信・Java APIは未実装。

依存パッケージの取得ができない環境で作成したため、npm install、ビルド、実行確認は未実施。初回インストール後に上記品質チェックを実行すること。
