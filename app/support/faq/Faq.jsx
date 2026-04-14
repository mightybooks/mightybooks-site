'use client'
import { useState } from 'react'
import styles from './faq.module.css'

const faqs = [
  { q: '출판 문의는 어떻게 하나요?', a: 'novelstudylab@naver.com 또는 카카오 오픈톡(https://open.kakao.com/me/mightybooks)으로 연락주시면 됩니다.' },
  { q: '자서전, 문집 제작 비용은 어느 정도인가요?', a: '분량, 판형, 제작 부수에 따라 다릅니다. 문의 주시면 상세 견적을 안내해드립니다.' },
  { q: '원고 투고는 어떻게 하나요?', a: '이메일(novelstudylab@naver.com)로 원고 파일과 간략한 소개를 보내주세요. 검토 후 2주 이내 회신드립니다.' },
  { q: '저자 인터뷰는 어떻게 진행되나요?', a: '출간 도서에 한해 유튜브 영상 인터뷰를 진행합니다. 출간 계약 후 담당자가 안내드립니다.' },
  { q: '온라인 글쓰기 강좌는 어디서 수강하나요?', a: '카카오 오픈톡 채널 또는 홈페이지 공지를 통해 수강 신청 안내가 발행됩니다.' },
  { q: '상담 가능 시간은 언제인가요?', a: '월~금 오전 9시 ~ 오후 5시입니다. 주말 및 공휴일은 휴무입니다.' },
]

export default function FaqPage() {
  const [open, setOpen] = useState(null)
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.tag}>Support</span>
        <h1 className={styles.title}>자주 묻는 <em>질문</em></h1>
        <div className={styles.line} />
        <p className={styles.seoLine}>
          마이티북스 출판 서비스에 대한 자주 묻는 질문을 정리한 페이지입니다.
        </p>
      </div>
      <div className={styles.list}>
        {faqs.map((f, i) => (
          <div key={i} className={`${styles.item} ${open === i ? styles.open : ''}`}>
            <button className={styles.question} onClick={() => setOpen(open === i ? null : i)}>
              <span>Q. {f.q}</span>
              <span className={styles.arrow}>{open === i ? '−' : '+'}</span>
            </button>
            <div className={styles.answer}>
              <p>A. {f.a}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className={styles.cta} >
        <div className={styles.ctaInner}>
          <p className={styles.seoLine}>원하시는 답변이 없으신가요?</p>
          <div style={{display:'flex', gap:'16px', flexWrap:'wrap', justifyContent:'left'}}>
            <a href="mailto:novelstudylab@naver.com" className={styles.ctaBtn}>이메일 문의 →</a>
            <a href="https://open.kakao.com/me/mightybooks"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtnGhost}
            >
              카카오 상담 →
            </a>
          </div>
        </div>
      </section>      
    </div>
  )
}