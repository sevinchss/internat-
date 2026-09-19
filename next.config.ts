import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Placeholder photos until the school's own photos arrive (see lib/images.ts)
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    qualities: [60, 75, 85],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
