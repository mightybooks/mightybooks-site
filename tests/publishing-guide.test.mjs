import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { buildConsultationNotification } from '../lib/mail/sendConsultationNotification.mjs'

const moduleSource = await readFile(new URL('../components/publishing-guide/publishingGuideData.js', import.meta.url), 'utf8')
const {
  applyGuideAnswer,
  classifyGuideResult,
  getFileFormatNotice,
  getGuideResult,
  getConsultationAnswerRows,
  getResultStatusSummary,
  getVisibleQuestions,
  pruneHiddenGuideAnswers,
  RESULT_TYPES,
  GUIDE_QUESTIONS,
} = await import(`data:text/javascript;base64,${Buffer.from(moduleSource).toString('base64')}`)

const common = {
  format: 'print',
  quantity: '1-10',
  publication: 'production-only',
  purpose: 'personal',
}

const cases = [
  ['A', RESULT_TYPES.AUTOBIOGRAPHY_FULL, {
    ...common, bookType: 'autobiography', manuscript: 'interview', cover: 'none', needs: ['interior'],
  }],
  ['B', RESULT_TYPES.PRINT_READY, {
    ...common, bookType: 'essay', manuscript: 'designed', fileFormat: 'pdf', trimStatus: 'final',
    bookSize: 'a5', sourceFile: 'pdf-only', cover: 'full', needs: ['print-only'],
  }],
  ['C', RESULT_TYPES.REFORMAT_SOURCE, {
    ...common, bookType: 'essay', manuscript: 'designed', fileFormat: 'pdf', trimStatus: 'unset',
    sourceFile: 'yes', cover: 'full', needs: ['reformat'],
  }],
  ['D', RESULT_TYPES.REFORMAT_PDF, {
    ...common, bookType: 'essay', manuscript: 'designed', fileFormat: 'pdf', trimStatus: 'unset',
    sourceFile: 'pdf-only', cover: 'full', needs: ['reformat'],
  }],
  ['E', RESULT_TYPES.FULL_LIGHT, {
    ...common, bookType: 'essay', manuscript: 'computer', fileFormat: 'hwp', cover: 'none', needs: ['interior', 'cover-design'],
  }],
  ['F', RESULT_TYPES.INSTITUTIONAL, {
    ...common, bookType: 'professional', quantity: '301+', manuscript: 'computer', fileFormat: 'word',
    cover: 'none', needs: ['interior', 'cover-design'], purpose: 'internal',
  }],
  ['G', RESULT_TYPES.INSTITUTIONAL, {
    ...common, bookType: 'institutional', quantity: '101-300', manuscript: 'designed', fileFormat: 'pdf',
    trimStatus: 'final', bookSize: 'shinguk', sourceFile: 'yes', cover: 'full', needs: ['print-only'], purpose: 'internal',
  }],
  ['H', RESULT_TYPES.EBOOK, {
    bookType: 'professional', format: 'ebook', manuscript: 'computer', fileFormat: 'hwp', cover: 'front',
    needs: ['interior'], publication: 'distribution', purpose: 'sale',
  }],
  ['I', RESULT_TYPES.PRINT_FIX, {
    ...common, bookType: 'essay', manuscript: 'designed', fileFormat: 'pdf', trimStatus: 'final',
    bookSize: 'a5', sourceFile: 'pdf-only', cover: 'front', needs: ['cover-design'],
  }],
]

for (const [label, expected, answers] of cases) {
  test(`분기 ${label}: ${expected}`, () => {
    assert.equal(classifyGuideResult(answers), expected)
  })
}

test('전자책 정식 출간 결과에는 품질 확인 안내가 포함된다', () => {
  const answers = cases.find(([label]) => label === 'H')[2]
  const result = getGuideResult(answers)
  assert.match(result.publicationNote.text, /원고·편집·디자인 상태/)
})

