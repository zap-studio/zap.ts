import type { HttpStatus } from "../http";

export type HttpStatusCode = (typeof HttpStatus)[keyof typeof HttpStatus];
