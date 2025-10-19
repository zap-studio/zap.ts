"use client";
import "client-only";

import { Input } from "@zap/shadcn/ui/input";
import { ZapButton } from "@zap/ui/components/core/button";
import type { z } from "zod";
import { useAuth } from "../hooks";
import type { RegisterFormSchema } from "../schemas";

type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

export function RegisterForm() {
  const { isInCooldown, cooldown, isSubmitting, handleRegisterSubmit } =
    useAuth();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="grid gap-6"
        onSubmit={form.handleSubmit(handleRegisterSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoComplete="name" placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  autoComplete="email"
                  placeholder="you@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  autoComplete="new-password"
                  placeholder="*********"
                  type="password"
                  {...field}
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
                  autoComplete="new-password"
                  placeholder="*********"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ZapButton
          className="w-full"
          disabled={isInCooldown}
          loading={isSubmitting}
          loadingText="Creating account..."
          type="submit"
        >
          {isInCooldown ? `Please wait ${cooldown}s` : "Create account"}
        </ZapButton>
      </form>
    </Form>
  );
}