test('종이책에서 전자책으로 변경하면 과거 수량과 이후 응답을 제거한다', () => {
  const answers = { ...cases.find(([label]) => label === 'B')[2] }
  const changed = applyGuideAnswer(answers, 'format', 'ebook')
  assert.deepEqual(changed, { bookType: 'essay', format: 'ebook' })
})

test('PDF에서 HWP로 변경하면 원본파일 여부를 포함한 이후 응답을 제거한다', () => {
  const answers = { ...cases.find(([label]) => label === 'C')[2] }
  const changed = applyGuideAnswer(answers, 'fileFormat', 'hwp')
  assert.equal(changed.sourceFile, undefined)
  assert.equal(changed.trimStatus, undefined)
  assert.equal(changed.cover, undefined)
})

test('최종 책 크기에서 별도 설정 없음으로 변경하면 특정 판형을 제거한다', () => {
  const answers = { ...cases.find(([label]) => label === 'B')[2] }
  const changed = applyGuideAnswer(answers, 'trimStatus', 'unset')
  assert.equal(changed.bookSize, undefined)
  assert.equal(changed.sourceFile, undefined)
})

test('서점 판매에서 개인 보관으로 변경하면 정식 출간 응답을 제거한다', () => {
  const answers = { ...cases.find(([label]) => label === 'H')[2] }
  const changed = applyGuideAnswer(answers, 'purpose', 'personal')
  assert.equal(changed.purpose, 'personal')
  assert.equal(changed.publication, undefined)
})

test('서버 정규화는 조건상 숨겨진 응답을 제거한다', () => {
  const ebook = pruneHiddenGuideAnswers({ ...cases.find(([label]) => label === 'H')[2], quantity: '1-10' })
  assert.equal(ebook.quantity, undefined)

  const hwp = pruneHiddenGuideAnswers({ ...cases.find(([label]) => label === 'E')[2], sourceFile: 'yes' })
  assert.equal(hwp.sourceFile, undefined)

  const unsetTrim = pruneHiddenGuideAnswers({ ...cases.find(([label]) => label === 'C')[2], bookSize: 'a5' })
  assert.equal(unsetTrim.bookSize, undefined)
})

test('숨겨진 과거 응답은 상담 이메일 행에도 포함되지 않는다', () => {
  const ebook = pruneHiddenGuideAnswers({ ...cases.find(([label]) => label === 'H')[2], quantity: '1-10' })
  const answerRows = getConsultationAnswerRows(ebook)
  const message = buildConsultationNotification({
    customer: { name: '테스트', contact: '010-0000-0000', note: '' },
    answerRows,
    result: getGuideResult(ebook),
    receivedAt: new Date('2026-08-26T00:00:00.000Z'),
  })
  assert.match(message.text, /희망 부수: 해당 없음/)
  assert.doesNotMatch(message.text, /1~10권/)
})

test('종이책 형태에만 수량 질문이 노출된다', () => {
  const questionIds = format => getVisibleQuestions({ format }).map(question => question.id)
  assert.ok(questionIds('print').includes('quantity'))
  assert.ok(questionIds('both').includes('quantity'))
  assert.ok(!questionIds('ebook').includes('quantity'))

  const quantity = getVisibleQuestions({ format: 'print' }).find(question => question.id === 'quantity')
  assert.deepEqual(quantity.options.map(item => item.label), [
    '1~10권', '11~29권', '30~49권', '50~100권', '101~300권', '301권 이상', '아직 모르겠습니다',
  ])
  assert.deepEqual(quantity.options.map(item => item.value), [
    '1-10', '11-29', '30-49', '50-100', '101-300', '301+', 'unknown',
  ])
})

test('사용 목적에 따라 정식 출간 질문을 조건부로 표시한다', () => {
  const hasPublication = purpose => getVisibleQuestions({ purpose }).some(question => question.id === 'publication')
  assert.equal(hasPublication('sale'), true)
  assert.equal(hasPublication('unknown'), true)
  for (const purpose of ['personal', 'gift', 'event', 'internal']) assert.equal(hasPublication(purpose), false)
})

