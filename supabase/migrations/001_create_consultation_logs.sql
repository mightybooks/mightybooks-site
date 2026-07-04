create extension if not exists pgcrypto;

create table if not exists public.consultation_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  consulted_at date not null default current_date,
  source text not null,
  inquiry_type text not null,
  manuscript_status text not null,
  estimated_pages integer,
  estimated_copies integer,
  quoted_amount integer,
  confirmed_amount integer,
  status text not null,
  lead_grade text not null,
  loss_reason text,
  follow_up_date date,
  question_tags text[] not null default '{}',
  customer_label text,
  summary text not null,
  memo text,
  constraint consultation_logs_estimated_pages_check check (estimated_pages is null or estimated_pages >= 0),
  constraint consultation_logs_estimated_copies_check check (estimated_copies is null or estimated_copies >= 0),
  constraint consultation_logs_quoted_amount_check check (quoted_amount is null or quoted_amount >= 0),
  constraint consultation_logs_confirmed_amount_check check (confirmed_amount is null or confirmed_amount >= 0)
);

create index if not exists consultation_logs_consulted_at_idx on public.consultation_logs (consulted_at desc);
create index if not exists consultation_logs_status_idx on public.consultation_logs (status);
create index if not exists consultation_logs_inquiry_type_idx on public.consultation_logs (inquiry_type);
create index if not exists consultation_logs_source_idx on public.consultation_logs (source);

create or replace function public.set_consultation_logs_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_consultation_logs_updated_at on public.consultation_logs;
create trigger set_consultation_logs_updated_at
before update on public.consultation_logs
for each row
execute function public.set_consultation_logs_updated_at();

alter table public.consultation_logs enable row level security;

drop policy if exists "Authenticated users can read consultation logs" on public.consultation_logs;
create policy "Authenticated users can read consultation logs"
  on public.consultation_logs for select to authenticated using (true);

drop policy if exists "Authenticated users can insert consultation logs" on public.consultation_logs;
create policy "Authenticated users can insert consultation logs"
  on public.consultation_logs for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update consultation logs" on public.consultation_logs;
create policy "Authenticated users can update consultation logs"
  on public.consultation_logs for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated users can delete consultation logs" on public.consultation_logs;
create policy "Authenticated users can delete consultation logs"
  on public.consultation_logs for delete to authenticated using (true);
