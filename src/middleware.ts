import { verify } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://nextjs-books-api.com', "https://www.nextjs-books-api.com"]
  : ['http://localhost:3000'];
export async function middleware(request: NextRequest) {

  const authHeader = request.headers.get('Authorization');
  const origin = request.headers.get('origin');
  const host = request.headers.get("host")!;

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
    const response = await fetch(`http://${host}/api/api-clients/${token}`);
    const { user } = await response.json()
    if (user) {
      try {
        const Authorization = new Headers(request.headers)
        Authorization.set('Authorization', token.toString())
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