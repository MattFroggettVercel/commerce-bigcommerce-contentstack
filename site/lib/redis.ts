export async function get(key) {
  const req = await fetch(
    `https://global-fitting-warthog-32489.upstash.io/get/${key}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_SECRET}`,
      },
    }
  )

  const response: { result: string } = await req.json()
  return response.result === 'true'
}

export async function toggle() {
  const storeClosed = await get('store-closed')

  const req = await fetch(
    `https://global-fitting-warthog-32489.upstash.io/set/store-closed/${storeClosed ? 'false' : 'true'}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_SECRET}`,
      },
    }
  )

  return true;
}