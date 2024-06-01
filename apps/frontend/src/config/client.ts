import type { ChainId } from "@pancakeswap/chains";
import {
  MULTICALL_ADDRESS,
  iMulticallABI,
  type GetGasLimitOnChainParams,
} from "@pancakeswap/multicall";
import { GraphQLClient } from "graphql-request";
import {
  getContract,
  type GetContractReturnType,
  type PublicClient
} from "viem";

export const v3SubgraphClient = new GraphQLClient(
  "https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-chapel",
);
export const v2SubgraphClient = new GraphQLClient(
  "https://proxy-worker-api.pancakeswap.com/bsc-exchange",
);

export function getMulticallContract({
  chainId,
  client,
}: {
  chainId: ChainId;
  client: GetGasLimitOnChainParams["client"] & PublicClient;
}): GetContractReturnType<
  typeof iMulticallABI,
  PublicClient & GetGasLimitOnChainParams["client"]
> {
  const address = MULTICALL_ADDRESS[chainId];
  if (!address) {
    throw new Error(`PancakeMulticall not supported on chain ${chainId}`);
  }

  return getContract({ abi: iMulticallABI, address, publicClient: client });
}

export async function getGasLimitOnChain({
  chainId,
  client,
}: GetGasLimitOnChainParams) {
  const multicall = getMulticallContract({
    chainId,
    client: client as PublicClient & GetGasLimitOnChainParams["client"],
  });
  const gasLeft = (await multicall?.read?.gasLeft?.()) as bigint;
  return gasLeft;
}
