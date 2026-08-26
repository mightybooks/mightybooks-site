export const RESULT_TYPES = {
  PRINT_READY: 'PRINT_READY',
  PRINT_FIX: 'PRINT_FIX',
  REFORMAT_SOURCE: 'REFORMAT_SOURCE',
  REFORMAT_PDF: 'REFORMAT_PDF',
  FULL_LIGHT: 'FULL_LIGHT',
  EBOOK: 'EBOOK',
  AUTOBIOGRAPHY_FULL: 'AUTOBIOGRAPHY_FULL',
  INSTITUTIONAL: 'INSTITUTIONAL',
}

const option = (value, label) => ({ value, label })

export const FILE_FORMAT_NOTICES = {
  pdf: {
    title: 'PDF 파일을 가지고 계시는군요.',
    body: 'PDF는 기본적으로 완성된 제작 파일을 기준으로 확인합니다. 오탈자·문장·레이아웃 등 내용 수정이 필요한 경우에는 수정 가능한 원본파일이 필요하며, 원본이 없다면 재편집 또는 전체 편집 작업이 필요할 수 있습니다.',
    support: '내용 수정 없이 현재 파일을 기준으로 제작하실 예정이라면 그대로 계속 진행하시면 됩니다.',
  },
  canva: {
    title: 'Canva로 작업하셨군요.',
    body: '마이티북스는 Canva에서 출력한 최종 PDF를 기준으로 제작합니다. 오탈자·문장·배치 등 내용 수정이 필요한 경우에는 Canva 원작업에서 직접 수정한 뒤 새로운 PDF를 보내주셔야 합니다.',
    support: '내용 수정 없이 최종 PDF를 기준으로 제작하실 예정이라면 그대로 계속 진행하시면 됩니다.',
  },
}

export function getFileFormatNotice(fileFormat) {
  return FILE_FORMAT_NOTICES[fileFormat] || null
}

