import { createManifest } from "@zap/pwa";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return createManifest("<YOUR_MAIL>"); // TODO: inject from env
}
