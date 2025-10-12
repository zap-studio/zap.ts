import createMDX from "@next/mdx";

/**
 * MDX plugin for Next.js configuration.
 * This plugin enables MDX support with default settings.
 * You can customize the remark and rehype plugins by modifying the options.
 * @returns A function that takes a Next.js configuration and returns an enhanced configuration with MDX support.
 */
export const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
