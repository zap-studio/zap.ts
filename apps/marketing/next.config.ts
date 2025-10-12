import { composeConfig, createBaseConfig } from "@zap/next-config";
import { withBundleAnalyzer } from "@zap/next-config/plugins/bundle-analyzer";
import { withMDX } from "@zap/next-config/plugins/mdx";

const base = createBaseConfig("default");
export default composeConfig(base, [withMDX, withBundleAnalyzer]);
