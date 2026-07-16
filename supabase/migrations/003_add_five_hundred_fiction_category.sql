-- Keep the existing production values (business/books) and add the new category.
do $$
declare
  constraint_name text;
begin
  for constraint_name in
    select con.conname
    from pg_constraint con
    join pg_class rel on rel.oid = con.conrelid
    join pg_namespace nsp on nsp.oid = rel.relnamespace
    where nsp.nspname = 'public'
      and rel.relname = 'posts'
      and con.contype = 'c'
      and pg_get_constraintdef(con.oid) ilike '%category%'
  loop
    execute format('alter table public.posts drop constraint %I', constraint_name);
  end loop;
end $$;

alter table public.posts
  add constraint posts_category_allowed_check
  check (category in ('business', 'books', 'five_hundred_fiction'))
  not valid;

alter table public.posts validate constraint posts_category_allowed_check;
