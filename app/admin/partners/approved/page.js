import PartnerAdminManager from '../PartnerAdminManager'

export const metadata = {
  title: '승인 업체 관리 | 마이티북스',
  robots: { index: false, follow: false },
}

export default function ApprovedPartnersPage() {
  return <PartnerAdminManager mode="approved"/>
}
