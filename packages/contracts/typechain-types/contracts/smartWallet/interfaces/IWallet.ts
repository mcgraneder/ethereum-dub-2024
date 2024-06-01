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
} from "../../../common";

export declare namespace IWallet {
  export type AllowanceOpDetailsStruct = {
    token: PromiseOrValue<string>;
    amount: PromiseOrValue<BigNumberish>;
    expiration: PromiseOrValue<BigNumberish>;
    nonce: PromiseOrValue<BigNumberish>;
  };

  export type AllowanceOpDetailsStructOutput = [
    string,
    BigNumber,
    number,
    number
  ] & { token: string; amount: BigNumber; expiration: number; nonce: number };

  export type AllowanceOpStruct = {
    details: IWallet.AllowanceOpDetailsStruct;
    spender: PromiseOrValue<string>;
    sigDeadline: PromiseOrValue<BigNumberish>;
  };

  export type AllowanceOpStructOutput = [
    IWallet.AllowanceOpDetailsStructOutput,
    string,
    BigNumber
  ] & {
    details: IWallet.AllowanceOpDetailsStructOutput;
    spender: string;
    sigDeadline: BigNumber;
  };

  export type UserOpStruct = {
    to: PromiseOrValue<string>;
    amount: PromiseOrValue<BigNumberish>;
    data: PromiseOrValue<BytesLike>;
  };

  export type UserOpStructOutput = [string, BigNumber, string] & {
    to: string;
    amount: BigNumber;
    data: string;
  };

  export type TradeInfoStruct = {
    _token0: PromiseOrValue<string>;
    _token1: PromiseOrValue<string>;
    _feeToken: PromiseOrValue<string>;
    _amountIn: PromiseOrValue<BigNumberish>;
    _gasPrice: PromiseOrValue<BigNumberish>;
  };

  export type TradeInfoStructOutput = [
    string,
    string,
    string,
    BigNumber,
    BigNumber
  ] & {
    _token0: string;
    _token1: string;
    _feeToken: string;
    _amountIn: BigNumber;
    _gasPrice: BigNumber;
  };

  export type TokenSpenderPairStruct = {
    token: PromiseOrValue<string>;
    spender: PromiseOrValue<string>;
  };

  export type TokenSpenderPairStructOutput = [string, string] & {
    token: string;
    spender: string;
  };
}

