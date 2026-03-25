-- Run this in Supabase SQL editor
create extension if not exists "uuid-ossp";

create table if not exists site_content (
  id uuid primary key default uuid_generate_v4(),
  content jsonb not null,
  updated_at timestamptz default now()
);

insert into site_content (id, content)
values ('00000000-0000-0000-0000-000000000001', '{}')
on conflict (id) do nothing;

alter table site_content enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'site_content' and policyname = 'Public read access'
  ) then
    create policy "Public read access" on site_content for select using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'site_content' and policyname = 'Admin write access'
  ) then
    create policy "Admin write access" on site_content for update using (true);
  end if;
end $$;
