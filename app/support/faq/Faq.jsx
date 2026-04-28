'use client'
import { useState } from 'react'
import styles from './faq.module.css'

const EMAIL = 'novelstudylab@naver.com'
const KAKAO_URL = 'https://open.kakao.com/me/mightybooks'

const faqs = [
  {
    q: '모든 출판상담은 유료인가요?',
    a: [
      '아닙니다. 간단한 문의와 진행 가능 여부 확인은 무료로 가능합니다.',
      '다만 원고 방향, 출간 가능성, 제작 방식, 예상 비용, 유통 가능성 등을 구체적으로 검토해야 하는 경우에는 유료 출판 상담 진단으로 진행됩니다.',
    ],
  },
  {
    q: '무료 문의로는 어디까지 확인할 수 있나요?',
    a: [
      '출판 진행 가능 여부, 상담 신청 경로, 기본 제작 범위, 연락 방법 등은 무료 문의로 확인하실 수 있습니다.',
      '다만 원고를 읽고 방향을 판단하거나, 제작 견적과 출간 전략을 구체적으로 제안하는 단계는 별도 상담 진단이 필요합니다.',
    ],
  },
  {
    q: '유료 출판 상담 진단은 어떤 경우에 필요한가요?',
    a: [
      '원고를 책으로 만들 수 있을지, 어떤 방식의 출간이 적합한지, 제작비가 어느 정도 필요할지 알고 싶을 때 필요합니다.',
      '단순 문의가 아니라 실제 출간 여부를 판단하고 싶은 분들을 위한 사전 진단 절차입니다.',
    ],
  },
  {
    q: '출판 상담 진단은 어떻게 진행되나요?',
    a: [
      '상담 진단 상품을 신청하신 뒤 질문지를 작성해 제출하시면, 답변 내용을 바탕으로 원고의 방향과 출간 가능성을 검토합니다.',
      '검토 후 필요에 따라 이메일, 카카오 상담, 전화 상담 등으로 다음 단계를 안내드립니다.',
    ],
  },
  {
    q: '질문지는 언제 제출하나요?',
    a: [
      '질문지는 결제 후 48시간 이후부터 제출할 수 있으며, 제출 마감은 결제일로부터 7일 이내입니다.',
      '즉흥적인 답변보다 충분히 생각한 내용을 바탕으로 상담하기 위한 기준입니다.',
    ],
  },
  {
    q: '원고가 완성되지 않아도 상담할 수 있나요?',
    a: [
      '가능합니다. 원고가 완성되지 않았더라도 기획 의도, 예상 분량, 독자 대상, 출간 목적, 희망 일정 등을 바탕으로 상담할 수 있습니다.',
      '다만 실제 제작 견적은 원고 상태가 구체화된 뒤 더 정확하게 산정됩니다.',
    ],
  },
  {
    q: '출간 방식은 어떻게 결정되나요?',
    a: [
      '원고의 성격, 완성도, 출간 목적, 독자 대상, 제작비 부담 여부, 유통 필요성 등을 종합해 판단합니다.',
      '마이티북스는 애매한 방식으로 진행하지 않고, 출판사가 검토해 진행하는 방식인지, 저자 부담 제작이 필요한 방식인지 구분해 안내합니다.',
    ],
  },
  {
    q: '자서전, 문집, 시집도 제작할 수 있나요?',
    a: [
      '가능합니다. 개인 자서전, 가족사, 단체 문집, 시집, 학원 교재, 소량 맞춤 도서 제작 등을 진행할 수 있습니다.',
      '제작 목적과 독자, 원고 분량, 제작 부수에 따라 편집 방식과 제작 방식이 달라집니다.',
    ],
  },
  {
    q: '원고 검토는 언제 진행되나요?',
    a: [
      '원고 검토는 사전 문의 또는 출판 상담 진단 이후 필요한 경우에만 진행됩니다.',
      '마이티북스는 무작위 투고 원고를 접수해 일괄 검토하는 방식이 아니라, 출간 목적과 제작 방향을 먼저 확인한 뒤 원고 검토 여부를 안내합니다.',
      ],
  },
  {
    q: '서점 유통도 가능한가요?',
    a: [
      '출간 방식과 제작 조건에 따라 온라인 서점 유통이 가능한 경우가 있습니다.',
      '유통 가능 여부는 상담 과정에서 원고와 제작 방향을 확인한 뒤 안내드립니다.',
    ],
  },
  {
    q: '출간 후 홍보도 진행되나요?',
    a: [
      '출간 도서의 성격에 따라 기본 소개문, 온라인 노출, 콘텐츠 활용 방향 등을 함께 검토할 수 있습니다.',
      '다만 판매량이나 특정 성과를 보장하지는 않습니다.',
    ],
  },
  {
    q: '교육은 1:1 수업인가요? 그룹 진행인가요?',
    a: [
      '교육은 신청자의 목적, 수준, 선호 일정에 따라 그룹 수업 또는 1:1 수업으로 진행됩니다.',
      '먼저 사전 신청서를 통해 희망 과정, 선호 날짜, 시간대, 수업 목적을 확인한 뒤 일정이 맞는 신청자가 있으면 그룹으로 묶고, 일정이나 목적이 맞지 않으면 1:1 수업으로 안내합니다.',
    ],
  },
  {
    q: '교육 신청은 어떻게 하나요?',
    a: [
      '교육 신청은 먼저 사전 신청서를 작성하는 방식으로 진행됩니다.',
      '신청서에 희망 수업, 선호 요일과 시간대, 현재 글쓰기 상태, 수업 목적을 적어주시면 가능한 진행 방식을 안내드립니다.',
    ],
  },
  {
    q: '교육 신청 전에도 상담이 필요한가요?',
    a: [
      '필요합니다. 글쓰기 교육은 신청자의 목표와 현재 상태에 따라 진행 방식이 달라질 수 있습니다.',
      '사전 신청서를 통해 원하는 수업 방향, 가능한 요일과 시간, 배우고 싶은 내용을 먼저 확인한 뒤 적합한 방식으로 안내드립니다.',
    ],
  },
  {
    q: '방문 상담도 가능한가요?',
    a: [
      '방문 상담은 사전 예약제로 진행합니다.',
      '예약 없이 방문하실 경우 상담이 어려울 수 있으므로, 먼저 이메일 또는 카카오 상담으로 일정을 문의해주세요.',
    ],
  },
  {
    q: '상담 가능 시간은 언제인가요?',
    a: [
      '기본 상담 가능 시간은 월요일부터 금요일, 오전 9시부터 오후 5시까지입니다.',
      '주말 및 공휴일은 휴무이며, 업무 상황에 따라 답변이 늦어질 수 있습니다.',
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
          마이티북스 출판 서비스, 자비출간, 기획출판 검토, 출판 상담 진단에 대한 자주 묻는 질문을 정리한 페이지입니다.
        </p>
      </div>

      <div className={styles.list}>
        {faqs.map((f, i) => (
          <div
            key={i}
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
                <p key={idx}>
                  {idx === 0 ? 'A. ' : ''}
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <p className={styles.seoLine}>출판 상담, 제작 문의, 교육 신청은 먼저 사전 문의로 진행됩니다.</p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'left' }}>
            <a href="mailto:novelstudylab@naver.com" className={styles.ctaBtn}>
              사전 문의하기 →
            </a>

            <a
              href="https://open.kakao.com/me/mightybooks"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtnGhost}
            >
              카카오톡으로 문의하기 →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}