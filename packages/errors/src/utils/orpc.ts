import { ORPCError } from "@orpc/server";

export function toORPCError(code: string, message: string, cause?: unknown) {
  return new ORPCError(code, { message, cause });
}
