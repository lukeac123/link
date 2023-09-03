import { PrismaClient } from "@prisma/client";

// NextJS api function runs in a serverless enviorment
// serverless functions ar stateless and so spin up and shut down but the container in which they exist in stay alaive for a while
// this means that the data base connections can be exceeded
// if we chache the connection then a new connection isn't needed each time

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
