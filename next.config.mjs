import withNextIntl from "next-intl/plugin";

const nextIntlConfig = withNextIntl();

/** @type {import('next').NextConfig} */
const nextConfig = {
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
