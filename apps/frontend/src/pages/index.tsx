import {
  Deployments,
  RouterTradeType,
  SmartWalletRouter,
} from "@eth-dub-2024/router-sdk";
import { defaultAbiCoder } from "@ethersproject/abi";
import { CurrencyAmount, type Currency } from "@pancakeswap/sdk";
import { CopyIcon } from "@pancakeswap/uikit";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  TransactionRejectedRpcError,
  UserRejectedRequestError,
  type TransactionReceipt,
} from "viem";
import {
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useNetwork,
  useSignTypedData,
  useSwitchNetwork,
} from "wagmi";
import { ChainId } from "@pancakeswap/chains";

import { useTokenBalance } from "~/hooks/useBalance";
import { useSmartRouterBestTrade } from "~/hooks/useSmartRouterBestTrade";
import { useTheme } from "~/hooks/useTheme";
import {
  assetsBaseConfig,
  feeAssets,
  fromAssets,
  toAssets,
} from "~/lib/assets";
import { getSmartWalletOptions } from "~/utils/getSmartWalletOptions";
import { wagmiconfig } from "./_app";
import useDebounce from "~/hooks/useDebounce";

export enum ConfirmModalState {
  REVIEWING = -1,
  APPROVING_TOKEN = 0,
  PERMITTING = 1,
  PENDING_CONFIRMATION = 2,
  SIGNED = 3,
  EXECUTING = 4,
  COMPLETED = 5,
  FAILED = 6,
}

