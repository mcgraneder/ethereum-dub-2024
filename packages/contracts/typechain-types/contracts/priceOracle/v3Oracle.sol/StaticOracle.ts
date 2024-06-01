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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface StaticOracleInterface extends utils.Interface {
  functions: {
    "CARDINALITY_PER_MINUTE()": FunctionFragment;
    "PANCAKESWAP_V3_FACTORY()": FunctionFragment;
    "addNewFeeTier(uint24)": FunctionFragment;
    "getAllPoolsForPair(address,address)": FunctionFragment;
    "isPairSupported(address,address)": FunctionFragment;
    "prepareAllAvailablePoolsWithCardinality(address,address,uint16)": FunctionFragment;
    "prepareAllAvailablePoolsWithTimePeriod(address,address,uint32)": FunctionFragment;
    "prepareSpecificFeeTiersWithCardinality(address,address,uint24[],uint16)": FunctionFragment;
    "prepareSpecificFeeTiersWithTimePeriod(address,address,uint24[],uint32)": FunctionFragment;
    "prepareSpecificPoolsWithCardinality(address[],uint16)": FunctionFragment;
    "prepareSpecificPoolsWithTimePeriod(address[],uint32)": FunctionFragment;
    "quoteAllAvailablePoolsWithOffsettedTimePeriod(uint128,address,address,uint32,uint32)": FunctionFragment;
    "quoteAllAvailablePoolsWithTimePeriod(uint128,address,address,uint32)": FunctionFragment;
    "quoteSpecificFeeTiersWithOffsettedTimePeriod(uint128,address,address,uint24[],uint32,uint32)": FunctionFragment;
    "quoteSpecificFeeTiersWithTimePeriod(uint128,address,address,uint24[],uint32)": FunctionFragment;
    "quoteSpecificPoolsWithOffsettedTimePeriod(uint128,address,address,address[],uint32,uint32)": FunctionFragment;
    "quoteSpecificPoolsWithTimePeriod(uint128,address,address,address[],uint32)": FunctionFragment;
    "supportedFeeTiers()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "CARDINALITY_PER_MINUTE"
      | "PANCAKESWAP_V3_FACTORY"
      | "addNewFeeTier"
      | "getAllPoolsForPair"
      | "isPairSupported"
      | "prepareAllAvailablePoolsWithCardinality"
      | "prepareAllAvailablePoolsWithTimePeriod"
      | "prepareSpecificFeeTiersWithCardinality"
      | "prepareSpecificFeeTiersWithTimePeriod"
      | "prepareSpecificPoolsWithCardinality"
      | "prepareSpecificPoolsWithTimePeriod"
      | "quoteAllAvailablePoolsWithOffsettedTimePeriod"
      | "quoteAllAvailablePoolsWithTimePeriod"
      | "quoteSpecificFeeTiersWithOffsettedTimePeriod"
      | "quoteSpecificFeeTiersWithTimePeriod"
      | "quoteSpecificPoolsWithOffsettedTimePeriod"
      | "quoteSpecificPoolsWithTimePeriod"
      | "supportedFeeTiers"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "CARDINALITY_PER_MINUTE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PANCAKESWAP_V3_FACTORY",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addNewFeeTier",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllPoolsForPair",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isPairSupported",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "prepareAllAvailablePoolsWithCardinality",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "prepareAllAvailablePoolsWithTimePeriod",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "prepareSpecificFeeTiersWithCardinality",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "prepareSpecificFeeTiersWithTimePeriod",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "prepareSpecificPoolsWithCardinality",
    values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "prepareSpecificPoolsWithTimePeriod",
    values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "quoteAllAvailablePoolsWithOffsettedTimePeriod",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "quoteAllAvailablePoolsWithTimePeriod",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "quoteSpecificFeeTiersWithOffsettedTimePeriod",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "quoteSpecificFeeTiersWithTimePeriod",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "quoteSpecificPoolsWithOffsettedTimePeriod",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "quoteSpecificPoolsWithTimePeriod",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "supportedFeeTiers",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "CARDINALITY_PER_MINUTE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PANCAKESWAP_V3_FACTORY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addNewFeeTier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllPoolsForPair",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isPairSupported",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "prepareAllAvailablePoolsWithCardinality",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "prepareAllAvailablePoolsWithTimePeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "prepareSpecificFeeTiersWithCardinality",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "prepareSpecificFeeTiersWithTimePeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "prepareSpecificPoolsWithCardinality",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "prepareSpecificPoolsWithTimePeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "quoteAllAvailablePoolsWithOffsettedTimePeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "quoteAllAvailablePoolsWithTimePeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "quoteSpecificFeeTiersWithOffsettedTimePeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "quoteSpecificFeeTiersWithTimePeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "quoteSpecificPoolsWithOffsettedTimePeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "quoteSpecificPoolsWithTimePeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportedFeeTiers",
    data: BytesLike
  ): Result;

  events: {};
}