export const GUIDE_QUESTIONS = [
  {
    id: 'bookType',
    title: '어떤 종류의 책을 준비하고 계신가요?',
    options: [
      option('autobiography', '자서전'), option('poetry', '시집'), option('anthology', '문집'),
      option('essay', '에세이'), option('novel', '소설'), option('professional', '전문서적'),
      option('institutional', '기관·단체 서적'), option('other', '기타'),
    ],
  },
  {
    id: 'format',
    title: '어떤 형태로 만들고 싶으신가요?',
    options: [
      option('print', '종이책'), option('ebook', '전자책'), option('both', '종이책 + 전자책'),
      option('unknown', '아직 모르겠습니다'),
    ],
  },
  {
    id: 'quantity',
    title: '종이책은 몇 권 정도 필요하신가요?',
    showWhen: answers => ['print', 'both'].includes(answers.format),
    options: [
      option('1-10', '1~10권'), option('11-29', '11~29권'), option('30-49', '30~49권'),
      option('50-100', '50~100권'), option('101-300', '101~300권'), option('301+', '301권 이상'),
      option('unknown', '아직 모르겠습니다'),
    ],
  },
  {
    id: 'manuscript',
    title: '원고는 어디까지 준비되어 있나요?',
    options: [
      option('writing', '현재 작성 중입니다'), option('interview', '인터뷰·녹취 등 원고 작성부터 필요합니다'),
      option('handwritten', '손글씨·수기 원고가 있습니다'), option('computer', '컴퓨터 파일로 원고를 완성했습니다'),
      option('designed', '이미 책처럼 편집·디자인까지 해두었습니다'),
    ],
  },
  {
    id: 'fileFormat',
    title: '어떤 프로그램이나 파일로 작업하셨나요?',
    showWhen: answers => ['computer', 'designed'].includes(answers.manuscript),
    options: [
      option('hwp', '한글 HWP/HWPX'), option('word', 'Microsoft Word DOC/DOCX'), option('pdf', 'PDF'),
      option('canva', 'Canva'), option('indesign', 'Adobe InDesign'), option('other', '기타'),
      option('unknown', '잘 모르겠습니다'),
    ],
  },
  {
    id: 'trimStatus',
    title: '현재 파일은 실제 책 크기로 작업되어 있나요?',
    showWhen: answers => answers.manuscript === 'designed' || ['pdf', 'canva', 'indesign'].includes(answers.fileFormat),
    options: [
      option('final', '네, 최종 책 크기로 작업했습니다'), option('uncertain', '크기는 정했지만 정확한지는 모르겠습니다'),
      option('unset', '특별한 책 크기를 정하지 않고 작업했습니다'), option('unknown', '잘 모르겠습니다'),
    ],
  },
  {
    id: 'bookSize',
    title: '어떤 책 크기로 작업하셨나요?',
    showWhen: answers => answers.trimStatus === 'final',
    options: [
      option('46', '128×188mm / 46판'), option('a5', '148×210mm / A5'),
      option('shinguk', '152×225mm / 신국판'), option('other', '기타 사이즈'),
      option('unknown', '정확히 모르겠습니다'),
    ],
  },
  {
    id: 'sourceFile',
    title: '수정 가능한 원본 파일도 가지고 계신가요?',
    showWhen: answers => answers.fileFormat === 'pdf',
    options: [option('yes', '네'), option('pdf-only', 'PDF만 있습니다'), option('unknown', '잘 모르겠습니다')],
  },
  {
    id: 'cover',
    title: '표지는 어디까지 준비되어 있나요?',
    options: [
      option('full', '앞·책등·뒤표지까지 완성되어 있습니다'), option('front', '앞표지만 있습니다'),
      option('ebook-front', '전자책용 앞표지만 있습니다'), option('none', '표지가 없습니다'),
      option('unknown', '잘 모르겠습니다'),
    ],
  },
  {
    id: 'needs',
    title: '어떤 작업을 맡기고 싶으신가요?',
    help: '여러 항목을 선택할 수 있습니다.',
    multiple: true,
    options: [
      option('print-only', '현재 파일로 인쇄·제본만 하고 싶습니다'), option('reformat', '종이책 판형에 맞게 다시 편집하고 싶습니다'),
      option('interior', '본문 편집·디자인이 필요합니다'), option('cover-design', '표지 제작·수정이 필요합니다'),
      option('proofreading', '교정·교열이 필요합니다'), option('unknown', '무엇이 필요한지 잘 모르겠습니다'),
    ],
  },
  {
    id: 'purpose',
    title: '이 책은 주로 어떻게 사용하실 예정인가요?',
    options: [
      option('personal', '개인 보관'), option('gift', '가족·지인에게 나눠줄 책'),
      option('event', '행사·기념용'), option('internal', '기관 내부 배포'),
      option('sale', '서점 등에서 판매'), option('unknown', '아직 정하지 않았습니다'),
    ],
  },
  {
    id: 'publication',
    title: '마이티북스의 정식 출간까지 필요하신가요?',
    help: '정식 출간을 원하는 경우에는 제작만 진행하는 경우와 달리 원고·편집·디자인 상태를 함께 확인합니다.',
    showWhen: answers => ['sale', 'unknown'].includes(answers.purpose),
    options: [
      option('production-only', '제작만 필요합니다'),
      option('formal', '정식 출간이 필요합니다'),
      option('distribution', '정식 출간과 서점 유통이 필요합니다'),
      option('unknown', '아직 모르겠습니다'),
    ],
  },
]

export const QUESTION_MAP = Object.fromEntries(GUIDE_QUESTIONS.map(question => [question.id, question]))

export function getVisibleQuestions(answers) {
  return GUIDE_QUESTIONS.filter(question => !question.showWhen || question.showWhen(answers))
}

