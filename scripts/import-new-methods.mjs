import { readFile } from 'node:fs/promises';
import { Pool } from 'pg';

const methods = JSON.parse(await readFile(new URL('../src/config/new-methods.json', import.meta.url), 'utf8'));
const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;
if (!connectionString) throw new Error('Configure DATABASE_URL ou DIRECT_URL.');

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  max: 1,
  connectionTimeoutMillis: 10000,
});

let client;
try {
  client = await pool.connect();
  await client.query('begin');
  await client.query('lock table eternal_tarot_services in share row exclusive mode');
  const { rows } = await client.query('select coalesce(max(sort_order), -1) + 1 as next_order from eternal_tarot_services');
  let nextOrder = rows[0].next_order;
  for (const method of methods) {
    const existing = await client.query(
      'select id from eternal_tarot_services where id = $1 or slug = $2 or lower(title) = lower($3)',
      [method.id, method.slug, method.title],
    );
    if (existing.rowCount > 1) throw new Error(`Mais de um cadastro encontrado: ${method.title}`);
    const values = [
      existing.rows[0]?.id ?? method.id, method.title, method.slug,
      method.category, method.image, method.summary, method.summary,
      JSON.stringify(method.includes), JSON.stringify(method.prices), nextOrder,
    ];
    await client.query(`
      insert into eternal_tarot_services
        (id, title, slug, category, image, summary, details, includes, prices, sort_order)
      values ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9::jsonb,$10)
      on conflict (id) do update set
        title = excluded.title, slug = excluded.slug, category = excluded.category,
        image = excluded.image, summary = excluded.summary, details = excluded.details,
        includes = excluded.includes, prices = excluded.prices, updated_at = now()
    `, values);
    if (!existing.rowCount) nextOrder += 1;
  }
  await client.query('commit');
  console.log(`${methods.length} metodos importados. Outros cadastros e feedbacks preservados.`);
} catch (error) {
  if (client) await client.query('rollback');
  console.error(`Importacao nao realizada (${error.code || error.name}). Verifique a conexao com o banco.`);
  process.exitCode = 1;
} finally {
  client?.release();
  await pool.end();
}
