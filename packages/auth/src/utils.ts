import "server-only";

import { HttpStatus } from "@zap/errors/http";
import { AUTH_BASE_CONFIG } from ".";

export function redirectToLogin() {
  return Response.redirect(
    AUTH_BASE_CONFIG.LOGIN_URL,
    HttpStatus.TEMPORARY_REDIRECT
  );
}
