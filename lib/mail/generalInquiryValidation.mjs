export const GENERAL_INQUIRY_LIMITS = {
  email: 254,
  phone: 50,
  message: 3000,
  source: 100,
  website: 200,
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function validateGeneralInquiry(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { valid: false, error: '문의 내용을 확인해 주세요.' }
  }

  for (const [field, limit] of Object.entries(GENERAL_INQUIRY_LIMITS)) {
    if (typeof body[field] === 'string' && body[field].trim().length > limit) {
      return { valid: false, error: '입력 가능한 글자 수를 초과했습니다.' }
    }
  }

  const inquiry = {
    email: clean(body.email),
    phone: clean(body.phone),
    message: clean(body.message),
    source: clean(body.source),
    website: clean(body.website),
  }
  if (!inquiry.email || !isEmail(inquiry.email)) {
    return { valid: false, error: '회신받을 이메일 주소를 확인해 주세요.' }
  }
  if (!inquiry.message) {
    return { valid: false, error: '문의 내용을 입력해 주세요.' }
  }

  return { valid: true, inquiry }
}
