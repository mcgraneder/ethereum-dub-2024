import { ChainId } from '@pancakeswap/chains'
import { bscTestnet, bsc as bsc_, sepolia, mainnet, type Chain } from 'viem/chains'

export enum ExtendedChainId {
  LOCAL = 31337,
}

const bsc = {
  ...bsc_,
  rpcUrls: {
    ...bsc_.rpcUrls,
    public: {
      ...bsc_.rpcUrls.default,
      http: ['https://bsc-dataseed.binance.org/'],
    },
    default: {
      ...bsc_.rpcUrls.default,
      http: ['https://bsc-dataseed.binance.org/'],
    },
  },
} satisfies Chain

export const CHAINS = [bsc, bscTestnet, mainnet, sepolia]

export const PUBLIC_NODES: Record<number, string[]> = {
  [ChainId.BSC]: [
    'https://bsc.publicnode.com',
    'https://binance.llamarpc.com',
    'https://bsc-dataseed1.defibit.io',
    'https://bsc-dataseed1.binance.org',
  ].filter(Boolean),
  [ChainId.BSC_TESTNET]: ['https://data-seed-prebsc-1-s2.binance.org:8545'],
  [ChainId.ETHEREUM]: [
    'https://ethereum.publicnode.com',
    'https://eth.llamarpc.com',
    'https://cloudflare-eth.com',
  ].filter(Boolean),
  [ChainId.SEPOLIA]: ['https://rpc.sepolia.org'],
  [ExtendedChainId.LOCAL]: ['http://127.0.0.1:8545/'],
} satisfies Record<number, string[]>

export const ChainsAdapter: { [chainId: number]: Chain } = {
  [ChainId.ETHEREUM]: mainnet,
  [ChainId.BSC]: bsc_,
  [ChainId.SEPOLIA]: sepolia,
}

export const allChains = Object.values(ChainsAdapter)
