import 'server-only';

import { Pool } from 'pg';
import { defaultContent, type EditableContent } from './content-data';
import { type Service, type Testimonial } from '../config/site';

declare global {
  // eslint-disable-next-line no-var
  var __eternoTarotPool: Pool | undefined;
}

function getPool() {
  const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;
  if (!connectionString) {
    throw new Error('Missing DATABASE_URL or DIRECT_URL.');
  }

  if (!globalThis.__eternoTarotPool) {
    globalThis.__eternoTarotPool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 1,
    });
  }

  return globalThis.__eternoTarotPool;
}

async function ensureSchema() {
  const pool = getPool();
  await pool.query(`
    create table if not exists eternal_tarot_services (
      id text primary key,
      title text not null,
      slug text not null,
      category text not null,
      image text not null,
      summary text not null,
      details text not null,
      includes jsonb not null default '[]'::jsonb,
      prices jsonb not null default '[]'::jsonb,
      note text,
      featured text,
      sort_order integer not null default 0,
      updated_at timestamptz not null default now()
    );

    create table if not exists eternal_tarot_testimonials (
      id text primary key,
      title text not null,
      image text not null,
      sort_order integer not null default 0,
      updated_at timestamptz not null default now()
    );
  `);
}

function mapService(row: Record<string, unknown>): Service {
  return {
    id: String(row.id),
    title: String(row.title),
    slug: String(row.slug),
    category: String(row.category),
    image: String(row.image),
    summary: String(row.summary),
    details: String(row.details),
    includes: Array.isArray(row.includes) ? (row.includes as string[]) : [],
    prices: Array.isArray(row.prices)
      ? (row.prices as Service['prices'])
      : [],
    note: typeof row.note === 'string' ? row.note : undefined,
    featured: typeof row.featured === 'string' ? row.featured : undefined,
  };
}

function mapTestimonial(row: Record<string, unknown>): Testimonial {
  return {
    id: String(row.id),
    title: String(row.title),
    image: String(row.image),
  };
}

export async function loadSiteContent(): Promise<EditableContent> {
  try {
    await ensureSchema();
    const pool = getPool();
    const [servicesResult, testimonialsResult] = await Promise.all([
      pool.query('select * from eternal_tarot_services order by sort_order asc, title asc'),
      pool.query('select * from eternal_tarot_testimonials order by sort_order asc, title asc'),
    ]);

    if (servicesResult.rowCount === 0 && testimonialsResult.rowCount === 0) {
      return defaultContent;
    }

    return {
      services: servicesResult.rows.map(mapService),
      testimonials: testimonialsResult.rows.map(mapTestimonial),
    };
  } catch {
    return defaultContent;
  }
}

export async function saveSiteContent(content: EditableContent) {
  await ensureSchema();
  const pool = getPool();

  const client = await pool.connect();
  try {
    await client.query('begin');
    await client.query('delete from eternal_tarot_services');
    await client.query('delete from eternal_tarot_testimonials');

    for (const [index, service] of content.services.entries()) {
      await client.query(
        `
          insert into eternal_tarot_services (
            id, title, slug, category, image, summary, details, includes, prices, note, featured, sort_order, updated_at
          ) values ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9::jsonb,$10,$11,$12,now())
        `,
        [
          service.id,
          service.title,
          service.slug,
          service.category,
          service.image,
          service.summary,
          service.details,
          JSON.stringify(service.includes),
          JSON.stringify(service.prices),
          service.note || null,
          service.featured || null,
          index,
        ],
      );
    }

    for (const [index, testimonial] of content.testimonials.entries()) {
      await client.query(
        `
          insert into eternal_tarot_testimonials (
            id, title, image, sort_order, updated_at
          ) values ($1,$2,$3,$4,now())
        `,
        [testimonial.id, testimonial.title, testimonial.image, index],
      );
    }

    await client.query('commit');
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    client.release();
  }
}