test('요청한 사용 목적·정식 출간 조합의 결과와 안내를 유지한다', () => {
  const scenarios = [
    ['A', RESULT_TYPES.PRINT_READY, cases.find(([label]) => label === 'B')[2], false],
    ['B', RESULT_TYPES.FULL_LIGHT, {
      ...common, bookType: 'essay', manuscript: 'computer', fileFormat: 'hwp', cover: 'none',
      needs: ['interior', 'cover-design'], purpose: 'sale', publication: 'formal',
    }, true],
    ['C', RESULT_TYPES.EBOOK, {
      bookType: 'professional', format: 'ebook', manuscript: 'computer', fileFormat: 'hwp', cover: 'front',
      needs: ['interior'], purpose: 'sale', publication: 'distribution',
    }, true],
    ['D', RESULT_TYPES.INSTITUTIONAL, cases.find(([label]) => label === 'G')[2], false],
    ['E', RESULT_TYPES.AUTOBIOGRAPHY_FULL, cases.find(([label]) => label === 'A')[2], false],
  ]

  for (const [label, expectedType, answers, expectsPublishingNote] of scenarios) {
    const result = getGuideResult(pruneHiddenGuideAnswers(answers))
    assert.equal(result.type, expectedType, `시나리오 ${label}`)
    assert.equal(Boolean(result.publicationNote && result.publicationNote.id === 'formal-publishing'), expectsPublishingNote)
  }
})

test('8개 결과 유형이 맞춤 제목과 기본 안내를 제공한다', () => {
  const expectedTitles = {
    PRINT_READY: '현재 파일을 활용한 종이책 제작이 적합합니다.',
    PRINT_FIX: '현재 파일을 살리면서 인쇄 전 보완하는 방식이 적합합니다.',
    REFORMAT_SOURCE: '기존 원본파일을 활용한 판형 재편집이 적합합니다.',
    REFORMAT_PDF: '현재 PDF를 기준으로 재편집 가능 범위를 먼저 확인해야 합니다.',
    FULL_LIGHT: '전체 편집·디자인 제작이 적합합니다.',
    EBOOK: '전자책 중심 제작이 적합합니다.',
    AUTOBIOGRAPHY_FULL: '자서전은 원고 작성 이전 단계부터 함께 진행하는 방식이 적합합니다.',
    INSTITUTIONAL: '기관·단체 제작 방식으로 별도 검토하는 것이 적합합니다.',
  }
  for (const [, type, answers] of cases) {
    const result = getGuideResult(pruneHiddenGuideAnswers(answers))
    assert.equal(result.title, expectedTitles[type])
    assert.ok(result.summary.length > 20)
    assert.ok(result.tasks.length >= 4)
  }
})

test('A: 완성 PDF 소량 제작은 맞춤 제목과 소량 안내를 제공한다', () => {
  const result = getGuideResult(pruneHiddenGuideAnswers(cases.find(([label]) => label === 'B')[2]))
  assert.equal(result.type, RESULT_TYPES.PRINT_READY)
  assert.equal(result.title, '현재 파일을 활용한 종이책 제작이 적합합니다.')
  assert.ok(result.notes.some(note => note.id === 'small-print-run'))
  assert.doesNotMatch(result.summary, /전체 편집·디자인 제작이 적합/)
})

test('B·C: 원본 유무에 따라 판형 재편집 안내가 구분된다', () => {
  const source = getGuideResult(pruneHiddenGuideAnswers(cases.find(([label]) => label === 'C')[2]))
  const pdf = getGuideResult(pruneHiddenGuideAnswers(cases.find(([label]) => label === 'D')[2]))
  assert.equal(source.title, '기존 원본파일을 활용한 판형 재편집이 적합합니다.')
  assert.match(pdf.summary, /PDF만 있는 경우/)
  assert.ok(pdf.tasks.includes('PDF 구조 및 품질 확인'))
})

