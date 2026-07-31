import { requireAdminPage } from '@/lib/server-admin-page'

export default async function AdminPartnersLayout({
  children,
}) {
  await requireAdminPage()

  return children
}
