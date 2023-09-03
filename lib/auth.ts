import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";

// This is an async password by deafult so we have to await
export const hashPassword = (password) => bcrypt.hash(password, 10);

export const comparePasswords = (plainTextPassword, hashPasswordPawword) => {
  return bcrypt.compare(plainTextPassword, hashPasswordPawword);
};

// We want to use aync calls that are compute / time intensive to enable
// the rest of the code to run and not slow down the rest of the application / server

// JSON web token
// Need to send JSON web token to resource in each request, this is different to a session where it is monitored by the server
// As we're putting the JWT in a cookie, it is automaticallt sent in each request by default
// Open source Auth Packages ( clerk, superTokens, NextAuth)

export const createJWT = async (user) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7; // expiration date for JWT, security issue if it never expires

  return new SignJWT({ payload: { id: user.id, email: user.email } }) // put whatever is useful in the payload to identify the users security
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET)); // sign jwt with a secret to ensure the request comes from our server
};

export const validateJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET) // use the same secret to verify token as the one we used to sign it
  );
  return payload.payload as any; // type is going to be whatever is in the paylod, in this case an object
};

export const getUserFromCookie = async (cookies) => {
  const jwt = cookies.get(process.env.COOKIE_NAME);

  const { id } = await validateJWT(jwt.value);

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });

  return user;
};