export function applyGuideAnswer(answers, questionId, value) {
  const questionIndex = GUIDE_QUESTIONS.findIndex(question => question.id === questionId)
  if (questionIndex < 0) return answers

  return {
    ...Object.fromEntries(
      Object.entries(answers).filter(([key]) => GUIDE_QUESTIONS.findIndex(question => question.id === key) < questionIndex)
    ),
    [questionId]: value,
  }
}

export function pruneHiddenGuideAnswers(answers) {
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) return {}
  const visibleIds = new Set(getVisibleQuestions(answers).map(question => question.id))
  return Object.fromEntries(Object.entries(answers).filter(([key]) => visibleIds.has(key)))
}

export function getOptionLabel(questionId, value) {
  const question = QUESTION_MAP[questionId]
  if (!question) return ''
  if (Array.isArray(value)) return value.map(item => getOptionLabel(questionId, item)).filter(Boolean).join(', ')
  return question.options.find(item => item.value === value)?.label || ''
}

export const RESULT_GUIDES = {
  [RESULT_TYPES.PRINT_READY]: {
    title: '현재 파일을 활용한 종이책 제작이 적합합니다.',
    summary: '이미 책으로 제작할 수 있는 파일이 준비되어 있으므로 전체 편집·디자인을 다시 진행할 필요는 크지 않습니다. 인쇄용 파일 상태를 확인한 뒤 필요한 수량만 제작하는 방식이 적합합니다.',
    tasks: ['인쇄용 파일 상태 확인', '판형·페이지·표지 최종 점검', '인쇄·제본 사양 확인', '필요한 수량 제작'],
  },
  [RESULT_TYPES.PRINT_FIX]: {
    title: '현재 파일을 살리면서 인쇄 전 보완하는 방식이 적합합니다.',
    summary: '전체 디자인을 처음부터 다시 하기보다 현재 파일을 기준으로 인쇄에 필요한 부분만 확인하고 수정하는 방식이 적합합니다.',
    tasks: ['기존 파일 상태 확인', '인쇄에 필요한 문제점 점검', '필요한 부분 수정', '인쇄용 파일 최종 확인', '인쇄·제본'],
  },
  [RESULT_TYPES.REFORMAT_SOURCE]: {
    title: '기존 원본파일을 활용한 판형 재편집이 적합합니다.',
    summary: '수정 가능한 원본파일이 있으므로 처음부터 다시 제작하기보다 기존 내용을 활용해 원하는 종이책 크기에 맞춰 재편집하는 방식이 적합합니다.',
    tasks: ['원본파일 및 기존 레이아웃 확인', '목표 판형 결정', '본문 재편집', '표지·책등 상태 확인', '인쇄용 파일 제작', '인쇄·제본'],
  },
  [RESULT_TYPES.REFORMAT_PDF]: {
    title: '현재 PDF를 기준으로 재편집 가능 범위를 먼저 확인해야 합니다.',
    summary: '수정 가능한 원본파일 없이 PDF만 있는 경우에는 페이지 구성과 디자인 상태에 따라 작업 방법이 달라질 수 있습니다. 먼저 파일을 확인한 뒤 기존 디자인을 얼마나 활용할 수 있는지 판단하는 것이 좋습니다.',
    tasks: ['PDF 구조 및 품질 확인', '기존 디자인 활용 가능 범위 확인', '판형 변경 방법 결정', '필요한 페이지 재편집', '표지·책등 확인', '인쇄용 파일 제작'],
  },
  [RESULT_TYPES.FULL_LIGHT]: {
    title: '전체 편집·디자인 제작이 적합합니다.',
    summary: '원고는 준비되어 있지만 아직 실제 책으로 편집된 상태는 아니므로, 본문 편집·디자인과 표지 제작을 거쳐 종이책으로 완성하는 방식이 적합합니다.',
    tasks: ['원고 분량과 구성 확인', '판형과 편집 방향 결정', '본문 편집·디자인', '표지 제작', '교정·최종 확인', '인쇄·제본'],
  },
  [RESULT_TYPES.EBOOK]: {
    title: '전자책 중심 제작이 적합합니다.',
    summary: '종이책 제작 공정보다는 전자출판에 필요한 원고 정리와 전자책 파일 제작을 중심으로 진행하는 방식이 적합합니다.',
    tasks: ['원고 및 구성 확인', '전자책용 편집', '표지 상태 확인', '전자책 파일 제작', '필요한 경우 정식 출간 관련 확인'],
  },
  [RESULT_TYPES.AUTOBIOGRAPHY_FULL]: {
    title: '자서전은 원고 작성 이전 단계부터 함께 진행하는 방식이 적합합니다.',
    summary: '아직 완성된 원고가 없다면 인터뷰·녹취와 보유 자료를 바탕으로 먼저 이야기의 중심과 책의 구조를 정리해야 합니다. 이후 집필·편집·디자인을 거쳐 한 권의 자서전으로 완성할 수 있습니다.',
    tasks: ['인터뷰·녹취 및 자료 확인', '이야기의 중심과 구성 설계', '목차 구성', '원고 작성·정리', '본문 편집·디자인', '표지 제작', '최종 제작'],
  },
  [RESULT_TYPES.INSTITUTIONAL]: {
    title: '기관·단체 제작 방식으로 별도 검토하는 것이 적합합니다.',
    summary: '기관·단체용 도서나 일정 수량 이상의 제작은 개인 소량 제작과 달리 사용 목적, 배포 수량, 편집 범위와 인쇄 사양을 함께 확인해야 합니다.',
    tasks: ['사용 목적과 배포 대상 확인', '원고 및 기존 자료 확인', '제작 수량과 사양 협의', '필요한 편집·디자인 범위 결정', '교정·최종 확인', '인쇄·제작'],
  },
}

