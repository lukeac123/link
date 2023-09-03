// Just a handler that runs, handles any route and we can manage errors. This means we need to be explicit about what requests we're handling
// This middlerware is managing accesses to routes based on the user
// NextJS middleware runs on edge, onlt vercel and netlify covert a middleware file to run on edge. If deploying with someone else it wouldn't work

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
const PUBLIC_FILE = /\.(.*)$/;

// had to make this again here as the other one is in a file with bcrypt which is not supported on edge runtimes
// edge runtime occurs as close as possible to the user, as a consequence doen't have the full node runtime infrastrucutre
const verifyJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload;
};

export default async function middleware(req, res) {
  const { pathname } = req.nextUrl;
  // so if path starts with any of the below, next and enable users to see
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/register") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // get jwt from cookies

  const jwt = req.cookies.get(process.env.COOKIE_NAME);

  if (!jwt) {
    // if not jwt regirect the user to sign in
    // when we hit local:3000 we're automatically redirected to signin
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (e) {
    console.error(e);
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }
}
