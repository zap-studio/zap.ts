import { HttpStatus } from "./http";
import type { HttpStatusCode } from "./types";
import { toJSONBase } from "./utils";

/** Common base for all errors with consistent serialization and metadata */
export class CommonErrorBase extends Error {
  code: string;
  cause?: unknown;

  constructor(message: string, code: string, cause?: unknown) {
    super(message);
    this.name = new.target.name;
    this.code = code;
    this.cause = cause;
    Error.captureStackTrace?.(this, new.target);
  }

  toJSON() {
    return toJSONBase(this);
  }
}

/** HTTP-specific error base */
export class BaseError extends CommonErrorBase {
  statusCode: HttpStatusCode;

  constructor(
    message: string,
    statusCode: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    code = "INTERNAL_SERVER_ERROR",
    cause?: unknown
  ) {
    super(message, code, cause);
    this.statusCode = statusCode;
  }

  static create(
    statusCode: HttpStatusCode,
    code: string,
    defaultMessage: string
  ) {
    return class extends BaseError {
      constructor(message = defaultMessage, cause?: unknown) {
        super(message, statusCode, code, cause);
      }
    };
  }
}

/** Define HTTP error subclasses */
export const InternalServerError = BaseError.create(
  HttpStatus.INTERNAL_SERVER_ERROR,
  "INTERNAL_SERVER_ERROR",
  "Internal Server Error"
);

export const NotFoundError = BaseError.create(
  HttpStatus.NOT_FOUND,
  "NOT_FOUND",
  "Not Found"
);

export const BadRequestError = BaseError.create(
  HttpStatus.BAD_REQUEST,
  "BAD_REQUEST",
  "Bad Request"
);

export const UnauthorizedError = BaseError.create(
  HttpStatus.UNAUTHORIZED,
  "UNAUTHORIZED",
  "Unauthorized"
);

export const ForbiddenError = BaseError.create(
  HttpStatus.FORBIDDEN,
  "FORBIDDEN",
  "Forbidden"
);

export const ConflictError = BaseError.create(
  HttpStatus.CONFLICT,
  "CONFLICT",
  "Conflict"
);

/** Application-level error base (non-HTTP) */
export class BaseApplicationError extends CommonErrorBase {
  constructor(
    message = "An unexpected error occurred",
    code = "APPLICATION_ERROR",
    cause?: unknown
  ) {
    super(message, code, cause);
  }

  static create(code: string, defaultMessage: string) {
    return class extends BaseApplicationError {
      constructor(message = defaultMessage, cause?: unknown) {
        super(message, code, cause);
      }
    };
  }
}

/** Define application error subclasses */
export const MailError = BaseApplicationError.create(
  "MAIL_ERROR",
  "Mail Error"
);

export const PushNotificationError = BaseApplicationError.create(
  "PUSH_NOTIFICATION_ERROR",
  "Push Notification Error"
);

export const ApplicationError = BaseApplicationError.create(
  "APPLICATION_ERROR",
  "Application Error"
);

export const ClientError = BaseApplicationError.create(
  "CLIENT_ERROR",
  "Client Error"
);

export const FileOperationError = BaseApplicationError.create(
  "FILE_OPERATION_ERROR",
  "File Operation Error"
);

/** Fetch error type for network operations */
export class BaseFetchError extends Error {
  status: number;
  statusText: string;
  body?: unknown;
  cause?: unknown;

  constructor(
    message: string,
    response: Response,
    body?: unknown,
    cause?: unknown
  ) {
    super(message);
    this.name = "FetchError";
    this.status = response.status;
    this.statusText = response.statusText;
    this.body = body;
    this.cause = cause;
  }
}
