alter table public.consultation_logs
  add column if not exists relationship_type text,
  add column if not exists contract_amount integer,
  add column if not exists production_cost_amount integer,
  add column if not exists estimated_profit_amount integer,
  add column if not exists confirmed_profit_amount integer,
  add column if not exists decision_result text,
  add column if not exists fit_level text,
  add column if not exists consultation_fee_paid boolean not null default false,
  add column if not exists consultation_fee_amount integer;

alter table public.consultation_logs
  drop constraint if exists consultation_logs_contract_amount_check,
  add constraint consultation_logs_contract_amount_check check (contract_amount is null or contract_amount >= 0);

alter table public.consultation_logs
  drop constraint if exists consultation_logs_production_cost_amount_check,
  add constraint consultation_logs_production_cost_amount_check check (production_cost_amount is null or production_cost_amount >= 0);

alter table public.consultation_logs
  drop constraint if exists consultation_logs_estimated_profit_amount_check,
  add constraint consultation_logs_estimated_profit_amount_check check (estimated_profit_amount is null or estimated_profit_amount >= 0);

alter table public.consultation_logs
  drop constraint if exists consultation_logs_confirmed_profit_amount_check,
  add constraint consultation_logs_confirmed_profit_amount_check check (confirmed_profit_amount is null or confirmed_profit_amount >= 0);

alter table public.consultation_logs
  drop constraint if exists consultation_logs_consultation_fee_amount_check,
  add constraint consultation_logs_consultation_fee_amount_check check (consultation_fee_amount is null or consultation_fee_amount >= 0);

create index if not exists consultation_logs_relationship_type_idx on public.consultation_logs (relationship_type);
create index if not exists consultation_logs_decision_result_idx on public.consultation_logs (decision_result);
create index if not exists consultation_logs_fit_level_idx on public.consultation_logs (fit_level);
create index if not exists consultation_logs_consultation_fee_paid_idx on public.consultation_logs (consultation_fee_paid);
