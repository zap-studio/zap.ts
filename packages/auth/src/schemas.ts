import z from "zod";
import { AUTH_CONFIG } from ".";

export const NameSchema = z
	.string()
	.min(
		AUTH_CONFIG.FIELD_LENGTH.USERNAME.MIN,
		`Name must be at least ${AUTH_CONFIG.FIELD_LENGTH.USERNAME.MIN} characters.`,
	)
	.max(
		AUTH_CONFIG.FIELD_LENGTH.USERNAME.MAX,
		`Name must be at most ${AUTH_CONFIG.FIELD_LENGTH.USERNAME.MAX} characters.`,
	);

export const MailSchema = z.email("Please enter a valid email address");

export const PasswordSchema = z
	.string()
	.min(
		AUTH_CONFIG.FIELD_LENGTH.PASSWORD.MIN,
		`Password must be at least ${AUTH_CONFIG.FIELD_LENGTH.PASSWORD.MIN} characters.`,
	)
	.max(
		AUTH_CONFIG.FIELD_LENGTH.PASSWORD.MAX,
		`Password must be at most ${AUTH_CONFIG.FIELD_LENGTH.PASSWORD.MAX} characters.`,
	);

export const LoginFormSchema = z.object({
	email: MailSchema,
	password: PasswordSchema,
});

export const RegisterFormSchema = z.object({
	name: NameSchema,
	email: MailSchema,
	password: PasswordSchema,
	confirm_password: PasswordSchema,
});

export const ResetPasswordFormSchema = z.object({
	password: PasswordSchema,
	confirm_password: PasswordSchema,
});

export const ForgotPasswordFormSchema = z.object({
	email: MailSchema,
});
