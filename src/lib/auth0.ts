import 'server-only';
import { Auth0Client } from '@auth0/nextjs-auth0/server';

export const auth0 = new Auth0Client({
  // アプリケーションのベースURL
  appBaseUrl: process.env.APP_BASE_URL,

  // アクセストークン取得エンドポイントの無効化
  enableAccessTokenEndpoint: false,

  // 認証リクエストのパラメータ設定
  authorizationParameters: {
    scope: 'openid profile email' +
      (process.env.AUTH0_AUDIENCE ? ' offline_access' : ''),

    ...(process.env.AUTH0_AUDIENCE
      ? { audience: process.env.AUTH0_AUDIENCE }
      : {}),
  },
});