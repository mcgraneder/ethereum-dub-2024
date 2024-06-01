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
} from "../../common";

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
    details: IWallet.AllowanceOpDetailsStruct[];
    spender: PromiseOrValue<string>;
    sigDeadline: PromiseOrValue<BigNumberish>;
  };

  export type AllowanceOpStructOutput = [
    IWallet.AllowanceOpDetailsStructOutput[],
    string,
    BigNumber
  ] & {
    details: IWallet.AllowanceOpDetailsStructOutput[];
    spender: string;
    sigDeadline: BigNumber;
  };

  export type UserOpStruct = {
    to: PromiseOrValue<string>;
    amount: PromiseOrValue<BigNumberish>;
    chainId: PromiseOrValue<BigNumberish>;
    data: PromiseOrValue<BytesLike>;
  };

  export type UserOpStructOutput = [string, BigNumber, BigNumber, string] & {
    to: string;
    amount: BigNumber;
    chainId: BigNumber;
    data: string;
  };

  export type ECDSAExecStruct = {
    allowanceOp: IWallet.AllowanceOpStruct;
    userOps: IWallet.UserOpStruct[];
    bridgeOps: IWallet.UserOpStruct[];
    wallet: PromiseOrValue<string>;
    nonce: PromiseOrValue<BigNumberish>;
    chainID: PromiseOrValue<BigNumberish>;
    bridgeChainID: PromiseOrValue<BigNumberish>;
    sigChainID: PromiseOrValue<BigNumberish>;
  };

  export type ECDSAExecStructOutput = [
    IWallet.AllowanceOpStructOutput,
    IWallet.UserOpStructOutput[],
    IWallet.UserOpStructOutput[],
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    allowanceOp: IWallet.AllowanceOpStructOutput;
    userOps: IWallet.UserOpStructOutput[];
    bridgeOps: IWallet.UserOpStructOutput[];
    wallet: string;
    nonce: BigNumber;
    chainID: BigNumber;
    bridgeChainID: BigNumber;
    sigChainID: BigNumber;
  };

  export type ECDSAExecValidationDetailsStruct = {
    signer: PromiseOrValue<string>;
    dataHash: PromiseOrValue<BytesLike>;
    signature: PromiseOrValue<BytesLike>;
    wallet: PromiseOrValue<string>;
  };

  export type ECDSAExecValidationDetailsStructOutput = [
    string,
    string,
    string,
    string
  ] & { signer: string; dataHash: string; signature: string; wallet: string };
}

