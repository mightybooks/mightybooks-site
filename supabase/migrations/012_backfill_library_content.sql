begin;

drop table if exists pg_temp.library_content_protected_snapshot;
drop table if exists pg_temp.library_content_entity_snapshot;
drop table if exists pg_temp.library_content_expected_samples;
drop table if exists pg_temp.library_content_expected_career_items;
drop table if exists pg_temp.library_content_expected_career_sections;
drop table if exists pg_temp.library_content_expected_book_authors;
drop table if exists pg_temp.library_content_expected_books;
drop table if exists pg_temp.library_content_expected_authors;

create temporary table library_content_expected_authors (
  slug text primary key,
  pen_name text,
  occupation text not null,
  profile_image_path text not null,
  short_bio text not null,
  bio_paragraphs text[] not null,
  display_order integer not null
);

insert into pg_temp.library_content_expected_authors (
  slug,
  pen_name,
  occupation,
  profile_image_path,
  short_bio,
  bio_paragraphs,
  display_order
)
values
  (
    'moon-surim',
    null,
    '작가 · 마이티북스 대표',
    '/library/authors/moon-surim/profile.png',
    '원고의 목적과 방향을 살피고 책으로 만드는 과정을 함께합니다.',
    array[
      '마이티북스를 운영하며 원고의 목적과 방향을 살피고, 책으로 만드는 과정을 함께합니다. 수림 스튜디오에서는 500자 소설을 비롯한 새로운 서사 형식을 연구하고 제작합니다.'
    ]::text[],
    0
  ),
  (
    'estella-cho',
    null,
    'DACH(독일어권) 비즈니스 이문화 전문 강사 및 임원 코칭 컨설턴트',
    '/library/authors/estella-cho/profile.png',
    'DACH(독일어권) 비즈니스 이문화 전문 강사 및 임원 코칭 컨설턴트.',
    array[
      'DACH(독일어권) 비즈니스 이문화 전문 강사 및 임원 코칭 컨설턴트.',
      '10대부터 오스트리아에 거주하며 학업과 비즈니스를 병행했다. 21살에 현지 패션 브랜드 ‘tribe’를 창업 및 운영하며 유럽 특유의 깐깐한 비즈니스 생태계를 몸소 겪었고, 귀국 후에는 기업 해외영업 및 동시통역사로 활동하며 양국의 문화적 간극을 좁히는 일에 주력해 왔다.',
      '삼성SDI, 한화솔루션, 한국은행 등 대한민국 주요 대기업 및 공공기관의 임원진과 핵심 인재를 대상으로 글로벌 비즈니스 이문화 커뮤니케이션 강의와 코칭을 진행해 왔으며, 현지에서의 생생한 실전 경험과 기업 출강 전문성을 결합해 완벽한 어학보다 강력한 ‘글로벌 마인드셋’을 전하는 데 앞장서고 있다.'
    ]::text[],
    1
  ),
  (
    'jungmyeongju',
    null,
    '명상심리상담사',
    '/library/authors/jungmyeongju/profile.png',
    '마음의 작동 원리를 알아차림으로써 참된 나를 알아가고, 타인과의 편안한 관계를 돕는 명상심리상담사이다.',
    array[
      '마음의 작동 원리를 알아차림으로써 참된 나를 알아가고, 타인과의 편안한 관계를 돕는 명상심리상담사이다. 명상상담의 개척자인 인경스님의 지도 아래 상담 기법을 배우고, 이를 삶에 적용하며 실천적 지혜를 탐구해 왔다.',
      '그 과정에서 전문가의 영역으로만 여긴 명상상담을 누구나 스스로 실천할 수 있는 방식으로 풀어낸 ‘셀프 명상상담 일지’를 고안했다. 더 나아가 본인이 직접 100회 이상 실행‧기록하는 여정을 통해 감정의 다양한 모습과 고통이 형성되고 사라지는 흐름을 깊이 경험했다.',
      '이를 바탕으로 명상심리상담 슈퍼바이저이자 경청코칭 전문가로 활동하며, 강의와 상담을 통해 마음을 돌볼 수 있도록 안내하고 있다. 직접 개발하고 운영한 ‘경청코칭스쿨’은 지금의 명상상담과 강의 활동의 단단한 뿌리가 되었다.',
      '2025년, 문화체육관광부 주관, 인문공동체 ‘책고집’ 시행의 ‘디딤돌 인문학(한국형 클레멘트 코스)’에서 올해의 강사상을 수상했으며, 한국코치협회 인증 전문코치(KPC) 자격을 보유하고 있다. 저서로 『고객이 줄 서는 나시장』이 있으며, 공저로 『자기경영스타트』, 『인도, 붓다의 길 위에서』가 있다.'
    ]::text[],
    2
  ),
  (
    'sian',
    null,
    '세이브더버니즈 대표',
    '/library/authors/sian/profile.png',
    '13살 때 생애 처음으로 토끼를 만난 후 n년차 토끼 집사.',
    array[
      '13살 때 생애 처음으로 토끼를 만난 후 n년차 토끼 집사.',
      '현재는 유기토끼 지원 커뮤니티인 ‘세이브더버니즈’를 운영 중이다.'
    ]::text[],
    3
  );

