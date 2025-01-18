/** @type {import('next').NextConfig} */
const nextConfig = {
  missingSuspenseWithCSRBailout: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fermerapi.onrender.com",
        port: "",
        pathname: "/Images/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
