/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  CALLER,
  CALLERInterface,
} from "../../../contracts/Call.sol/CALLER";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "msgData",
        type: "bytes",
      },
    ],
    name: "executeApprove",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct CALLER.IPAllowance",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "msgData",
        type: "bytes",
      },
    ],
    name: "executeSwap",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "reciever",
            type: "address",
          },
        ],
        internalType: "struct CALLER.IPSwap",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "msgData",
        type: "bytes",
      },
    ],
    name: "executeTransfer",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint160",
            name: "amount",
            type: "uint160",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
        ],
        internalType: "struct CALLER.IPTransfer",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "msgData",
        type: "bytes",
      },
    ],
    name: "executeTransfer2",
    outputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint160",
        name: "amount",
        type: "uint160",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080806040523461001657610487908161001c8239f35b600080fdfe608060409080825260048036101561001657600080fd5b600091823560e01c908163662a0948146102c05750806369baf7bf1461012a5780637195a14e146100d05763985f61a11461005057600080fd5b346100cc5761005e36610336565b836020869593955161006f81610385565b82815201528083116100cc5783018390036003190184136100c95750602490820135916100a66001600160a01b03928392016103f5565b16602084516100b481610385565b84815201908152835192835251166020820152f35b80fd5b5080fd5b50829034610126576100e136610336565b90938183116100c95750926100fc9160809482019101610409565b919284919451946001600160a01b0380958180941688521660208701521690840152166060820152f35b8280fd5b5090346100c95761013a36610336565b90938051610147816103b7565b8381528360606020928284820152828582015201528285116102bc578486019280600319810197019461017a8686610409565b9792989194909a6001600160a01b03809a169a67ffffffffffffffff82116102a95750875193601f19936101b5601b850186168a01876103d3565b82865236106102a55791601c9186938987013784010152855190858201927f0be77f56000000000000000000000000000000000000000000000000000000008452866024840152805190816044850152855b828110610291575050938996949383610240606460809f99968596601f8a888f9c869086010152011681010360448101845201826103d3565b51906a636f6e736f6c652e6c6f675afa50816060875161025f816103b7565b8b8152828682019416845282898201971687520197168752855198895251169087015251169084015251166060820152f35b818101890151858201606401528801610207565b8580fd5b856041602492634e487b7160e01b835252fd5b8380fd5b929050346100c9576020816102d436610336565b9290956102e081610385565b82815201528083116100cc5783018390036003190184136100c9575061030f6001600160a01b039183016103f5565b169060246020845161032081610385565b8481520191013581528251918252516020820152f35b9060206003198301126103805760043567ffffffffffffffff9283821161038057806023830112156103805781600401359384116103805760248483010111610380576024019190565b600080fd5b6040810190811067ffffffffffffffff8211176103a157604052565b634e487b7160e01b600052604160045260246000fd5b6080810190811067ffffffffffffffff8211176103a157604052565b90601f8019910116810190811067ffffffffffffffff8211176103a157604052565b35906001600160a01b038216820361038057565b91908260809103126103805761041e826103f5565b9161042b602082016103f5565b9160408201356001600160a01b038116810361038057606061044e9193016103f5565b9056fea26469706673582212203b81a41a62a046a0002102615e302e844090e62f6c1892cc289b42b1986d1eeb64736f6c63430008110033";

type CALLERConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CALLERConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CALLER__factory extends ContractFactory {
  constructor(...args: CALLERConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CALLER> {
    return super.deploy(overrides || {}) as Promise<CALLER>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CALLER {
    return super.attach(address) as CALLER;
  }
  override connect(signer: Signer): CALLER__factory {
    return super.connect(signer) as CALLER__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CALLERInterface {
    return new utils.Interface(_abi) as CALLERInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): CALLER {
    return new Contract(address, _abi, signerOrProvider) as CALLER;
  }
}
