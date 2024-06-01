/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IPancakeSwapV3Factory,
  IPancakeSwapV3FactoryInterface,
} from "../../../../../contracts/permit2/libraries/ContractAddresses.sol/IPancakeSwapV3Factory";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "uint24",
        name: "fee",
        type: "uint24",
      },
    ],
    name: "getPool",
    outputs: [
      {
        internalType: "contract IPancakeSwapV3Pool",
        name: "pool",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IPancakeSwapV3Factory__factory {
  static readonly abi = _abi;
  static createInterface(): IPancakeSwapV3FactoryInterface {
    return new utils.Interface(_abi) as IPancakeSwapV3FactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IPancakeSwapV3Factory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IPancakeSwapV3Factory;
  }
}