import "server-only";

import { checkout, polar, portal } from "@polar-sh/better-auth";
import { db } from "@zap/db/drizzle";
import { MailError } from "@zap/errors";
import { MAILS_CONFIG } from "@zap/mails";
import {
  canSendMailService,
  sendForgotPasswordMailService,
  sendVerificationMailService,
  updateLastTimestampMailSentService,
} from "@zap/mails/services";
import { PAYMENTS_CONFIG } from "@zap/payments";
import { polarClient } from "@zap/payments/polar/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  admin,
  anonymous,
  haveIBeenPwned,
  organization,
  twoFactor,
  username,
} from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { AUTH_CONFIG } from "..";
import { AUTH_ENV } from "../env";

export const betterAuthServer = betterAuth({
  appName: "Zap.ts",
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: AUTH_CONFIG.FIELD_LENGTH.PASSWORD.MIN,
    maxPasswordLength: AUTH_CONFIG.FIELD_LENGTH.PASSWORD.MAX,
    requireEmailVerification: AUTH_CONFIG.MAILS.REQUIRE_VERIFICATION,
    sendResetPassword: async ({ user, url }) => {
      const { canSend, timeLeft } = await canSendMailService({
        userId: user.id,
      });

      if (!canSend) {
        throw new MailError(
          `Please wait ${timeLeft} seconds before requesting another password reset email.`
        );
      }

      await sendForgotPasswordMailService({
        recipients: [user.email],
        subject: `${MAILS_CONFIG.PREFIX} - Reset your password`,
        url,
      });

      await updateLastTimestampMailSentService({
        userId: user.id,
      });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,

    sendVerificationEmail: async ({ user, url }) => {
      const { canSend, timeLeft } = await canSendMailService({
        userId: user.id,
      });

      if (!canSend) {
        throw new MailError(
          `Please wait ${timeLeft} seconds before requesting another password reset email.`
        );
      }

      const verificationUrl = new URL(url);
      verificationUrl.searchParams.set(
        "callbackURL",
        AUTH_CONFIG.URLS.EMAIL_VERIFICATION
      );

      const modifiedUrl = verificationUrl.toString();

      await sendVerificationMailService({
        recipients: [user.email],
        subject: `${MAILS_CONFIG.PREFIX} - Verify your email`,
        url: modifiedUrl,
      });

      await updateLastTimestampMailSentService({
        userId: user.id,
      });
    },
  },
  socialProviders: {
    github: {
      clientId: AUTH_ENV.GITHUB_CLIENT_ID || "",
      clientSecret: AUTH_ENV.GITHUB_CLIENT_SECRET || "",
    },
    google: {
      enabled: true,
      clientId: AUTH_ENV.GOOGLE_CLIENT_ID || "",
      clientSecret: AUTH_ENV.GOOGLE_CLIENT_SECRET || "",
    },
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: PAYMENTS_CONFIG.POLAR?.CREATE_CUSTOMER_ON_SIGNUP,
      use: [
        checkout({
          products: PAYMENTS_CONFIG.POLAR?.PRODUCTS,
          successUrl: `${PAYMENTS_CONFIG.POLAR?.SUCCESS_URL}?checkout_id={CHECKOUT_ID}`,
          authenticatedUsersOnly:
            PAYMENTS_CONFIG.POLAR?.AUTHENTICATED_USERS_ONLY,
        }),
        portal(),
      ],
    }),
    twoFactor(),
    username({
      minUsernameLength: AUTH_CONFIG.FIELD_LENGTH.USERNAME.MIN,
      maxUsernameLength: AUTH_CONFIG.FIELD_LENGTH.USERNAME.MAX,
      usernameValidator: (name) => name !== "admin",
    }),
    anonymous(),
    passkey(),
    admin(),
    organization(),
    haveIBeenPwned({
      customPasswordCompromisedMessage:
        AUTH_CONFIG.SECURITY.PASSWORD_COMPROMISED_MESSAGE,
    }),
  ],
});
