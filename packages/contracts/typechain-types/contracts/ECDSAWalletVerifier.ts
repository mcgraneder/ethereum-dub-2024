/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
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
  PromiseOrValue,
} from "../common";

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
}

export declare namespace Secp256k1 {
  export type PointStruct = {
    x: PromiseOrValue<BigNumberish>;
    y: PromiseOrValue<BigNumberish>;
  };

  export type PointStructOutput = [BigNumber, BigNumber] & {
    x: BigNumber;
    y: BigNumber;
  };
}

export interface ECDSAWalletVerifierInterface extends utils.Interface {
  functions: {
    "CreateProof(uint256,uint256)": FunctionFragment;
    "NN()": FunctionFragment;
    "PrivDerive(uint256,uint256)": FunctionFragment;
    "PubDerive(uint256[2],uint256)": FunctionFragment;
    "SharedSecret(uint256,uint256[2])": FunctionFragment;
    "VerifyProof(uint256[2],uint256,uint256,uint256)": FunctionFragment;
    "deriveAddress(uint256[2])": FunctionFragment;
    "deterministicGenerateK(bytes32,bytes32)": FunctionFragment;
    "generateMessagePoint(address,(((address,uint160,uint48,uint48)[],address,uint256),(address,uint256,uint256,bytes)[],(address,uint256,uint256,bytes)[],address,uint256,uint256,uint256,uint256),uint256,uint256)": FunctionFragment;
    "hmacSha256(bytes32,bytes)": FunctionFragment;
    "publicKeyToAddress((uint256,uint256))": FunctionFragment;
    "recover(bytes32,uint8,uint256,uint256)": FunctionFragment;
    "sign(bytes32,bytes32)": FunctionFragment;
    "signCrossChainTransaction((((address,uint160,uint48,uint48)[],address,uint256),(address,uint256,uint256,bytes)[],(address,uint256,uint256,bytes)[],address,uint256,uint256,uint256,uint256),bytes32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "CreateProof"
      | "NN"
      | "PrivDerive"
      | "PubDerive"
      | "SharedSecret"
      | "VerifyProof"
      | "deriveAddress"
      | "deterministicGenerateK"
      | "generateMessagePoint"
      | "hmacSha256"
      | "publicKeyToAddress"
      | "recover"
      | "sign"
      | "signCrossChainTransaction"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "CreateProof",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "NN", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "PrivDerive",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "PubDerive",
    values: [
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "SharedSecret",
    values: [
      PromiseOrValue<BigNumberish>,
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "VerifyProof",
    values: [
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "deriveAddress",
    values: [[PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]]
  ): string;
  encodeFunctionData(
    functionFragment: "deterministicGenerateK",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "generateMessagePoint",
    values: [
      PromiseOrValue<string>,
      IWallet.ECDSAExecStruct,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "hmacSha256",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "publicKeyToAddress",
    values: [Secp256k1.PointStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "recover",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "sign",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "signCrossChainTransaction",
    values: [IWallet.ECDSAExecStruct, PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(
    functionFragment: "CreateProof",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "NN", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "PrivDerive", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "PubDerive", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "SharedSecret",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "VerifyProof",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deriveAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deterministicGenerateK",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "generateMessagePoint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "hmacSha256", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "publicKeyToAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "recover", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sign", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "signCrossChainTransaction",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ECDSAWalletVerifier extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ECDSAWalletVerifierInterface;

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
    CreateProof(
      secret: PromiseOrValue<BigNumberish>,
      message: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        pubkeyX: BigNumber;
        pubkeyY: BigNumber;
        out_e: BigNumber;
        out_s: BigNumber;
      }
    >;

    NN(overrides?: CallOverrides): Promise<[BigNumber]>;

    PrivDerive(
      secret_key: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    PubDerive(
      pubkey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { pubkeyX: BigNumber; pubkeyY: BigNumber }
    >;

    SharedSecret(
      my_secret: PromiseOrValue<BigNumberish>,
      their_public: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { xPX: BigNumber; xPY: BigNumber }>;

    VerifyProof(
      pubkey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      message: PromiseOrValue<BigNumberish>,
      s: PromiseOrValue<BigNumberish>,
      e: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean] & { verified: boolean }>;

    deriveAddress(
      pubkey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      overrides?: CallOverrides
    ): Promise<[string]>;

    deterministicGenerateK(
      msghash: PromiseOrValue<BytesLike>,
      priv: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    generateMessagePoint(
      sender: PromiseOrValue<string>,
      operation: IWallet.ECDSAExecStruct,
      nonce: PromiseOrValue<BigNumberish>,
      timestamp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    hmacSha256(
      key: PromiseOrValue<BytesLike>,
      message: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    publicKeyToAddress(
      publicKey: Secp256k1.PointStruct,
      overrides?: CallOverrides
    ): Promise<[string]>;

    recover(
      msghash: PromiseOrValue<BytesLike>,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BigNumberish>,
      s: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[Secp256k1.PointStructOutput]>;

    sign(
      msghash: PromiseOrValue<BytesLike>,
      privkey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[number, BigNumber, BigNumber]>;

    signCrossChainTransaction(
      operation: IWallet.ECDSAExecStruct,
      privateKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        pubkeyX: BigNumber;
        pubkeyY: BigNumber;
        out_e: BigNumber;
        out_s: BigNumber;
      }
    >;
  };

  CreateProof(
    secret: PromiseOrValue<BigNumberish>,
    message: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      pubkeyX: BigNumber;
      pubkeyY: BigNumber;
      out_e: BigNumber;
      out_s: BigNumber;
    }
  >;

  NN(overrides?: CallOverrides): Promise<BigNumber>;

  PrivDerive(
    secret_key: PromiseOrValue<BigNumberish>,
    nonce: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  PubDerive(
    pubkey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    nonce: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { pubkeyX: BigNumber; pubkeyY: BigNumber }
  >;

  SharedSecret(
    my_secret: PromiseOrValue<BigNumberish>,
    their_public: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { xPX: BigNumber; xPY: BigNumber }>;

  VerifyProof(
    pubkey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    message: PromiseOrValue<BigNumberish>,
    s: PromiseOrValue<BigNumberish>,
    e: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  deriveAddress(
    pubkey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    overrides?: CallOverrides
  ): Promise<string>;

  deterministicGenerateK(
    msghash: PromiseOrValue<BytesLike>,
    priv: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  generateMessagePoint(
    sender: PromiseOrValue<string>,
    operation: IWallet.ECDSAExecStruct,
    nonce: PromiseOrValue<BigNumberish>,
    timestamp: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  hmacSha256(
    key: PromiseOrValue<BytesLike>,
    message: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  publicKeyToAddress(
    publicKey: Secp256k1.PointStruct,
    overrides?: CallOverrides
  ): Promise<string>;

  recover(
    msghash: PromiseOrValue<BytesLike>,
    v: PromiseOrValue<BigNumberish>,
    r: PromiseOrValue<BigNumberish>,
    s: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<Secp256k1.PointStructOutput>;

  sign(
    msghash: PromiseOrValue<BytesLike>,
    privkey: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<[number, BigNumber, BigNumber]>;

  signCrossChainTransaction(
    operation: IWallet.ECDSAExecStruct,
    privateKey: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      pubkeyX: BigNumber;
      pubkeyY: BigNumber;
      out_e: BigNumber;
      out_s: BigNumber;
    }
  >;

  callStatic: {
    CreateProof(
      secret: PromiseOrValue<BigNumberish>,
      message: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        pubkeyX: BigNumber;
        pubkeyY: BigNumber;
        out_e: BigNumber;
        out_s: BigNumber;
      }
    >;

    NN(overrides?: CallOverrides): Promise<BigNumber>;

    PrivDerive(
      secret_key: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    PubDerive(
      pubkey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { pubkeyX: BigNumber; pubkeyY: BigNumber }
    >;

    SharedSecret(
      my_secret: PromiseOrValue<BigNumberish>,
      their_public: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { xPX: BigNumber; xPY: BigNumber }>;

    VerifyProof(
      pubkey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      message: PromiseOrValue<BigNumberish>,
      s: PromiseOrValue<BigNumberish>,
      e: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    deriveAddress(
      pubkey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      overrides?: CallOverrides
    ): Promise<string>;

    deterministicGenerateK(
      msghash: PromiseOrValue<BytesLike>,
      priv: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    generateMessagePoint(
      sender: PromiseOrValue<string>,
      operation: IWallet.ECDSAExecStruct,
      nonce: PromiseOrValue<BigNumberish>,
      timestamp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    hmacSha256(
      key: PromiseOrValue<BytesLike>,
      message: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    publicKeyToAddress(
      publicKey: Secp256k1.PointStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    recover(
      msghash: PromiseOrValue<BytesLike>,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BigNumberish>,
      s: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<Secp256k1.PointStructOutput>;

    sign(
      msghash: PromiseOrValue<BytesLike>,
      privkey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[number, BigNumber, BigNumber]>;

    signCrossChainTransaction(
      operation: IWallet.ECDSAExecStruct,
      privateKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        pubkeyX: BigNumber;
        pubkeyY: BigNumber;
        out_e: BigNumber;
        out_s: BigNumber;
      }
    >;
  };

  filters: {};

  estimateGas: {
    CreateProof(
      secret: PromiseOrValue<BigNumberish>,
      message: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    NN(overrides?: CallOverrides): Promise<BigNumber>;

    PrivDerive(
      secret_key: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    PubDerive(
      pubkey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    SharedSecret(
      my_secret: PromiseOrValue<BigNumberish>,
      their_public: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    VerifyProof(
      pubkey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      message: PromiseOrValue<BigNumberish>,
      s: PromiseOrValue<BigNumberish>,
      e: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    deriveAddress(
      pubkey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    deterministicGenerateK(
      msghash: PromiseOrValue<BytesLike>,
      priv: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    generateMessagePoint(
      sender: PromiseOrValue<string>,
      operation: IWallet.ECDSAExecStruct,
      nonce: PromiseOrValue<BigNumberish>,
      timestamp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hmacSha256(
      key: PromiseOrValue<BytesLike>,
      message: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    publicKeyToAddress(
      publicKey: Secp256k1.PointStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    recover(
      msghash: PromiseOrValue<BytesLike>,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BigNumberish>,
      s: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sign(
      msghash: PromiseOrValue<BytesLike>,
      privkey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    signCrossChainTransaction(
      operation: IWallet.ECDSAExecStruct,
      privateKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    CreateProof(
      secret: PromiseOrValue<BigNumberish>,
      message: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    NN(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    PrivDerive(
      secret_key: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    PubDerive(
      pubkey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SharedSecret(
      my_secret: PromiseOrValue<BigNumberish>,
      their_public: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    VerifyProof(
      pubkey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      message: PromiseOrValue<BigNumberish>,
      s: PromiseOrValue<BigNumberish>,
      e: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    deriveAddress(
      pubkey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    deterministicGenerateK(
      msghash: PromiseOrValue<BytesLike>,
      priv: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    generateMessagePoint(
      sender: PromiseOrValue<string>,
      operation: IWallet.ECDSAExecStruct,
      nonce: PromiseOrValue<BigNumberish>,
      timestamp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hmacSha256(
      key: PromiseOrValue<BytesLike>,
      message: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    publicKeyToAddress(
      publicKey: Secp256k1.PointStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    recover(
      msghash: PromiseOrValue<BytesLike>,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BigNumberish>,
      s: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sign(
      msghash: PromiseOrValue<BytesLike>,
      privkey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    signCrossChainTransaction(
      operation: IWallet.ECDSAExecStruct,
      privateKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}