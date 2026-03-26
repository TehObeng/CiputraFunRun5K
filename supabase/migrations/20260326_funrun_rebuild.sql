create table if not exists public.site_content (
  slug text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  role text not null default 'admin' check (role = 'admin'),
  status text not null default 'active' check (status in ('active', 'disabled')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_site_content_updated_at on public.site_content;
create trigger set_site_content_updated_at
before update on public.site_content
for each row
execute function public.set_updated_at();

drop trigger if exists set_admin_users_updated_at on public.admin_users;
create trigger set_admin_users_updated_at
before update on public.admin_users
for each row
execute function public.set_updated_at();

create or replace function public.is_admin(check_user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = coalesce(check_user_id, auth.uid())
      and role = 'admin'
      and status = 'active'
  );
$$;

grant execute on function public.is_admin(uuid) to anon;
grant execute on function public.is_admin(uuid) to authenticated;

alter table public.site_content enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "site_content_public_read" on public.site_content;
create policy "site_content_public_read"
on public.site_content
for select
to anon, authenticated
using (slug = 'landing-page');

drop policy if exists "site_content_admin_insert" on public.site_content;
create policy "site_content_admin_insert"
on public.site_content
for insert
to authenticated
with check (slug = 'landing-page' and public.is_admin(auth.uid()));

drop policy if exists "site_content_admin_update" on public.site_content;
create policy "site_content_admin_update"
on public.site_content
for update
to authenticated
using (slug = 'landing-page' and public.is_admin(auth.uid()))
with check (slug = 'landing-page' and public.is_admin(auth.uid()));

drop policy if exists "admin_users_self_read" on public.admin_users;
create policy "admin_users_self_read"
on public.admin_users
for select
to authenticated
using (auth.uid() = user_id or public.is_admin(auth.uid()));

drop policy if exists "admin_users_admin_insert" on public.admin_users;
create policy "admin_users_admin_insert"
on public.admin_users
for insert
to authenticated
with check (public.is_admin(auth.uid()));

drop policy if exists "admin_users_admin_update" on public.admin_users;
create policy "admin_users_admin_update"
on public.admin_users
for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "admin_users_admin_delete" on public.admin_users;
create policy "admin_users_admin_delete"
on public.admin_users
for delete
to authenticated
using (public.is_admin(auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "site_media_public_read" on storage.objects;
create policy "site_media_public_read"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'site-media');

drop policy if exists "site_media_admin_insert" on storage.objects;
create policy "site_media_admin_insert"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'site-media' and public.is_admin(auth.uid()));

drop policy if exists "site_media_admin_update" on storage.objects;
create policy "site_media_admin_update"
on storage.objects
for update
to authenticated
using (bucket_id = 'site-media' and public.is_admin(auth.uid()))
with check (bucket_id = 'site-media' and public.is_admin(auth.uid()));

drop policy if exists "site_media_admin_delete" on storage.objects;
create policy "site_media_admin_delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'site-media' and public.is_admin(auth.uid()));
