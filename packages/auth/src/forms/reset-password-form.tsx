"use client";
import "client-only";

import { useRouter } from "@bprogress/next/app";
import { UnauthorizedError } from "@zap/errors";
import { handleClientError } from "@zap/errors/client";
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

type FormSchema = z.infer<typeof formSchema>;

export function ResetPasswordForm() {
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const _token = new URLSearchParams(window.location.search).get("token");
    setToken(_token);
  }, []);

  const onSubmit = async (values: FormSchema) => {
    setSubmitting(true);
    const { password } = values;

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
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type="password"
                  {...field}
                  disabled={submitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type="password"
                  {...field}
                  disabled={submitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ZapButton
          className="w-full"
          loading={submitting}
          loadingText="Resetting..."
          type="submit"
        >
          Reset Password
        </ZapButton>
      </form>
    </Form>
  );
}
