export const MAX_STACK_LINES = 5;

export const UUID_BYTE_LENGTH = 16 as const; // 128 bits / 16 bytes
export const UUID_VERSION = 4 as const; // RFC 4122 version
export const VERSION_BYTE_INDEX = 6 as const; // position of time_hi_and_version high nibble
export const VARIANT_BYTE_INDEX = 8 as const; // position of clock_seq_hi_and_reserved
export const NIBBLE_MOD = 16 as const; // constrain to 0-15 range
export const VARIANT_MOD = 64 as const; // constrain to 0-63 range for variant arithmetic
export const VARIANT_BASE = 128 as const; // 0b1000_0000 to set the leading 10 bits via arithmetic
export const VARIANT_FALLBACK_OFFSET = 8 as const; // produces 8,9,10,11 (8..B) for 'y'
export const VARIANT_FALLBACK_MOD = 4 as const; // size of variant selection set
export const HEX_RADIX = 16 as const;
export const UUID_TIME_LOW_LENGTH = 8 as const;
export const UUID_TIME_MID_LENGTH = 4 as const;
export const UUID_TIME_HI_LENGTH = 4 as const;
export const UUID_CLOCK_SEQ_LENGTH = 4 as const;
export const UUID_NODE_LENGTH = 12 as const;
export const UUID_SECTION_LENGTHS = [
  UUID_TIME_LOW_LENGTH,
  UUID_TIME_MID_LENGTH,
  UUID_TIME_HI_LENGTH,
  UUID_CLOCK_SEQ_LENGTH,
  UUID_NODE_LENGTH,
] as const; // standard 8-4-4-4-12

export const HANDLER_TYPES = {
  RPC: "rpc-procedures",
  SERVER_ACTION: "server-action",
  API_ROUTE: "api-route",
} as const;

export const __DEV__ = process.env.NODE_ENV === "development";
