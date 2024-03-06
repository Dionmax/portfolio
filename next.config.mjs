import withNextIntl from "next-intl/plugin";

const nextIntlConfig = withNextIntl();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
  },
};

export default nextIntlConfig(nextConfig);