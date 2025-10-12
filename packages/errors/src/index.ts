import { ORPCError } from "@orpc/server";
import { HttpStatus } from "./http";
import type { HttpStatusCode } from "./types";

export class BaseError extends Error {
  statusCode: HttpStatusCode;
  code: string;
  cause?: unknown;

  constructor(
    message: string,
    statusCode: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    code = "INTERNAL_SERVER_ERROR",
    cause?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.cause = cause;
    Error.captureStackTrace(this, this.constructor);
  }

  toORPCError() {
    return new ORPCError(this.code, { message: this.message });
  }

  toJSON() {
    return {
      error: this.name,
      message: this.message,
      statusCode: this.statusCode,
      code: this.code,
    };
  }
}

export class InternalServerError extends BaseError {
  constructor(message = "Internal Server Error", cause?: unknown) {
    super(
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "INTERNAL_SERVER_ERROR",
      cause
    );
  }
}

export class NotFoundError extends BaseError {
  constructor(message = "Not Found", cause?: unknown) {
    super(message, HttpStatus.NOT_FOUND, "NOT_FOUND", cause);
  }
}

export class BadRequestError extends BaseError {
  constructor(message = "Bad Request", cause?: unknown) {
    super(message, HttpStatus.BAD_REQUEST, "BAD_REQUEST", cause);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message = "Unauthorized", cause?: unknown) {
    super(message, HttpStatus.UNAUTHORIZED, "UNAUTHORIZED", cause);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message = "Forbidden", cause?: unknown) {
    super(message, HttpStatus.FORBIDDEN, "FORBIDDEN", cause);
  }
}

export class ConflictError extends BaseError {
  constructor(message = "Conflict", cause?: unknown) {
    super(message, HttpStatus.CONFLICT, "CONFLICT", cause);
  }
}

export class AuthenticationError extends BaseError {
  constructor(message = "Authentication Error", cause?: unknown) {
    super(message, HttpStatus.UNAUTHORIZED, "AUTHENTICATION_ERROR", cause);
  }
}

export class MailError extends BaseError {
  constructor(message = "Mail Error", cause?: unknown) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, "MAIL_ERROR", cause);
  }
}

export class PushNotificationError extends BaseError {
  constructor(message = "Push Notification Error", cause?: unknown) {
    super(
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "PUSH_NOTIFICATION_ERROR",
      cause
    );
  }
}

export class BaseApplicationError extends Error {
  code: string;
  constructor(
    message = "An unexpected error occurred",
    code = "APPLICATION_ERROR",
    cause?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.cause = cause;
    Error.captureStackTrace(this, this.constructor);
  }

  toORPCError() {
    return new ORPCError(this.code, { message: this.message });
  }

  toJSON() {
    return {
      error: this.name,
      message: this.message,
      cause: this.cause,
    };
  }
}

export class ApplicationError extends BaseApplicationError {
  constructor(message = "Application Error", cause?: unknown) {
    super(message, "APPLICATION_ERROR", cause);
  }
}

export class ClientError extends BaseApplicationError {
  constructor(message = "Client Error", cause?: unknown) {
    super(message, "CLIENT_ERROR", cause);
  }
}

export class FileOperationError extends BaseApplicationError {
  constructor(message = "File Operation Error", cause?: unknown) {
    super(message, "FILE_OPERATION_ERROR", cause);
  }
}

export class FetchError extends Error {
  status: number;
  statusText: string;
  body?: unknown;

  constructor(message: string, response: Response, body?: unknown) {
    super(message);
    this.name = "FetchError";
    this.status = response.status;
    this.statusText = response.statusText;
    this.body = body;
  }
}
