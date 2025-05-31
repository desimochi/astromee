import { put } from '@vercel/blob'

export async function POST(req) {
  const formData = await req.formData()
  const file = formData.get('image')
  const blob = await put(file.name, file.stream(), { access: 'public', allowOverwrite:true })

  return new Response(JSON.stringify({ url: blob.url }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
