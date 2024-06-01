import Head from "next/head";
import Link from "next/link";
import { CopyIcon } from "@pancakeswap/uikit";
import { useCallback, useMemo, useState } from "react";
import {
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useSignTypedData,
  useSwitchNetwork,
} from "wagmi";
import { SmartWalletRouter } from "@eth-dub-2024/router-sdk";
import { useQuery } from "@tanstack/react-query";
import { type Currency, CurrencyAmount } from "@pancakeswap/sdk";
import { type Asset, assets, assetsBaseConfig } from "~/lib/assets";
import { useTokenBalance } from "~/hooks/useBalance";
import type { TransactionReceipt } from "viem";

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
  const { address, isConnecting } = useAccount();
  const chainId = useChainId();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const primaryColor = "bg-indigo-600";
  const secondaryColor = "bg-indigo-400";

  const { switchNetwork } = useSwitchNetwork();

  const { signTypedDataAsync } = useSignTypedData();

  const [txState, setTXState] = useState<ConfirmModalState>(
    ConfirmModalState.REVIEWING,
  );

  const [tx, setTx] = useState<TransactionReceipt | undefined>(undefined);
  const [inputValue, setInputValue] = useState("");
  const [asset, setAsset] = useState<Currency>(assetsBaseConfig.CAKE);
  const [toAsset, setToAsset] = useState<Currency>(assetsBaseConfig.BUSD);
  const [feeAsset, setFeeAsset] = useState<Currency>(assetsBaseConfig.CAKE);

  const assetBalance = useTokenBalance(asset.wrapped.address, address!);
  const feeBalance = useTokenBalance(feeAsset.wrapped.address);

  const formatAssetBalance = useMemo(
    () => assetBalance.balance.shiftedBy(-asset.decimals).toFixed(3),
    [assetBalance, asset],
  );

  const formatFeeBalance = useMemo(
    () => feeBalance.balance.shiftedBy(-feeAsset.decimals).toFixed(3),
    [feeBalance, feeAsset],
  );
  const amount = useMemo(
    () =>
      CurrencyAmount.fromRawAmount(
        asset,
        Number(inputValue) * 10 ** asset.decimals,
      ),
    [asset, inputValue],
  );

  const handleAssetChange = useCallback(
    (
      e: React.ChangeEvent<HTMLSelectElement>,
      setFunction: React.Dispatch<React.SetStateAction<Currency>>,
    ) => {
      const newAsset = assetsBaseConfig[e.target.value as Asset];
      setFunction(newAsset);
    },
    [],
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
      return SmartWalletRouter.getUserSmartWalletDetails(address, chainId);
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(address && chainId),
  });

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
      ) : (
        <div className="mx-auto mt-[200px] w-[600px] items-center">
          <div className="">
            <span className="font-medium text-gray-700">
              Your Smart Wallet Address
            </span>
            <div className="mt-1 flex">
              <span className="flex h-14  grow items-center justify-between rounded-md bg-gray-100 px-6">
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
            {/* <SliderToggleButton /> */}
            <div className="w-full">
              {/* <SliderToggleButton /> */}

              <div className="relative my-2 flex w-full items-center rounded-md bg-gray-100 focus-within:bg-gray-200">
                <select
                  className="absolute h-14 grow rounded-md bg-transparent pl-6 pr-12 outline-none "
                  value={asset.symbol}
                  onChange={(e) => handleAssetChange(e, setAsset)}
                >
                  {Object.entries(assets).map(([k], i) => {
                    return <option key={`${k}`}>{k}</option>;
                  })}
                </select>
                <input
                  type="number"
                  className="h-14 grow rounded-md bg-gray-100 px-6 text-right outline-none focus:bg-gray-200"
                  value={inputValue}
                  placeholder="enter an amount to swap"
                  onChange={handleAmount}
                  required
                />
              </div>
              <div className="relative my-2 flex w-full items-center rounded-md bg-gray-100 focus-within:bg-gray-200">
                <select
                  className="absolute h-14 grow rounded-md bg-transparent pl-6 pr-12 outline-none "
                  value={feeAsset.symbol}
                  onChange={(e) => handleAssetChange(e, setFeeAsset)}
                >
                  {Object.entries(assets).map(([k], i) => {
                    return <option key={`2-${k}`}>{k}</option>;
                  })}
                </select>
                <input
                  type="number"
                  className="h-14 flex-1 grow rounded-md bg-gray-100 px-6 text-right outline-none focus:bg-gray-200"
                  value={
                    // fees ? Number(fees?.gasCost?.toExact()).toFixed(5) : ""
                    ""
                  }
                  placeholder="choose your fee asset"
                  disabled
                />
              </div>

              <div className="relative my-2 flex w-full items-center rounded-md bg-gray-100 focus-within:bg-gray-200">
                <select
                  className="absolute h-14 grow rounded-md bg-transparent pl-6 pr-12 outline-none "
                  value={toAsset.symbol}
                  onChange={(e) => handleAssetChange(e, setToAsset)}
                >
                  {Object.entries(assets).map(([k], i) => {
                    return <option key={`3-${k}`}>{k}</option>;
                  })}
                </select>
                <input
                  type="number"
                  className="h-14 flex-1 grow rounded-md bg-gray-100 px-6 text-right outline-none focus:bg-gray-200"
                  value={
                    // trade
                    //   ? Number(trade?.outputAmount?.toExact()).toFixed(5)
                    //   : ""
                    ""
                  }
                  placeholder="you recieve 0.00"
                  disabled
                />
              </div>
              {/* <TransactionCard
              tx={tx}
              txState={txState}
              asset={asset}
              toAsset={toAsset}
              feeAsset={feeAsset}
              fees={fees as never}
              trade={trade}
              inputValue={inputValue}
            /> */}

              <div className="my-2 flex w-full items-center">
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button
                  className={`my-2 w-full rounded-md ${primaryColor} py-4 font-medium text-white hover:${secondaryColor}`}
                  // onClick={swap}
                  onClick={() => null}
                >
                  <div className=" flex w-full items-center justify-center">
                    <p className="mx-2 text-gray-300">
                      {/* {allowance?.t0Allowance.needsApproval
                      ? "Approve Smart Router"
                      : transactionStatusDisplay} */}
                      Action
                    </p>
                    {/* <LoadingSpinner
                    opacity={
                      (txState !== ConfirmModalState.COMPLETED &&
                        txState !== ConfirmModalState.REVIEWING) ||
                      isFetching ||
                      isLoading
                        ? 1
                        : 0
                    }
                    size="24px"
                  /> */}
                  </div>
                </button>
              </div>
              <div className="mb-2 flex w-full justify-between">
                <div className="bold   text-ml">{`Your ${asset.symbol} Balance`}</div>
                <div className="overflow-ellipsis text-[17px]   ">
                  {`${formatAssetBalance} ${asset.symbol}`}
                </div>
              </div>
              {feeAsset.symbol !== asset.symbol && (
                <div className="mb-2 flex w-full justify-between">
                  <div className="bold  text-ml">{`Your ${feeAsset.symbol} Balance`}</div>
                  <div className="overflow-ellipsis text-[17px]  ">
                    {`${formatFeeBalance} ${feeAsset.symbol}`}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
