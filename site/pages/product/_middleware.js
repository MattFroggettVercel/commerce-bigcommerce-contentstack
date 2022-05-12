import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME } from '@lib/constants'
import { getCurrentExperiment } from '@lib/optimize'

export function middleware(req) {
  let res = NextResponse.next()
  let cookie = req.cookies[COOKIE_NAME]
  const url = req.nextUrl.clone()

  if (String(url.pathname).includes('_')) {
    return;
  }

  if (!cookie) {
    const experiment = getCurrentExperiment()
    cookie = `${experiment?.id}`

    for (const sectionId in experiment?.variants) {
      let random = Math.random() * 100
      
      const variants = experiment.variants[sectionId]

      const variant = variants.find((v) => {
        if (v.weight >= random) {
          return true
        }

        random -= v.weight
      })

      cookie = `${cookie}|${variant.id}`
    }
  }

  const experimentParts = cookie.split('|')
  experimentParts.shift()

  url.pathname = url.pathname.replace('/product/', `/product/_/${experimentParts[0]}/${experimentParts[1]}/${experimentParts[2]}/`)

  res = NextResponse.rewrite(url)

  if (!req.cookies[COOKIE_NAME]) {
    res.cookie(COOKIE_NAME, cookie)
  }

  return res
}
