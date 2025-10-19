export type Provider = "github" | "google";

export type AuthConfig = {
  PUBLIC_PATHS: string[];
  URLS: {
    LOGIN: string;
    SIGN_UP: string;
    FORGOT_PASSWORD: string;
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
    FROM: string;
    SUPPORT: string;
  };
  SOCIAL_PROVIDERS: {
    ENABLED: boolean;
    PROVIDERS: Provider[];
  };
  MINIMUM_PASSWORD_LENGTH: number;
  PASSWORD_COMPROMISED_MESSAGE: string;
  REQUIRE_MAIL_VERIFICATION: boolean;
  VERIFIED_EMAIL_PATH: string;
};