create temporary table library_content_expected_books (
  slug text primary key,
  display_title text not null,
  publisher_name text,
  publication_label text,
  cover_image_path text not null,
  cover_width integer not null,
  cover_height integer not null,
  short_description text not null,
  description_paragraphs text[] not null,
  contents text[] not null,
  display_order integer not null
);

insert into pg_temp.library_content_expected_books (
  slug,
  display_title,
  publisher_name,
  publication_label,
  cover_image_path,
  cover_width,
  cover_height,
  short_description,
  description_paragraphs,
  contents,
  display_order
)
values
  (
    '500-character-fiction',
    '문수림의 500자 소설',
    '수림 스튜디오',
    '2026년 3월 출간',
    '/library/books/500fiction-sample/cover.png',
    3076,
    4500,
    '짧은 분량 안에서 인물, 상황, 사건과 변화를 밀도 있게 담아내는 문수림 작가의 500자 소설을 한 권으로 만납니다.',
    array[
      '『500자 소설』은 ‘500자’라는 분량 제한을 하나의 조건으로 삼아 쓰인 단편소설 실험의 결과물이다. 이 책에 수록된 101편은 동일한 규칙 아래에서 반복적으로 쓰였으며, 그 반복 자체가 하나의 형식을 이룬다.',
      '개별 작품은 독립적인 소설이지만, 동시에 이 책은 500자라는 분량을 서사의 단위로 삼는 새로운 소설 형식을 제안한다. 『500자 소설』은 완결된 단행본인 동시에, 하나의 장르로서 계속 확장되는 쓰기의 일부다.'
    ]::text[],
    array[
      '500자 내외의 독립 소설 101편 수록',
      '동일한 분량 규칙을 반복해 하나의 형식으로 확장',
      '짧은 호흡 안에 인물·사건·전환·결말을 갖춘 독립 서사',
      '단행본이면서 계속 확장되는 ‘500자 소설’ 프로젝트'
    ]::text[],
    0
  ),
  (
    'gaze-before-perfect-german',
    '완벽한 독일어보다 눈빛이 먼저다',
    null,
    null,
    '/library/books/gaze-before-perfect-german/cover.png',
    3180,
    4500,
    '오스트리아 현지 경험을 바탕으로 독일어권의 비즈니스 문화와 실전 커뮤니케이션을 전하는 독일어 실용서.',
    array[
      '오스트리아 15년 차 강사가 알려주는 실전 비즈니스 생존기!',
      '단순히 독일어를 알려드리는 게 아니라, 일상에서 마주하게 되는 문화적 차이까지 짚어주는 독일어 실용서'
    ]::text[],
    array[
      '오스트리아 현지 생활과 비즈니스 경험을 바탕으로 한 실전 사례',
      '독일어 표현과 함께 짚어보는 독일어권의 문화적 차이',
      '해외영업·협상·조직생활에 필요한 비즈니스 커뮤니케이션',
      '완벽한 어학보다 먼저 필요한 글로벌 마인드셋'
    ]::text[],
    1
  ),
  (
    'my-heart-said-look-longer',
    '내 마음이 오래 봐 달라고 말했다',
    null,
    null,
    '/library/books/my-heart-said-look-longer/cover.png',
    3180,
    4500,
    '100회의 셀프 명상상담 일지를 통해 고통의 흐름을 바라보고, 고요하고 편안한 본래의 자신을 찾아가는 자기 탐색의 기록.',
    array[
      '지금 이 순간, 어떤 어려움의 한가운데를 지나고 있다면, 이 기록이 당신 안으로 향하는 작은 입구가 되었으면 합니다.',
      '더불어 그 길 끝에서 고요하고 편안한 본래의 자신과 마주할 수 있기를 바랍니다.'
    ]::text[],
    array[
      '100회의 셀프 명상상담 일지에 담아낸 깊고 진솔한 자기 탐색',
      '성공·인정·사랑을 향한 애씀 속에서 고통의 원인을 들여다보는 기록',
      '‘가짜 나’ 뒤에 가려진 ‘참된 나’를 만나는 명상상담의 과정',
      '누구나 일상에서 실천할 수 있도록 풀어낸 셀프 명상상담'
    ]::text[],
    2
  ),
  (
    'i-held-a-chubby-rabbit',
    '토실토실 토끼를 안았습니다',
    null,
    null,
    '/library/books/i-held-a-chubby-rabbit/cover.webp',
    3180,
    4500,
    '유기된 토끼를 구조하고 임시 보호하며 반복되는 이별을 지켜본 한 개인의 기록. 유기토끼 문제의 현실과 작은 생명을 대하는 태도를 함께 담았다.',
    array[
      E'사람들은 개나 고양이에 대해서는 반려동물이란 인식이 분명하지만, 그 외 생명들에겐 여전히 무관심합니다.\n해마다 유기되는 토끼의 수는 대략 200마리 이상.\n이미 몇 년 전부터 공중파 방송에서 뉴스로 보도될 만큼 유기토끼의 수는 꾸준히 증가하는 추세입니다. 덕분에 이제는 서울의 도심 속 공원에서도 토끼들을 쉽게 볼 수 있을 정도입니다.',
      '토끼를 유기한 사람들은 공원에 풀어주는 것이 자연으로 되돌려 보낸 일이라 생각합니다. 그러나 집토끼는 야생종이 아니라서 결국 적응하지도 못한 채 생을 마감하게 됩니다. 게다가 특유의 번식력 때문에 불행은 다음 세대 개체까지 이어집니다.',
      '이 책은 그런 현실 앞에서 맞서는 개인의 이야기입니다. 순전히 개인의 힘으로 유기된 토끼를 구호하고, 임시 보호하며, 매번 가슴 아픈 이별까지 가장 가까운 곳에서 지켜본 이의 이야기.',
      '적나라한 현실과 가슴 뭉클해지는 서정적 정서가 나란히 걷고 있는 책을 여러분에게 소개하는 건 작은 생명을 대하는 태도가 곧 우리의 얼굴을 비추기 때문입니다.'
    ]::text[],
    array[
      '유기토끼 구조와 임시 보호 현장에서 마주한 생생한 기록',
      '집토끼 유기와 공원 방사가 만들어내는 현실적인 문제',
      '작은 생명을 구조하고 떠나보내는 과정에서 겪은 만남과 이별',
      '동물에 대한 무관심과 생명을 대하는 우리의 태도를 돌아보는 이야기'
    ]::text[],
    3
  );

