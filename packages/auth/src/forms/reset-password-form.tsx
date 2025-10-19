"use client";
import "client-only";

import { useRouter } from "@bprogress/next/app";
import { useForm } from "@tanstack/react-form";
import { UnauthorizedError } from "@zap/errors";
import { handleClientError } from "@zap/errors/client";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@zap/shadcn/ui/field";
import { Input } from "@zap/shadcn/ui/input";
import { ZapButton } from "@zap/ui/components/core/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { AUTH_CONFIG } from "..";
import { betterAuthClient } from "../better-auth/client";

const formSchema = z
  .object({
    password: z
      .string()
      .min(
        AUTH_CONFIG.MINIMUM_PASSWORD_LENGTH,
        `Password must be at least ${AUTH_CONFIG.MINIMUM_PASSWORD_LENGTH} characters`
      ),
    confirmPassword: z
      .string()
      .min(
        AUTH_CONFIG.MINIMUM_PASSWORD_LENGTH,
        `Password must be at least ${AUTH_CONFIG.MINIMUM_PASSWORD_LENGTH} characters`
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function ResetPasswordForm() {
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitting(true);
      const { password } = value;

      if (!token) {
        setSubmitting(false);
        throw new UnauthorizedError("Invalid token. Please try again.");
      }

      try {
        await betterAuthClient.resetPassword({
          newPassword: password,
          token,
        });

        toast.success("Password reset successfully!");
        form.reset();
        router.push("/login");
      } catch (error) {
        if (
          typeof error === "object" &&
          error !== null &&
          "code" in error &&
          (error as { code?: string }).code === "PASSWORD_COMPROMISED"
        ) {
          toast.error(AUTH_CONFIG.PASSWORD_COMPROMISED_MESSAGE);
          return;
        }

        handleClientError(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const _token = new URLSearchParams(window.location.search).get("token");
    setToken(_token);
  }, []);

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  disabled={submitting}
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="••••••••"
                  type="password"
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="confirmPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  disabled={submitting}
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="••••••••"
                  type="password"
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>

      <ZapButton
        className="w-full"
        loading={submitting}
        loadingText="Resetting..."
        type="submit"
      >
        Reset Password
      </ZapButton>
    </form>
  );
}
