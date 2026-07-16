'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { PhoneConsultModal } from '@/app/business/components/ServiceContactCta'
import {
  CHAPTER_PAGE_OPTIONS,
  IMAGE_OPTIONS,
  MANUSCRIPT_TYPES,
  MAX_CHARACTER_COUNT,
  MAX_EXTRA_PAGES,
  MAX_ITEM_COUNT,
  PIECE_PAGE_OPTIONS,
  STRUCTURE_TYPES,
  calculateBookPageEstimate,
  parseIntegerInput,
} from '@/lib/tools/bookPageCalculator'
import styles from '../tools.module.css'
import calculatorStyles from './bookPageCalculator.module.css'
import modalStyles from '../memoir-schedule/memoirSchedule.module.css'

const serviceLinks = {
  '자서전': ['/business/autobiography', '자서전 제작 방식 보기'],
  '소책자·기관 책자': ['/business/booklet', '소책자 제작 방식 보기'],
}

function formatNumber(value) {
  return Math.round(value).toLocaleString('ko-KR')
}

function parseOptionalInteger(value) {
  if (String(value).trim() === '') return 0
  return parseIntegerInput(value)
}

export default function BookPageCalculator() {
  const [manuscriptType, setManuscriptType] = useState('에세이·일반 산문')
  const [characterCountInput, setCharacterCountInput] = useState('')
  const [structureType, setStructureType] = useState('continuous')
  const [chapterCountInput, setChapterCountInput] = useState('')
  const [chapterPages, setChapterPages] = useState(2)
  const [pieceCountInput, setPieceCountInput] = useState('')
  const [pagesPerPiece, setPagesPerPiece] = useState(1.5)
  const [imageType, setImageType] = useState('none')
  const [fullPageImageCountInput, setFullPageImageCountInput] = useState('')
  const [appendixPagesInput, setAppendixPagesInput] = useState('0')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isCalculating, setIsCalculating] = useState(false)
  const [isPhoneOpen, setIsPhoneOpen] = useState(false)
  const resultRef = useRef(null)

  const characterCount = parseIntegerInput(characterCountInput)
  const chapterCount = parseIntegerInput(chapterCountInput)
  const pieceCount = parseIntegerInput(pieceCountInput)
  const fullPageImageCount = parseIntegerInput(fullPageImageCountInput)
  const appendixPages = parseOptionalInteger(appendixPagesInput)

  const isFormValid = useMemo(() => {
    if (!MANUSCRIPT_TYPES.includes(manuscriptType)) return false
    if (!characterCount || characterCount > MAX_CHARACTER_COUNT) return false
    if (!STRUCTURE_TYPES.some(option => option.value === structureType)) return false
    if (structureType === 'chapters' && (!chapterCount || chapterCount > MAX_ITEM_COUNT)) return false
    if (structureType === 'pieces' && (!pieceCount || pieceCount > MAX_ITEM_COUNT)) return false
    if (!IMAGE_OPTIONS.some(option => option.value === imageType)) return false
    if (imageType === 'full' && (!fullPageImageCount || fullPageImageCount > MAX_EXTRA_PAGES)) return false
    return appendixPages !== null && appendixPages >= 0 && appendixPages <= MAX_EXTRA_PAGES
  }, [appendixPages, chapterCount, characterCount, fullPageImageCount, imageType, manuscriptType, pieceCount, structureType])

  useEffect(() => {
    const handlePageShow = () => setIsCalculating(false)
    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  useEffect(() => {
    if (!result) return
    resultRef.current?.focus({ preventScroll: true })
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [result])

  const update = (setter) => (value) => {
    setter(value)
    setResult(null)
    setError('')
  }

  const updateNumeric = (setter) => (value) => update(setter)(value.replace(/[^\d,]/g, ''))

  const calculate = (event) => {
    event.preventDefault()
    if (!isFormValid || isCalculating) return
    setIsCalculating(true)
    try {
      const nextResult = calculateBookPageEstimate({
        manuscriptType,
        characterCount,
        structureType,
        chapterCount: structureType === 'chapters' ? chapterCount : 0,
        chapterPages,
        pieceCount: structureType === 'pieces' ? pieceCount : 0,
        pagesPerPiece,
        imageType,
        fullPageImageCount: imageType === 'full' ? fullPageImageCount : 0,
        appendixPages,
      })
      setError('')
      setResult(nextResult)
    } catch (calculationError) {
      setResult(null)
      setError(calculationError.message)
    } finally {
      setIsCalculating(false)
    }
  }

  const [serviceHref, serviceLabel] = serviceLinks[manuscriptType] || ['/business/self-publishing', '자비출판 제작 방식 보기']

  return (
    <>
      <section className={styles.calculatorSection} aria-labelledby="book-page-calculator-title">
        <div className={calculatorStyles.calculatorLayout}>
          <form className={styles.formPanel} onSubmit={calculate} noValidate>
            <h2 id="book-page-calculator-title" className={styles.panelTitle}>원고 정보 입력</h2>

            <div className={styles.field}>
              <label htmlFor="manuscript-type">원고 종류</label>
              <select id="manuscript-type" className={styles.select} value={manuscriptType} onChange={event => update(setManuscriptType)(event.target.value)}>
                {MANUSCRIPT_TYPES.map(type => <option key={type}>{type}</option>)}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="character-count">공백 포함 전체 글자 수</label>
              <input id="character-count" className={styles.input} type="text" inputMode="numeric" placeholder="예: 60000" value={characterCountInput} onChange={event => updateNumeric(setCharacterCountInput)(event.target.value)} onBlur={() => characterCount && setCharacterCountInput(characterCount.toLocaleString('ko-KR'))} aria-describedby="character-count-help" required />
              <small id="character-count-help" className={calculatorStyles.help}>한글이나 워드의 문서 통계에서 공백 포함 글자 수를 확인할 수 있습니다.</small>
            </div>

            <fieldset className={styles.fieldset}>
              <legend>원고 구성 방식</legend>
              <div className={styles.radioGrid}>
                {STRUCTURE_TYPES.map(option => <label key={option.value} className={styles.radio}><input type="radio" name="structure" checked={structureType === option.value} onChange={() => update(setStructureType)(option.value)} /><span><strong>{option.label}</strong><small>{option.description}</small></span></label>)}
              </div>
            </fieldset>

            {structureType === 'chapters' && <div className={calculatorStyles.conditionalFields}>
              <div className={styles.field}><label htmlFor="chapter-count">전체 장 수</label><input id="chapter-count" className={styles.input} type="text" inputMode="numeric" placeholder="예: 8" value={chapterCountInput} onChange={event => updateNumeric(setChapterCountInput)(event.target.value)} required /></div>
              <div className={styles.field}><label htmlFor="chapter-pages">장 구분 방식</label><select id="chapter-pages" className={styles.select} value={chapterPages} onChange={event => update(setChapterPages)(Number(event.target.value))}>{CHAPTER_PAGE_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select><small className={calculatorStyles.help}>장 제목, 인용문, 이미지와 여백 등을 별도로 구성하면 장마다 사용하는 페이지가 늘어날 수 있습니다.</small></div>
            </div>}

            {structureType === 'pieces' && <div className={calculatorStyles.conditionalFields}>
              <div className={styles.field}><label htmlFor="piece-count">전체 작품 수</label><input id="piece-count" className={styles.input} type="text" inputMode="numeric" placeholder="예: 101" value={pieceCountInput} onChange={event => updateNumeric(setPieceCountInput)(event.target.value)} required /></div>
              <div className={styles.field}><label htmlFor="pages-per-piece">작품당 평균 배치</label><select id="pages-per-piece" className={styles.select} value={pagesPerPiece} onChange={event => update(setPagesPerPiece)(Number(event.target.value))}>{PIECE_PAGE_OPTIONS.map(value => <option key={value} value={value}>평균 {value}쪽</option>)}</select><small className={calculatorStyles.help}>작품마다 새 페이지를 시작하거나 제목과 여백을 크게 사용하면 작품당 페이지 수가 늘어납니다.</small></div>
            </div>}

            <div className={styles.field}>
              <label htmlFor="image-type">이미지 배치 정도</label>
              <select id="image-type" className={styles.select} value={imageType} onChange={event => update(setImageType)(event.target.value)}>{IMAGE_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
            </div>

            {imageType === 'full' && <div className={styles.field}><label htmlFor="full-page-images">전체 페이지 이미지 수</label><input id="full-page-images" className={styles.input} type="text" inputMode="numeric" placeholder="예: 12" value={fullPageImageCountInput} onChange={event => updateNumeric(setFullPageImageCountInput)(event.target.value)} required /></div>}

            <div className={styles.field}>
              <label htmlFor="appendix-pages">예상 부록 페이지</label>
              <input id="appendix-pages" className={styles.input} type="text" inputMode="numeric" value={appendixPagesInput} onChange={event => updateNumeric(setAppendixPagesInput)(event.target.value)} />
              <small className={calculatorStyles.help}>연보, 사진 자료, 참고문헌, 체크리스트 등 별도로 추가할 부록의 예상 페이지를 입력해 주세요.</small>
            </div>

            <p className={calculatorStyles.poetryNotice}>시집은 작품 수와 행 구성에 따라 페이지 차이가 크므로 이 계산기의 대상에서 제외됩니다.</p>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button className={styles.button} type="submit" disabled={!isFormValid || isCalculating}>{isCalculating ? '계산 중…' : '예상 페이지 계산하기'}</button>
          </form>

          <aside className={styles.guidePanel}>
            <span className={styles.eyebrow}>How it works</span>
            <h3>글자 수와 책의 구성을 함께 계산합니다.</h3>
            <p>기본 페이지는 공백 포함 글자 수 ÷ 500 + 40으로 계산합니다. 여기에 장·작품 구성, 이미지와 부록을 반영한 뒤 인쇄 제본을 고려해 4쪽 단위로 조정합니다.</p>
            <div className={styles.processMini}>{['글자 수 기준', '장·작품 구성', '이미지 배치', '부록 분량', '4쪽 단위 조정', '±16쪽 예상 범위'].map(item => <span key={item}>{item}</span>)}</div>
            <p className={calculatorStyles.guideCaution}>이 결과는 마이티북스의 실제 편집 경험을 바탕으로 한 예상치이며 비용이나 최종 견적을 계산하지 않습니다.</p>
          </aside>
        </div>
      </section>

      {result && <section className={`${styles.results} ${calculatorStyles.results}`} ref={resultRef} tabIndex={-1} aria-live="polite" aria-labelledby="page-result-title">
        <div className={styles.resultInner}>
          <div className={calculatorStyles.resultHeadline}>
            <span id="page-result-title" className={styles.resultLabel}>입력한 원고의 예상 책 분량은</span>
            <strong>약 {formatNumber(result.minimumPages)}~{formatNumber(result.maximumPages)}쪽입니다.</strong>
            <p>일반적인 편집 기준 중심값: 약 {formatNumber(result.centerPages)}쪽</p>
          </div>

          <div className={calculatorStyles.breakdown} aria-label="예상 페이지 계산 근거">
            <h3>계산 근거</h3>
            <dl>
              <div><dt>공백 포함 글자 수</dt><dd>{result.characterCount.toLocaleString('ko-KR')}자</dd></div>
              <div><dt>글자 수 기준 기본 분량</dt><dd>약 {formatNumber(result.basePages)}쪽</dd></div>
              {result.structureType === 'chapters' && <div><dt>장 구분 반영</dt><dd>+{formatNumber(result.structureAddition)}쪽</dd></div>}
              {result.structureType === 'pieces' && <><div><dt>작품 기반 예상값</dt><dd>약 {formatNumber(result.pieceBasedPages)}쪽</dd></div><div><dt>작품형 구성 반영</dt><dd>+{formatNumber(result.structureAddition)}쪽</dd></div></>}
              <div><dt>이미지 반영</dt><dd>+{formatNumber(result.imagePages)}쪽</dd></div>
              <div><dt>부록</dt><dd>+{formatNumber(result.appendixPages)}쪽</dd></div>
              <div className={calculatorStyles.breakdownTotal}><dt>4쪽 단위 예상 중심값</dt><dd>약 {formatNumber(result.centerPages)}쪽</dd></div>
            </dl>
          </div>

          <div className={styles.notice}><strong>같은 글자 수라도 장과 작품의 구분, 여백, 이미지 배치, 글자 크기와 편집 방식에 따라 최종 페이지는 크게 달라질 수 있습니다.</strong>이 계산 결과는 마이티북스의 실제 편집 사례를 바탕으로 한 제작 전 예상 범위이며, 최종 제작 사양이나 견적을 확정하는 값은 아닙니다. 최종 인쇄 페이지는 제본과 인쇄 사양에 따라 4쪽 단위로 조정될 수 있습니다.</div>
          <div className={styles.ctaRow}>
            <button type="button" className={styles.button} onClick={() => setIsPhoneOpen(true)}>내 원고로 제작 상담하기</button>
            <Link href={serviceHref} className={styles.buttonGhost}>{serviceLabel}</Link>
          </div>
        </div>
      </section>}

      {isPhoneOpen && <PhoneConsultModal styles={modalStyles} onClose={() => setIsPhoneOpen(false)} />}
    </>
  )
}
