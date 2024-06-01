/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  BridgeDataVerifier,
  BridgeDataVerifierInterface,
} from "../../../contracts/WalletBridgeVerifier.sol/BridgeDataVerifier";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "isVerified",
        type: "bool",
      },
    ],
    name: "DataVerified",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "data",
        type: "uint256",
      },
    ],
    name: "verifyData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080806040523460145760a1908161001a8239f35b600080fdfe6080806040526004361015601257600080fd5b600090813560e01c633146734914602857600080fd5b34606757602036600319011260675760207f868e395dd89fcb4cab9b24d69db13c020c57f028454b1357cdb6743c82d379de916064600435118152a180f35b5080fdfea2646970667358221220bdbdc747aa4db9e8d3b0800a3eab44b04d14c20924463940864afa213df3b76764736f6c63430008110033";

type BridgeDataVerifierConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BridgeDataVerifierConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BridgeDataVerifier__factory extends ContractFactory {
  constructor(...args: BridgeDataVerifierConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BridgeDataVerifier> {
    return super.deploy(overrides || {}) as Promise<BridgeDataVerifier>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): BridgeDataVerifier {
    return super.attach(address) as BridgeDataVerifier;
  }
  override connect(signer: Signer): BridgeDataVerifier__factory {
    return super.connect(signer) as BridgeDataVerifier__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BridgeDataVerifierInterface {
    return new utils.Interface(_abi) as BridgeDataVerifierInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BridgeDataVerifier {
    return new Contract(address, _abi, signerOrProvider) as BridgeDataVerifier;
  }
}