export const MANUSCRIPT_TYPES = [
  '자서전',
  '에세이·일반 산문',
  '소설',
  '비문학',
  '짧은 글 모음',
  '문집·공동저서',
  '소책자·기관 책자',
]

export const STRUCTURE_TYPES = [
  { value: 'continuous', label: '이어지는 긴 글', description: '장편소설, 일반 에세이, 비문학처럼 본문이 비교적 연속적으로 이어지는 원고' },
  { value: 'chapters', label: '여러 장으로 나뉜 책', description: '자서전, 주제별 에세이, 공동 문집처럼 장 시작면과 구분 페이지가 필요한 원고' },
  { value: 'pieces', label: '짧은 글을 묶은 책', description: '짧은 에세이, 칼럼, 초단편소설처럼 작품마다 별도의 시작면이나 페이지를 사용하는 원고' },
]

export const CHAPTER_PAGE_OPTIONS = [
  { value: 1, label: '간단한 장 시작: 장당 1쪽' },
  { value: 2, label: '일반적인 장 구분: 장당 2쪽' },
  { value: 4, label: '적극적인 장 구분: 장당 4쪽' },
]

export const PIECE_PAGE_OPTIONS = [1, 1.5, 2]

export const IMAGE_OPTIONS = [
  { value: 'none', label: '이미지 거의 없음' },
  { value: 'some', label: '본문 사이에 일부 삽입' },
  { value: 'many', label: '반 페이지 이상 이미지가 많음' },
  { value: 'full', label: '전체 페이지 이미지가 있음' },
]

export const MAX_CHARACTER_COUNT = 2000000
export const MAX_ITEM_COUNT = 10000
export const MAX_EXTRA_PAGES = 2000

export function parseIntegerInput(value) {
  const normalized = String(value ?? '').replaceAll(',', '').trim()
  if (!/^\d+$/.test(normalized)) return null
  const number = Number(normalized)
  return Number.isSafeInteger(number) ? number : null
}

export function calculateBasePages(characterCount) {
  return characterCount / 500 + 40
}

export function calculateStructurePages({ basePages, structureType, chapterCount = 0, chapterPages = 2, pieceCount = 0, pagesPerPiece = 1.5 }) {
  if (structureType === 'chapters') {
    const structureAddition = chapterCount * chapterPages
    return { structurePages: basePages + structureAddition, structureAddition, pieceBasedPages: null }
  }

  if (structureType === 'pieces') {
    const pieceBasedPages = pieceCount * pagesPerPiece + 8
    const structurePages = Math.max(basePages, pieceBasedPages)
    return { structurePages, structureAddition: structurePages - basePages, pieceBasedPages }
  }

  return { structurePages: basePages, structureAddition: 0, pieceBasedPages: null }
}

export function calculateImagePages({ structurePages, imageType, fullPageImageCount = 0 }) {
  if (imageType === 'some') return structurePages * 0.03
  if (imageType === 'many') return structurePages * 0.07
  if (imageType === 'full') return fullPageImageCount
  return 0
}

export function roundToNearestFour(value) {
  const lower = Math.floor(value / 4) * 4
  const upper = Math.ceil(value / 4) * 4
  return value - lower <= upper - value ? lower : upper
}

export function calculateBookPageEstimate(input) {
  const {
    manuscriptType,
    characterCount,
    structureType,
    chapterCount = 0,
    chapterPages = 2,
    pieceCount = 0,
    pagesPerPiece = 1.5,
    imageType = 'none',
    fullPageImageCount = 0,
    appendixPages = 0,
  } = input

  if (!MANUSCRIPT_TYPES.includes(manuscriptType)) throw new Error('원고 종류를 선택해 주세요.')
  if (!Number.isInteger(characterCount) || characterCount < 1 || characterCount > MAX_CHARACTER_COUNT) throw new Error('올바른 공백 포함 글자 수를 입력해 주세요.')
  if (!STRUCTURE_TYPES.some(option => option.value === structureType)) throw new Error('원고 구성 방식을 선택해 주세요.')
  if (structureType === 'chapters' && (!Number.isInteger(chapterCount) || chapterCount < 1 || chapterCount > MAX_ITEM_COUNT)) throw new Error('올바른 전체 장 수를 입력해 주세요.')
  if (structureType === 'chapters' && !CHAPTER_PAGE_OPTIONS.some(option => option.value === chapterPages)) throw new Error('장 구분 방식을 선택해 주세요.')
  if (structureType === 'pieces' && (!Number.isInteger(pieceCount) || pieceCount < 1 || pieceCount > MAX_ITEM_COUNT)) throw new Error('올바른 전체 작품 수를 입력해 주세요.')
  if (structureType === 'pieces' && !PIECE_PAGE_OPTIONS.includes(pagesPerPiece)) throw new Error('작품당 평균 배치를 선택해 주세요.')
  if (!IMAGE_OPTIONS.some(option => option.value === imageType)) throw new Error('이미지 배치 정도를 선택해 주세요.')
  if (imageType === 'full' && (!Number.isInteger(fullPageImageCount) || fullPageImageCount < 1 || fullPageImageCount > MAX_EXTRA_PAGES)) throw new Error('올바른 전체 페이지 이미지 수를 입력해 주세요.')
  if (!Number.isInteger(appendixPages) || appendixPages < 0 || appendixPages > MAX_EXTRA_PAGES) throw new Error('올바른 예상 부록 페이지를 입력해 주세요.')

  const basePages = calculateBasePages(characterCount)
  const structure = calculateStructurePages({ basePages, structureType, chapterCount, chapterPages, pieceCount, pagesPerPiece })
  const imagePages = calculateImagePages({ structurePages: structure.structurePages, imageType, fullPageImageCount })
  const rawCenterPages = structure.structurePages + imagePages + appendixPages
  const centerPages = Math.max(4, roundToNearestFour(rawCenterPages))

  return {
    ...input,
    basePages,
    structurePages: structure.structurePages,
    structureAddition: structure.structureAddition,
    pieceBasedPages: structure.pieceBasedPages,
    imagePages,
    appendixPages,
    rawCenterPages,
    centerPages,
    minimumPages: Math.max(4, centerPages - 16),
    maximumPages: centerPages + 16,
  }
}
