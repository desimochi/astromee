export async function POST(req) {
  const { type, value, otp } = await req.json();

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/callback/credentials`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ type, value, otp }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
