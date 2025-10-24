import createMDX from "@next/mdx";

/**
 * MDX plugin for Next.js configuration.
 * This plugin enables MDX support with default settings.
 * You can customize the remark and rehype plugins by modifying the options.
 */
export const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
