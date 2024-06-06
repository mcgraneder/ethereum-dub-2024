export enum Asset {
  ArbETH = "ArbETH",
  AVAX = "AVAX",
  BADGER = "BADGER",
  BCH = "BCH",
  BNB = "BNB",
  BTC = "BTC",
  BUSD = "BUSD",
  CRV = "CRV",
  DAI = "DAI",
  DGB = "DGB",
  DOGE = "DOGE",
  ETH = "ETH",
  EURT = "EURT",
  FIL = "FIL",
  FTM = "FTM",
  FTT = "FTT",
  gETH = "gETH",
  GLMR = "GLMR",
  KAVA = "KAVA",
  KNC = "KNC",
  LINK = "LINK",
  LUNA = "LUNA",
  MATIC = "MATIC",
  MIM = "MIM",
  oETH = "oETH",
  REN = "REN",
  ROOK = "ROOK",
  SOL = "SOL",
  SUSHI = "SUSHI",
  UNI = "UNI",
  USDC = "USDC",
  USDT = "USDT",
  ZEC = "ZEC",
}

/* eslint-disable @typescript-eslint/no-shadow */
export enum Chain {
  Arbitrum = "Arbitrum",
  Avalanche = "Avalanche",
  BinanceSmartChain = "BinanceSmartChain",
  Bitcoin = "Bitcoin",
  BitcoinCash = "BitcoinCash",
  DigiByte = "DigiByte",
  Dogecoin = "Dogecoin",
  Ethereum = "Ethereum",
  Fantom = "Fantom",
  Filecoin = "Filecoin",
  Goerli = "Goerli",
  Kava = "Kava",
  Moonbeam = "Moonbeam",
  Optimism = "Optimism",
  Polygon = "Polygon",
  Catalog = "Catalog",
  Solana = "Solana",
  Terra = "Terra",
  Zcash = "Zcash",
}

export type BaseColor = {
  primary: string;
};

export type AssetColor = BaseColor;

export type ChainColorArray = Array<string>;

export type ChainColor = BaseColor & {
  colorArray: ChainColorArray;
};

const defaultColor = "#272C33";

const createColor = (primary = defaultColor) => {
  const color: AssetColor = {
    primary,
  };
  return color;
};

export const assetsColors: Record<Asset, AssetColor> = {
  AVAX: createColor("#E84142"),
  ArbETH: createColor("#627EEA"),
  BADGER: createColor("#F1A23F"),
  BCH: createColor("#6CC64B"),
  BNB: createColor("#F3BA2F"),
  BTC: createColor("#F7931A"),
  BUSD: createColor("#F0B90B"),
  CRV: createColor("#272C33"),
  DAI: createColor("#F5AC37"),
  DGB: createColor("#0063CF"),
  DOGE: createColor("#C2A633"),
  ETH: createColor("#627EEA"),
  EURT: createColor("#2D598A"),
  FIL: createColor("#0090FF"),
  FTM: createColor("#1969FF"),
  FTT: createColor("#272C33"),
  GLMR: createColor("#E1147B"),
  KAVA: createColor("#FF433E"),
  KNC: createColor("#31CB98"),
  LINK: createColor("#272C33"),
  LUNA: createColor("#F9D85E"),
  MATIC: createColor("#8247E5"),
  MIM: createColor("#272C33"),
  oETH: createColor("#FF0420"),
  REN: createColor("#272C33"),
  ROOK: createColor("#272C33"),
  SOL: createColor("#272C33"),
  SUSHI: createColor("#272C33"),
  UNI: createColor("#272C33"),
  USDC: createColor("#2775CA"),
  USDT: createColor("#26A17B"),
  ZEC: createColor("#F3B63B"),
  gETH: createColor("#627EEA"),
};

export const create521Colors = (primary: string, secondary = "") => {
  return [
    primary,
    primary,
    primary,
    primary,
    primary,
    secondary,
    secondary,
    primary,
  ] as ChainColorArray;
};

export const create125Colors = (primary: string, secondary = "") => {
  return create521Colors(primary, secondary).reverse() as ChainColorArray;
};

const createChainColors = (primary: string, colorArray?: ChainColorArray) => {
  return {
    primary: primary,
    colorArray,
  } as ChainColor;
};

const createChainColorsFromAsset = (asset: Asset | string) => {
  const { primary } = assetsColors[asset as Asset];
  return createChainColors(primary, [primary]);
};

// using "BTC" instead of Asset.BTC prevents importing chains to build
// while keeping proper typecheck
export const chainsColors: Record<Chain, ChainColor> = {
  Arbitrum: createChainColors("#2D374B", ["#28a0f0", "#2D374B"]),
  Avalanche: createChainColors("#E84142", create521Colors("#E84142")),
  BinanceSmartChain: createChainColors("#F3BA2F", create521Colors("#F3BA2F")),
  Bitcoin: createChainColorsFromAsset("BTC"),
  Kava: createChainColors("#FF433E"),
  Moonbeam: createChainColors("#272C33"),
  Optimism: createChainColors("#FF0420"),
  Catalog: createChainColors("#2CC995"),
  BitcoinCash: createChainColorsFromAsset("BCH"),
  DigiByte: createChainColorsFromAsset("DGB"),
  Dogecoin: createChainColorsFromAsset("DOGE"),
  Ethereum: createChainColors("#627EEA", create521Colors("#627EEA")),
  Fantom: createChainColors("#1969ff", create125Colors("#1969ff")),
  Filecoin: createChainColorsFromAsset("FIL"),
  Goerli: createChainColors("#627EEA", create521Colors("#627EEA")),
  Polygon: createChainColors("#8247E5", create521Colors("#8247E5")),
  Solana: createChainColors("#272C33"),
  Terra: createChainColorsFromAsset("LUNA"),
  Zcash: createChainColorsFromAsset("ZEC"),
};
