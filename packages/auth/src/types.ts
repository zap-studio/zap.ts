export type Provider = "github" | "google";

export type AuthConfig = {
  PUBLIC_PATHS: string[];
  URLS: {
    LOGIN: string;
    SIGN_UP: string;
    FORGOT_PASSWORD: string;
    EMAIL_VERIFICATION: string;
  };
  REDIRECT_URLS: {
    AFTER_SIGN_IN: string;
    AFTER_SIGN_UP: string;
  };
  FIELD_LENGTH: {
    USERNAME: {
      MIN: number;
      MAX: number;
    };
    PASSWORD: {
      MIN: number;
      MAX: number;
    };
  };
  MAILS: {
    REQUIRE_VERIFICATION: boolean;
  };
  SOCIAL_PROVIDERS: {
    ENABLED: boolean;
    PROVIDERS: Provider[];
  };
  SECURITY: {
    PASSWORD_COMPROMISED_MESSAGE: string;
  };
};
