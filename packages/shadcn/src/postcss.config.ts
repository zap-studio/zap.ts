import type { Config } from 'postcss-load-config';

export const config: Config = {
  plugins: { "@tailwindcss/postcss": {} },
};

/**
 * Create a PostCSS configuration object with optional overrides.
 * This function merges the default configuration with any provided overrides.
 * @param overrides - Partial configuration to override the default settings.
 * @returns A complete PostCSS configuration object.
 */
export const createPostCSSConfig = (overrides: Partial<Config> = {}): Config => {
  return {
    ...config,
    ...overrides,
    plugins: {
      ...config.plugins,
      ...overrides.plugins,
    },
  };
};