export interface IWalletInterface extends utils.Interface {
  functions: {
    "allowance(address,address,address)": FunctionFragment;
    "approve(address,address,uint160,uint48)": FunctionFragment;
    "deposit(uint256,address,address,address,address,address,((address,uint160,uint48,uint48),address,uint256),uint256,bytes)": FunctionFragment;
    "exec((address,uint256,bytes)[],((address,uint160,uint48,uint48),address,uint256),bytes,address,address,address)": FunctionFragment;
    "execFomEoa((address,uint256,bytes)[])": FunctionFragment;
    "getTradeDetails(uint256)": FunctionFragment;
    "invalidateNonces(address,address,uint48)": FunctionFragment;
    "lockdown((address,address)[])": FunctionFragment;
    "nonce()": FunctionFragment;
    "owner()": FunctionFragment;
    "permit(address,((address,uint160,uint48,uint48),address,uint256),bytes)": FunctionFragment;
    "transferFrom(address,address,uint160,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "allowance"
      | "approve"
      | "deposit"
      | "exec"
      | "execFomEoa"
      | "getTradeDetails"
      | "invalidateNonces"
      | "lockdown"
      | "nonce"
      | "owner"
      | "permit"
      | "transferFrom"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "allowance",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      IWallet.AllowanceOpStruct,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "exec",
    values: [
      IWallet.UserOpStruct[],
      IWallet.AllowanceOpStruct,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "execFomEoa",
    values: [IWallet.UserOpStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getTradeDetails",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "invalidateNonces",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "lockdown",
    values: [IWallet.TokenSpenderPairStruct[]]
  ): string;
  encodeFunctionData(functionFragment: "nonce", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "permit",
    values: [
      PromiseOrValue<string>,
      IWallet.AllowanceOpStruct,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "exec", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "execFomEoa", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTradeDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "invalidateNonces",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lockdown", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,address,uint160,uint48)": EventFragment;
    "Lockdown(address,address,address)": EventFragment;
    "LogCall(address,uint256,bytes)": EventFragment;
    "LogReceivedEther(address,uint256)": EventFragment;
    "NonceInvalidation(address,address,address,uint48,uint48)": EventFragment;
    "Permit(address,address,address,uint160,uint48,uint48)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Lockdown"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogCall"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogReceivedEther"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NonceInvalidation"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Permit"): EventFragment;
}

export interface ApprovalEventObject {
  owner: string;
  token: string;
  spender: string;
  amount: BigNumber;
  expiration: number;
}
export type ApprovalEvent = TypedEvent<
  [string, string, string, BigNumber, number],
  ApprovalEventObject
>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export interface LockdownEventObject {
  owner: string;
  token: string;
  spender: string;
}
export type LockdownEvent = TypedEvent<
  [string, string, string],
  LockdownEventObject
>;

export type LockdownEventFilter = TypedEventFilter<LockdownEvent>;

export interface LogCallEventObject {
  _contract: string;
  _value: BigNumber;
  _data: string;
}
export type LogCallEvent = TypedEvent<
  [string, BigNumber, string],
  LogCallEventObject
>;

export type LogCallEventFilter = TypedEventFilter<LogCallEvent>;

export interface LogReceivedEtherEventObject {
  _from: string;
  _amount: BigNumber;
}
export type LogReceivedEtherEvent = TypedEvent<
  [string, BigNumber],
  LogReceivedEtherEventObject
>;

export type LogReceivedEtherEventFilter =
  TypedEventFilter<LogReceivedEtherEvent>;

export interface NonceInvalidationEventObject {
  owner: string;
  token: string;
  spender: string;
  newNonce: number;
  oldNonce: number;
}
export type NonceInvalidationEvent = TypedEvent<
  [string, string, string, number, number],
  NonceInvalidationEventObject
>;

export type NonceInvalidationEventFilter =
  TypedEventFilter<NonceInvalidationEvent>;

export interface PermitEventObject {
  owner: string;
  token: string;
  spender: string;
  amount: BigNumber;
  expiration: number;
  nonce: number;
}
export type PermitEvent = TypedEvent<
  [string, string, string, BigNumber, number, number],
  PermitEventObject
>;

export type PermitEventFilter = TypedEventFilter<PermitEvent>;

export interface IWallet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IWalletInterface;

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
    allowance(
      user: PromiseOrValue<string>,
      token: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number, number] & {
        amount: BigNumber;
        expiration: number;
        nonce: number;
      }
    >;

    approve(
      token: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      expiration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deposit(
      _amount: PromiseOrValue<BigNumberish>,
      _token: PromiseOrValue<string>,
      _feeAsset: PromiseOrValue<string>,
      _outputToken: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      _permit2A: PromiseOrValue<string>,
      _permit: IWallet.AllowanceOpStruct,
      _gasPrice: PromiseOrValue<BigNumberish>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    exec(
      userOps: IWallet.UserOpStruct[],
      allowanceOp: IWallet.AllowanceOpStruct,
      _signature: PromiseOrValue<BytesLike>,
      weth: PromiseOrValue<string>,
      v2pancakeFactory: PromiseOrValue<string>,
      v3pancakeFactory: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    execFomEoa(
      userOps: IWallet.UserOpStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getTradeDetails(
      _nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[IWallet.TradeInfoStructOutput]>;

    invalidateNonces(
      token: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      newNonce: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    lockdown(
      approvals: IWallet.TokenSpenderPairStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nonce(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    permit(
      owner: PromiseOrValue<string>,
      permitSingle: IWallet.AllowanceOpStruct,
      signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  allowance(
    user: PromiseOrValue<string>,
    token: PromiseOrValue<string>,
    spender: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, number, number] & {
      amount: BigNumber;
      expiration: number;
      nonce: number;
    }
  >;

  approve(
    token: PromiseOrValue<string>,
    spender: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    expiration: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deposit(
    _amount: PromiseOrValue<BigNumberish>,
    _token: PromiseOrValue<string>,
    _feeAsset: PromiseOrValue<string>,
    _outputToken: PromiseOrValue<string>,
    _user: PromiseOrValue<string>,
    _permit2A: PromiseOrValue<string>,
    _permit: IWallet.AllowanceOpStruct,
    _gasPrice: PromiseOrValue<BigNumberish>,
    _signature: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  exec(
    userOps: IWallet.UserOpStruct[],
    allowanceOp: IWallet.AllowanceOpStruct,
    _signature: PromiseOrValue<BytesLike>,
    weth: PromiseOrValue<string>,
    v2pancakeFactory: PromiseOrValue<string>,
    v3pancakeFactory: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  execFomEoa(
    userOps: IWallet.UserOpStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getTradeDetails(
    _nonce: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IWallet.TradeInfoStructOutput>;

  invalidateNonces(
    token: PromiseOrValue<string>,
    spender: PromiseOrValue<string>,
    newNonce: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  lockdown(
    approvals: IWallet.TokenSpenderPairStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nonce(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  permit(
    owner: PromiseOrValue<string>,
    permitSingle: IWallet.AllowanceOpStruct,
    signature: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    from: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    allowance(
      user: PromiseOrValue<string>,
      token: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number, number] & {
        amount: BigNumber;
        expiration: number;
        nonce: number;
      }
    >;

    approve(
      token: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      expiration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    deposit(
      _amount: PromiseOrValue<BigNumberish>,
      _token: PromiseOrValue<string>,
      _feeAsset: PromiseOrValue<string>,
      _outputToken: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      _permit2A: PromiseOrValue<string>,
      _permit: IWallet.AllowanceOpStruct,
      _gasPrice: PromiseOrValue<BigNumberish>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    exec(
      userOps: IWallet.UserOpStruct[],
      allowanceOp: IWallet.AllowanceOpStruct,
      _signature: PromiseOrValue<BytesLike>,
      weth: PromiseOrValue<string>,
      v2pancakeFactory: PromiseOrValue<string>,
      v3pancakeFactory: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    execFomEoa(
      userOps: IWallet.UserOpStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    getTradeDetails(
      _nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IWallet.TradeInfoStructOutput>;

    invalidateNonces(
      token: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      newNonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    lockdown(
      approvals: IWallet.TokenSpenderPairStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    nonce(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    permit(
      owner: PromiseOrValue<string>,
      permitSingle: IWallet.AllowanceOpStruct,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Approval(address,address,address,uint160,uint48)"(
      owner?: PromiseOrValue<string> | null,
      token?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      amount?: null,
      expiration?: null
    ): ApprovalEventFilter;
    Approval(
      owner?: PromiseOrValue<string> | null,
      token?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      amount?: null,
      expiration?: null
    ): ApprovalEventFilter;

    "Lockdown(address,address,address)"(
      owner?: PromiseOrValue<string> | null,
      token?: null,
      spender?: null
    ): LockdownEventFilter;
    Lockdown(
      owner?: PromiseOrValue<string> | null,
      token?: null,
      spender?: null
    ): LockdownEventFilter;

    "LogCall(address,uint256,bytes)"(
      _contract?: PromiseOrValue<string> | null,
      _value?: null,
      _data?: null
    ): LogCallEventFilter;
    LogCall(
      _contract?: PromiseOrValue<string> | null,
      _value?: null,
      _data?: null
    ): LogCallEventFilter;

    "LogReceivedEther(address,uint256)"(
      _from?: PromiseOrValue<string> | null,
      _amount?: null
    ): LogReceivedEtherEventFilter;
    LogReceivedEther(
      _from?: PromiseOrValue<string> | null,
      _amount?: null
    ): LogReceivedEtherEventFilter;

    "NonceInvalidation(address,address,address,uint48,uint48)"(
      owner?: PromiseOrValue<string> | null,
      token?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      newNonce?: null,
      oldNonce?: null
    ): NonceInvalidationEventFilter;
    NonceInvalidation(
      owner?: PromiseOrValue<string> | null,
      token?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      newNonce?: null,
      oldNonce?: null
    ): NonceInvalidationEventFilter;

    "Permit(address,address,address,uint160,uint48,uint48)"(
      owner?: PromiseOrValue<string> | null,
      token?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      amount?: null,
      expiration?: null,
      nonce?: null
    ): PermitEventFilter;
    Permit(
      owner?: PromiseOrValue<string> | null,
      token?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      amount?: null,
      expiration?: null,
      nonce?: null
    ): PermitEventFilter;
  };

  estimateGas: {
    allowance(
      user: PromiseOrValue<string>,
      token: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      token: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      expiration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deposit(
      _amount: PromiseOrValue<BigNumberish>,
      _token: PromiseOrValue<string>,
      _feeAsset: PromiseOrValue<string>,
      _outputToken: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      _permit2A: PromiseOrValue<string>,
      _permit: IWallet.AllowanceOpStruct,
      _gasPrice: PromiseOrValue<BigNumberish>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    exec(
      userOps: IWallet.UserOpStruct[],
      allowanceOp: IWallet.AllowanceOpStruct,
      _signature: PromiseOrValue<BytesLike>,
      weth: PromiseOrValue<string>,
      v2pancakeFactory: PromiseOrValue<string>,
      v3pancakeFactory: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    execFomEoa(
      userOps: IWallet.UserOpStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getTradeDetails(
      _nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    invalidateNonces(
      token: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      newNonce: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    lockdown(
      approvals: IWallet.TokenSpenderPairStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nonce(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    permit(
      owner: PromiseOrValue<string>,
      permitSingle: IWallet.AllowanceOpStruct,
      signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    allowance(
      user: PromiseOrValue<string>,
      token: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      token: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      expiration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      _amount: PromiseOrValue<BigNumberish>,
      _token: PromiseOrValue<string>,
      _feeAsset: PromiseOrValue<string>,
      _outputToken: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      _permit2A: PromiseOrValue<string>,
      _permit: IWallet.AllowanceOpStruct,
      _gasPrice: PromiseOrValue<BigNumberish>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    exec(
      userOps: IWallet.UserOpStruct[],
      allowanceOp: IWallet.AllowanceOpStruct,
      _signature: PromiseOrValue<BytesLike>,
      weth: PromiseOrValue<string>,
      v2pancakeFactory: PromiseOrValue<string>,
      v3pancakeFactory: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    execFomEoa(
      userOps: IWallet.UserOpStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getTradeDetails(
      _nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    invalidateNonces(
      token: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      newNonce: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    lockdown(
      approvals: IWallet.TokenSpenderPairStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nonce(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    permit(
      owner: PromiseOrValue<string>,
      permitSingle: IWallet.AllowanceOpStruct,
      signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}