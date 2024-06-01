/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IPancakeV3Pool,
  IPancakeV3PoolInterface,
} from "../../../../contracts/priceOracle/interfaces/IPancakeV3Pool";

const _abi = [
  {
    inputs: [],
    name: "slot0",
    outputs: [
      {
        internalType: "uint160",
        name: "sqrtPriceX96",
        type: "uint160",
      },
      {
        internalType: "int24",
        name: "tick",
        type: "int24",
      },
      {
        internalType: "uint16",
        name: "observationIndex",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "observationCardinality",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "observationCardinalityNext",
        type: "uint16",
      },
      {
        internalType: "uint32",
        name: "feeProtocol",
        type: "uint32",
      },
      {
        internalType: "bool",
        name: "unlocked",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IPancakeV3Pool__factory {
  static readonly abi = _abi;
  static createInterface(): IPancakeV3PoolInterface {
    return new utils.Interface(_abi) as IPancakeV3PoolInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IPancakeV3Pool {
    return new Contract(address, _abi, signerOrProvider) as IPancakeV3Pool;
  }
}
