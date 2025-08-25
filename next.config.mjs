/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  // Add webpack configuration for MDX files
  webpack: (config) => {
    // Add MDX file handling
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [require('remark-gfm')],
            rehypePlugins: [
              require('rehype-slug'),
              require('rehype-autolink-headings'),
              [
                require('rehype-pretty-code'),
                {
                  theme: {
                    dark: 'github-dark',
                    light: 'github-light',
                  },
                },
              ],
            ],
          },
        },
      ],
    });

    return config;
  },
}

export default nextConfig
