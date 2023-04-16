import { NextRequest, NextResponse } from 'next/server';
import { verify } from './utils/jwt';

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://nextjs-books-api.com', "https://www.nextjs-books-api.com"]
  : ['http://localhost:3000', 'https://saadfrhan-refactored-zebra-g5r7g4gw4r4fpp95-3000.preview.app.github.dev'];
export function middleware(request: NextRequest) {

  const authHeader = request.headers.get('Authorization');
  const origin = request.headers.get('origin');

  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json(null, {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }

  let _error: any = ''

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const accessToken = verify(
          token,
          process.env.NEXT_PUBLIC_JWT_SECRET!
        );
        const Authorization = new Headers(request.headers)
        Authorization.set('Authorization', accessToken.toString())
        return NextResponse.next({
          request: {
            headers: Authorization
          }
        })
      } catch (error) {
        _error = error
      }
    }
    _error = "Authentication token must be 'Bearer [token]'"
  } else {
    _error = 'Authorization header must be provided'
    return new NextResponse(
      JSON.stringify({ success: false, message: _error }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }
}

export const config = {
  matcher: ['/api/orders/:path*']
}