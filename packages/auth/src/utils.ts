import "server-only";

import { HttpStatus } from "@zap/errors/http";
import { AUTH_CONFIG } from ".";

export function redirectToLogin() {
	return Response.redirect(
		AUTH_CONFIG.URLS.LOGIN,
		HttpStatus.TEMPORARY_REDIRECT,
	);
}
