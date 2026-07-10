'use client'
import { useState } from 'react'
import styles from './faq.module.css'

const EMAIL = 'novelstudylab@naver.com'
const KAKAO_URL = 'https://open.kakao.com/me/mightybooks'

const faqs = [
  {
    q: '모든 문의와 상담이 유료인가요?',
    a: [
      '아닙니다. 제작 가능 여부, 상담 경로, 기본 진행 방식처럼 간단한 문의는 무료로 가능합니다.',
      '다만 원고를 직접 검토해야 하거나, 기획출간 가능성 판단, 출간 방식 분석, 제작비 구조 점검처럼 구체적인 검토가 필요한 경우에는 기획출간 유료상담으로 진행합니다.',
    ],
  },
  {
    q: '기획출간 유료상담은 어떤 경우에 필요한가요?',
    a: [
      '기획출간 가능성을 확인받고 싶거나, 원고 상태와 출판 가능성을 구체적으로 검토받고 싶은 경우에 필요합니다.',
      '기획출간 유료상담은 원고의 완성도, 출간 목적, 독자층, 제작 방식, 현실적인 선택지를 함께 검토하는 절차입니다.',
      '단순 제작 문의와는 구분되며, 무분별한 투고를 자동 검토하는 방식으로 운영하지 않습니다.',
    ],
  },
  {
    q: '자서전이나 기념 도서는 원고가 없어도 제작할 수 있나요?',
    a: [
      '가능합니다. 완성 원고가 없어도 인터뷰, 녹취, 메모, 사진, 연표, 가족 자료를 바탕으로 제작을 시작할 수 있습니다.',
      '직접 글을 쓰기 어려운 경우에는 이야기를 듣고 삶의 흐름을 정리하는 방식으로 진행할 수 있습니다.',
      '당사자가 고령이거나 직접 응대가 어려운 경우에는 가족이나 지인의 도움을 받아 자료를 정리할 수 있습니다.',
    ],
  },
  {
    q: '자서전은 몇 권부터 제작할 수 있나요?',
    a: [
      '자서전과 기념 도서는 기본 5권 소량 제작부터 상담할 수 있습니다.',
      '가족 소장용, 부모님 선물용, 칠순·팔순 기념, 퇴임·은퇴 기념, 가족사 기록집 등 목적에 맞게 제작 부수와 사양을 조정합니다.',
      '20권 미만의 소량 제작부터 100권 이상 배포용 제작까지 상담 가능합니다.',
    ],
  },
  {
    q: '시집이나 문집도 제작할 수 있나요?',
    a: [
      '가능합니다. 개인 시집, 수필집, 가족 문집, 동호회 문집, 추모 문집, 작품집 등을 제작할 수 있습니다.',
      '시집과 문집은 단순히 원고를 배열하는 작업이 아니라, 작품의 순서, 행갈이, 여백, 표지와 내지의 조화를 함께 고려해야 합니다.',
      '원고 상태와 제작 목적에 따라 소량 제작, ISBN 발급, 서점 유통 여부를 함께 검토할 수 있습니다.',
    ],
  },
  {
    q: '기관이나 기업 소책자는 어떻게 진행하나요?',
    a: [
      '기관ㆍ기업 소책자는 자료집, 교육자료, 행사 소책자, 활동 기록집, 프로젝트 보고서, 강의 교재 등 목적에 맞춰 제작합니다.',
      '자료 상태, 편집 범위, 디자인 난이도, 인쇄 부수, 납품 방식에 따라 제작비가 달라지므로 상담을 통해 범위와 예산을 먼저 확인합니다.',
      '기관ㆍ기업 소책자는 고정 가격표보다 실제 자료와 제작 목적을 확인한 뒤 견적을 안내하는 방식으로 진행합니다.',
    ],
  },
  {
    q: '전자책과 웹북 제작도 가능한가요?',
    a: [
      '가능합니다. EPUB, PDF 전자책과 웹브라우저에서 바로 읽는 반응형 웹북 제작을 상담할 수 있습니다.',
      '회원가입, 결제, 구매자 인증과 관리자 기능이 필요한 웹북은 기본 제작이 아닌 별도 개발 범위입니다.',
      '원고의 목적, 독자의 이용 환경, 판매와 배포 방식에 맞는 형식을 먼저 확인합니다.',
    ],
  },
  {
    q: '제작비는 어떻게 결정되나요?',
    a: [
      '제작비는 원고 분량, 인터뷰 필요 여부, 교정·윤문 범위, 표지와 내지 디자인, 사진 보정, 인쇄 부수, 제본 방식, 유통 여부에 따라 달라집니다.',
      '홈페이지에 표시된 금액이나 플랜은 상담 전 예상 기준이며, 확정 견적이 아닙니다.',
      '상담을 통해 원고 상태, 제작 목적, 예산, 필요한 작업 범위를 확인한 뒤 현실적인 진행 방향을 안내합니다.',
    ],
  },
  {
    q: 'ISBN 등록과 서점 유통도 가능한가요?',
    a: [
      '가능합니다. 다만 모든 책이 반드시 ISBN 등록이나 서점 유통을 목표로 해야 하는 것은 아닙니다.',
      '가족 소장용이나 기념 배포용 책은 ISBN 없이 제작하는 편이 더 적합할 수 있고, 외부 판매나 공적 기록이 필요한 책은 ISBN과 유통을 검토할 수 있습니다.',
      '자서전, 시집, 문집, 소책자의 유통 가능성은 책의 목적, 독자층, 제작 부수, 예산에 따라 달라집니다.',
    ],
  },
  {
    q: '방문 상담이 가능한가요?',
    a: [
      '방문 상담은 예약제로 진행합니다.',
      '대구 동구 안심역 인근 본사에서 상담할 수 있으며, 방문 전 전화 또는 카카오톡으로 일정과 상담 목적을 먼저 알려주셔야 합니다.',
      '원거리 의뢰자는 전화, 카카오톡, 이메일, 온라인 자료 전달을 통해 비대면으로도 상담할 수 있습니다.',
    ],
  },
  {
    q: '상담은 어떤 방식으로 신청하면 되나요?',
    a: [
      '현재는 1:1 전화 상담과 카톡 메신저 상담을 우선적으로 운영합니다.',
      '간단한 문의는 전화나 카톡으로 먼저 남겨주시면 되고, 원고 파일이나 자료 전달이 필요한 경우 이메일을 함께 사용할 수 있습니다.',
      '메일만으로 모든 내용을 정리하기보다, 먼저 전화나 카톡으로 제작 목적과 현재 상태를 알려주시면 더 빠르게 안내할 수 있습니다.',
    ],
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a.join(' '),
    },
  })),
}

