const AUTHOR_RESOURCES = {
  jungmyeongju: {
    'self-meditation': {
      slug: 'self-meditation',
      title: '내 마음을 바라보는 시간',
      subtitle: '정명주 저자의 셀프 명상상담 클래스',
      navigationTitle: '셀프 명상상담 클래스',
      navigationDescription: '클래스 소개와 실천자료 안내를 확인합니다.',
      metadataTitle: '셀프 명상상담 클래스',
      description:
        '정명주 저자의 셀프 명상상담 클래스를 소개하고 실천안내서와 출력용 일지 자료를 안내합니다.',
      introduction: [
        '일상에서 마주하는 불편한 감정을 억누르거나 피하기보다, 자신의 마음에 어떤 일이 일어나는지 차분히 바라보고 기록하는 실습입니다.',
        '정명주 저자가 명상상담을 바탕으로 고안한 뒤 100회 이상 직접 실천하며 다듬은 방법으로, 《내 마음이 오래 봐 달라고 말했다》에 소개된 내용을 수업에서 직접 따라 해볼 수 있도록 돕습니다.',
      ],
      steps: [
        {
          title: '마음 작동 5요소',
          description:
            '자극·감정·생각·갈망·행동으로 이어지는 마음의 흐름을 살펴봅니다.',
        },
        {
          title: '감정형 영상관법',
          description:
            '불편했던 핵심 장면을 떠올리고 감정과 몸의 느낌을 호흡과 함께 관찰합니다.',
        },
        {
          title: '질문 명상',
          description:
            '‘가짜 나는 누구인가?’, ‘참된 나는 누구인가?’라는 질문을 통해 자신의 내면을 바라봅니다.',
        },
      ],
      practiceFlow: [
        '상황 보기',
        '마음 정리',
        '마음 집중',
        '성찰하기',
        '마무리',
      ],
      recommendedFor: [
        '반복되는 불편한 감정을 차분히 살펴보고 싶은 분',
        '자신의 마음이 어떻게 움직이는지 이해하고 싶은 분',
        '혼자서도 꾸준히 실천할 수 있는 마음 기록법을 배우고 싶은 분',
        '책의 내용을 읽는 데서 그치지 않고 직접 작성하며 경험하고 싶은 분',
      ],
      materials: [
        {
          title: '셀프 명상상담 실천안내서',
          description:
            '셀프 명상상담의 구성과 단계별 작성법, 기록 예시와 자주 묻는 질문을 확인할 수 있습니다.',
          buttonLabel: '실천안내서 PDF',
        },
        {
          title: '셀프 명상상담 일지',
          description:
            '수업 내용을 직접 따라 하며 작성할 수 있도록 마련한 출력용 실습 자료입니다.',
          buttonLabel: '실습용 일지 PDF',
        },
      ],
      background:
        '정명주 저자가 인경스님에게 배운 명상상담을 바탕으로 구성한 방법입니다.',
      furtherReading: '인경스님의 《영상관법과 마음치유》',
      caution:
        '셀프 명상상담은 일상에서 경험하는 감정과 마음의 어려움을 스스로 살펴보기 위한 실천 방법입니다. 심한 우울감이나 불안, 외상 경험처럼 혼자 감당하기 어려운 문제는 전문가의 도움을 함께 받으시기 바랍니다.',
    },
  },
}

const AUTHOR_SUPPLEMENTAL_PAGES = {
  jungmyeongju: [
    {
      title: '출간기념회 안내',
      description:
        '정명주 작가 출간기념회 2026년 8월 7일 오후 5시. (주)위대한경영자 주관으로 개최.',
      href: '/library/authors/jungmyeongju/book-launch',
    },
  ],
}

const AUTHOR_RELATED_LINK_ORDER = {
  jungmyeongju: [
    '/library/authors/jungmyeongju/resources/self-meditation',
    'https://product.kyobobook.co.kr/detail/S000220341481',
    '/library/authors/jungmyeongju/press',
    '/library/authors/jungmyeongju/book-launch',
  ],
}

function getPathname(url) {
  try {
    return new URL(url, 'https://mightybooks.kr').pathname.replace(/\/$/, '')
  } catch {
    return null
  }
}

export function getAuthorResource(authorSlug, resourceSlug) {
  return AUTHOR_RESOURCES[authorSlug]?.[resourceSlug] ?? null
}

export function getAuthorResourceLinks(authorSlug) {
  const resources = AUTHOR_RESOURCES[authorSlug]

  if (!resources) return []

  return Object.values(resources).map((resource) => ({
    slug: resource.slug,
    title: resource.navigationTitle,
    description: resource.navigationDescription,
    href: `/library/authors/${authorSlug}/resources/${resource.slug}`,
  }))
}

export function getAuthorSupplementalLinks(authorSlug, externalLinks = []) {
  const supplementalPages = AUTHOR_SUPPLEMENTAL_PAGES[authorSlug] ?? []
  const pageLinks = supplementalPages.map((page) => {
    const existingLink = externalLinks.find(
      (link) => getPathname(link.url) === page.href
    )

    return {
      ...page,
      description: existingLink?.description || page.description,
    }
  })

  return [...pageLinks, ...getAuthorResourceLinks(authorSlug)]
}

export function getAuthorRelatedLinkOrder(authorSlug) {
  return AUTHOR_RELATED_LINK_ORDER[authorSlug] ?? []
}
