import commerce from '@lib/api/commerce';

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const { data: productPayload } = req.body
    const productPromise = commerce.getAllProducts({
      variables: { ids: [productPayload['id']] }
    })
    const { products } = await productPromise
    
    await res.unstable_revalidate(`/product/${products[0]?.slug}`)

    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send()
  }
}