export interface StaticOracle extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: StaticOracleInterface;

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
    CARDINALITY_PER_MINUTE(overrides?: CallOverrides): Promise<[number]>;

    PANCAKESWAP_V3_FACTORY(overrides?: CallOverrides): Promise<[string]>;

    addNewFeeTier(
      _feeTier: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAllPoolsForPair(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    isPairSupported(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    prepareAllAvailablePoolsWithCardinality(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      _cardinality: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    prepareAllAvailablePoolsWithTimePeriod(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      _period: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    prepareSpecificFeeTiersWithCardinality(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      _feeTiers: PromiseOrValue<BigNumberish>[],
      _cardinality: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    prepareSpecificFeeTiersWithTimePeriod(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      _feeTiers: PromiseOrValue<BigNumberish>[],
      _period: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    prepareSpecificPoolsWithCardinality(
      _pools: PromiseOrValue<string>[],
      _cardinality: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    prepareSpecificPoolsWithTimePeriod(
      _pools: PromiseOrValue<string>[],
      _period: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    quoteAllAvailablePoolsWithOffsettedTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _period: PromiseOrValue<BigNumberish>,
      _offset: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string[]] & {
        _quoteAmount: BigNumber;
        _queriedPools: string[];
      }
    >;

    quoteAllAvailablePoolsWithTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _period: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string[]] & {
        _quoteAmount: BigNumber;
        _queriedPools: string[];
      }
    >;

    quoteSpecificFeeTiersWithOffsettedTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _feeTiers: PromiseOrValue<BigNumberish>[],
      _period: PromiseOrValue<BigNumberish>,
      _offset: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string[]] & {
        _quoteAmount: BigNumber;
        _queriedPools: string[];
      }
    >;

    quoteSpecificFeeTiersWithTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _feeTiers: PromiseOrValue<BigNumberish>[],
      _period: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string[]] & {
        _quoteAmount: BigNumber;
        _queriedPools: string[];
      }
    >;

    quoteSpecificPoolsWithOffsettedTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _pools: PromiseOrValue<string>[],
      _period: PromiseOrValue<BigNumberish>,
      _offset: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { _quoteAmount: BigNumber }>;

    quoteSpecificPoolsWithTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _pools: PromiseOrValue<string>[],
      _period: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { _quoteAmount: BigNumber }>;

    supportedFeeTiers(overrides?: CallOverrides): Promise<[number[]]>;
  };

  CARDINALITY_PER_MINUTE(overrides?: CallOverrides): Promise<number>;

  PANCAKESWAP_V3_FACTORY(overrides?: CallOverrides): Promise<string>;

  addNewFeeTier(
    _feeTier: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAllPoolsForPair(
    _tokenA: PromiseOrValue<string>,
    _tokenB: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string[]>;

  isPairSupported(
    _tokenA: PromiseOrValue<string>,
    _tokenB: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  prepareAllAvailablePoolsWithCardinality(
    _tokenA: PromiseOrValue<string>,
    _tokenB: PromiseOrValue<string>,
    _cardinality: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  prepareAllAvailablePoolsWithTimePeriod(
    _tokenA: PromiseOrValue<string>,
    _tokenB: PromiseOrValue<string>,
    _period: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  prepareSpecificFeeTiersWithCardinality(
    _tokenA: PromiseOrValue<string>,
    _tokenB: PromiseOrValue<string>,
    _feeTiers: PromiseOrValue<BigNumberish>[],
    _cardinality: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  prepareSpecificFeeTiersWithTimePeriod(
    _tokenA: PromiseOrValue<string>,
    _tokenB: PromiseOrValue<string>,
    _feeTiers: PromiseOrValue<BigNumberish>[],
    _period: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  prepareSpecificPoolsWithCardinality(
    _pools: PromiseOrValue<string>[],
    _cardinality: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  prepareSpecificPoolsWithTimePeriod(
    _pools: PromiseOrValue<string>[],
    _period: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  quoteAllAvailablePoolsWithOffsettedTimePeriod(
    _baseAmount: PromiseOrValue<BigNumberish>,
    _baseToken: PromiseOrValue<string>,
    _quoteToken: PromiseOrValue<string>,
    _period: PromiseOrValue<BigNumberish>,
    _offset: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string[]] & { _quoteAmount: BigNumber; _queriedPools: string[] }
  >;

  quoteAllAvailablePoolsWithTimePeriod(
    _baseAmount: PromiseOrValue<BigNumberish>,
    _baseToken: PromiseOrValue<string>,
    _quoteToken: PromiseOrValue<string>,
    _period: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string[]] & { _quoteAmount: BigNumber; _queriedPools: string[] }
  >;

  quoteSpecificFeeTiersWithOffsettedTimePeriod(
    _baseAmount: PromiseOrValue<BigNumberish>,
    _baseToken: PromiseOrValue<string>,
    _quoteToken: PromiseOrValue<string>,
    _feeTiers: PromiseOrValue<BigNumberish>[],
    _period: PromiseOrValue<BigNumberish>,
    _offset: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string[]] & { _quoteAmount: BigNumber; _queriedPools: string[] }
  >;

  quoteSpecificFeeTiersWithTimePeriod(
    _baseAmount: PromiseOrValue<BigNumberish>,
    _baseToken: PromiseOrValue<string>,
    _quoteToken: PromiseOrValue<string>,
    _feeTiers: PromiseOrValue<BigNumberish>[],
    _period: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string[]] & { _quoteAmount: BigNumber; _queriedPools: string[] }
  >;

  quoteSpecificPoolsWithOffsettedTimePeriod(
    _baseAmount: PromiseOrValue<BigNumberish>,
    _baseToken: PromiseOrValue<string>,
    _quoteToken: PromiseOrValue<string>,
    _pools: PromiseOrValue<string>[],
    _period: PromiseOrValue<BigNumberish>,
    _offset: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  quoteSpecificPoolsWithTimePeriod(
    _baseAmount: PromiseOrValue<BigNumberish>,
    _baseToken: PromiseOrValue<string>,
    _quoteToken: PromiseOrValue<string>,
    _pools: PromiseOrValue<string>[],
    _period: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  supportedFeeTiers(overrides?: CallOverrides): Promise<number[]>;

  callStatic: {
    CARDINALITY_PER_MINUTE(overrides?: CallOverrides): Promise<number>;

    PANCAKESWAP_V3_FACTORY(overrides?: CallOverrides): Promise<string>;

    addNewFeeTier(
      _feeTier: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getAllPoolsForPair(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string[]>;

    isPairSupported(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    prepareAllAvailablePoolsWithCardinality(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      _cardinality: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string[]>;

    prepareAllAvailablePoolsWithTimePeriod(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      _period: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string[]>;

    prepareSpecificFeeTiersWithCardinality(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      _feeTiers: PromiseOrValue<BigNumberish>[],
      _cardinality: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string[]>;

    prepareSpecificFeeTiersWithTimePeriod(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      _feeTiers: PromiseOrValue<BigNumberish>[],
      _period: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string[]>;

    prepareSpecificPoolsWithCardinality(
      _pools: PromiseOrValue<string>[],
      _cardinality: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    prepareSpecificPoolsWithTimePeriod(
      _pools: PromiseOrValue<string>[],
      _period: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    quoteAllAvailablePoolsWithOffsettedTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _period: PromiseOrValue<BigNumberish>,
      _offset: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string[]] & {
        _quoteAmount: BigNumber;
        _queriedPools: string[];
      }
    >;

    quoteAllAvailablePoolsWithTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _period: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string[]] & {
        _quoteAmount: BigNumber;
        _queriedPools: string[];
      }
    >;

    quoteSpecificFeeTiersWithOffsettedTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _feeTiers: PromiseOrValue<BigNumberish>[],
      _period: PromiseOrValue<BigNumberish>,
      _offset: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string[]] & {
        _quoteAmount: BigNumber;
        _queriedPools: string[];
      }
    >;

    quoteSpecificFeeTiersWithTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _feeTiers: PromiseOrValue<BigNumberish>[],
      _period: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string[]] & {
        _quoteAmount: BigNumber;
        _queriedPools: string[];
      }
    >;

    quoteSpecificPoolsWithOffsettedTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _pools: PromiseOrValue<string>[],
      _period: PromiseOrValue<BigNumberish>,
      _offset: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    quoteSpecificPoolsWithTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _pools: PromiseOrValue<string>[],
      _period: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    supportedFeeTiers(overrides?: CallOverrides): Promise<number[]>;
  };

  filters: {};

  estimateGas: {
    CARDINALITY_PER_MINUTE(overrides?: CallOverrides): Promise<BigNumber>;

    PANCAKESWAP_V3_FACTORY(overrides?: CallOverrides): Promise<BigNumber>;

    addNewFeeTier(
      _feeTier: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAllPoolsForPair(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isPairSupported(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    prepareAllAvailablePoolsWithCardinality(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      _cardinality: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    prepareAllAvailablePoolsWithTimePeriod(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      _period: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    prepareSpecificFeeTiersWithCardinality(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      _feeTiers: PromiseOrValue<BigNumberish>[],
      _cardinality: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    prepareSpecificFeeTiersWithTimePeriod(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      _feeTiers: PromiseOrValue<BigNumberish>[],
      _period: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    prepareSpecificPoolsWithCardinality(
      _pools: PromiseOrValue<string>[],
      _cardinality: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    prepareSpecificPoolsWithTimePeriod(
      _pools: PromiseOrValue<string>[],
      _period: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    quoteAllAvailablePoolsWithOffsettedTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _period: PromiseOrValue<BigNumberish>,
      _offset: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    quoteAllAvailablePoolsWithTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _period: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    quoteSpecificFeeTiersWithOffsettedTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _feeTiers: PromiseOrValue<BigNumberish>[],
      _period: PromiseOrValue<BigNumberish>,
      _offset: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    quoteSpecificFeeTiersWithTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _feeTiers: PromiseOrValue<BigNumberish>[],
      _period: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    quoteSpecificPoolsWithOffsettedTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _pools: PromiseOrValue<string>[],
      _period: PromiseOrValue<BigNumberish>,
      _offset: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    quoteSpecificPoolsWithTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _pools: PromiseOrValue<string>[],
      _period: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    supportedFeeTiers(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    CARDINALITY_PER_MINUTE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    PANCAKESWAP_V3_FACTORY(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    addNewFeeTier(
      _feeTier: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAllPoolsForPair(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isPairSupported(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    prepareAllAvailablePoolsWithCardinality(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      _cardinality: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    prepareAllAvailablePoolsWithTimePeriod(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      _period: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    prepareSpecificFeeTiersWithCardinality(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      _feeTiers: PromiseOrValue<BigNumberish>[],
      _cardinality: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    prepareSpecificFeeTiersWithTimePeriod(
      _tokenA: PromiseOrValue<string>,
      _tokenB: PromiseOrValue<string>,
      _feeTiers: PromiseOrValue<BigNumberish>[],
      _period: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    prepareSpecificPoolsWithCardinality(
      _pools: PromiseOrValue<string>[],
      _cardinality: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    prepareSpecificPoolsWithTimePeriod(
      _pools: PromiseOrValue<string>[],
      _period: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    quoteAllAvailablePoolsWithOffsettedTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _period: PromiseOrValue<BigNumberish>,
      _offset: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    quoteAllAvailablePoolsWithTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _period: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    quoteSpecificFeeTiersWithOffsettedTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _feeTiers: PromiseOrValue<BigNumberish>[],
      _period: PromiseOrValue<BigNumberish>,
      _offset: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    quoteSpecificFeeTiersWithTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _feeTiers: PromiseOrValue<BigNumberish>[],
      _period: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    quoteSpecificPoolsWithOffsettedTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _pools: PromiseOrValue<string>[],
      _period: PromiseOrValue<BigNumberish>,
      _offset: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    quoteSpecificPoolsWithTimePeriod(
      _baseAmount: PromiseOrValue<BigNumberish>,
      _baseToken: PromiseOrValue<string>,
      _quoteToken: PromiseOrValue<string>,
      _pools: PromiseOrValue<string>[],
      _period: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    supportedFeeTiers(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}