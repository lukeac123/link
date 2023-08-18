/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // Password hashing used in server component, we need to nextJS to import this dependency on the server
    // Some depenencies are added by default e.g Prisma
    serverComponentsExternalPackages: ['bcrypt'],
  },
}

module.exports = nextConfig
