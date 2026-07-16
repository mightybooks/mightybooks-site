export const EVENT_TYPES = ['칠순', '팔순', '생신', '퇴임', '가족 기념일', '기타']

export const RECEIPT_OPTIONS = [
  { value: 'day', label: '행사 당일까지', daysBefore: 0 },
  { value: 'week', label: '행사 1주일 전까지', daysBefore: 7 },
  { value: 'twoWeeks', label: '행사 2주일 전까지', daysBefore: 14 },
]

const DAY_MS = 24 * 60 * 60 * 1000

export function parseDateOnly(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '')
  if (!match) return null
  const [, year, month, day] = match.map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null
  return date
}

export function toDateOnly(date) {
  return date.toISOString().slice(0, 10)
}

export function getKoreaToday(now = new Date()) {
  return new Date(now.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

export function addCalendarDays(value, days) {
  const date = typeof value === 'string' ? parseDateOnly(value) : new Date(value.getTime())
  date.setUTCDate(date.getUTCDate() + days)
  return toDateOnly(date)
}

export function subtractBusinessDays(value, days) {
  const date = typeof value === 'string' ? parseDateOnly(value) : new Date(value.getTime())
  let remaining = days
  while (remaining > 0) {
    date.setUTCDate(date.getUTCDate() - 1)
    const weekday = date.getUTCDay()
    if (weekday !== 0 && weekday !== 6) remaining -= 1
  }
  return toDateOnly(date)
}

export function differenceInCalendarDays(later, earlier) {
  return Math.round((parseDateOnly(later).getTime() - parseDateOnly(earlier).getTime()) / DAY_MS)
}

export function formatLocalDate(value) {
  const date = parseDateOnly(value)
  return `${date.getUTCFullYear()}년 ${date.getUTCMonth() + 1}월 ${date.getUTCDate()}일`
}

export function getScheduleStatus(daysRemaining) {
  if (daysRemaining >= 84) return {
    level: 'comfortable',
    title: '여유 있게 준비할 수 있습니다',
    description: '현재부터 준비하면 가족 검토와 수정 기간까지 비교적 안정적으로 확보할 수 있습니다.',
  }
  if (daysRemaining >= 60) return {
    level: 'soon',
    title: '지금부터 준비를 시작하는 것이 좋습니다',
    description: '통상적인 제작 기간 안에 있지만, 인터뷰 일정과 가족 검토가 늦어지면 전체 일정이 촉박해질 수 있습니다.',
  }
  return {
    level: 'check',
    title: '일정 확인이 필요합니다',
    description: '일정이 다소 촉박합니다. 현재 원고 상태, 제작 부수, 인쇄 방식에 따라 가능 여부가 달라질 수 있으므로 상담을 권합니다.',
  }
}

export function calculateMemoirSchedule({ eventType, eventDate, receiptOption = 'week', today = getKoreaToday() }) {
  if (!EVENT_TYPES.includes(eventType)) throw new Error('행사 종류를 선택해 주세요.')
  if (!parseDateOnly(eventDate)) throw new Error('올바른 행사 날짜를 입력해 주세요.')
  if (differenceInCalendarDays(eventDate, today) < 0) throw new Error('오늘 이후의 행사 날짜를 선택해 주세요.')
  const receipt = RECEIPT_OPTIONS.find(option => option.value === receiptOption)
  if (!receipt) throw new Error('희망 수령 시점을 선택해 주세요.')

  const receiptDate = addCalendarDays(eventDate, -receipt.daysBefore)
  if (differenceInCalendarDays(receiptDate, today) < 0) throw new Error('희망 수령일이 오늘보다 이전입니다. 다른 수령 시점을 선택해 주세요.')

  let cursor = addCalendarDays(receiptDate, -10)
  const reverseStages = [
    ['인쇄 및 배송', 20, 'calendar'],
    ['교정 및 최종 승인', 7, 'calendar'],
    ['표지·내지 디자인 및 확인', 7, 'calendar'],
    ['고객·가족 원고 검토', 15, 'calendar'],
    ['원고 작성 및 구성', 15, 'calendar'],
    ['인터뷰 및 추가 자료 수집', 3, 'business'],
    ['상담 및 자료 확인', 3, 'business'],
  ]

  const stages = reverseStages.map(([name, duration, type]) => {
    const endDate = cursor
    const startDate = type === 'business'
      ? subtractBusinessDays(endDate, duration)
      : addCalendarDays(endDate, -duration)
    cursor = startDate
    return { name, startDate, endDate, duration, type }
  }).reverse()

  stages.push({ name: '희망 수령일', startDate: receiptDate, endDate: receiptDate })
  const daysRemaining = differenceInCalendarDays(receiptDate, today)

  return {
    eventType,
    eventDate,
    receiptDate,
    receiptLabel: receipt.label,
    recommendedStartDate: cursor,
    daysRemaining,
    status: getScheduleStatus(daysRemaining),
    stages,
  }
}
