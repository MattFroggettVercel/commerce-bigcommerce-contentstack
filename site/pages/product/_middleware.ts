import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME } from '@lib/constants'
import { getCurrentExperiment } from '@lib/optimize'

export function middleware(req: NextRequest) {
  let res = NextResponse.next()
  let cookie = req.cookies[COOKIE_NAME]

  if (!cookie) {
    const experiment = getCurrentExperiment()
    cookie = `${experiment?.id}`

    for (const sectionId in experiment.variants) {
      let random = Math.random() * 100
      const variant = experiment.variants[sectionId].find((v, i) => {
        if (v.weight >= random) {
          return true
        }

        random -= v.weight
      })

      cookie = `${cookie}|${variant.id}`
    }
  }

  const url = req.nextUrl.clone()
  const experimentParts = cookie.split('|')
  experimentParts.shift()

  url.pathname = url.pathname.replace('/product/', `/product/x/${experimentParts[0]}/${experimentParts[1]}/`)

  res = NextResponse.rewrite(url)

  return res
}
