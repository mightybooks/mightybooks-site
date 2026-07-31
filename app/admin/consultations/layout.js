import { requireAdminPage } from '@/lib/server-admin-page'

export default async function AdminConsultationsLayout({
  children,
}) {
  await requireAdminPage()

  return children
}
