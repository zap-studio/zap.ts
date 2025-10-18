export type AnalyticsConfig = {
  POSTHOG: {
    ENABLED: boolean;
    API_KEY: string;
    HOST: string;
  };
  VERCEL: {
    ANALYTICS: {
      ENABLED: boolean;
    };
    SPEED_INSIGHTS: {
      ENABLED: boolean;
    };
  };
};

export type PWAConfig = {
  BACKGROUND_COLOR: string;
  DESCRIPTION: string;
  ICONS: Array<{
    src: string;
    sizes: string;
    type: string;
  }>;
  NAME: string;
  SHORT_NAME: string;
  START_URL: string;
  THEME_COLOR: string;
  VAPID_MAIL: string;
  VAPID_PUBLIC_KEY: string;
  VAPID_PRIVATE_KEY: string;
};
