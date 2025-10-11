import {
  composeConfig,
  createBaseConfig,
  withBundleAnalyzer,
  withMDX,
} from "@zap/next-config";

const base = createBaseConfig("default");
export default composeConfig(base, [withMDX, withBundleAnalyzer]);
