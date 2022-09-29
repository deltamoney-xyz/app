import { CONFIGS } from "@manahippo/hippo-sdk";

export const readConfig = () => {
  const isDevnet = true;
  const netConf = isDevnet ? CONFIGS.devnet : CONFIGS.localhost;
  return netConf;
};
