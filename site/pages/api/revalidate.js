export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  
  try {
    setTimeout(() => {
      await res.unstable_revalidate('/')
      return res.json({ revalidated: true })
    }, 5000)
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(err);
    return res.status(500).send(JSON.stringify(err))
  }
}