export default function Home() {
  const { chain: currenChain } = useNetwork();

  const { address, isConnecting, isConnected } = useAccount();
  const chainId = useChainId();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const { switchNetwork } = useSwitchNetwork();

  const { signTypedDataAsync } = useSignTypedData();

  const [txState, setTXState] = useState<ConfirmModalState>(
    ConfirmModalState.REVIEWING,
  );

  const [tx, setTx] = useState<TransactionReceipt | undefined>(undefined);
  const [inputValue, setInputValue] = useState("");
  const [asset] = useState<Currency>(assetsBaseConfig.CAKE);
  const [toAsset] = useState<Currency>(assetsBaseConfig.BUSD);
  const [feeAsset] = useState<Currency>(assetsBaseConfig.CAKE);

  const assetBalance = useTokenBalance(asset.wrapped.address);
  const toAssetBalance = useTokenBalance(toAsset.wrapped.address);

  const { transactionStatusDisplay, primaryColor, secondaryColor } = useTheme(
    txState,
    asset,
    toAsset,
  );

  const formatAssetBalance = useMemo(
    () => assetBalance.balance.shiftedBy(-asset.decimals).toFixed(3),
    [assetBalance, asset],
  );

  const formatToAssetBalance = useMemo(
    () => toAssetBalance.balance.shiftedBy(-toAsset.decimals).toFixed(3),
    [toAssetBalance, toAsset],
  );
  const amount = useMemo(
    () =>
      CurrencyAmount.fromRawAmount(
        asset,
        Number(inputValue) * 10 ** asset.decimals,
      ),
    [asset, inputValue],
  );

  const handleAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (txState === ConfirmModalState.COMPLETED) {
        setTXState(ConfirmModalState.REVIEWING);
      }
      setInputValue(e.target.value);
    },
    [txState],
  );

  const { data: smartWalletDetails, refetch } = useQuery({
    queryKey: ["smartWalletDetails", address, chainId ?? 0],
    queryFn: async () => {
      if (!address || !chainId) return;
      return SmartWalletRouter.getUserSmartWalletDetails(
        address,
        chainId,
        RouterTradeType.SmartWalletTradeWithPermit2,
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(address && chainId),
  });

  const { data: allowance, refetch: refetchAlloance } = useQuery({
    queryKey: [
      "allowance-query",
      chainId,
      asset.symbol,
      feeAsset.symbol,
      address,
      chainId,
    ],
    queryFn: async () => {
      if (
        !asset ||
        !chainId ||
        !address ||
        !smartWalletDetails ||
        !amount ||
        !feeAsset
      )
        return undefined;

      return SmartWalletRouter.getContractAllowance(
        [asset.wrapped.address, feeAsset.wrapped.address],
        address,
        smartWalletDetails?.address,
        chainId,
        amount.quotient,
      );
    },

    refetchInterval: 20000,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(
      address && asset && chainId && smartWalletDetails && amount,
    ),
  });
  const deferQuotientRaw = useDeferredValue(amount.quotient.toString());
  const deferQuotient = useDebounce(deferQuotientRaw, 500);
  const {
    data: trade,
    isLoading,
    isFetching,
  } = useSmartRouterBestTrade({
    toAsset: toAsset,
    fromAsset: asset,
    chainId,
    account: address,
    amount: amount,
  });

  const { data: fees } = useQuery({
    queryKey: [
      "fees-query",
      chainId,
      asset.symbol,
      toAsset.symbol,
      feeAsset.symbol,
    ],
    queryFn: async () => {
      if (!chainId || !deferQuotient || !feeAsset) return undefined;

      return SmartWalletRouter.estimateSmartWalletFees({
        feeAsset: feeAsset.symbol,
        inputCurrency: asset,
        outputCurrency: toAsset,
        chainId,
      });
    },

    refetchInterval: 10000,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(asset && toAsset && trade && chainId && feeAsset),
  });

  const swapCallParams = useMemo(() => {
    if (!trade || !chainId || !allowance || !smartWalletDetails || !address)
      return undefined;

    const options = getSmartWalletOptions(
      address,
      true,
      allowance,
      smartWalletDetails as never,
      chainId,
      {
        inputAsset: asset.wrapped.address,
        feeAsset: feeAsset.wrapped.address,
        outputAsset: toAsset.wrapped.address,
      },
    );
    return SmartWalletRouter.buildSmartWalletTrade(trade, options);
  }, [
    trade,
    address,
    chainId,
    allowance,
    smartWalletDetails,
    toAsset,
    asset,
    feeAsset,
  ]);

  const swap = useCallback(async () => {
    setTx(undefined);
    if (!swapCallParams || !address || !allowance) return;

    const windowClient = await wagmiconfig.connector?.getWalletClient();
    const externalOps = swapCallParams.externalUserOps;

    if (externalOps.length > 0) {
      setTXState(ConfirmModalState.APPROVING_TOKEN);
      for (const externalOp of externalOps) {
        await SmartWalletRouter.sendTransactionFromRelayer(
          chainId,
          externalOp as never,
          {
            externalClient: windowClient as any,
          },
        );
      }
    }
    setTXState(ConfirmModalState.PERMITTING);
    const { domain, types, values } = swapCallParams.smartWalletTypedData;

    await signTypedDataAsync({
      account: address,
      domain,
      types,
      message: values,
      primaryType: "ECDSAExec",
    })
      .then(async (signature) => {
        setTXState(ConfirmModalState.SIGNED);
        const signatureEncoded = defaultAbiCoder.encode(
          ["uint256", "bytes"],
          [chainId, signature],
        );

        if (values.nonce === 0n) {
          const walletDeploymentOp =
            await SmartWalletRouter.encodeWalletCreationOp(
              [address],
              Deployments?.[chainId]!.ECDSAWalletFactory as any,
            );

          const response = await SmartWalletRouter.sendTransactionFromRelayer(
            chainId,
            walletDeploymentOp as any,
          );
          console.log(response);
        }
        const tradeEncoded = await SmartWalletRouter.encodeSmartRouterTrade(
          [values, signatureEncoded as any],
          smartWalletDetails?.address!,
          chainId,
        );
        console.log(tradeEncoded, values);

        await Promise.resolve(() =>
          setTimeout(() => setTXState(ConfirmModalState.EXECUTING), 500),
        );
        let response = null;
        if (
          swapCallParams.config.SmartWalletTradeType ===
            RouterTradeType.SmartWalletTradeWithPermit2 ||
          swapCallParams.config.SmartWalletTradeType ===
            RouterTradeType.SmartWalletNeonEvmTrade
        ) {
          response = await SmartWalletRouter.sendTransactionFromRelayer(
            chainId,
            tradeEncoded as any,
          );
        } else {
          response = await SmartWalletRouter.sendTransactionFromRelayer(
            chainId,
            tradeEncoded as any,
            {
              externalClient: windowClient as any,
            },
          );
        }
        setTx(response as any);
        setTXState(ConfirmModalState.COMPLETED);
        refetch();
        console.log(response);
        return response as TransactionReceipt;
      })
      .catch((err: unknown) => {
        console.log(err);
        setTXState(ConfirmModalState.FAILED);
        if (err instanceof UserRejectedRequestError) {
          throw new TransactionRejectedRpcError(Error("Transaction rejected"));
        }
        throw new Error(`Swap Failed ${err as string}`);
      })
      .catch(() => setTXState(ConfirmModalState.FAILED));
  }, [
    swapCallParams,
    address,
    signTypedDataAsync,
    chainId,
    allowance,
    smartWalletDetails,
  ]);

  useEffect(() => {
    if (txState === ConfirmModalState.FAILED) {
      setTx(undefined);
      const i = setTimeout(
        () => setTXState(ConfirmModalState.REVIEWING),
        40000,
      );
      return () => clearTimeout(i);
    }
  }, [txState]);

  const router = useRouter();

  const navigateTo = (path: any) => {
    router.push(path);
  };

  return (
    <div className="-m-[100px] flex grid h-screen items-center justify-center">
      {!address ? (
        // biome-ignore lint/a11y/useButtonType: <explanation>
        <button
          className={`rounded-md ${"bg-indigo-600"} py-4 font-medium text-white hover:${secondaryColor}`}
          onClick={() => connect({ connector: connectors[0] })}
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : isConnected && currenChain?.id !== 97 ? (
        // biome-ignore lint/a11y/useButtonType: <explanation>
        <button
          className={`rounded-md ${"bg-indigo-600"} py-4 font-medium text-white hover:${secondaryColor}`}
          onClick={() => switchNetwork?.(97)}
        >
          {"Switch to Bsc Testnet"}
        </button>
      ) : !address ? (
        // biome-ignore lint/a11y/useButtonType: <explanation>
        <button
          className={`rounded-md ${"bg-indigo-600"} py-4 font-medium text-white hover:${secondaryColor}`}
          onClick={() => connect({ connector: connectors[0] })}
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <div className="mx-auto mb-[50px] mt-[200px] w-[600px] items-center">
          <div className="mb-4 flex w-full justify-between">
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              className={`mx-1 w-full rounded-md ${primaryColor} px-4 py-2 font-medium text-white hover:${secondaryColor}`}
              onClick={() => navigateTo("/solana-swap")}
            >
              Solana Swap
            </button>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              className={`mx-1 w-full rounded-md ${primaryColor} px-4 py-2 font-medium text-white hover:${secondaryColor}`}
              onClick={() => navigateTo("/cross-chain-swap")}
            >
              Cross-Chain Swap
            </button>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              className={`mx-1 w-full rounded-md ${primaryColor} px-4 py-2 font-medium text-white hover:${secondaryColor}`}
              onClick={() => navigateTo("/solana-cross-chain-swap")}
            >
              Solana Cross-Chain
            </button>
          </div>

          <div className="">
            <span className="font-medium text-gray-700">
              Your Smart Wallet Address
            </span>
            <div className="mt-1 flex">
              <span className="flex h-14 grow items-center justify-between rounded-md bg-gray-100 px-6">
                {smartWalletDetails?.address}
                <CopyIcon
                  className="ml-2 hover:cursor-pointer"
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      smartWalletDetails?.address as string,
                    );
                  }}
                />
              </span>
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button
                className={`ml-2 rounded-md ${primaryColor} px-4 py-4 font-medium text-white hover:${secondaryColor}`}
                onClick={() => disconnect()}
              >
                Disconnect
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <div className="w-full">
              <div className="relative my-2 flex w-full items-center rounded-md bg-gray-100 focus-within:bg-gray-200">
                <select
                  className="absolute h-14 grow rounded-md bg-transparent pl-6 pr-12 outline-none"
                  value={asset.symbol}
                  onChange={(e) => null}
                >
                  {Object.entries(fromAssets).map(([k], i) => {
                    return <option key={`${k}`}>{k}</option>;
                  })}
                </select>
                <input
                  type="number"
                  className="h-14 grow rounded-md bg-gray-100 px-6 text-right outline-none focus:bg-gray-200"
                  value={inputValue}
                  placeholder="Enter an amount to swap"
                  onChange={handleAmount}
                  required
                />
              </div>

              <div className="relative my-2 flex w-full items-center rounded-md bg-gray-100 focus-within:bg-gray-200">
                <select
                  className="absolute h-14 grow rounded-md bg-transparent pl-6 pr-12 outline-none"
                  value={feeAsset.symbol}
                  onChange={(e) => null}
                >
                  {Object.entries(feeAssets).map(([k], i) => {
                    return <option key={`2-${k}`}>{k}</option>;
                  })}
                </select>
                <input
                  type="number"
                  className="h-14 flex-1 grow rounded-md bg-gray-100 px-6 text-right outline-none focus:bg-gray-200"
                  value={
                    fees ? Number(fees?.gasCost?.toExact()).toFixed(5) : ""
                  }
                  placeholder="Choose your fee asset"
                  disabled
                />
              </div>

              <div className="relative my-2 flex w-full items-center rounded-md bg-gray-100 focus-within:bg-gray-200">
                <select
                  className="absolute h-14 grow rounded-md bg-transparent pl-6 pr-12 outline-none"
                  value={toAsset.symbol}
                  onChange={(e) => null}
                >
                  {Object.entries(toAssets).map(([k], i) => {
                    return <option key={`3-${k}`}>{k}</option>;
                  })}
                </select>
                <input
                  type="number"
                  className="h-14 flex-1 grow rounded-md bg-gray-100 px-6 text-right outline-none focus:bg-gray-200"
                  value={
                    trade
                      ? Number(trade?.outputAmount?.toExact()).toFixed(5)
                      : ""
                  }
                  placeholder="You receive 0.00"
                  disabled
                />
              </div>

              <div className="my-2 flex w-full items-center">
                <button
                  className={`my-2 w-full rounded-md ${primaryColor} py-4 font-medium text-white hover:${secondaryColor}`}
                  onClick={swap}
                >
                  <div className="flex w-full items-center justify-center">
                    <p className="mx-2 text-gray-300">
                      {allowance?.t0Allowance.needsApproval
                        ? "Approve Smart Router"
                        : transactionStatusDisplay}
                    </p>
                  </div>
                </button>
              </div>

              <div className="mb-2 flex w-full justify-between">
                <div className="bold text-ml">{`Your ${asset.symbol} Balance`}</div>
                <div className="overflow-ellipsis text-[17px]">{`${formatAssetBalance} ${asset.symbol}`}</div>
              </div>

              <div className="mb-2 flex w-full justify-between">
                <div className="bold text-ml">{`Your ${toAsset.symbol} Balance`}</div>
                <div className="overflow-ellipsis text-[17px]">{`${formatToAssetBalance} ${toAsset.symbol}`}</div>
              </div>

              <div className="bold text-ml">{tx?.transactionHash}</div>
            </div>
            <button
              className={`rounded-md ${"bg-indigo-600"} py-4 font-medium text-white hover:${secondaryColor}`}
              onClick={async () =>
                await SmartWalletRouter.encodeTransferToRelayer(
                  [address, (10n * 10n ** 18n) as any],
                  "0x6F451Eb92d7dE92DdF6939d9eFCE6799246B3a4b",
                  ChainId.BSC_TESTNET,
                )
              }
            >
              {"Get Test BUSD"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
