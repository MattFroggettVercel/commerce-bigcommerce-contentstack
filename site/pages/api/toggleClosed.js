import { toggle } from 'lib/redis'

export default async function handler(req, res) {
  await toggle()

  return res.send()
}