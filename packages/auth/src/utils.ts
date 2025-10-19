import "server-only";

import { HttpStatus } from "@zap/errors/http";
import { AUTH_CONFIG } from ".";

export function redirectToLogin() {
  return Response.redirect(
    AUTH_CONFIG.LOGIN_URL,
    HttpStatus.TEMPORARY_REDIRECT
  );
}