create temporary table library_content_expected_book_authors (
  book_slug text primary key,
  author_slug text not null
);

insert into pg_temp.library_content_expected_book_authors (
  book_slug,
  author_slug
)
values
  ('500-character-fiction', 'moon-surim'),
  ('gaze-before-perfect-german', 'estella-cho'),
  ('my-heart-said-look-longer', 'jungmyeongju'),
  ('i-held-a-chubby-rabbit', 'sian');

create temporary table library_content_expected_career_sections (
  author_slug text not null,
  title text not null,
  sort_order integer not null
);

insert into pg_temp.library_content_expected_career_sections (
  author_slug,
  title,
  sort_order
)
values
  ('moon-surim', '현재 활동', 0),
  ('moon-surim', '대표작', 1),
  ('moon-surim', '기관 웹진 연재', 2),
  ('moon-surim', '언론 및 방송', 3);

create temporary table library_content_expected_career_items (
  author_slug text not null,
  section_title text not null,
  section_sort_order integer not null,
  item_type text not null,
  body text,
  organization text,
  work text,
  period text,
  sort_order integer not null
);

insert into pg_temp.library_content_expected_career_items (
  author_slug,
  section_title,
  section_sort_order,
  item_type,
  body,
  organization,
  work,
  period,
  sort_order
)
values
  ('moon-surim', '현재 활동', 0, 'text', '소설가', null, null, null, 0),
  ('moon-surim', '현재 활동', 0, 'text', '마이티북스 대표', null, null, null, 1),
  ('moon-surim', '대표작', 1, 'text', '《500자 소설》', null, null, null, 0),
  ('moon-surim', '대표작', 1, 'text', '《20에서 30까지》', null, null, null, 1),
  ('moon-surim', '대표작', 1, 'text', '《장르불문 관통하는 글쓰기》', null, null, null, 2),
  (
    'moon-surim',
    '기관 웹진 연재',
    2,
    'structured',
    null,
    '고용노동부 웹진 《내일로》',
    '〈무림지존, 취업준비생이 되다〉',
    '2024년 연재 종료',
    0
  ),
  (
    'moon-surim',
    '기관 웹진 연재',
    2,
    'structured',
    null,
    '한국한의학진흥원 웹진 《건강한》',
    '〈레어템 한의약으로 이세계 정복〉',
    '2025년 연재 종료',
    1
  ),
  (
    'moon-surim',
    '언론 및 방송',
    3,
    'text',
    '2016년 10월 세이브더칠드런 영상 인터뷰',
    null,
    null,
    null,
    0
  ),
  (
    'moon-surim',
    '언론 및 방송',
    3,
    'text',
    '2017년 1월 영남일보 소개',
    null,
    null,
    null,
    1
  ),
  (
    'moon-surim',
    '언론 및 방송',
    3,
    'text',
    '2017년 7월 중앙일보 소개',
    null,
    null,
    null,
    2
  ),
  (
    'moon-surim',
    '언론 및 방송',
    3,
    'text',
    '2017년 11월 딜라이브TV 다큐멘터리 《독립출판의 시대가 오다》 출연',
    null,
    null,
    null,
    3
  ),
  (
    'moon-surim',
    '언론 및 방송',
    3,
    'text',
    '2018년 11월 KBS대구 1TV 《라이브 오늘》 출연',
    null,
    null,
    null,
    4
  );

