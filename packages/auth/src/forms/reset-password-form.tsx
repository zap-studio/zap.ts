"use client";
import "client-only";

import { useRouter } from "@bprogress/next/app";
import { UnauthorizedError } from "@zap/errors";
import { handleClientError } from "@zap/errors/client";
import { FieldGroup } from "@zap/shadcn/ui/field";
import { ZapButton } from "@zap/ui/components/core/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AUTH_CONFIG } from "..";
import { betterAuthClient } from "../better-auth/client";
import { ResetPasswordFormSchema } from "../schemas";
import { usePasswordForm } from "./form-hook";
import { createPasswordFieldMap, PasswordFieldGroup } from "./password-fields";

export function ResetPasswordForm() {
	const [submitting, setSubmitting] = useState(false);
	const [token, setToken] = useState<string | null>(null);

	const router = useRouter();

	const form = usePasswordForm({
		defaultValues: {
			password: "",
			confirm_password: "",
		},
		validators: {
			onSubmit: ResetPasswordFormSchema,
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
					toast.error(AUTH_CONFIG.SECURITY.PASSWORD_COMPROMISED_MESSAGE);
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
			id="reset-password-form"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<FieldGroup>
				<PasswordFieldGroup
					confirmPasswordLabel="Confirm New Password"
					confirmPasswordPlaceholder="••••••••"
					disabled={submitting}
					fields={createPasswordFieldMap()}
					form={form}
					passwordLabel="New Password"
					passwordPlaceholder="••••••••"
				/>
			</FieldGroup>

			<ZapButton
				className="w-full"
				form="reset-password-form"
				loading={submitting}
				loadingText="Resetting..."
				type="submit"
			>
				Reset Password
			</ZapButton>
		</form>
	);
}
