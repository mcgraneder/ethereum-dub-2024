import type { Address } from 'viem'
import { getViemClient } from './provider/client'
import { getSmartWallet, getSmartWalletFactory } from './utils/contracts'
import type { ChainId } from '@pancakeswap/chains'

export abstract class SmartWalletRouter {
  public myFunc = async () => {}

  public static async getUserSmartWalletDetails(userAddress: Address, chainId: ChainId) {
    const publicClient = getViemClient({ chainId })
    console.log(await publicClient.getChainId(), 'hey')
    const factory = getSmartWalletFactory(chainId)

    const address = await factory.read.walletAddress([userAddress, BigInt(0)])
    const smartWallet = getSmartWallet(chainId, address)
    try {
      const code = await publicClient.getBytecode({ address })
      const nonce = code !== '0x' ? await smartWallet.read.nonce() : BigInt(0)
      return { address, nonce, wallet: smartWallet }
    } catch (error) {
      console.log(error)
      return { address, nonce: 0n, wallet: smartWallet }
    }
  }
}
