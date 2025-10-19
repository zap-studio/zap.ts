import z from "zod";
import { AUTH_CONFIG } from ".";

export const LoginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(AUTH_CONFIG.FIELD_LENGTH.PASSWORD.MIN, {
    message: `Password must be at least ${AUTH_CONFIG.FIELD_LENGTH.PASSWORD.MIN} characters.`,
  }),
});

export const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .min(AUTH_CONFIG.FIELD_LENGTH.USERNAME.MIN, {
        message: `Name must be at least ${AUTH_CONFIG.FIELD_LENGTH.USERNAME.MIN} characters.`,
      })
      .max(AUTH_CONFIG.FIELD_LENGTH.USERNAME.MAX, {
        message: `Name must be at most ${AUTH_CONFIG.FIELD_LENGTH.USERNAME.MAX} characters.`,
      }),
    email: z.email(),
    password: z
      .string()
      .min(AUTH_CONFIG.FIELD_LENGTH.PASSWORD.MIN, {
        message: `Password must be at least ${AUTH_CONFIG.FIELD_LENGTH.PASSWORD.MIN} characters.`,
      })
      .max(AUTH_CONFIG.FIELD_LENGTH.PASSWORD.MAX, {
        message: `Password must be at most ${AUTH_CONFIG.FIELD_LENGTH.PASSWORD.MAX} characters.`,
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
