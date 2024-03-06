import withNextIntl from "next-intl/plugin";

const nextIntlConfig = withNextIntl();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextIntlConfig(nextConfig);
