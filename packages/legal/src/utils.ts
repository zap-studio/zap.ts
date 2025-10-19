import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { LEGAL_CONFIG } from ".";

const LEGAL_DIR = LEGAL_CONFIG.DATA_DIR;

export async function getLegalContent(slug: string) {
  const MDX_PATH = path.join(LEGAL_DIR, `${slug}.mdx`);
  const raw = await fs.readFile(MDX_PATH, "utf-8");
  const { data: metadata, content } = matter(raw);
  return { metadata, content };
}

export async function generateLegalMetadata(slug: string) {
  const { metadata } = await getLegalContent(slug);
  return {
    title: metadata.title,
    description: metadata.description,
  };
}
