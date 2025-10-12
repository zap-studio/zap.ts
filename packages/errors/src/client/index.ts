import "client-only";

import { BaseApplicationError, BaseError, BaseFetchError } from "..";

export async function handleClientError(
  error: unknown,
  fallbackMessage = "Something went wrong"
) {
  let title = "Error";
  let description = fallbackMessage;

  if (error instanceof BaseError) {
    title = error.name;
    description = error.message;
  } else if (error instanceof BaseApplicationError) {
    title = error.name;
    description = error.message;
  } else if (error instanceof BaseFetchError) {
    title = error.name;
    description = error.message;
  } else if (error instanceof Error) {
    description = error.message;
  } else if (typeof error === "string") {
    description = error;
  }

  // Show error details in toast in DEV mode
  const { toast } = await import("sonner");

  // Show error details in toast in DEV mode
  if (process.env.NODE_ENV === "development") {
    toast.error(`${title}: ${description}`, {
      description:
        typeof error === "object"
          ? JSON.stringify(error, null, 2)
          : String(error),
    });
    return;
  }

  toast.error(description);
}

type SuccessOptions = {
  title: string;
  message?: string;
};

export async function handleSuccess({ message, title }: SuccessOptions) {
  const { toast } = await import("sonner");
  toast.success(title, {
    description: message,
  });
}
