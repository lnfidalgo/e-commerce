/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_TOKEN: process.env.API_TOKEN,
    BASEROW_API_URL: process.env.BASEROW_API_URL,
    BASEROW_API_URL_POST: process.env.BASEROW_API_URL_POST,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
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
