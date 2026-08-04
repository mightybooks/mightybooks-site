import { requireAdminPage } from '@/lib/server-admin-page'

export default async function AdminLibraryLayout({ children }) {
  await requireAdminPage()
  return children
}
