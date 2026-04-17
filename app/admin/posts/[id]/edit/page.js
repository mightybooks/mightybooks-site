import PostEditor from '@/components/PostEditor'

export default async function EditPost({ params }) {
  const { id } = await params
  return <PostEditor postId={id} />
}