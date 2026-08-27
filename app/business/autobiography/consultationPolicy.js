export const AUTOBIOGRAPHY_TRAVEL_CONSULTATION = {
  title: '대구·경북 출장상담',
  startingPrice: '20만 원부터',
  priceGuide: '지역과 실제 이동시간에 따라 20만·25만·30만 원으로 사전에 안내드립니다.',
  purpose: '직접 이동하기 어렵거나 가족이 함께 상담해야 하는 경우, 사진·기록물·수기자료·녹취자료를 한자리에서 확인해야 하는 경우 문수림이 직접 방문합니다.',
  contractCredit: '출장상담 후 제작 계약이 성사되면 납부하신 출장상담료 전액을 계약금 또는 제작비에 포함합니다.',
  noContract: '제작 계약으로 이어지지 않는 경우에는 출장 및 전문상담 서비스에 대한 비용으로 처리됩니다.',
  confirmation: '출장상담은 상담료 입금 완료 후 일정이 확정됩니다.',
  reschedule: '일정 변경이 필요한 경우 사전에 협의하여 다른 날짜로 조정할 수 있습니다.',
  cancellation: '당일 취소 시에는 천재지변 등 불가피한 경우를 제외하고 상담료의 50%를 반환하며, 원하실 경우 다른 날짜로 일정을 변경할 수 있습니다.',
}

export const AUTOBIOGRAPHY_CONSULTATION_MODES = [
  {
    number: '01',
    title: '대구·경북·경남 대면상담',
    label: '예약제',
    description: '고객이 대구 동구 안심역 인근 마이티북스 사무실로 방문하여 문수림과 상담하거나 출장을 요청할 수 있습니다.',
  },
  {
    number: '02',
    title: AUTOBIOGRAPHY_TRAVEL_CONSULTATION.title,
    label: AUTOBIOGRAPHY_TRAVEL_CONSULTATION.startingPrice,
    description: AUTOBIOGRAPHY_TRAVEL_CONSULTATION.purpose,
  },
  {
    number: '03',
    title: '전국 비대면 상담',
    label: '전화 · 카카오톡 · 이메일',
    description: '전화와 카카오톡으로 제작 목적과 자료 상태를 먼저 확인하고, 필요한 원고·사진 자료는 이메일 등 협의한 온라인 방식으로 전달합니다.',
  },
]

export const AUTOBIOGRAPHY_TRAVEL_FAQ = {
  q: '자서전 상담을 위해 대구·경북으로 직접 방문해 주실 수 있나요?',
  a: [
    `가능합니다. 대구·경북 출장상담은 ${AUTOBIOGRAPHY_TRAVEL_CONSULTATION.startingPrice}이며, ${AUTOBIOGRAPHY_TRAVEL_CONSULTATION.priceGuide}`,
    AUTOBIOGRAPHY_TRAVEL_CONSULTATION.contractCredit,
    `${AUTOBIOGRAPHY_TRAVEL_CONSULTATION.confirmation} ${AUTOBIOGRAPHY_TRAVEL_CONSULTATION.reschedule}`,
    `${AUTOBIOGRAPHY_TRAVEL_CONSULTATION.noContract} ${AUTOBIOGRAPHY_TRAVEL_CONSULTATION.cancellation}`,
  ],
}

