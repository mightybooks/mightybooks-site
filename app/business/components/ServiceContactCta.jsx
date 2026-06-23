'use client'
import { useState } from 'react'

export const PHONE_NUMBER = '010-5148-9433'
export const EMAIL_ADDRESS = 'novelstudylab@naver.com'
export const KAKAO_URL = 'https://open.kakao.com/me/mightybooks'

export function PhoneConsultModal({ styles, onClose }) {
  const [copied, setCopied] = useState(false)

  const copyNumber = async () => {
    if (!navigator?.clipboard) return
    await navigator.clipboard.writeText(PHONE_NUMBER)
    setCopied(true)
  }

  return (
    <div
      className={styles.phonePopupOverlay}
      role="presentation"
      onClick={onClose}
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
          onClick={onClose}
        >
          ×
        </button>
        <div id="phone-popup-title" className={styles.phonePopupTitle}>1:1 전화 상담</div>
        <div className={styles.phonePopupNumber}>{PHONE_NUMBER}</div>
        <p className={styles.phonePopupDesc}>월-금 09:00-17:00 / 주말, 공휴일 휴무</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '22px' }}>
          <a href={`tel:${PHONE_NUMBER}`} className={styles.ctaBtn}>전화 걸기</a>
          <button type="button" className={styles.ctaBtnGhost} onClick={copyNumber}>
            {copied ? '복사 완료' : '번호 복사'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ServiceContactCta({ styles }) {
  const [isPhoneOpen, setIsPhoneOpen] = useState(false)

  return (
    <>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
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
        <a href={`mailto:${EMAIL_ADDRESS}`} className={styles.ctaBtnGhost}>
          메일
        </a>
      </div>
      {isPhoneOpen && (
        <PhoneConsultModal
          styles={styles}
          onClose={() => setIsPhoneOpen(false)}
        />
      )}
    </>
  )
}
