import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, authenticateAdmin, issueAdminToken } from '../../../../lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let body: { username?: string; password?: string } = {};

  try {
    body = (await request.json()) as { username?: string; password?: string };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!authenticateAdmin(body.username || '', body.password || '')) {
    return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, issueAdminToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

