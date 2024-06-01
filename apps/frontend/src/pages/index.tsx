import Head from "next/head";
import Link from "next/link";
import { CopyIcon } from "@pancakeswap/uikit";
import { useCallback } from "react";

export default function Home() {
  const address = "0x0000000000";
  const isConnected = false;
  const smartWalletDetails = { address: "0x0000000000" };
  const primaryColor = "bg-indigo-600";
  const secondaryColor = "bg-indigo-400";

  const feeAsset = { symbol: "USDT" };
  const asset = { symbol: "CAKE" };
  const toAsset = { symbol: "WBNB" };
  const inputValue = 0;
  const formatFeeBalance = 0;
  const formatAssetBalance = 0;

  const handleAmount = useCallback(() => {}, []);

  return (
    <div className="-m-[100px] flex grid h-screen items-center justify-center">
      {!address ? (
        // biome-ignore lint/a11y/useButtonType: <explanation>
        <button
          className={`rounded-md ${"bg-indigo-600"} py-4 font-medium text-white hover:${secondaryColor}`}
          // onClick={() => connect({ connector: connectors[0] })}
          onClick={() => null}
        >
          {!isConnected ? "Connecting..." : "Connect Wallet"}
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
                // onClick={() => disconnect()}
                onClick={() => null}
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
                  // onChange={(e) => handleAssetChange(e, setAsset)}
                  onChange={(e) => null}
                >
                  {/* {Object.entries(assets).map(([k], i) => {
                  return <option key={`${k}`}>{k}</option>;
                })} */}
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
                  // onChange={(e) => handleAssetChange(e, setFeeAsset)}
                >
                  {/* {Object.entries(assets).map(([k], i) => {
                  return <option key={`2-${k}`}>{k}</option>;
                })} */}
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
                  // onChange={(e) => handleAssetChange(e, setToAsset)}
                >
                  {/* {Object.entries(assets).map(([k], i) => {
                  return <option key={`3-${k}`}>{k}</option>;
                })} */}
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
                      Approve Smart Router
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
