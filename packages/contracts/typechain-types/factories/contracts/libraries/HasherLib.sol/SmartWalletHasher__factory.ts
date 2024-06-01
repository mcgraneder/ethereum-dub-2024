/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  SmartWalletHasher,
  SmartWalletHasherInterface,
} from "../../../../contracts/libraries/HasherLib.sol/SmartWalletHasher";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "InvalidDomain",
    type: "error",
  },
  {
    inputs: [],
    name: "ALLOWANCE_DETAILS_OP_TYPE_HASH",
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
  {
    inputs: [],
    name: "ALLOWANCE_OP_BATCH_TYPE_HASH",
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
  {
    inputs: [],
    name: "UPPER_BIT_MASK",
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
  {
    inputs: [],
    name: "USER_OP_TYPE_HASH",
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

const _bytecode =
  "0x6080806040523461001a576101609081610020823930815050f35b600080fdfe608080604052600436101561001357600080fd5b600090813560e01c9081631bf24957146100f1575080632a4fbb8e146100bb578063ac7f002e146100855763b1c06f491461004d57600080fd5b806003193601126100825760206040517f81c795a7225e70197af9bd380e6f873a1b0e517940669963a9675b6f437436e08152f35b80fd5b50806003193601126100825760206040517fe06ddd2657f493bbdb0819686ad5459ec926ea69f0752f8e57e3a53158905fce8152f35b50806003193601126100825760206040517f1abfd930c022142841a784ac6f15bfb82392b3b97047cb73f2b3e8a6a2419f5f8152f35b90508160031936011261012657807f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60209252f35b5080fdfea26469706673582212209ff1aa7d6c2bc7bdffb64b936b44d8976aa0c2c16cdf1be8b5012deaa817cafe64736f6c63430008110033";

type SmartWalletHasherConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SmartWalletHasherConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SmartWalletHasher__factory extends ContractFactory {
  constructor(...args: SmartWalletHasherConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SmartWalletHasher> {
    return super.deploy(overrides || {}) as Promise<SmartWalletHasher>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): SmartWalletHasher {
    return super.attach(address) as SmartWalletHasher;
  }
  override connect(signer: Signer): SmartWalletHasher__factory {
    return super.connect(signer) as SmartWalletHasher__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SmartWalletHasherInterface {
    return new utils.Interface(_abi) as SmartWalletHasherInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SmartWalletHasher {
    return new Contract(address, _abi, signerOrProvider) as SmartWalletHasher;
  }
}
