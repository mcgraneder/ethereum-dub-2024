/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface WalletBridgeVerifierInterface extends utils.Interface {
  functions: {
    "RELAYER()": FunctionFragment;
    "bridgeProofs(uint256)": FunctionFragment;
    "bridgeProofsTimestamps(uint256)": FunctionFragment;
    "extractSelector(bytes)": FunctionFragment;
    "getBalance(address,address)": FunctionFragment;
    "userBalanceBedoreOps(address,address)": FunctionFragment;
    "verifyBridgeReq(bytes,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "RELAYER"
      | "bridgeProofs"
      | "bridgeProofsTimestamps"
      | "extractSelector"
      | "getBalance"
      | "userBalanceBedoreOps"
      | "verifyBridgeReq"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "RELAYER", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "bridgeProofs",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "bridgeProofsTimestamps",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "extractSelector",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getBalance",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "userBalanceBedoreOps",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyBridgeReq",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(functionFragment: "RELAYER", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "bridgeProofs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bridgeProofsTimestamps",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "extractSelector",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBalance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "userBalanceBedoreOps",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyBridgeReq",
    data: BytesLike
  ): Result;

  events: {
    "BridgeProofTimestamp(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BridgeProofTimestamp"): EventFragment;
}

export interface BridgeProofTimestampEventObject {
  timestamp: BigNumber;
}
export type BridgeProofTimestampEvent = TypedEvent<
  [BigNumber],
  BridgeProofTimestampEventObject
>;

export type BridgeProofTimestampEventFilter =
  TypedEventFilter<BridgeProofTimestampEvent>;

export interface WalletBridgeVerifier extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: WalletBridgeVerifierInterface;

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
    RELAYER(overrides?: CallOverrides): Promise<[string]>;

    bridgeProofs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    bridgeProofsTimestamps(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    extractSelector(
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string] & { selector: string }>;

    getBalance(
      account: PromiseOrValue<string>,
      token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    userBalanceBedoreOps(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    verifyBridgeReq(
      _encodedWalletExec: PromiseOrValue<BytesLike>,
      _sig: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  RELAYER(overrides?: CallOverrides): Promise<string>;

  bridgeProofs(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  bridgeProofsTimestamps(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  extractSelector(
    _calldata: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  getBalance(
    account: PromiseOrValue<string>,
    token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  userBalanceBedoreOps(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  verifyBridgeReq(
    _encodedWalletExec: PromiseOrValue<BytesLike>,
    _sig: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    RELAYER(overrides?: CallOverrides): Promise<string>;

    bridgeProofs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    bridgeProofsTimestamps(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    extractSelector(
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    getBalance(
      account: PromiseOrValue<string>,
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    userBalanceBedoreOps(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    verifyBridgeReq(
      _encodedWalletExec: PromiseOrValue<BytesLike>,
      _sig: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "BridgeProofTimestamp(uint256)"(
      timestamp?: null
    ): BridgeProofTimestampEventFilter;
    BridgeProofTimestamp(timestamp?: null): BridgeProofTimestampEventFilter;
  };

  estimateGas: {
    RELAYER(overrides?: CallOverrides): Promise<BigNumber>;

    bridgeProofs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    bridgeProofsTimestamps(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    extractSelector(
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBalance(
      account: PromiseOrValue<string>,
      token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    userBalanceBedoreOps(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    verifyBridgeReq(
      _encodedWalletExec: PromiseOrValue<BytesLike>,
      _sig: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    RELAYER(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    bridgeProofs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    bridgeProofsTimestamps(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    extractSelector(
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBalance(
      account: PromiseOrValue<string>,
      token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    userBalanceBedoreOps(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    verifyBridgeReq(
      _encodedWalletExec: PromiseOrValue<BytesLike>,
      _sig: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