create temporary table library_content_expected_samples (
  book_slug text primary key,
  public_path_prefix text not null,
  page_count integer not null,
  file_extension text not null,
  filename_padding smallint not null,
  page_width integer not null,
  page_height integer not null
);

insert into pg_temp.library_content_expected_samples (
  book_slug,
  public_path_prefix,
  page_count,
  file_extension,
  filename_padding,
  page_width,
  page_height
)
values
  (
    '500-character-fiction',
    '/library/books/500fiction-sample/pages',
    13,
    'png',
    3,
    3180,
    4500
  ),
  (
    'gaze-before-perfect-german',
    '/library/books/gaze-before-perfect-german/pages',
    14,
    'webp',
    3,
    3180,
    4500
  ),
  (
    'my-heart-said-look-longer',
    '/library/books/my-heart-said-look-longer/pages',
    18,
    'webp',
    3,
    3180,
    4500
  ),
  (
    'i-held-a-chubby-rabbit',
    '/library/books/i-held-a-chubby-rabbit/pages',
    13,
    'webp',
    3,
    3180,
    4500
  );

do $$
begin
  if exists (
    select expected.slug
    from pg_temp.library_content_expected_authors as expected
    left join public.authors as authors
      on authors.slug = expected.slug
    group by expected.slug
    having count(authors.id) <> 1
  ) then
    raise exception 'Library content backfill aborted: expected authors are missing or duplicated.';
  end if;

  if exists (
    select expected.slug
    from pg_temp.library_content_expected_books as expected
    left join public.books as books
      on books.slug = expected.slug
    group by expected.slug
    having count(books.id) <> 1
  ) then
    raise exception 'Library content backfill aborted: expected books are missing or duplicated.';
  end if;

  if exists (
    select 1
    from public.authors as authors
    join pg_temp.library_content_expected_authors as expected
      on expected.slug = authors.slug
    where authors.status <> 'draft'
      or authors.pen_name is not null
      or authors.occupation is not null
      or authors.profile_image_path is not null
      or authors.short_bio is not null
      or authors.bio_paragraphs <> '{}'::text[]
      or authors.display_order <> 0
  ) then
    raise exception 'Library content backfill aborted: author targets are not in the expected default state.';
  end if;

  if exists (
    select 1
    from public.books as books
    join pg_temp.library_content_expected_books as expected
      on expected.slug = books.slug
    where books.status <> 'published'
      or books.display_title is not null
      or books.publisher_name is not null
      or books.publication_label is not null
      or books.cover_image_path is not null
      or books.cover_width is not null
      or books.cover_height is not null
      or books.short_description is not null
      or books.description_paragraphs <> '{}'::text[]
      or books.contents <> '{}'::text[]
      or books.display_order <> 0
  ) then
    raise exception 'Library content backfill aborted: book targets are not in the expected default state.';
  end if;

  if exists (
    select 1
    from public.author_career_sections as sections
    join public.authors as authors
      on authors.id = sections.author_id
    join pg_temp.library_content_expected_authors as expected
      on expected.slug = authors.slug
  ) then
    raise exception 'Library content backfill aborted: target author career data already exists.';
  end if;

  if exists (
    select 1
    from public.book_sample_assets as samples
    join public.books as books
      on books.id = samples.book_id
    join pg_temp.library_content_expected_books as expected
      on expected.slug = books.slug
  ) then
    raise exception 'Library content backfill aborted: target sample asset data already exists.';
  end if;

  if exists (
    select 1
    from pg_temp.library_content_expected_book_authors as expected
    where not exists (
      select 1
      from public.book_authors as links
      join public.books as books
        on books.id = links.book_id
      join public.authors as authors
        on authors.id = links.author_id
      where books.slug = expected.book_slug
        and authors.slug = expected.author_slug
    )
  ) or exists (
    select 1
    from public.book_authors as links
    join public.books as books
      on books.id = links.book_id
    join public.authors as authors
      on authors.id = links.author_id
    join pg_temp.library_content_expected_books as target_books
      on target_books.slug = books.slug
    where not exists (
      select 1
      from pg_temp.library_content_expected_book_authors as expected
      where expected.book_slug = books.slug
        and expected.author_slug = authors.slug
    )
  ) then
    raise exception 'Library content backfill aborted: book-author relationships do not match the JS source.';
  end if;

  if exists (
    select 1
    from public.authors as authors
    join pg_temp.library_content_expected_authors as expected
      on expected.slug = authors.slug
    join public.reserved_public_slugs as reserved
      on reserved.slug = authors.slug
  ) then
    raise exception 'Library content backfill aborted: an author slug is reserved.';
  end if;
