import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { firebaseAuth } from './app/utils/firebase';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  
  // await firebaseAuth.onAuthStateChanged((user) => {
  //   if(user)
  //     return NextResponse.next();
  //   else
  //     return NextResponse.redirect(new URL('/signin', request.url))
  // } );
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', "/dashboard"],
}