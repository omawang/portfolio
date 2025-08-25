import withMDX from '@next/mdx';
import type { NextConfig } from "next";

const rehypePrettyCodeOptions = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
};

const mdx = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [
      require('rehype-slug'),
      require('rehype-autolink-headings'),
      [require('rehype-pretty-code'), rehypePrettyCodeOptions],
    ],
  },
});

const nextConfig: NextConfig = mdx({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
});

export default nextConfig;
