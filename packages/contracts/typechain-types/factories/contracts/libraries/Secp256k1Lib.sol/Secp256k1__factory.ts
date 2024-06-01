/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  Secp256k1,
  Secp256k1Interface,
} from "../../../../contracts/libraries/Secp256k1Lib.sol/Secp256k1";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "pubkey",
        type: "uint256[2]",
      },
    ],
    name: "deriveAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
    ],
    name: "hashToPoint",
    outputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "point",
        type: "uint256[2]",
      },
    ],
    name: "point_hash",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080806040523461001a5761055a9081610020823930815050f35b600080fdfe60406080815260048036101561001457600080fd5b6000803560e01c918263426817fa146100fd5782638236342c1461008e5750506395e806311461004357600080fd5b60209073ffffffffffffffffffffffffffffffffffffffff61006436610150565b838151910151835190858201928352848201528381526100838161011e565b519020169051908152f35b90915060203660031901126100f9576401000003d019918282350691815b6100e6576100c384600781808780098709086101d8565b806100d55750836001839408926100ac565b935050509082519182526020820152f35b906012602492634e487b7160e01b835252fd5b5080fd5b60208473ffffffffffffffffffffffffffffffffffffffff61006436610150565b6060810190811067ffffffffffffffff82111761013a57604052565b634e487b7160e01b600052604160045260246000fd5b60406003198201126101ae5780602312156101ae57604051906040820182811067ffffffffffffffff82111761013a576040528160449182116101ae576004905b82821061019e5750505090565b8135815260209182019101610191565b600080fd5b60001981146101c25760010190565b634e487b7160e01b600052601160045260246000fd5b906000916000908015610393576001806101f18361040e565b0361038c578281816401000003d1195b82811615610377576002945b610327575b8281018082116102cf578161023c8597989495969361023661024294891c8761049e565b9561049e565b9761049e565b90945b6102525750505050505050565b8694865b818710610303575b5085156102f7578581039081116102e35760001981019081116102cf5760ff81116102cf57849392918895610294921b9061049e565b9081946102bb57908392916401000003d01980838194099687920997099591939092610245565b602488634e487b7160e01b81526012600452fd5b602488634e487b7160e01b81526011600452fd5b602484634e487b7160e01b81526011600452fd5b50909750505050505050565b8581146103225761031661031c91610398565b966101b3565b95610256565b61025e565b9091939580610363575061033a8661040e565b9582966401000003d1191461035b57906103558593926101b3565b9461020d565b939190610212565b80634e487b7160e01b602492526011600452fd5b61038391921c926101b3565b91908391610201565b5090925050565b509150565b80156104085760019081600160ff1b91825b6103b45750505090565b9091926401000003d0199081808080600294818a87161515890a918009098189891c86161515880a918009098188851c85161515870a91800909918660031c161515840a918009099260041c9190826103aa565b50600090565b80156104085760019081600160ff1b91825b61042a5750505090565b9091926401000003d01990818080807f7fffffffffffffffffffffffffffffffffffffffffffffffffffffff7ffffe1794818a87161515890a918009098189891c86161515880a91800909818860021c85161515870a91800909918660031c161515840a918009099260041c919082610420565b801561051d578115610516579060019182600160ff1b92835b6104c2575050505090565b909192936401000003d01980808093818987161515890a918009098188871c86161515880a91800909818760021c85161515870a91800909818660031c84161515860a918009099360041c929190836104b7565b5050600190565b505060009056fea26469706673582212201be6dda1ceeecc1ff68e4772884aea8b4b2da8c82fac680f9a39f3074b3e3c9664736f6c63430008110033";

type Secp256k1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Secp256k1ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Secp256k1__factory extends ContractFactory {
  constructor(...args: Secp256k1ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Secp256k1> {
    return super.deploy(overrides || {}) as Promise<Secp256k1>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Secp256k1 {
    return super.attach(address) as Secp256k1;
  }
  override connect(signer: Signer): Secp256k1__factory {
    return super.connect(signer) as Secp256k1__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Secp256k1Interface {
    return new utils.Interface(_abi) as Secp256k1Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Secp256k1 {
    return new Contract(address, _abi, signerOrProvider) as Secp256k1;
  }
}