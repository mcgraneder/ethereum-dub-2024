/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface DeployerInterface extends utils.Interface {
  functions: {
    "SALT()": FunctionFragment;
    "deployContract(bytes,bytes32)": FunctionFragment;
    "proxyAdmin()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "SALT" | "deployContract" | "proxyAdmin"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "SALT", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deployContract",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "proxyAdmin",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "SALT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deployContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "proxyAdmin", data: BytesLike): Result;

  events: {};
}

export interface Deployer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DeployerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    SALT(overrides?: CallOverrides): Promise<[string]>;

    deployContract(
      bytecode: PromiseOrValue<BytesLike>,
      salt: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    proxyAdmin(overrides?: CallOverrides): Promise<[string]>;
  };

  SALT(overrides?: CallOverrides): Promise<string>;

  deployContract(
    bytecode: PromiseOrValue<BytesLike>,
    salt: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  proxyAdmin(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    SALT(overrides?: CallOverrides): Promise<string>;

    deployContract(
      bytecode: PromiseOrValue<BytesLike>,
      salt: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    proxyAdmin(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    SALT(overrides?: CallOverrides): Promise<BigNumber>;

    deployContract(
      bytecode: PromiseOrValue<BytesLike>,
      salt: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    proxyAdmin(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    SALT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deployContract(
      bytecode: PromiseOrValue<BytesLike>,
      salt: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    proxyAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
