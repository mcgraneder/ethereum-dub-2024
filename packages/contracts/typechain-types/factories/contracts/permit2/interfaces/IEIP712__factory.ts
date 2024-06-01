/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IEIP712,
  IEIP712Interface,
} from "../../../../contracts/permit2/interfaces/IEIP712";

const _abi = [
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IEIP712__factory {
  static readonly abi = _abi;
  static createInterface(): IEIP712Interface {
    return new utils.Interface(_abi) as IEIP712Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IEIP712 {
    return new Contract(address, _abi, signerOrProvider) as IEIP712;
  }
}
