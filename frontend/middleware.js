import { NextResponse } from 'next/server';
import { validateToken } from './app/helpers/ApiHelper';


export async function middleware(req) {
    const supplied_token = req.cookies.get('token')?.value;
    const res = validateToken(supplied_token);
    console.log('middleware response', await res);
    if ((await res).status !== 200) {
        const signinUrl = new URL('/login', req.url)
        return NextResponse.redirect(signinUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/account/:path*', '/admin/:path*', '/cart/:path*'],
}