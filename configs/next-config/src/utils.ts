import type { NextConfig } from "next";

/**
 * Deep merges two objects, with the second object taking precedence.
 * Arrays are concatenated and deduplicated.
 */
export function deepMerge<T extends NextConfig>(
	target: T,
	source: Partial<T>,
): T {
	const output = { ...target };

	for (const key in source) {
		if (Object.hasOwn(source, key)) {
			const sourceValue = source[key];
			const targetValue = output[key];

			if (
				sourceValue &&
				typeof sourceValue === "object" &&
				!Array.isArray(sourceValue)
			) {
				output[key] = deepMerge(
					(targetValue as Record<string, unknown>) || {},
					sourceValue as Record<string, unknown>,
				) as T[Extract<keyof T, string>];
			} else if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
				// Concatenate arrays and remove duplicates
				output[key] = [
					...new Set([...targetValue, ...sourceValue]),
				] as T[Extract<keyof T, string>];
			} else if (sourceValue !== undefined) {
				output[key] = sourceValue as T[Extract<keyof T, string>];
			}
		}
	}

	return output;
}