const CONDITIONAL_RESULT_NOTE_RULES = [
  {
    id: 'small-print-run',
    title: '필요한 수량에 맞춘 제작',
    when: (type, answers) => type !== RESULT_TYPES.INSTITUTIONAL &&
      ['print', 'both'].includes(answers.format) && ['1-10', '11-29'].includes(answers.quantity) &&
      ['personal', 'gift', 'event'].includes(answers.purpose),
    text: '필요한 수량이 많지 않다면 처음부터 대량 제작을 전제로 하지 않고 목적에 맞는 소량 제작 방식을 검토할 수 있습니다.',
  },
  {
    id: 'proofreading',
    title: '교정·교열 범위 확인',
    when: (type, answers) => type !== RESULT_TYPES.INSTITUTIONAL && answers.needs?.includes('proofreading'),
    text: '교정·교열도 함께 원하셨으므로 실제 원고를 확인한 뒤 검토 범위와 필요한 작업 정도를 먼저 확인하는 것이 좋습니다.',
  },
  {
    id: 'cover-missing',
    title: '종이책 표지 제작',
    when: (type, answers) => type !== RESULT_TYPES.INSTITUTIONAL &&
      ['print', 'both'].includes(answers.format) && answers.cover === 'none',
    text: '종이책 제작을 위해서는 본문과 함께 표지 제작이 필요합니다.',
  },
  {
    id: 'ebook-cover-only',
    title: '종이책용 전체 표지 구성',
    when: (type, answers) => type !== RESULT_TYPES.INSTITUTIONAL &&
      ['print', 'both'].includes(answers.format) && answers.cover === 'ebook-front',
    text: '전자책용 앞표지만 있는 경우 종이책 제작을 위해 책등과 뒤표지를 포함한 전체 표지 구성이 추가로 필요합니다.',
  },
  {
    id: 'formal-publishing',
    kind: 'publication',
    title: '정식 출간 전 확인',
    when: (_type, answers) => answers.purpose === 'sale' || ['formal', 'distribution'].includes(answers.publication),
    text: '정식 출간이나 서점 판매를 원하는 경우에는 제작만 진행하는 경우와 달리 원고·편집·디자인 상태를 함께 확인합니다.',
  },
  {
    id: 'personal-production',
    kind: 'publication',
    title: '제작 범위 안내',
    when: (_type, answers) => ['personal', 'gift', 'event'].includes(answers.purpose),
    text: '개인 소장·증정·기념용 제작은 반드시 정식 출간 절차를 전제로 하지 않으며 필요한 제작 공정만 진행할 수 있습니다.',
  },
]

