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

