import Link from 'next/link'
import styles from './tools.module.css'

export const metadata = {
  title: '출판 실용 도구 | 마이티북스',
  description: '원고와 파일 상태에 맞는 제작 방향, 예상 책 페이지와 기념책 일정을 확인할 수 있는 마이티북스의 출판 실용 도구입니다.',
  alternates: { canonical: '/tools' },
  openGraph: { title: '출판 실용 도구 | 마이티북스', description: '원고 상태 확인부터 예상 책 페이지와 기념책 일정까지 출판 준비 도구를 확인하세요.', url: '/tools', type: 'website' },
}

const tools = [{
  title: '출판 길라잡이',
  description: '책 종류와 원고·파일 상태를 선택해 현재 필요한 편집, 디자인, 인쇄 또는 전자출판 방향을 확인합니다.',
  href: '/tools/publishing-guide',
}, {
  title: '칠순·팔순 기념책 제작 일정 계산기',
  description: '행사 날짜와 희망 수령 시점을 기준으로 권장 제작 시작일과 인터뷰·원고·디자인·인쇄 일정을 계산합니다.',
  href: '/tools/memoir-schedule',
}, {
  title: '원고 글자 수로 예상 책 페이지 계산하기',
  description: '공백 포함 글자 수와 원고 구성 방식을 입력하면 일반적인 단행본 편집 기준의 예상 페이지 범위를 확인할 수 있습니다.',
  href: '/tools/book-page-calculator',
}]

export default function ToolsPage() {
  return (
    <div className={styles.wrap}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Mighty Books Tools</span>
        <h1 className={styles.title}>출판 준비를 돕는 <em>실용 도구</em></h1>
        <p className={styles.lead}>원고와 파일 상태, 예상 페이지와 제작 일정처럼 출판 전에 확인할 기준을 스스로 정리할 수 있습니다.</p>
      </header>
      <section className={styles.section} aria-label="마이티북스 도구 목록">
        <div className={styles.toolGrid}>
          {tools.map(tool => (
            <Link key={tool.href} href={tool.href} className={styles.toolCard}>
              <div><h2>{tool.title}</h2><p>{tool.description}</p></div><span className={styles.arrow}>→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
