import { bscTestnetTokens } from "@pancakeswap/tokens";
import { Chain } from "./chains";
import { ChainId, ERC20Token } from "@pancakeswap/sdk";
export type AssetIconsConfig = {
  Icon: string | null;
};

export type AssetLabelsConfig = {
  shortName: string;
  fullName: string;
  decimals: number;
  address: string;
  chain: string;
  chainId: 97;
};

export type AssetBaseConfig = AssetIconsConfig & AssetLabelsConfig;

export enum Asset {
  BUSD = "BUSD",
  WBNB = "WBNB",
  CAKE = "CAKE",
}

export enum NeonAsset {
  USDT = "USDT",
}

export const tickerToAddress: Record<string, string> = {
  [Asset.BUSD]: "0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814",
  [Asset.WBNB]: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
  [Asset.CAKE]: "0xFa60D973F7642B748046464e165A65B7323b0DEE",
};

export const assetsBaseConfigSolana: Record<string, ERC20Token> = {
  BUSD: new ERC20Token(
    245022926,
    "0x903fC5f46287e7B3C79719c3ce8F4EDBAC8b8b54",
    18,
    "BUSD",
    "Binance USD",
    "https://www.paxos.com/busd/",
  ),
  USDT: new ERC20Token(
    245022926,
    "0x6eEf939FC6e2B3F440dCbB72Ea81Cd63B5a519A5",
    18,
    "CAKE",
    "PancakeSwap Token",
    "https://pancakeswap.finance/",
  ),
  CAKE: new ERC20Token(
    245022926,
    "0x4860ee416b52b4769CdC2E7876b09c6B77E3BD30",
    18,
    "CAKE",
    "PancakeSwap Token",
    "https://pancakeswap.finance/",
  ),
};

export const assetsBaseConfig: Record<Asset, ERC20Token> = {
  BUSD: new ERC20Token(
    ChainId.BSC_TESTNET,
    "0x6F451Eb92d7dE92DdF6939d9eFCE6799246B3a4b",
    18,
    "BUSD",
    "Binance USD",
    "https://www.paxos.com/busd/",
  ),
  WBNB: bscTestnetTokens.wbnb,
  CAKE: new ERC20Token(
    ChainId.BSC_TESTNET,
    "0x501B55184813f7a29eb98DECD8EC9B6D07DEB263",
    18,
    "CAKE",
    "PancakeSwap Token",
    "https://pancakeswap.finance/",
  ),
};

export const supportedAssets = [
  Asset.BUSD,
  Asset.WBNB,
  Asset.CAKE,
  NeonAsset.USDT,
];

export type AssetConfig = {
  chains: Chain[];
};

export const fromAssets: Record<string, AssetConfig> = {
  BUSD: { chains: [Chain.BNBChain] },
};

export const feeAssets: Record<string, AssetConfig> = {
  BUSD: { chains: [Chain.BNBChain] },
};

export const toAssetsSolana: Record<string, AssetConfig> = {
  CAKE: { chains: [Chain.BNBChain] },
};

export const fromAssetsSolana: Record<string, AssetConfig> = {
  BUSD: { chains: [Chain.BNBChain] },
};

export const feeAssetsSolana: Record<string, AssetConfig> = {
  BUSD: { chains: [Chain.BNBChain] },
};

export const toAssets: Record<string, AssetConfig> = {
  USDT: { chains: [Chain.BNBChain] },
};
