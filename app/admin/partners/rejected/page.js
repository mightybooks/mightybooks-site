import PartnerAdminManager from '../PartnerAdminManager'

export const metadata = {
  title: '승인 거절 내역 | 마이티북스',
  robots: { index: false, follow: false },
}

export default function RejectedPartnersPage() {
  return <PartnerAdminManager mode="rejected"/>
}
