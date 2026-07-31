import { requireAdminPage } from '@/lib/server-admin-page'

export default async function AdminDashboardLayout({
  children,
}) {
  await requireAdminPage()

  return children
}
