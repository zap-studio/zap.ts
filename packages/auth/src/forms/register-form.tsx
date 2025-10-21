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
import { useAuth } from "../hooks";
import { RegisterFormSchema } from "../schemas";

export function RegisterForm() {
  const { isInCooldown, cooldown, isSubmitting, handleRegisterSubmit } =
    useAuth();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validators: {
      onSubmit: RegisterFormSchema,
    },
    onSubmit: async ({ value }) => {
      await handleRegisterSubmit(value);
    },
  });

  return (
    <form
      className="grid gap-6"
      id="register-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="name"
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Your name"
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

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
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="new-password"
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

        <form.Field
          name="confirm_password"
          validators={{
            onChangeListenTo: ["password"],
            onChange: ({ value, fieldApi }) => {
              if (value !== fieldApi.form.getFieldValue("password")) {
                return { message: "Passwords do not match" };
              }
              return;
            },
          }}
        >
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="new-password"
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
        form="register-form"
        loading={isSubmitting}
        loadingText="Creating account..."
        type="submit"
      >
        {isInCooldown ? `Please wait ${cooldown}s` : "Create account"}
      </ZapButton>
    </form>
  );
}
