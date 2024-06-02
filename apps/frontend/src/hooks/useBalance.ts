import { Deployments } from "@eth-dub-2024/router-sdk";
import { ChainId, chainNameToChainId } from "@pancakeswap/chains";
import BigNumber from "bignumber.js";
import { useMemo } from "react";
import { useNetwork } from "wagmi";
import {
  type Address,
  erc20ABI,
  useAccount,
  useChainId,
  useContractRead,
} from "wagmi";
import { assetsBaseConfig } from "~/lib/assets";

export const useTokenBalance = (
  tokenAddress: Address,
  chainIdOverride?: any,
  overrideAddress?: Address,
) => {
  const { address: account } = useAccount();
  const chainId = useChainId();

  const { data, status, ...rest } = useContractRead({
    chainId: chainIdOverride ? chainIdOverride : chainId ?? (245022926 as any),
    abi: erc20ABI,
    address: tokenAddress,
    functionName: "balanceOf",
    args: [overrideAddress ?? account ?? "0x"],
    enabled: overrideAddress ? !!overrideAddress : !!account,
    watch: true,
  });

  return {
    ...rest,
    fetchStatus: status,
    balance: useMemo(
      () =>
        typeof data !== "undefined"
          ? new BigNumber(data.toString())
          : new BigNumber(0),
      [data],
    ),
  } as any;
};
