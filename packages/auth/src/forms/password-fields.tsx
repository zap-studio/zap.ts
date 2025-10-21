"use client";
import "client-only";

import { Field, FieldError, FieldLabel } from "@zap/shadcn/ui/field";
import { Input } from "@zap/shadcn/ui/input";
import { withFieldGroup } from "./form-hook";

export type PasswordFields = {
  password: string;
  confirm_password: string;
};

// These default values are not used at runtime, but the keys are needed for mapping purposes
export const defaultValues: PasswordFields = {
  password: "",
  confirm_password: "",
};

export const PasswordFieldGroup = withFieldGroup({
  defaultValues,
  props: {
    passwordLabel: "Password",
    confirmPasswordLabel: "Confirm Password",
    passwordPlaceholder: "••••••••",
    confirmPasswordPlaceholder: "••••••••",
    disabled: false,
  },
  render({
    group,
    passwordLabel,
    confirmPasswordLabel,
    passwordPlaceholder,
    confirmPasswordPlaceholder,
    disabled,
  }) {
    return (
      <>
        <group.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>{passwordLabel}</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="new-password"
                  disabled={disabled}
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={passwordPlaceholder}
                  type="password"
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </group.Field>

        <group.Field
          name="confirm_password"
          validators={{
            onChangeListenTo: ["password"],
            onChange: ({ value }) => {
              if (value !== group.getFieldValue("password")) {
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
                <FieldLabel htmlFor={field.name}>
                  {confirmPasswordLabel}
                </FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="new-password"
                  disabled={disabled}
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={confirmPasswordPlaceholder}
                  type="password"
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </group.Field>
      </>
    );
  },
});

export const createPasswordFieldMap = () => ({
  password: "password" as const,
  confirm_password: "confirm_password" as const,
});
