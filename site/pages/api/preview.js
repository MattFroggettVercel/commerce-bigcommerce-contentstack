export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  res.setPreviewData({});

  res.redirect(req.query.slug);
}