end;
$$;

create temporary table library_content_entity_snapshot
as
select
  'author'::text as entity_type,
  authors.id,
  authors.slug,
  authors.display_name as stable_label,
  authors.created_at,
  null::text as book_status
from public.authors as authors
join pg_temp.library_content_expected_authors as expected
  on expected.slug = authors.slug

union all

select
  'book'::text,
  books.id,
  books.slug,
  books.title,
  books.created_at,
  books.status
from public.books as books
join pg_temp.library_content_expected_books as expected
  on expected.slug = books.slug;

create temporary table library_content_protected_snapshot
as
select 'book_authors'::text as source_table, to_jsonb(links) as row_data
from public.book_authors as links

union all

select 'author_memberships'::text, to_jsonb(memberships)
from public.author_memberships as memberships

union all

select 'book_entitlements'::text, to_jsonb(entitlements)
from public.book_entitlements as entitlements

union all

select 'book_reader_assets'::text, to_jsonb(reader_assets)
from public.book_reader_assets as reader_assets;

update public.authors as authors
set
  pen_name = expected.pen_name,
  occupation = expected.occupation,
  profile_image_path = expected.profile_image_path,
  short_bio = expected.short_bio,
  bio_paragraphs = expected.bio_paragraphs,
  display_order = expected.display_order
