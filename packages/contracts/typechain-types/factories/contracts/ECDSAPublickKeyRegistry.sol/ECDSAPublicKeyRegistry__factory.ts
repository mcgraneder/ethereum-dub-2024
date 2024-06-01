/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  ECDSAPublicKeyRegistry,
  ECDSAPublicKeyRegistryInterface,
} from "../../../contracts/ECDSAPublickKeyRegistry.sol/ECDSAPublicKeyRegistry";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "ecdsaPublicKeyHash",
        type: "bytes32",
      },
    ],
    name: "ECDSAPublicKeyRegistered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "ecdsaPublicKeys",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "lookup",
    outputs: [
      {
        internalType: "uint256[2]",
        name: "",
        type: "uint256[2]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "ecdsaPublicKey",
        type: "uint256[2]",
      },
    ],
    name: "register",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080806040523461001b5760006001556103cc90816100218239f35b600080fdfe608060408181526004918236101561001657600080fd5b600092833560e01c9182630799081b14610291575081630a874df61461018d5781633442af5c1461007257506361b8ce8c1461005157600080fd5b3461006e578160031936011261006e576020906001549051908152f35b5080fd5b83833461006e578060031936011261006e57366023121561006e57805190610099826102f6565b6044823682116101895785905b8282106101795750505060019081549282840180851161016657835583855260209285845282862082875b6002811061015557505050508151806100ed85820193846102c8565b03601f8019918281018452011681019281841067ffffffffffffffff851117610142577f46160d0202f176e69c9d2be7c1f87dda539def0a0329204347f88acbc548f58895969750839052519020938152a280f35b60248760418a634e487b7160e01b835252fd5b8151838201559086019083016100d1565b602486601189634e487b7160e01b835252fd5b81358152602091820191016100a6565b8480fd5b8391503461006e5760208060031936011261028d578380516101ae816102f6565b3690378135835282815283832084519382855b6002831061027657505050506101d6836102f6565b6101df83610328565b6101f4578351806101f085826102c8565b0390f35b608492508351917f08c379a0000000000000000000000000000000000000000000000000000000008352820152603260248201527f45434453415075626c69634b657952656769737472793a20454344534120707560448201527f626c6963206b6579206e6f7420666f756e6400000000000000000000000000006064820152fd5b6001918291855481520193019101909183906101c1565b8280fd5b849184346102c457806003193601126102c4576024359135845283602052832060028210156102c4576020935001548152f35b8380fd5b6040810192916000915b600283106102df57505050565b6001908251815260208091019201920191906102d2565b6040810190811067ffffffffffffffff82111761031257604052565b634e487b7160e01b600052604160045260246000fd5b9060005b60048082101561038e57600282101561037957508060051b83015161037257600019811461035c5760010161032c565b634e487b7160e01b600052601160045260246000fd5b5060009150565b603290634e487b7160e01b6000525260246000fd5b50600192505056fea2646970667358221220e437bf2917f471818eaab828d9801bf75f3fd6d01ff15d066632e0cb072b2ac164736f6c63430008110033";

type ECDSAPublicKeyRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ECDSAPublicKeyRegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ECDSAPublicKeyRegistry__factory extends ContractFactory {
  constructor(...args: ECDSAPublicKeyRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ECDSAPublicKeyRegistry> {
    return super.deploy(overrides || {}) as Promise<ECDSAPublicKeyRegistry>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ECDSAPublicKeyRegistry {
    return super.attach(address) as ECDSAPublicKeyRegistry;
  }
  override connect(signer: Signer): ECDSAPublicKeyRegistry__factory {
    return super.connect(signer) as ECDSAPublicKeyRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ECDSAPublicKeyRegistryInterface {
    return new utils.Interface(_abi) as ECDSAPublicKeyRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ECDSAPublicKeyRegistry {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ECDSAPublicKeyRegistry;
  }
}
