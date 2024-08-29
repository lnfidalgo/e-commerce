/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_TOKEN: process.env.API_TOKEN,
    BASEROW_API_URL: process.env.BASEROW_API_URL,
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
