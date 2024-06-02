import { configureChains } from "wagmi";
import { mainnet } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { CHAINS, PUBLIC_NODES } from "./chains";

const mostNodesConfig = Object.values(PUBLIC_NODES).reduce(
  (prev: any, cur: any) => {
    return cur.length > prev ? cur.length : prev;
  },
  0,
);

const { publicClient, chains } = configureChains(
  CHAINS,
  Array.from({ length: mostNodesConfig as any })
    .map((_, i) => i)
    .map((i) => {
      return jsonRpcProvider({
        rpc: (chain) => {
          if (
            process.env.NODE_ENV === "test" &&
            chain.id === mainnet.id &&
            i === 0
          ) {
            return { http: "https://ethereum.publicnode.com" };
          }
          return {
            http:
              PUBLIC_NODES?.[chain.id]?.[i] ??
              "https://ethereum.publicnode.com",
          };
        },
      });
    }),
  {
    batch: {
      multicall: {
        batchSize: 1024 * 200,
        wait: 16,
      },
    },
    pollingInterval: 6_000,
  },
);
export { chains, publicClient };
export const noopStorage = {
  getItem: (_key: never) => "",
  setItem: (_key: never, _value: never) => null,
  removeItem: (_key: never) => null,
};
