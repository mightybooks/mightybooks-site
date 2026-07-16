import Link from 'next/link'
import styles from './tools.module.css'

export const metadata = {
  title: '출판 실용 도구 | 마이티북스',
  description: '자서전과 가족 기념책 제작을 준비할 때 활용할 수 있는 마이티북스의 실용 도구입니다.',
  alternates: { canonical: '/tools' },
  openGraph: { title: '출판 실용 도구 | 마이티북스', description: '자서전과 가족 기념책 제작을 위한 실용 도구를 확인하세요.', url: '/tools', type: 'website' },
}

const tools = [{
  title: '칠순·팔순 기념책 제작 일정 계산기',
  description: '행사 날짜와 희망 수령 시점을 기준으로 권장 제작 시작일과 인터뷰·원고·디자인·인쇄 일정을 계산합니다.',
  href: '/tools/memoir-schedule',
}]

export default function ToolsPage() {
  return (
    <div className={styles.wrap}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Mighty Books Tools</span>
        <h1 className={styles.title}>출판 준비를 돕는 <em>실용 도구</em></h1>
        <p className={styles.lead}>기념일에 맞춘 책 제작처럼 일정과 준비 기준이 필요한 순간에 활용할 수 있는 도구를 제공합니다.</p>
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
