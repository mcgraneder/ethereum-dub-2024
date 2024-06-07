import type { Currency } from "@pancakeswap/swap-sdk-core";
import { useMemo } from "react";
import { ConfirmModalState } from "~/pages/cross-chain-swap";
import type { AssetConfig } from "~/utils/assetsConfig";

export const useTheme = (
  txState: ConfirmModalState,
  asset: Partial<AssetConfig>,
  toAsset: Partial<AssetConfig>,
) => {
  const transactionStatusDisplay = useMemo(() => {
    switch (txState) {
      case ConfirmModalState.REVIEWING:
        return `Swap ${asset?.shortName} for ${toAsset?.shortName}`;
      case ConfirmModalState.APPROVING_TOKEN:
        return `Approving Smart wallet for ${asset?.shortName}`;
      case ConfirmModalState.PERMITTING:
        return `Permitting Relayer ${asset?.shortName}`;
      case ConfirmModalState.PENDING_CONFIRMATION:
        return "Awaiting Confirmtion";
      case ConfirmModalState.EXECUTING:
        return "Executing Wallet Ops";
      case ConfirmModalState.COMPLETED:
        return "transaction Successful";
      case ConfirmModalState.FAILED:
        return "transaction Failed";
      default:
        return `Trade ${asset?.shortName}`;
    }
  }, [txState, asset, toAsset]);

  const primaryColor = useMemo(() => {
    if (txState === ConfirmModalState.FAILED) return "bg-red-600";
    return "bg-indigo-600";
  }, [txState]);
  const secondaryColor = useMemo(() => {
    if (txState === ConfirmModalState.FAILED) return "bg-red-600";
    return "bg-indigo-600";
  }, [txState]);

  return { transactionStatusDisplay, primaryColor, secondaryColor };
};
