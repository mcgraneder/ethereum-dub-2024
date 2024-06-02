import { Deployments } from "@eth-dub-2024/router-sdk";
import BigNumber from "bignumber.js";
import { useMemo } from "react";
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
  overrideAddress?: Address,
) => {
  const { address: account } = useAccount();
  const chainId = useChainId();

  const { data, status, ...rest } = useContractRead({
    chainId: chainId,
    abi: erc20ABI,
    address: assetsBaseConfig[chainId]?.[tokenAddress] ?? "0x",
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
