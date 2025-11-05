import type { NextConfig } from "next";

import { ROOTS } from "@olis/core/constants";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // your Cloudinary domain here
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: `${ROOTS.saleos.dashboard}`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
