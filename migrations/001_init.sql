create table if not exists fridge_items (
  id bigserial primary key,
  owner text not null,
  name text not null,
  created_at timestamptz not null default now(),
  unique (owner, name)
);

create index if not exists fridge_items_owner_idx on fridge_items (owner);

create table if not exists recipes (
  id bigserial primary key,
  owner text not null,
  title text not null,
  summary text not null default '',
  minutes integer not null default 20,
  servings integer not null default 2,
  mood text not null default 'everyday',
  source text not null default 'suggest',
  buzz_note text not null default '',
  ingredients jsonb not null default '[]'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  tips jsonb not null default '[]'::jsonb,
  matched_ingredients jsonb not null default '[]'::jsonb,
  missing_ingredients jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists recipes_owner_created_idx on recipes (owner, created_at desc);