export default function FaqPage() {
  const [open, setOpen] = useState(null)
  const [isPhoneOpen, setIsPhoneOpen] = useState(false)

  return (
    <div className={styles.wrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className={styles.header}>
        <span className={styles.tag}>Support</span>
        <h1 className={styles.title}>자주 묻는 <em>질문</em></h1>
        <div className={styles.line} />
        <p className={styles.seoLine}>
          자서전 제작, 기념 도서 제작, 시집·문집 제작, 기관ㆍ기업 소책자, 전자책 제작, 기획출간 유료상담에 대해 자주 묻는 질문을 정리했습니다.
        </p>
      </div>

      <div className={styles.list}>
        {faqs.map((f, i) => (
          <div
            key={f.q}
            className={`${styles.item} ${open === i ? styles.open : ''}`}
          >
            <button
              type="button"
              className={styles.question}
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`faq-answer-${i}`}
            >
              <span>Q. {f.q}</span>
              <span className={styles.arrow}>{open === i ? '−' : '+'}</span>
            </button>

            <div id={`faq-answer-${i}`} className={styles.answer}>
              {f.a.map((line, idx) => (
                <p key={line}>
                  {idx === 0 ? 'A. ' : ''}
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <p className={styles.seoLine}>제작 목적과 원고 상태를 알려주시면 가장 적합한 진행 방식을 안내드립니다.</p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'left' }}>
            <button
              type="button"
              className={styles.ctaBtn}
              onClick={() => setIsPhoneOpen(true)}
            >
              1:1 전화 상담
            </button>
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtnGhost}
            >
              카톡 메신저 상담
            </a>
            <a href={`mailto:${EMAIL}`} className={styles.ctaBtnGhost}>
              메일
            </a>
          </div>
        </div>
      </section>

      {isPhoneOpen && (
        <div
          className={styles.phonePopupOverlay}
          role="presentation"
          onClick={() => setIsPhoneOpen(false)}
        >
          <div
            className={styles.phonePopup}
            role="dialog"
            aria-modal="true"
            aria-labelledby="phone-popup-title"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.phonePopupClose}
              aria-label="전화 상담 연락처 닫기"
              onClick={() => setIsPhoneOpen(false)}
            >
              ×
            </button>
            <div id="phone-popup-title" className={styles.phonePopupTitle}>1:1 전화 상담</div>
            <a href="tel:010-5148-9433" className={styles.phonePopupNumber}>
              010-5148-9433
            </a>
            <p className={styles.phonePopupDesc}>상담 가능 시간: 월-금 09:00-17:00 / 주말, 공휴일 휴무</p>
          </div>
        </div>
      )}
    </div>
  )
}
