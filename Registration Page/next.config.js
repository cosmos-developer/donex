/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        serverActions: true,
    },
    webpack: (config) => {
        config.externals.push("pino-pretty", "lokijs", "encoding", "bufferutil", "utf-8-validate");
        return config;
      },
}

module.exports = nextConfig