export interface IWalletInterface extends utils.Interface {
  functions: {
    "_verifySignatures(bytes,bytes32,address,uint256)": FunctionFragment;
    "allowance(address,address,address)": FunctionFragment;
    "approve(address,address,uint160,uint48)": FunctionFragment;
    "exec((((address,uint160,uint48,uint48)[],address,uint256),(address,uint256,uint256,bytes)[],(address,uint256,uint256,bytes)[],address,uint256,uint256,uint256,uint256),bytes)": FunctionFragment;
    "execBridge((((address,uint160,uint48,uint48)[],address,uint256),(address,uint256,uint256,bytes)[],(address,uint256,uint256,bytes)[],address,uint256,uint256,uint256,uint256),bytes,bytes)": FunctionFragment;
    "execFomEoa((address,uint256,uint256,bytes)[])": FunctionFragment;
    "getUserValidatedData(uint256)": FunctionFragment;
    "nonce()": FunctionFragment;
    "owner()": FunctionFragment;
    "transferFrom(address,address,uint160,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "_verifySignatures"
      | "allowance"
      | "approve"
      | "exec"
      | "execBridge"
      | "execFomEoa"
      | "getUserValidatedData"
      | "nonce"
      | "owner"
      | "transferFrom"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "_verifySignatures",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
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
    functionFragment: "exec",
    values: [IWallet.ECDSAExecStruct, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "execBridge",
    values: [
      IWallet.ECDSAExecStruct,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "execFomEoa",
    values: [IWallet.UserOpStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserValidatedData",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "nonce", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "_verifySignatures",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "exec", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "execBridge", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "execFomEoa", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getUserValidatedData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,address,uint160,uint48)": EventFragment;
    "LogCall(address,uint256,bytes)": EventFragment;
    "LogReceivedEther(address,uint256)": EventFragment;
    "Permit(address,address,address,uint160,uint48,uint48)": EventFragment;
    "WalletOpRecoveryResult(address,bytes32,bytes,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogCall"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogReceivedEther"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Permit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WalletOpRecoveryResult"): EventFragment;
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

export interface WalletOpRecoveryResultEventObject {
  signer: string;
  dataHash: string;
  signature: string;
  wallet: string;
  nonce: BigNumber;
}
export type WalletOpRecoveryResultEvent = TypedEvent<
  [string, string, string, string, BigNumber],
  WalletOpRecoveryResultEventObject
>;

export type WalletOpRecoveryResultEventFilter =
  TypedEventFilter<WalletOpRecoveryResultEvent>;

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
    _verifySignatures(
      signatures: PromiseOrValue<BytesLike>,
      dataHash: PromiseOrValue<BytesLike>,
      executor: PromiseOrValue<string>,
      requiredSignatures: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[void]>;

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

    exec(
      _walletExec: IWallet.ECDSAExecStruct,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    execBridge(
      _walletExec: IWallet.ECDSAExecStruct,
      _signature: PromiseOrValue<BytesLike>,
      _bridgeProof: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    execFomEoa(
      userOps: IWallet.UserOpStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getUserValidatedData(
      _nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[IWallet.ECDSAExecValidationDetailsStructOutput]>;

    nonce(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  _verifySignatures(
    signatures: PromiseOrValue<BytesLike>,
    dataHash: PromiseOrValue<BytesLike>,
    executor: PromiseOrValue<string>,
    requiredSignatures: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<void>;

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

  exec(
    _walletExec: IWallet.ECDSAExecStruct,
    _signature: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  execBridge(
    _walletExec: IWallet.ECDSAExecStruct,
    _signature: PromiseOrValue<BytesLike>,
    _bridgeProof: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  execFomEoa(
    userOps: IWallet.UserOpStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getUserValidatedData(
    _nonce: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IWallet.ECDSAExecValidationDetailsStructOutput>;

  nonce(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  transferFrom(
    from: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    _verifySignatures(
      signatures: PromiseOrValue<BytesLike>,
      dataHash: PromiseOrValue<BytesLike>,
      executor: PromiseOrValue<string>,
      requiredSignatures: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

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

    exec(
      _walletExec: IWallet.ECDSAExecStruct,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    execBridge(
      _walletExec: IWallet.ECDSAExecStruct,
      _signature: PromiseOrValue<BytesLike>,
      _bridgeProof: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    execFomEoa(
      userOps: IWallet.UserOpStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    getUserValidatedData(
      _nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IWallet.ECDSAExecValidationDetailsStructOutput>;

    nonce(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

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

    "WalletOpRecoveryResult(address,bytes32,bytes,address,uint256)"(
      signer?: PromiseOrValue<string> | null,
      dataHash?: null,
      signature?: null,
      wallet?: null,
      nonce?: null
    ): WalletOpRecoveryResultEventFilter;
    WalletOpRecoveryResult(
      signer?: PromiseOrValue<string> | null,
      dataHash?: null,
      signature?: null,
      wallet?: null,
      nonce?: null
    ): WalletOpRecoveryResultEventFilter;
  };

  estimateGas: {
    _verifySignatures(
      signatures: PromiseOrValue<BytesLike>,
      dataHash: PromiseOrValue<BytesLike>,
      executor: PromiseOrValue<string>,
      requiredSignatures: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

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

    exec(
      _walletExec: IWallet.ECDSAExecStruct,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    execBridge(
      _walletExec: IWallet.ECDSAExecStruct,
      _signature: PromiseOrValue<BytesLike>,
      _bridgeProof: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    execFomEoa(
      userOps: IWallet.UserOpStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getUserValidatedData(
      _nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nonce(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _verifySignatures(
      signatures: PromiseOrValue<BytesLike>,
      dataHash: PromiseOrValue<BytesLike>,
      executor: PromiseOrValue<string>,
      requiredSignatures: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

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

    exec(
      _walletExec: IWallet.ECDSAExecStruct,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    execBridge(
      _walletExec: IWallet.ECDSAExecStruct,
      _signature: PromiseOrValue<BytesLike>,
      _bridgeProof: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    execFomEoa(
      userOps: IWallet.UserOpStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getUserValidatedData(
      _nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nonce(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}