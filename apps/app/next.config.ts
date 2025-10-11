import {
  composeConfig,
  createBaseConfig,
  withBundleAnalyzer,
  withMDX,
} from "@zap/next-config";

const base = createBaseConfig("pwa");
export default composeConfig(base, [withMDX, withBundleAnalyzer]);