from pg_temp.library_content_expected_authors as expected
where authors.slug = expected.slug;

update public.books as books
set
  display_title = expected.display_title,
  publisher_name = expected.publisher_name,
  publication_label = expected.publication_label,
  cover_image_path = expected.cover_image_path,
  cover_width = expected.cover_width,
  cover_height = expected.cover_height,
  short_description = expected.short_description,
  description_paragraphs = expected.description_paragraphs,
  contents = expected.contents,
  display_order = expected.display_order
from pg_temp.library_content_expected_books as expected
where books.slug = expected.slug;

insert into public.author_career_sections (
  author_id,
  title,
  sort_order
)
select
  authors.id,
  expected.title,
  expected.sort_order
from pg_temp.library_content_expected_career_sections as expected
join public.authors as authors
  on authors.slug = expected.author_slug
order by expected.author_slug, expected.sort_order;

insert into public.author_career_items (
  section_id,
  item_type,
  body,
  organization,
  work,
  period,
  sort_order
)
select
  sections.id,
  expected.item_type,
  expected.body,
  expected.organization,
  expected.work,
  expected.period,
  expected.sort_order
from pg_temp.library_content_expected_career_items as expected
join public.authors as authors
  on authors.slug = expected.author_slug
join public.author_career_sections as sections
  on sections.author_id = authors.id
 and sections.title = expected.section_title
 and sections.sort_order = expected.section_sort_order
order by
  expected.author_slug,
  expected.section_sort_order,
  expected.sort_order;

insert into public.book_sample_assets (
  book_id,
  public_path_prefix,
  page_count,
  file_extension,
  filename_padding,
  page_width,
  page_height,
  status
)
select
  books.id,
  expected.public_path_prefix,
  expected.page_count,
  expected.file_extension,
  expected.filename_padding,
  expected.page_width,
  expected.page_height,
  'active'
from pg_temp.library_content_expected_samples as expected
join public.books as books
  on books.slug = expected.book_slug
order by expected.book_slug;

update public.authors as authors
set status = 'published'
from pg_temp.library_content_expected_authors as expected
where authors.slug = expected.slug;