export function getConditionalResultNotes(type, answers) {
  const matched = CONDITIONAL_RESULT_NOTE_RULES.filter(rule => rule.when(type, answers))
  const mainNotes = matched.filter(note => note.kind !== 'publication').slice(0, 3)
  const publicationNote = matched.find(note => note.kind === 'publication')
  return publicationNote ? [...mainNotes, publicationNote] : mainNotes
}

function getResultTasks(type, tasks, answers) {
  if (!answers.needs?.includes('proofreading')) return [...tasks]
  if ([RESULT_TYPES.FULL_LIGHT, RESULT_TYPES.INSTITUTIONAL].includes(type)) {
    return tasks.map(task => task === '교정·최종 확인' ? '교정·교열 및 최종 확인' : task)
  }
  return tasks.some(task => task.includes('교정·교열')) ? [...tasks] : [...tasks, '교정·교열 범위 확인']
}

function hasOnlyPrintNeed(answers) {
  return Array.isArray(answers.needs) && answers.needs.length === 1 && answers.needs[0] === 'print-only'
}

export function classifyGuideResult(answers) {
  if (answers.bookType === 'autobiography' && answers.manuscript === 'interview') {
    return RESULT_TYPES.AUTOBIOGRAPHY_FULL
  }
  if (
    answers.bookType === 'institutional' ||
    (['print', 'both'].includes(answers.format) && answers.quantity === '301+')
  ) {
    return RESULT_TYPES.INSTITUTIONAL
  }
  if (answers.format === 'ebook') return RESULT_TYPES.EBOOK

  const needsFullProduction = answers.manuscript !== 'designed' || answers.needs?.includes('interior')
  if (needsFullProduction) return RESULT_TYPES.FULL_LIGHT

  const reformatNeeded = answers.needs?.includes('reformat') || ['uncertain', 'unset', 'unknown'].includes(answers.trimStatus)
  if (reformatNeeded && answers.fileFormat === 'pdf' && answers.sourceFile !== 'yes') {
    return RESULT_TYPES.REFORMAT_PDF
  }
  if (reformatNeeded && (answers.sourceFile === 'yes' || ['canva', 'indesign'].includes(answers.fileFormat))) {
    return RESULT_TYPES.REFORMAT_SOURCE
  }
  if (
    answers.manuscript === 'designed' && answers.trimStatus === 'final' &&
    answers.cover === 'full' && hasOnlyPrintNeed(answers)
  ) {
    return RESULT_TYPES.PRINT_READY
  }
  if (answers.manuscript === 'designed' && answers.trimStatus === 'final') {
    return RESULT_TYPES.PRINT_FIX
  }
  return RESULT_TYPES.FULL_LIGHT
}

export function getGuideResult(answers) {
  const type = classifyGuideResult(answers)
  const base = RESULT_GUIDES[type]
  const conditionalNotes = getConditionalResultNotes(type, answers)
  return {
    type,
    ...base,
    tasks: getResultTasks(type, base.tasks, answers),
    notes: conditionalNotes.filter(note => note.kind !== 'publication'),
    publicationNote: conditionalNotes.find(note => note.kind === 'publication') || null,
  }
}

