import 'server-only';
import { Auth0Client } from '@auth0/nextjs-auth0/server';

export const auth0 = new Auth0Client({
  enableAccessTokenEndpoint: false,
  authorizationParameters: {
    scope: 'openid profile email' + (process.env.AUTH0_AUDIENCE ? ' offline_access' : ''),
    ...(process.env.AUTH0_AUDIENCE ? { audience: process.env.AUTH0_AUDIENCE } : {}),
  },
});
