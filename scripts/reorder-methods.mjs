import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Pool } from 'pg';

const methods = JSON.parse(await readFile(new URL('../src/config/new-methods.json', import.meta.url), 'utf8'));
const removedIds = JSON.parse(await readFile(new URL('../src/config/removed-methods.json', import.meta.url), 'utf8'));
const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;
if (!connectionString) throw new Error('Configure DATABASE_URL ou DIRECT_URL.');

const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false }, max: 1, connectionTimeoutMillis: 10000 });
let client;
try {
  client = await pool.connect();
  await client.query('begin');
  await client.query('lock table eternal_tarot_services in share row exclusive mode');
  const { rows: before } = await client.query('select * from eternal_tarot_services order by sort_order, title, id');
  const promoted = methods.map((method) => {
    const matches = before.filter((row) => row.slug === method.slug);
    assert.equal(matches.length, 1, `Cadastro ausente ou duplicado: ${method.slug}`);
    return matches[0];
  });
  const expected = [
    ...promoted,
    ...before.filter((row) => !removedIds.includes(row.id) && !promoted.some((method) => method.id === row.id)),
  ];
  const deleted = await client.query('delete from eternal_tarot_services where id = any($1::text[])', [removedIds]);
  for (const [index, row] of expected.entries()) {
    await client.query('update eternal_tarot_services set sort_order = $1 where id = $2', [index, row.id]);
  }
  const { rows: after } = await client.query('select * from eternal_tarot_services order by sort_order, title, id');
  assert.deepEqual(after, expected.map((row, index) => ({ ...row, sort_order: index })));
  await client.query('commit');
  console.log(`${deleted.rowCount} consultas excluidas; ${promoted.length} metodos no topo; ${after.length} consultas restantes. Conteudo preservado e ordem verificada.`);
} catch (error) {
  if (client) await client.query('rollback');
  console.error(`Atualizacao nao realizada (${error.code || error.name}).`);
  process.exitCode = 1;
} finally {
  client?.release();
  await pool.end();
}
