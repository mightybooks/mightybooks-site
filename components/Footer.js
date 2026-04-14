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
        fontSize: '12px',
        color: 'rgba(255,255,255,0.25)',
        lineHeight: '1.6'
      }}>
        사업자등록번호: 558-28-01574<br />
        통신판매신고번호: 2023-대구동구-0140<br />
        연락처: 010-5148-9433
      </div>

    </footer>
  )
}