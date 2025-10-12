export async function toORPCError(
  code: string,
  message: string,
  cause?: unknown
) {
  const { ORPCError } = await import("@orpc/server");
  return new ORPCError(code, { message, cause });
}

export function toJSONBase(
  error: Error & { code?: string; statusCode?: number; cause?: unknown }
) {
  const base = {
    error: error.name,
    message: error.message,
    code: error.code,
  };

  if ("statusCode" in error) {
    return { ...base, statusCode: error.statusCode };
  }

  if (error.cause) {
    return { ...base, cause: error.cause };
  }

  return base;
}
