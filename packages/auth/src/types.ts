export type Provider = "github" | "google";

export type AuthBaseConfig = {
  LOGIN_URL: string;
  SIGN_UP_URL: string;
  FORGOT_PASSWORD_URL: string;
  MAXIMUM_PASSWORD_LENGTH: number;
  MAXIMUM_USERNAME_LENGTH: number;
  MINIMUM_PASSWORD_LENGTH: number;
  MINIMUM_USERNAME_LENGTH: number;
  PASSWORD_COMPROMISED_MESSAGE: string;
  REDIRECT_URL_AFTER_SIGN_IN: string;
  REDIRECT_URL_AFTER_SIGN_UP: string;
  REQUIRE_MAIL_VERIFICATION: boolean;
  VERIFIED_EMAIL_PATH: string;
};

export interface AuthServerConfig extends AuthBaseConfig {
  ENABLE_SOCIAL_PROVIDER: boolean;
  PROVIDERS: Provider[];
  PUBLIC_PATHS: string[];
}

export interface AuthClientConfig extends AuthBaseConfig {}
