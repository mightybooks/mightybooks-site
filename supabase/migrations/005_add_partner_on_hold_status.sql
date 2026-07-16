-- Add the review-only on_hold state without changing existing rows or RLS policies.
alter table public.partner_profiles
  drop constraint if exists partner_profiles_status_check;

alter table public.partner_profiles
  add constraint partner_profiles_status_check
  check (status in ('pending', 'on_hold', 'approved', 'rejected', 'suspended'));
