/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    NEXT_PUBLIC_CONVEX_UR: process.env.NEXT_PUBLIC_CONVEX_UR,
    CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.stripe.com",
        port: "",
        pathname: "/links/*",
      },
    ],
  },
};

export default nextConfig;
