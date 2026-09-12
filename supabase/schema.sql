-- Orgelverein Ferschnitz — Supabase Schema
-- In Supabase: SQL Editor -> diesen Inhalt einfügen -> Run

create table if not exists aktivitaeten (
  id uuid primary key default gen_random_uuid(),
  titel text not null,
  beschreibung text,
  datum date,
  ort text,
  bild_url text,
  created_at timestamptz default now()
);

create table if not exists vorstand (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  funktion text,
  beschreibung text,
  foto_url text,
  reihenfolge int default 0,
  created_at timestamptz default now()
);

alter table aktivitaeten enable row level security;
alter table vorstand enable row level security;

create policy "aktivitaeten_select_all" on aktivitaeten
  for select using (true);
create policy "aktivitaeten_write_auth" on aktivitaeten
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "vorstand_select_all" on vorstand
  for select using (true);
create policy "vorstand_write_auth" on vorstand
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create table if not exists newsletter_abos (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz default now()
);

alter table newsletter_abos enable row level security;

create policy "newsletter_insert_public" on newsletter_abos
  for insert with check (true);
create policy "newsletter_select_auth" on newsletter_abos
  for select using (auth.role() = 'authenticated');
create policy "newsletter_delete_auth" on newsletter_abos
  for delete using (auth.role() = 'authenticated');

-- Storage: im Dashboard unter Storage zwei Buckets anlegen, jeweils "Public" aktiviert:
--   aktivitaeten-bilder
--   vorstand-fotos
