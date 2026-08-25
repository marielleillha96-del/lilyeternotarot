import { NextResponse } from 'next/server';
import { loadSiteContent, saveSiteContent } from '../../../lib/site-db';
import { defaultContent, type EditableContent } from '../../../lib/content-data';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '../../../lib/admin-auth';

export const runtime = 'nodejs';

export async function GET() {
  const content = await loadSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const token = request.headers.get('cookie')?.match(new RegExp(`${ADMIN_COOKIE_NAME}=([^;]+)`))?.[1];
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  let body: Partial<EditableContent> = {};

  try {
    body = (await request.json()) as Partial<EditableContent>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  await saveSiteContent({
    services: Array.isArray(body.services) ? body.services : defaultContent.services,
    testimonials: Array.isArray(body.testimonials) ? body.testimonials : defaultContent.testimonials,
  });

  return NextResponse.json({ ok: true });
}
