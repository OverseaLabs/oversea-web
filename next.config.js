/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.useftn.com/api/:path*",
        // destination: "http://localhost:7070/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