do $$
begin
  if exists (
    select 1
    from pg_temp.library_content_expected_authors as expected
    left join public.authors as authors
      on authors.slug = expected.slug
    where authors.id is null
      or authors.status <> 'published'
      or authors.pen_name is distinct from expected.pen_name
      or authors.occupation is distinct from expected.occupation
      or authors.profile_image_path is distinct from expected.profile_image_path
      or authors.short_bio is distinct from expected.short_bio
      or authors.bio_paragraphs is distinct from expected.bio_paragraphs
      or authors.display_order is distinct from expected.display_order
  ) then
    raise exception 'Library content backfill validation failed: author content mismatch.';
  end if;

  if exists (
    select 1
    from pg_temp.library_content_expected_books as expected
    left join public.books as books
      on books.slug = expected.slug
    where books.id is null
      or books.display_title is distinct from expected.display_title
      or books.publisher_name is distinct from expected.publisher_name
      or books.publication_label is distinct from expected.publication_label
      or books.cover_image_path is distinct from expected.cover_image_path
      or books.cover_width is distinct from expected.cover_width
      or books.cover_height is distinct from expected.cover_height
      or books.short_description is distinct from expected.short_description
      or books.description_paragraphs is distinct from expected.description_paragraphs
      or books.contents is distinct from expected.contents
      or books.display_order is distinct from expected.display_order
  ) then
    raise exception 'Library content backfill validation failed: book content mismatch.';
  end if;

  if (
    select count(*)
    from public.author_career_sections as sections
    join public.authors as authors
      on authors.id = sections.author_id
    join pg_temp.library_content_expected_authors as expected
      on expected.slug = authors.slug
) <> (select count(*) from pg_temp.library_content_expected_career_sections)
  or exists (
    (
      select
        authors.slug,
        sections.title,
        sections.sort_order
      from public.author_career_sections as sections
      join public.authors as authors
        on authors.id = sections.author_id
    join pg_temp.library_content_expected_authors as target_authors
        on target_authors.slug = authors.slug
      except
      select author_slug, title, sort_order
      from pg_temp.library_content_expected_career_sections
    )
    union all
    (
      select author_slug, title, sort_order
      from pg_temp.library_content_expected_career_sections
      except
      select
        authors.slug,
        sections.title,
        sections.sort_order
      from public.author_career_sections as sections
      join public.authors as authors
        on authors.id = sections.author_id
    join pg_temp.library_content_expected_authors as target_authors
        on target_authors.slug = authors.slug
    )
  ) then
    raise exception 'Library content backfill validation failed: career section mismatch.';
  end if;

  if (
    select count(*)
    from public.author_career_items as items
    join public.author_career_sections as sections
      on sections.id = items.section_id
    join public.authors as authors
      on authors.id = sections.author_id
    join pg_temp.library_content_expected_authors as expected
      on expected.slug = authors.slug
) <> (select count(*) from pg_temp.library_content_expected_career_items)
  or exists (
    (
      select
        authors.slug,
        sections.title,
        sections.sort_order,
        items.item_type,
        items.body,
        items.organization,
        items.work,
        items.period,
        items.sort_order
      from public.author_career_items as items
      join public.author_career_sections as sections
        on sections.id = items.section_id
      join public.authors as authors
        on authors.id = sections.author_id
    join pg_temp.library_content_expected_authors as target_authors
        on target_authors.slug = authors.slug
      except
      select
        author_slug,
        section_title,
        section_sort_order,
        item_type,
        body,
        organization,
        work,
        period,
        sort_order
      from pg_temp.library_content_expected_career_items
    )
    union all
    (
      select
        author_slug,
        section_title,
        section_sort_order,
        item_type,
        body,
        organization,
        work,
        period,
        sort_order
      from pg_temp.library_content_expected_career_items
      except
      select
        authors.slug,
        sections.title,
        sections.sort_order,
        items.item_type,
        items.body,
        items.organization,
        items.work,
        items.period,
        items.sort_order
      from public.author_career_items as items
      join public.author_career_sections as sections
        on sections.id = items.section_id
      join public.authors as authors
        on authors.id = sections.author_id
    join pg_temp.library_content_expected_authors as target_authors
        on target_authors.slug = authors.slug
    )
  ) then
    raise exception 'Library content backfill validation failed: career item mismatch.';
  end if;

  if (
    select count(*)
    from public.book_sample_assets as samples
    join public.books as books
      on books.id = samples.book_id
    join pg_temp.library_content_expected_books as expected
      on expected.slug = books.slug
) <> (select count(*) from pg_temp.library_content_expected_samples)
  or exists (
    select 1
    from pg_temp.library_content_expected_samples as expected
    left join public.books as books
      on books.slug = expected.book_slug
    left join public.book_sample_assets as samples
      on samples.book_id = books.id
    where samples.book_id is null
      or samples.public_path_prefix is distinct from expected.public_path_prefix
      or samples.page_count is distinct from expected.page_count
      or samples.file_extension is distinct from expected.file_extension
      or samples.filename_padding is distinct from expected.filename_padding
      or samples.page_width is distinct from expected.page_width
      or samples.page_height is distinct from expected.page_height
      or samples.status <> 'active'
  ) then
    raise exception 'Library content backfill validation failed: sample asset mismatch.';
  end if;

  if exists (
    (
      select
        'author'::text as entity_type,
        authors.id,
        authors.slug,
        authors.display_name as stable_label,
        authors.created_at,
        null::text as book_status
      from public.authors as authors
      join pg_temp.library_content_expected_authors as expected
        on expected.slug = authors.slug
      union all
      select
        'book'::text,
        books.id,
        books.slug,
        books.title,
        books.created_at,
        books.status
      from public.books as books
      join pg_temp.library_content_expected_books as expected
        on expected.slug = books.slug
      except
      select *
      from pg_temp.library_content_entity_snapshot
    )
    union all
    (
      select *
      from pg_temp.library_content_entity_snapshot
      except
      (
        select
          'author'::text as entity_type,
          authors.id,
          authors.slug,
          authors.display_name as stable_label,
          authors.created_at,
          null::text as book_status
        from public.authors as authors
        join pg_temp.library_content_expected_authors as expected
          on expected.slug = authors.slug
        union all
        select
          'book'::text,
          books.id,
          books.slug,
          books.title,
          books.created_at,
          books.status
        from public.books as books
        join pg_temp.library_content_expected_books as expected
          on expected.slug = books.slug
      )
    )
  ) then
    raise exception 'Library content backfill validation failed: entity identity or book status changed.';
  end if;

  if exists (
    (
      select 'book_authors'::text, to_jsonb(links)
      from public.book_authors as links
      union all
      select 'author_memberships'::text, to_jsonb(memberships)
      from public.author_memberships as memberships
      union all
      select 'book_entitlements'::text, to_jsonb(entitlements)
      from public.book_entitlements as entitlements
      union all
      select 'book_reader_assets'::text, to_jsonb(reader_assets)
      from public.book_reader_assets as reader_assets
      except
      select source_table, row_data
      from pg_temp.library_content_protected_snapshot
    )
    union all
    (
      select source_table, row_data
      from pg_temp.library_content_protected_snapshot
      except
      (
        select 'book_authors'::text, to_jsonb(links)
        from public.book_authors as links
        union all
        select 'author_memberships'::text, to_jsonb(memberships)
        from public.author_memberships as memberships
        union all
        select 'book_entitlements'::text, to_jsonb(entitlements)
        from public.book_entitlements as entitlements
        union all
        select 'book_reader_assets'::text, to_jsonb(reader_assets)
        from public.book_reader_assets as reader_assets
      )
    )
  ) then
    raise exception 'Library content backfill validation failed: protected relationship or access data changed.';
  end if;

  if exists (
    select 1
    from public.authors as authors
    join pg_temp.library_content_expected_authors as expected
      on expected.slug = authors.slug
    join public.reserved_public_slugs as reserved
      on reserved.slug = authors.slug
  ) then
    raise exception 'Library content backfill validation failed: an author slug is reserved.';
  end if;
end;
$$;

drop table pg_temp.library_content_protected_snapshot;
drop table pg_temp.library_content_entity_snapshot;
drop table pg_temp.library_content_expected_samples;
drop table pg_temp.library_content_expected_career_items;
drop table pg_temp.library_content_expected_career_sections;
drop table pg_temp.library_content_expected_book_authors;
drop table pg_temp.library_content_expected_books;
drop table pg_temp.library_content_expected_authors;

commit;
