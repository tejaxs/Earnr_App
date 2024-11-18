import withPWA from "next-pwa";

const nextConfig = withPWA({
  dest: "public", // Where PWA assets are stored
//   disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
});

export default nextConfig;
