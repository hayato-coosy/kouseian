import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Basic authentication removed – always allow the request
    return NextResponse.next();
}

export const config = {
    // Apply to all routes
    matcher: ['/:path*'],
};
