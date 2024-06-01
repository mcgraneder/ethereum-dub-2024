/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
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
} from "../../../common";

export interface SmartWalletHasherInterface extends utils.Interface {
  functions: {
    "ALLOWANCE_DETAILS_OP_TYPE_HASH()": FunctionFragment;
    "ALLOWANCE_OP_BATCH_TYPE_HASH()": FunctionFragment;
    "UPPER_BIT_MASK()": FunctionFragment;
    "USER_OP_TYPE_HASH()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "ALLOWANCE_DETAILS_OP_TYPE_HASH"
      | "ALLOWANCE_OP_BATCH_TYPE_HASH"
      | "UPPER_BIT_MASK"
      | "USER_OP_TYPE_HASH"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "ALLOWANCE_DETAILS_OP_TYPE_HASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ALLOWANCE_OP_BATCH_TYPE_HASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "UPPER_BIT_MASK",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "USER_OP_TYPE_HASH",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "ALLOWANCE_DETAILS_OP_TYPE_HASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ALLOWANCE_OP_BATCH_TYPE_HASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "UPPER_BIT_MASK",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "USER_OP_TYPE_HASH",
    data: BytesLike
  ): Result;

  events: {};
}

export interface SmartWalletHasher extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SmartWalletHasherInterface;

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
    ALLOWANCE_DETAILS_OP_TYPE_HASH(
      overrides?: CallOverrides
    ): Promise<[string]>;

    ALLOWANCE_OP_BATCH_TYPE_HASH(overrides?: CallOverrides): Promise<[string]>;

    UPPER_BIT_MASK(overrides?: CallOverrides): Promise<[string]>;

    USER_OP_TYPE_HASH(overrides?: CallOverrides): Promise<[string]>;
  };

  ALLOWANCE_DETAILS_OP_TYPE_HASH(overrides?: CallOverrides): Promise<string>;

  ALLOWANCE_OP_BATCH_TYPE_HASH(overrides?: CallOverrides): Promise<string>;

  UPPER_BIT_MASK(overrides?: CallOverrides): Promise<string>;

  USER_OP_TYPE_HASH(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    ALLOWANCE_DETAILS_OP_TYPE_HASH(overrides?: CallOverrides): Promise<string>;

    ALLOWANCE_OP_BATCH_TYPE_HASH(overrides?: CallOverrides): Promise<string>;

    UPPER_BIT_MASK(overrides?: CallOverrides): Promise<string>;

    USER_OP_TYPE_HASH(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    ALLOWANCE_DETAILS_OP_TYPE_HASH(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ALLOWANCE_OP_BATCH_TYPE_HASH(overrides?: CallOverrides): Promise<BigNumber>;

    UPPER_BIT_MASK(overrides?: CallOverrides): Promise<BigNumber>;

    USER_OP_TYPE_HASH(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    ALLOWANCE_DETAILS_OP_TYPE_HASH(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ALLOWANCE_OP_BATCH_TYPE_HASH(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    UPPER_BIT_MASK(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    USER_OP_TYPE_HASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
