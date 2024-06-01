export enum Chain {
  BNBChain = "BNBChain",
  Ethereum = "Ethereum",
}

export type ChainConfig = {
  rpcs: string[];
};

export const chains: Record<Chain, ChainConfig> = {
  BNBChain: {
    rpcs: [
      "https://data-seed-prebsc-1-s2.binance.org:8545",
      "https://data-seed-prebsc-1-s2.binance.org:8545",
      "https://data-seed-prebsc-1-s3.binance.org:8545",
    ],
  },
  Ethereum: {
    rpcs: [
      "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    ],
  },
};