export function getAnswerSummary(answers) {
  return getVisibleQuestions(answers)
    .filter(question => answers[question.id] && (!Array.isArray(answers[question.id]) || answers[question.id].length))
    .map(question => ({
      id: question.id,
      label: question.title,
      shortLabel: {
        bookType: '책 종류', format: '희망 형태', quantity: '희망 수량', manuscript: '원고 상태',
        fileFormat: '파일 형식', trimStatus: '판형 상태', bookSize: '책 크기', sourceFile: '수정 원본',
        cover: '표지 상태', needs: '필요 작업', publication: '출간 방식', purpose: '사용 목적',
      }[question.id],
      value: getOptionLabel(question.id, answers[question.id]),
    }))
}

export function getResultStatusSummary(answers) {
  const visibleIds = new Set(getVisibleQuestions(answers).map(question => question.id))
  const rows = [
    ['bookType', '책 종류', getOptionLabel('bookType', answers.bookType)],
    ['format', '희망 형태', getOptionLabel('format', answers.format)],
    ['quantity', '희망 수량', getOptionLabel('quantity', answers.quantity)],
    ['manuscript', '원고 상태', getOptionLabel('manuscript', answers.manuscript)],
    ['fileFormat', '파일 형식', getOptionLabel('fileFormat', answers.fileFormat)],
    ['cover', '표지 상태', getOptionLabel('cover', answers.cover)],
    ['purpose', '사용 목적', getOptionLabel('purpose', answers.purpose)],
    ['publication', '출간 방식', getOptionLabel('publication', answers.publication)],
  ]
    .filter(([id, , value]) => visibleIds.has(id) && value)
    .map(([id, shortLabel, value]) => ({ id, shortLabel, value }))
  const trimValue = [
    visibleIds.has('trimStatus') ? getOptionLabel('trimStatus', answers.trimStatus) : '',
    visibleIds.has('bookSize') ? getOptionLabel('bookSize', answers.bookSize) : '',
  ].filter(Boolean).join(' · ')
  const insertAt = rows.findIndex(row => row.id === 'cover')
  if (trimValue) rows.splice(insertAt < 0 ? rows.length : insertAt, 0, { id: 'trim', shortLabel: '판형/책 크기', value: trimValue })
  return rows
}

export function getConsultationAnswerRows(answers) {
  return [
    ['책 종류', getOptionLabel('bookType', answers.bookType)],
    ['희망 형태', getOptionLabel('format', answers.format)],
    ['희망 부수', getOptionLabel('quantity', answers.quantity)],
    ['원고 준비 상태', getOptionLabel('manuscript', answers.manuscript)],
    ['파일 형식', getOptionLabel('fileFormat', answers.fileFormat)],
    ['판형 상태', getOptionLabel('trimStatus', answers.trimStatus)],
    ['현재 책 크기', getOptionLabel('bookSize', answers.bookSize)],
    ['수정 가능한 원본파일 보유 여부', getOptionLabel('sourceFile', answers.sourceFile)],
    ['표지 상태', getOptionLabel('cover', answers.cover)],
    ['희망 작업', getOptionLabel('needs', answers.needs)],
    ['사용 목적', getOptionLabel('purpose', answers.purpose)],
    ['정식 출간·서점 판매 여부', getOptionLabel('publication', answers.publication)],
  ]
}

export function buildGuideCopyText(answers, result = getGuideResult(answers)) {
  const lines = getAnswerSummary(answers).map(item => `${item.shortLabel}: ${item.value}`)
  return ['[마이티북스 출판 길라잡이 결과]', ...lines, `추천 제작 방식: ${result.title}`].join('\n')
}

export function validateGuideAnswers(answers) {
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) return false
  return getVisibleQuestions(answers).every(question => {
    const value = answers[question.id]
    const allowed = new Set(question.options.map(item => item.value))
    if (question.multiple) {
      return Array.isArray(value) && value.length > 0 && value.length <= question.options.length && value.every(item => allowed.has(item))
    }
    return typeof value === 'string' && allowed.has(value)
  })
}

export function getEstimatedCopies(quantity) {
  return { '1-10': 10, '11-29': 29, '30-49': 49, '50-100': 100, '101-300': 300, '301+': 301 }[quantity] || null
}
