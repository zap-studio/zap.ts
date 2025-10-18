export type VapidKeys = {
  publicKey: string;
  privateKey: string;
};

export type VapidConfigs = VapidKeys & {
  mail: string;
};
