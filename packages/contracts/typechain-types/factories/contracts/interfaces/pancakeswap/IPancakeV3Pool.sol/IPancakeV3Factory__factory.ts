/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IPancakeV3Factory,
  IPancakeV3FactoryInterface,
} from "../../../../../contracts/interfaces/pancakeswap/IPancakeV3Pool.sol/IPancakeV3Factory";

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
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IPancakeV3Factory__factory {
  static readonly abi = _abi;
  static createInterface(): IPancakeV3FactoryInterface {
    return new utils.Interface(_abi) as IPancakeV3FactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IPancakeV3Factory {
    return new Contract(address, _abi, signerOrProvider) as IPancakeV3Factory;
  }
}
