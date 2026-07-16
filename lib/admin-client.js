export async function verifyAdminSession(supabase) {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (!token) return false
  const response = await fetch('/api/admin/session', { headers: { Authorization: `Bearer ${token}` } })
  return response.ok
}
