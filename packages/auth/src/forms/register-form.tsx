"use client";
import "client-only";

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
import { usePasswordForm } from "./form-hook";
import { createPasswordFieldMap, PasswordFieldGroup } from "./password-fields";

export function RegisterForm() {
	const { isInCooldown, cooldown, isSubmitting, handleRegisterSubmit } =
		useAuth();

	const form = usePasswordForm({
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

				<PasswordFieldGroup
					confirmPasswordLabel="Confirm Password"
					confirmPasswordPlaceholder="*********"
					disabled={false}
					fields={createPasswordFieldMap()}
					form={form}
					passwordLabel="Password"
					passwordPlaceholder="*********"
				/>
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