test('D: 전체 제작에서 교정·교열과 표지 제작을 반영한다', () => {
  const answers = {
    ...common, bookType: 'essay', manuscript: 'computer', fileFormat: 'hwp', cover: 'none',
    needs: ['interior', 'cover-design', 'proofreading'],
  }
  const result = getGuideResult(pruneHiddenGuideAnswers(answers))
  assert.equal(result.type, RESULT_TYPES.FULL_LIGHT)
  assert.equal(result.title, '전체 편집·디자인 제작이 적합합니다.')
  assert.ok(result.notes.some(note => note.id === 'proofreading'))
  assert.ok(result.notes.some(note => note.id === 'cover-missing'))
  assert.ok(result.tasks.includes('표지 제작'))
  assert.ok(result.tasks.includes('교정·교열 및 최종 확인'))
})

test('E·F·G: 전자책·자서전·기관 결과의 핵심 작업을 분리한다', () => {
  const ebook = getGuideResult(pruneHiddenGuideAnswers(cases.find(([label]) => label === 'H')[2]))
  assert.equal(ebook.title, '전자책 중심 제작이 적합합니다.')
  assert.ok(ebook.tasks.includes('전자책 파일 제작'))
  assert.ok(!ebook.tasks.some(task => task.includes('인쇄·제본')))

  const autobiography = getGuideResult(pruneHiddenGuideAnswers(cases.find(([label]) => label === 'A')[2]))
  assert.ok(autobiography.tasks.includes('인터뷰·녹취 및 자료 확인'))
  assert.ok(autobiography.tasks.includes('원고 작성·정리'))

  const institutional = getGuideResult(pruneHiddenGuideAnswers(cases.find(([label]) => label === 'G')[2]))
  assert.equal(institutional.title, '기관·단체 제작 방식으로 별도 검토하는 것이 적합합니다.')
  assert.ok(!institutional.notes.some(note => note.id === 'small-print-run'))
})

test('H: 전자책 앞표지만 있는 종이책은 전체 표지 구성을 안내한다', () => {
  const answers = {
    ...common, bookType: 'essay', manuscript: 'designed', fileFormat: 'pdf', trimStatus: 'final',
    bookSize: 'a5', sourceFile: 'yes', cover: 'ebook-front', needs: ['cover-design'],
  }
  const result = getGuideResult(pruneHiddenGuideAnswers(answers))
  const note = result.notes.find(item => item.id === 'ebook-cover-only')
  assert.match(note.text, /책등과 뒤표지를 포함한 전체 표지 구성/)
})

test('I: 서점 판매는 출간 품질 안내를 제공하고 ISBN 판매식 표현을 쓰지 않는다', () => {
  const answers = {
    ...common, bookType: 'essay', manuscript: 'computer', fileFormat: 'hwp', cover: 'none',
    needs: ['interior', 'cover-design'], purpose: 'sale', publication: 'formal',
  }
  const result = getGuideResult(pruneHiddenGuideAnswers(answers))
  assert.match(result.publicationNote.text, /원고·편집·디자인 상태/)
  assert.doesNotMatch(JSON.stringify(result), /ISBN/)
})

test('결과의 현재 상태에서는 고객 희망 작업을 추천 작업과 중복 표시하지 않는다', () => {
  const answers = cases.find(([label]) => label === 'B')[2]
  const status = getResultStatusSummary(pruneHiddenGuideAnswers(answers))
  assert.ok(!status.some(item => item.id === 'needs'))
  assert.ok(status.some(item => item.id === 'trim' && item.shortLabel === '판형/책 크기'))
})

