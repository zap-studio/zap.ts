import {
  HEX_RADIX,
  NIBBLE_MOD,
  UUID_BYTE_LENGTH,
  UUID_SECTION_LENGTHS,
  UUID_VERSION,
  VARIANT_BASE,
  VARIANT_BYTE_INDEX,
  VARIANT_FALLBACK_MOD,
  VARIANT_FALLBACK_OFFSET,
  VARIANT_MOD,
  VERSION_BYTE_INDEX,
} from "./constants";

/**
 * Generates a UUID v4 compliant string that works in Node.js, browser, and edge runtime
 * Uses crypto.getRandomValues when available, falls back to Math.random
 */
export function generateUuid(): string {
  // Try to use crypto.getRandomValues if available (browser, Node.js 15+, edge runtime)
  if (globalThis?.crypto?.getRandomValues) {
    const bytes = new Uint8Array(UUID_BYTE_LENGTH);
    globalThis.crypto.getRandomValues(bytes);

    // Set version (high nibble) and variant via arithmetic
    const versionByte = bytes[VERSION_BYTE_INDEX];
    const variantByte = bytes[VARIANT_BYTE_INDEX];

    if (versionByte === undefined || variantByte === undefined) {
      throw new Error("Failed to generate UUID: insufficient random bytes");
    }

    bytes[VERSION_BYTE_INDEX] =
      (versionByte % NIBBLE_MOD) + UUID_VERSION * NIBBLE_MOD; // ensures 0x40-0x4f
    bytes[VARIANT_BYTE_INDEX] = (variantByte % VARIANT_MOD) + VARIANT_BASE; // ensures 0x80-0xbf

    // Convert to hex and insert hyphens according to section lengths
    const hex = Array.from(bytes, (b) =>
      b.toString(HEX_RADIX).padStart(2, "0")
    ).join("");
    let offset = 0;
    const sections: string[] = [];
    for (const len of UUID_SECTION_LENGTHS) {
      sections.push(hex.slice(offset, offset + len));
      offset += len;
    }
    return sections.join("-");
  }

  // Fallback for environments without crypto.getRandomValues
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * HEX_RADIX);
    const v =
      c === "x" ? r : (r % VARIANT_FALLBACK_MOD) + VARIANT_FALLBACK_OFFSET; // 8..B
    return v.toString(HEX_RADIX);
  });
}
