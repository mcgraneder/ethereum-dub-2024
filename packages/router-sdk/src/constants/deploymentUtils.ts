import { ChainId } from '@pancakeswap/chains'
import type { Address } from 'viem'

export enum Contracts {
  BaseWalletFactory = 'BaseWalletFactory',
  SmartWalletFactory = 'SmartWalletFactory',
}

export enum ExtendedChainId {
  LOCAL = 31337,
}
type Deployments = {
  [chainId: number]: { [contract in Contracts]: Address }
}

export const Deployments: Deployments = {
  [ExtendedChainId.LOCAL]: {
    BaseWalletFactory: '0x39f515027A4bbf258F93E485534559A3689800D4',
    SmartWalletFactory: '0xF14439FC31369936B83C3CDa0370660A4232f660',
  },
  [ChainId.ETHEREUM]: {
    BaseWalletFactory: '0x',
    SmartWalletFactory: '0x',
  },
  [ChainId.BSC]: {
    BaseWalletFactory: '0x',
    SmartWalletFactory: '0x',
  },
  [ChainId.BSC_TESTNET]: {
    BaseWalletFactory: '0x14F20112B21BE1e68455dC5dE1b2C1dF01202632',
    SmartWalletFactory: '0x80cA028A713078f8d853728c3E0123fDf67F95Da',
  },
  [ChainId.SEPOLIA]: {
    BaseWalletFactory: '0x',
    SmartWalletFactory: '0x',
  },
}
