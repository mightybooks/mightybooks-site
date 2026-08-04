begin;

create index authors_status_display_order_idx
on public.authors(status, display_order, slug);

create index books_status_display_order_idx
on public.books(status, display_order, slug);

create index author_press_items_public_order_idx
on public.author_press_items(author_id, is_visible, sort_order, published_at desc);

commit;
