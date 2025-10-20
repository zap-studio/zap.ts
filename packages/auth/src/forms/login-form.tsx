"use client";
import "client-only";

import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@zap/shadcn/ui/field";
import { Input } from "@zap/shadcn/ui/input";
import { ZapButton } from "@zap/ui/components/core/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { LoginFormSchema } from "../schemas";

export function LoginForm() {
  const [callbackURL, setCallbackURL] = useState<string | undefined>(undefined);
  const { isInCooldown, cooldown, isSubmitting, handleLoginSubmit } =
    useAuth(callbackURL);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get("redirect");

    if (redirect) {
      setCallbackURL(redirect);
    }
  }, []);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: LoginFormSchema,
    },
    onSubmit: async ({ value }) => {
      await handleLoginSubmit(value);
    },
  });

  return (
    <form
      className="grid gap-6"
      id="login-form"
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
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="email"
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

        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Link
                    className="text-sm underline-offset-4 hover:underline active:underline"
                    href="/forgot-password"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="password"
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="*********"
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
        disabled={isInCooldown}
        form="login-form"
        loading={isSubmitting}
        loadingText="Logging in..."
        type="submit"
      >
        {isInCooldown ? `Please wait ${cooldown}s` : "Login"}
      </ZapButton>
    </form>
  );
}
