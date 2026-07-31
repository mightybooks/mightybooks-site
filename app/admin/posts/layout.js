import { requireAdminPage } from '@/lib/server-admin-page'

export default async function AdminPostsLayout({
  children,
}) {
  await requireAdminPage()

  return children
}
