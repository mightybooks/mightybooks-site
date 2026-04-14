// components/Footer.js
export default function Footer() {
  return (
    <footer style={{
      background: '#050505',
      padding: '48px 80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      flexWrap: 'wrap',
      gap: '20px'
    }}>
      <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: '18px', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)' }}>
        <span style={{ color: 'rgba(232,0,30,0.5)' }}>마이티</span>북스 MIGHTY BOOKS
      </div>
      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
        © 2024 Mighty Books. All rights reserved.
      </div>
      <a href="#" style={{
        width: '38px', height: '38px',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)', fontSize: '14px',
        transition: 'all .3s'
      }}>↑</a>
    </footer>
  )
}