// import type { ChainBaseConfig } from "../../utils/chainsConfig";
import type { AssetBaseConfig } from "../../utils/assetsConfig";

export const MESSAGES = (
  transactionType: string,
  success: boolean,
  amount: string,
  asset: AssetBaseConfig,
  chain: any,
): string => {
  const messageMapping: { [title: string]: string } = {
    ["Swap"]: `${
      success ? "Successfully swapped" : "Failed to swap"
    } ${amount} ${asset.Icon} on ${chain.fullName}`,
    ["Withdraw"]: `${
      success ? "Successfully withdrew" : "Failed to withdraw"
    } ${amount} ${asset.Icon} on ${chain.fullName}`,
    ["Approve"]: `${
      success ? "Successfully approved" : "Failed to approve"
    } ${amount} ${asset.Icon} on ${chain.fullName}`,
  };

  return messageMapping[transactionType] as string;
};
