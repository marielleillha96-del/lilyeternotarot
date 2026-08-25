import 'server-only';

import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE_NAME = 'eterno_admin_token';
export const ADMIN_USERNAME = 'lily';
export const ADMIN_PASSWORD = 'lilytarot';
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

type JwtPayload = {
  sub: string;
  role: 'admin';
  iat: number;
  exp: number;
};

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  return Buffer.from(padded, 'base64').toString('utf8');
}

function getSecret() {
  return process.env.ADMIN_JWT_SECRET || process.env.AUTH_SECRET || 'dev-admin-secret-change-me';
}

function sign(input: string) {
  return createHmac('sha256', getSecret()).update(input).digest('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function authenticateAdmin(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function issueAdminToken() {
  const now = Math.floor(Date.now() / 1000);
  const payload: JwtPayload = {
    sub: ADMIN_USERNAME,
    role: 'admin',
    iat: now,
    exp: now + TOKEN_TTL_SECONDS,
  };

  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(`${encodedHeader}.${encodedPayload}`);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verifyAdminToken(token: string | undefined | null) {
  if (!token) return null;

  const [encodedHeader, encodedPayload, signature] = token.split('.');
  if (!encodedHeader || !encodedPayload || !signature) return null;

  const expectedSignature = sign(`${encodedHeader}.${encodedPayload}`);
  if (!safeEqual(signature, expectedSignature)) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as JwtPayload;
    if (payload.role !== 'admin') return null;
    if (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) return null;
    if (payload.sub !== ADMIN_USERNAME) return null;
    return payload;
  } catch {
    return null;
  }
}