test('A·B: PDF와 Canva는 서로 다른 제작 조건 안내를 제공한다', () => {
  const pdf = getFileFormatNotice('pdf')
  const canva = getFileFormatNotice('canva')
  assert.equal(pdf.title, 'PDF 파일을 가지고 계시는군요.')
  assert.match(pdf.body, /수정 가능한 원본파일이 필요/)
  assert.match(pdf.support, /현재 파일을 기준으로 제작/)
  assert.equal(canva.title, 'Canva로 작업하셨군요.')
  assert.match(canva.body, /Canva 원작업에서 직접 수정한 뒤 새로운 PDF/)
  assert.match(canva.support, /최종 PDF를 기준으로 제작/)
  assert.notEqual(pdf.body, canva.body)
})

test('C·D·E: HWP·DOCX·InDesign은 중간 안내 없이 진행한다', () => {
  for (const fileFormat of ['hwp', 'word', 'indesign']) assert.equal(getFileFormatNotice(fileFormat), null)
})

test('PDF·Canva 안내는 질문이나 STEP으로 추가되지 않는다', () => {
  assert.ok(!GUIDE_QUESTIONS.some(question => question.id === 'fileNotice'))
  assert.ok(!GUIDE_QUESTIONS.some(question => question.id === 'pdfNotice' || question.id === 'canvaNotice'))
})

test('PDF·Canva 확인 후에는 기존 파일 형식 다음 질문으로 진행한다', () => {
  const nextQuestionId = answers => {
    const visible = getVisibleQuestions(answers)
    const position = visible.findIndex(question => question.id === 'fileFormat')
    return visible[position + 1]?.id
  }
  const base = { bookType: 'essay', format: 'print', quantity: '1-10', manuscript: 'computer' }
  assert.equal(nextQuestionId({ ...base, fileFormat: 'pdf' }), 'trimStatus')
  assert.equal(nextQuestionId({ ...base, fileFormat: 'canva' }), 'trimStatus')
  assert.equal(nextQuestionId({ ...base, fileFormat: 'hwp' }), 'cover')
})

test('F·G·H: 파일 형식 변경 시 안내 상태와 이후 숨겨진 응답이 남지 않는다', () => {
  const pdfAnswers = {
    bookType: 'essay', format: 'print', quantity: '1-10', manuscript: 'designed', fileFormat: 'pdf',
    trimStatus: 'unset', sourceFile: 'pdf-only', cover: 'full', needs: ['reformat'], purpose: 'personal',
  }
  const hwpAnswers = applyGuideAnswer(pdfAnswers, 'fileFormat', 'hwp')
  assert.equal(getFileFormatNotice('hwp'), null)
  assert.equal(hwpAnswers.sourceFile, undefined)
  assert.equal(hwpAnswers.trimStatus, undefined)
  assert.ok(!Object.hasOwn(hwpAnswers, 'fileNoticeType'))

  const canvaAnswers = applyGuideAnswer(pdfAnswers, 'fileFormat', 'canva')
  assert.equal(getFileFormatNotice(canvaAnswers.fileFormat).title, 'Canva로 작업하셨군요.')
  const changedBackToPdf = applyGuideAnswer(canvaAnswers, 'fileFormat', 'pdf')
  assert.equal(getFileFormatNotice(changedBackToPdf.fileFormat).title, 'PDF 파일을 가지고 계시는군요.')
})

test('50~300권은 일반 결과를 유지하고 301권 이상만 기관·대량으로 판정한다', () => {
  const printReady = cases.find(([label]) => label === 'B')[2]
  assert.equal(classifyGuideResult({ ...printReady, quantity: '50-100' }), RESULT_TYPES.PRINT_READY)
  assert.equal(classifyGuideResult({ ...printReady, quantity: '101-300' }), RESULT_TYPES.PRINT_READY)
  assert.equal(classifyGuideResult({ ...printReady, quantity: '301+' }), RESULT_TYPES.INSTITUTIONAL)
  const quantityValues = GUIDE_QUESTIONS.find(question => question.id === 'quantity').options.map(item => item.value)
  assert.ok(!quantityValues.includes('301-500'))
  assert.ok(!quantityValues.includes('501+'))
})
