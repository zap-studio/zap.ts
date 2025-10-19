"use client";
import "client-only";

import { UnauthorizedError } from "@zap/errors";
import { handleClientError } from "@zap/errors/client";
import { ZapButton } from "@zap/ui/components/core/button";
import { useState } from "react";
import { toast } from "sonner";
import { AUTH_CONFIG } from "..";
import { betterAuthClient } from "../better-auth/client";
import type { Provider } from "../types";
import { PROVIDER_ICONS } from "./provider-icons";

type SocialProviderButtonProps = {
  provider: Provider;
};

export function SocialProviderButton({ provider }: SocialProviderButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async (_provider: Provider) => {
    setLoading(true);

    try {
      const { data, error } = await betterAuthClient.signIn.social({
        provider: _provider,
        callbackURL: AUTH_CONFIG.REDIRECT_URL_AFTER_SIGN_IN,
      });

      if (error) {
        throw new UnauthorizedError("Login failed. Please try again.");
      }

      if (data) {
        toast.success("Login successful!");
      } else {
        throw new UnauthorizedError("Login failed. Please try again.");
      }
    } catch (error) {
      handleClientError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ZapButton
      className="w-full gap-2"
      loading={loading}
      loadingText="Logging in..."
      onClick={() => handleSocialLogin(provider)}
      variant="outline"
    >
      {PROVIDER_ICONS[provider]}
      {`Login with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
    </ZapButton>
  );
}
