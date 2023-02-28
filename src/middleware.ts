import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/entries/')) {
    const id = req.nextUrl.pathname.replace('/api/entries/', '')
    const verifiedMongoId = new RegExp('^[0-9a-fA-F]{24}$')

    if (!verifiedMongoId.test(id)) {
      const url = req.nextUrl.clone()
      url.pathname = '/api/bad-request'
      url.search = `?message=Invalid ID: ${id}`

      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/entries/:path*',
}
