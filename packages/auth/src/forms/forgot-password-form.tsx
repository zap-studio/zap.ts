"use client";
import "client-only";

import { useForm } from "@tanstack/react-form";
import { handleClientError } from "@zap/errors/client";
import { ZAP_MAILS_CONFIG } from "@zap/mails";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@zap/shadcn/ui/field";
import { Input } from "@zap/shadcn/ui/input";
import { ZapButton } from "@zap/ui/components/core/button";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

import { betterAuthClient } from "../better-auth/client";
import { useCooldown } from "../hooks/use-cooldown";

const formSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export function ForgotPasswordForm() {
  const [submitting, setSubmitting] = useState(false);
  const { cooldown, startCooldown, isInCooldown } = useCooldown();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitting(true);
      const { email } = value;

      try {
        await betterAuthClient.forgetPassword({
          email,
          redirectTo: "/reset-password",
        });

        toast.success("Check your email for the reset link!");
        startCooldown(ZAP_MAILS_CONFIG.RATE_LIMIT_SECONDS);
      } catch (error) {
        handleClientError(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  disabled={submitting}
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
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
        disabled={isInCooldown}
        loading={submitting}
        loadingText="Sending..."
        type="submit"
      >
        {isInCooldown ? `Please wait ${cooldown}s` : "Send reset link"}
      </ZapButton>
    </form>
  );
}
