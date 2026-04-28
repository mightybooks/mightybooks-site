// components/Footer.js
export default function Footer() {
  return (
    <footer style={{
      background: '#050505',
      padding: '48px 80px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      flexWrap: 'wrap'
    }}>

      {/* 상단 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{
          fontFamily: 'Oswald, sans-serif',
          fontSize: '18px',
          letterSpacing: '2px',
          color: 'rgba(255,255,255,0.3)'
        }}>
          <span style={{ color: 'rgba(232,0,30,0.5)' }}>마이티</span>북스 MIGHTY BOOKS
        </div>

        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
          © 2024 Mighty Books. All rights reserved.
        </div>

        <a href="#" style={{
          width: '38px',
          height: '38px',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.3)',
          fontSize: '14px',
          transition: 'all .3s'
        }}>↑</a>
      </div>

      {/* 추가 정보 */}
      <div style={{
        display: 'flex',
        gap: '48px',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
      }}>
        <div style={{
          fontSize: '12px',
          color: 'rgba(255,255,255,0.42)',
          lineHeight: '1.6'
        }}>
          사업자등록번호: 558-28-01574<br />
          통신판매신고번호: 2023-대구동구-0140<br />
          연락처: 010-5148-9433
        </div>

        <div style={{
          fontSize: '12px',
          color: 'rgba(255,255,255,0.58)',
          lineHeight: '1.9'
        }}>
          <div style={{
            fontFamily: 'Oswald, sans-serif',
            fontSize: '11px',
            letterSpacing: '3px',
            color: 'rgba(232,0,30,0.65)',
            marginBottom: '8px',
            textTransform: 'uppercase'
          }}>
            마이티북스
          </div>
          <a href="/about/greeting" style={{ display: 'block' }}>출판사 소개</a>
          <a href="/about/brand" style={{ display: 'block' }}>브랜드 소개</a>
          <a href="/about/location" style={{ display: 'block' }}>오시는 길</a>
          <a href="/support/guide" style={{ display: 'block' }}>출판가이드</a>
        </div>
      </div>

    </footer>
  )
}
