const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thebigexchange.net",
        port: "5000",
        pathname: "/**",
      },
    ],
  },
};
module.exports = withNextIntl(nextConfig);
