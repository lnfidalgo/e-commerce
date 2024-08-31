/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_TOKEN: process.env.API_TOKEN,
    BASEROW_API_URL: process.env.BASEROW_API_URL,
    BASEROW_API_URL_POST: process.env.BASEROW_API_URL_POST,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "baserow-backend-production20240528124524339000000001.s3.amazonaws.com",
        port: "",
        pathname: "/user_files/*",
      },
    ],
  },
};

export default nextConfig;
