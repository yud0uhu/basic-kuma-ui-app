/** @type {import('next').NextConfig} */
const { withKumaUI } = require("@kuma-ui/next-plugin");

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withKumaUI(nextConfig);
