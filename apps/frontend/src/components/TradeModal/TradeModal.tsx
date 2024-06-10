import type React from "react";
import {
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
  useMemo,
  useCallback,
  useDeferredValue,
} from "react";
import styled from "styled-components";
import EthereumLogo from "../../../public/svgs/assets/renETH.svg";
import { Settings, ChevronDown } from "react-feather";
// import UniswapLogoPink from "../../../public/svgs/";
// import UniswapLogo from "../../../public/svgs/assets/uniswapPink.svg";
import {
  UilAngleDown,
  UilArrowRight,
  UilSpinner,
  UilCopy,
} from "@iconscout/react-unicons";
import TokenSelectDropdown from "./ChainSelector";
import { Icon } from "../Icons/AssetLogs/Icon";
import {
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useNetwork,
  useSignTypedData,
  useSwitchNetwork,
} from "wagmi";
import { type Currency, CurrencyAmount } from "@pancakeswap/swap-sdk-core";
import { useTokenBalance } from "~/hooks/useBalance";
import { ChainId } from "@pancakeswap/chains";
import {
  Deployments,
  RouterTradeType,
  SmartWalletRouter,
} from "@eth-dub-2024/router-sdk";
import { isCancelledError, useQuery } from "@tanstack/react-query";
import useDebounce from "~/hooks/useDebounce";
import { useSmartRouterBestTrade } from "~/hooks/useSmartRouterBestTrade";
import { getSmartWalletOptions } from "~/utils/getSmartWalletOptions";
import { wagmiconfig } from "~/pages/_app";
import { defaultAbiCoder } from "@ethersproject/abi";
import {
  type TransactionReceipt,
  TransactionRejectedRpcError,
  UserRejectedRequestError,
} from "viem";
import { useRouter } from "next/router";
import { assetsBaseConfig } from "~/lib/assets";
import { useTheme } from "~/hooks/useTheme";
import type { AssetConfig } from "~/utils/assetsConfig";
import { ERC20Token } from "@pancakeswap/sdk";
import { useTransactionFlow } from "~/context/useTransactionFlowState";
import { BREAKPOINTS } from "../theme";
import meshSrc from "../../../public/images/Mesh.png";
import Image from "next/image";
import GreenDot from "../Icons/GreenDot";
import { SpinnerWrapper } from "../CSS/WalletModalStyles";
import { ChainIdToRenChain } from "~/utils/chains";
import { useNotification } from "~/context/useNotificationState";
import { shortenAddress } from "~/utils/misc";
import Link from "next/link";

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
const DARK_MODE_GRADIENT =
  "linear-gradient(94deg, rgba(2,20,28,0.8379945728291316) 32%, rgba(2,75,79,0.9500393907563025) 53%, rgba(29,138,191,1) 97%)";

const Banner = styled.div<{ isDarkMode: boolean }>`
  border-radius: 10px;
  margin-top: 15px;
  margin-bottom: 10px;
  margin-left: 3px;
  margin-right: 3px;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  width: 480px;
  box-shadow: 0px 10px 24px rgba(51, 53, 72, 0.04);
  background: rgb(92, 64, 26);
  background: ${DARK_MODE_GRADIENT};
  // max-width: 480px;

  /* @media screen and (min-width: ${BREAKPOINTS.lg}px) {
    height: 140px;
    flex-direction: row;
  } */
`;

const ProtocolBanner = ({ type }: { type: string }) => {
  return (
    <Banner>
      <Image alt="" src={meshSrc} className="absolute" />
      <div className="flex items-center">
        <span>Gas Setting</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <GreenDot />
        <span>{type}</span>
      </div>
    </Banner>
  );
};

export const GlowSecondary = styled.div`
  position: absolute;
  top: 40%;
  left: 35%;
  bottom: 0;
  background: radial-gradient(
    72.04% 72.04% at 50% 10.99%,
    #592e96 0%,
    rgba(166, 151, 255, 0) 100%
  );
  filter: blur(90px);
  z-index: -10;
  max-width: 500px;
  width: 100%;
  height: 60%;
`;
export const TokenAmountWrapper = styled.div`
  // width: 100%;
  height: ${(props: any) => props.height};
  background: rgb(36, 39, 54);
  border: 1.2px solid rgb(36, 39, 54);
  border-radius: 15px;
  margin-top: ${(props: any) => props.marginTop};
  padding-left: 15px;
  padding-right: 20px;

  &:hover {
    border: 1.2px solid rgb(61, 70, 87);
  }
`;

export const TokenAmount = styled.div`
  font-family: "Open Sans", sans-serif;
  height: 100%;
  font-size: ${(props: any) => props.size};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  float: ${(props: any) => props.float};
  color: White;
  line-height: ${(props: any) => props.lineHeight};
  margin-left: 5px;
`;

export const ImgWrapper = styled.div`
  padding-top: ${(props: any) => props.padding};
  padding-bottom: ${(props: any) => props.paddingBottom};
  display: flex;
  align-items: center;
  justify-content: center;
  float: ${(props: any) => props.float};
`;

export const ErrorText = styled.div`
  position: absolute;
  left: 5%;
  top: 3%;
  color: #adadad;
  font-size: 18px;
`;

export const CloseIcon = styled(Settings)`
  position: absolute;
  left: 91%;
  top: 3%;
  cursor: pointer;
  color: White;
  width: 20px;
  color: #adadad;
`;

export const UniswapIcon = styled.img`
  position: absolute;
  left: 4%;
  top: 4%;
  cursor: pointer;
  color: White;
  width: 23px;
  color: #adadad;
`;

export const ArrowDownContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 45%;
  // color: White;
  background: White;
  background-color: rgb(56, 59, 74);
  border: 5px solid rgb(34, 53, 83);
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

export const Button = styled.div`
  height: 55px;
  width: 100%;
  background: ${(props: any) =>
    props.insufficentBalance
      ? "#d6454f"
      : props.disabled
        ? "rgb(36, 39, 54)"
        : "rgb(95,111,201)"};
  border-radius: 20px;
  text-align: center;
  line-height: 55px;
  font-size: 18px;
  color: ${(props: any) =>
    props.insufficentBalance
      ? "white"
      : props.disabled
        ? "rgb(67, 92, 112)"
        : "white"};
  margin-bottom: 5px;

  &:hover {
    cursor: pointer;
    background: ${(props: any) =>
      props.insufficentBalance
        ? "#d6454f"
        : props.disabled
          ? "rgb(36, 39, 54)"
          : "rgb(136,152,244)"};
  }
`;

export const ButtonWrapper = styled.div`
  font-family: "Open Sans", sans-serif;
  margin-top: 30px;
  margin-bottom: 15px;
  height: 30px;
  // margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const DisclaimerContainer = styled.div`
  font-family: "Open Sans", sans-serif;
  margin-top: 70px;
  width: 100%;
  height: 30px;
  font-size: 15px;
  // background: White;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #adadad;
  font-weight: bold;
`;

export const InfoWrapper = styled.div`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 0.4rem;

  justify-content: space-between;
  flex-flow: row nowrap;
  align-items: center;
  // background: white;
`;

export const TokenInput = styled.input`
  font-family: "Inter custom", sans-serif;
  width: 100%;
  background: transparent;
  border: none;
  font-size: 30px;
  color: #adadad;
  outline: none;
`;

export const TokenSelectButton = styled.div`
  font-family: "Open Sans", sans-serif;
  display: flex;
  align-items: center;
  background: ${(props: any) => props.color};
  color: rgb(255, 255, 255);
  cursor: pointer;
  border-radius: 16px;
  box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
  outline: none;
  user-select: none;
  border: none;
  font-size: 24px;
  font-weight: 500;
  height: 2.4rem;
  // width: 100%;
  // width: 100%;
  padding: 0px 8px;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-left: 6px;
  visibility: visible;
`;
export const SelectedTokenContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
`;

export const TokenImg = styled.img`
  width: 24px;
  height: 24px;
  background: radial-gradient(
    white 50%,
    rgba(255, 255, 255, 0) calc(75% + 1px),
    rgba(255, 255, 255, 0) 100%
  );
  border-radius: 50%;
  box-shadow: white 0px 0px 1px;
  border: 0px solid rgba(255, 255, 255, 0);
  margin-right: 5px;
`;

export const SelectedToken = styled.span`
  display: flex;
  margin: 0px 0.25rem;
  font-size: 18px;
  width: max-content;
`;

export const ChevronDownImg = styled.img`
  margin: 0px 0.25rem 0px 0.35rem;
  height: 35%;
`;

export const ButtonContents = styled.span`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  width: 100%;
`;

export const BridgeModalContainer = styled.div`
  max-width: 480px;
  color: White;
  background-color: rgb(13, 17, 28);
  text-align: right;
  padding: 12px 12px;
  border: 1px solid rgb(60, 65, 80);
  border-radius: 20px;
  box-shadow: 0px 10px 150px 5px rgba(75, 135, 220, 0.03);
  margin: 30px auto 0;
  transition: height 3s ease-out;
  position: relative;
`;

const DexModal = ({
  asset,
  feeAsset,
  toAsset,
  crossAsset,
  setShowTokenModal,
  setShowFeeTokenModal,
  setShowToTokenModal,
  swapAssets,
}: {
  asset: AssetConfig;
  feeAsset: AssetConfig;
  toAsset: AssetConfig;
  crossAsset: AssetConfig;
  setShowTokenModal: Dispatch<SetStateAction<boolean>>;
  setShowFeeTokenModal: Dispatch<SetStateAction<boolean>>;
  setShowToTokenModal: Dispatch<SetStateAction<boolean>>;
  swapAssets: () => void;
}) => {
  const [swapState, setSwapState] = useState(true);

  const {
    togglePendingModal,
    toggleRejectedModal,
    pending,
    setPendingTransaction,
    pendingTransaction,
  } = useTransactionFlow();

  const { chain: currenChain } = useNetwork();
  const { address } = useAccount();
  const chainId = useChainId();

  const { switchNetwork } = useSwitchNetwork();
  const { signTypedDataAsync } = useSignTypedData();

  const [txState, setTXState] = useState<ConfirmModalState>(
    ConfirmModalState.REVIEWING,
  );

  const [tx, setTx] = useState<TransactionReceipt | undefined>(undefined);
  const [inputValue, setInputValue] = useState("");

  const assetBalance = useTokenBalance(asset?.address, asset?.chainId);
  const toAssetBalance = useTokenBalance(
    crossAsset?.address,
    crossAsset?.chainId,
  );
  const feeAssetBalance = useTokenBalance(feeAsset?.address, feeAsset?.chainId);
  const dispatch = useNotification();

  const HandleNewNotification = useCallback(
    (title: string, message: string): void => {
      dispatch({
        type: "info",
        message: message,
        title: title,
        position: "topR" || "topR",
        success: true,
      });
    },
    [dispatch],
  );
  const formatAssetBalance = useMemo(
    () =>
      asset?.decimals
        ? assetBalance.balance.shiftedBy(-asset.decimals).toFixed(3)
        : 0,
    [assetBalance, asset],
  );

  const formatToAssetBalance = useMemo(
    () =>
      crossAsset?.decimals
        ? toAssetBalance.balance.shiftedBy(-asset.decimals).toFixed(3)
        : 0,
    [toAssetBalance, crossAsset, asset],
  );

  const formatFeeAssetBalance = useMemo(
    () =>
      feeAsset?.decimals
        ? feeAssetBalance.balance.shiftedBy(-feeAsset.decimals).toFixed(3)
        : 0,
    [feeAssetBalance, feeAsset],
  );
  const amount = useMemo(
    () =>
      asset
        ? CurrencyAmount.fromRawAmount(
            new ERC20Token(
              asset?.chainId,
              asset?.address,
              asset?.decimals,
              asset?.shortName,
            ),
            Number(inputValue) * 10 ** asset?.decimals ?? 1,
          )
        : undefined,
    [inputValue, asset],
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
    queryKey: ["smartWalletDetails", address, asset.chainId ?? 0],
    queryFn: async () => {
      if (!address || !asset.chainId) return;
      return SmartWalletRouter.getUserSmartWalletDetails(
        address,
        asset.chainId,
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(address && asset.chainId),
  });

  const { data: allowance, refetch: refetchAlloance } = useQuery({
    queryKey: [
      "allowance-query",
      asset?.shortName,
      feeAsset?.shortName,
      address,
      asset.chainId,
    ],
    queryFn: async () => {
      if (!asset.chainId || !address || !amount || !feeAsset) return undefined;

      return SmartWalletRouter.getContractAllowance(
        [asset.address, feeAsset.address],
        address,
        asset.chainId,
        amount.quotient,
      );
    },

    refetchInterval: 20000,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(address && asset.chainId && amount),
  });

  const { data: trade, isLoading: isFetchingTrade } = useSmartRouterBestTrade({
    toAsset: toAsset
      ? new ERC20Token(
          toAsset?.chainId,
          toAsset?.address,
          toAsset?.decimals,
          toAsset?.shortName,
        )
      : undefined,
    fromAsset: asset
      ? new ERC20Token(
          asset?.chainId,
          asset?.address,
          asset?.decimals,
          asset?.shortName,
        )
      : undefined,
    chainId: asset.chainId,
    account: address,
    amount: amount,
  });

  const { data: fees, isFetching: isFetchingFees } = useQuery({
    queryKey: [
      "fees-query",
      asset?.shortName,
      toAsset?.shortName,
      feeAsset?.shortName,
    ],
    queryFn: async () => {
      if (!trade || !feeAsset || !asset || !toAsset) return undefined;

      return SmartWalletRouter.estimateSmartWalletFees({
        feeAsset: feeAsset?.shortName as any,
        inputCurrency: new ERC20Token(
          asset?.chainId,
          asset?.address,
          asset?.decimals,
          asset?.shortName,
        ),
        outputCurrency: new ERC20Token(
          toAsset?.chainId,
          toAsset?.address,
          toAsset?.decimals,
          toAsset?.shortName,
        ),
      });
    },

    refetchInterval: 10000,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(asset && toAsset && feeAsset && trade),
  });

  const swapCallParams = useMemo(() => {
    if (
      !trade ||
      !asset.chainId ||
      !allowance ||
      !smartWalletDetails ||
      !address
    )
      return undefined;

    const options = getSmartWalletOptions(
      address,
      true,
      allowance,
      smartWalletDetails as never,
      asset.chainId,
      {
        inputAsset: asset.address,
        feeAsset: feeAsset.address,
        outputAsset: toAsset.address,
      },
      RouterTradeType.SmartWalletTradeWithPermit2,
    );
    return SmartWalletRouter.buildSmartWalletTrade(trade as any, options);
  }, [trade, address, allowance, smartWalletDetails, asset, feeAsset, toAsset]);

  const swap = useCallback(async () => {
    setTx(undefined);
    if (!swapCallParams || !address || !allowance) return;
    togglePendingModal();
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
        togglePendingModal();
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
          const encodedTransfer =
            await SmartWalletRouter.encodeTransferToRelayer(
              [address, trade?.outputAmount.quotient as any],
              "0x903fC5f46287e7B3C79719c3ce8F4EDBAC8b8b54",
              ChainId.ARBITRUM_SEPOLIA,
            );
          console.log(encodedTransfer);
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
        setInputValue("");
        refetch();

        HandleNewNotification(
          "Swap Successful",
          `https://testnet.bscscan.com/tx/${response.transactionHash}`,
        );
        setPendingTransaction(false);
        return response as TransactionReceipt;
      })
      .catch((err: unknown) => {
        console.log(err);
        if (pending) togglePendingModal();
        toggleRejectedModal();
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
  console.log(allowance);
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

  return (
    <>
      <div className="mb-[40px] mt-[40px] flex flex-col items-center justify-center">
        <BridgeModalContainer>
          {/* <UniswapLogoPink /> */}
          <ErrorText>Swap</ErrorText>
          <CloseIcon />
          <ArrowDownContainer onClick={swapAssets} swapState={swapState}>
            <UilAngleDown className={"h-6 w-6"} />
          </ArrowDownContainer>
          <div className="flex w-full items-center justify-between pb-2 pt-12">
            <TokenSelectDropdown chainId={97} isFrom />
            <UilArrowRight />
            <TokenSelectDropdown
              chainId={ChainId.ARBITRUM_ONE}
              isFrom={false}
            />
          </div>
          <TokenAmountWrapper
            height={swapState === true ? "100px" : "70px"}
            marginTop={"12px"}
            marginBottom={"0px"}
            borderTrue={true}
          >
            <div className="h-full flex-col items-center justify-center gap-4">
              <InfoWrapper>
                <TokenInput
                  placeholder={"0.0"}
                  onChange={handleAmount}
                  value={inputValue}
                  required
                  type="number"
                />

                {asset && (
                  <UilCopy
                    className="ml-2 h-8 w-8 text-gray-500 hover:cursor-pointer"
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        asset?.address as string,
                      );
                    }}
                  />
                )}
                <TokenSelectButton
                  color={asset ? "rgb(60, 65, 80)" : "rgb(95,111,201)"}
                  onClick={() => setShowTokenModal(true)}
                >
                  <ButtonContents>
                    <div className="jutsify-center flex flex items-center gap-1 break-words">
                      {asset && (
                        <div className="relative h-6 w-6">
                          <Icon
                            chainName={asset.Icon as string}
                            className="absolute h-6 w-6"
                          />

                          <Icon
                            chainName={
                              ChainIdToRenChain[asset.chainId] as string
                            }
                            className="absolute left-[50%] top-[45%] h-[14px] w-[14px] bg-black"
                          />
                        </div>
                      )}

                      <SelectedToken initialWidth={asset ? true : false}>
                        {asset ? asset.shortName : "From asset"}
                      </SelectedToken>
                    </div>

                    <ChevronDown size={"25px"} />
                  </ButtonContents>
                </TokenSelectButton>
              </InfoWrapper>

              <div className="flex w-full justify-between gap-2  text-gray-500">
                <div className="overflow-ellipsis text-sm">{"You spend"}</div>

                {asset && (
                  <div className="overflow-ellipsis text-sm">{`${formatAssetBalance} ${asset?.shortName}`}</div>
                )}
              </div>
            </div>
          </TokenAmountWrapper>
          <TokenAmountWrapper
            height={swapState === false ? "100px" : "100px"}
            marginTop={"7px"}
            marginBottom={"0px"}
            borderTrue={false}
          >
            <div className="h-full flex-col items-center justify-center ">
              <InfoWrapper>
                <TokenInput
                  placeholder={"0.0"}
                  disabled
                  value={
                    fees && inputValue !== ""
                      ? Number(fees?.gasCostInBaseToken?.toExact()).toFixed(5)
                      : ""
                  }
                />
                {feeAsset && (
                  <UilCopy
                    className="ml-2 h-8 w-8 text-gray-500 hover:cursor-pointer"
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        feeAsset?.address as string,
                      );
                    }}
                  />
                )}
                <TokenSelectButton
                  color={feeAsset ? "rgb(60, 65, 80)" : "rgb(95,111,201)"}
                  onClick={() => setShowFeeTokenModal(true)}
                >
                  <ButtonContents>
                    <div className="jutsify-center flex flex items-center gap-1 break-words">
                      {feeAsset && (
                        <div className="relative h-6 w-6">
                          <Icon
                            chainName={feeAsset.Icon as string}
                            className="absolute h-6 w-6"
                          />

                          <Icon
                            chainName={
                              ChainIdToRenChain[feeAsset.chainId] as string
                            }
                            className="absolute left-[50%] top-[45%] h-[14px] w-[14px] bg-black"
                          />
                        </div>
                      )}
                      <SelectedToken initialWidth={!feeAsset ? true : false}>
                        {feeAsset ? feeAsset.shortName : "Fee asset"}
                      </SelectedToken>
                    </div>
                    <ChevronDown size={"25px"} />
                  </ButtonContents>
                </TokenSelectButton>
              </InfoWrapper>

              <div className=" flex w-full justify-between gap-2 text-gray-500">
                <div className="flex items-center gap-2 overflow-ellipsis text-sm">
                  <span>{"fee cost"}</span>
                  {isFetchingFees ||
                    (isFetchingTrade && (
                      <UilSpinner
                        className={"h-5 w-5 animate-spin text-blue-600"}
                      />
                    ))}
                </div>

                {feeAsset && (
                  <div className="overflow-ellipsis text-sm">{`${formatFeeAssetBalance} ${feeAsset?.shortName}`}</div>
                )}
              </div>
            </div>
          </TokenAmountWrapper>
          <TokenAmountWrapper
            height={swapState === false ? "100px" : "100px"}
            marginTop={"7px"}
            marginBottom={"0px"}
            borderTrue={false}
          >
            <div className="h-full flex-col items-center justify-center ">
              <InfoWrapper>
                <TokenInput
                  placeholder={"0.0"}
                  disabled
                  value={
                    trade
                      ? Number(trade?.outputAmount?.toExact()).toFixed(5)
                      : ""
                  }
                />
                {crossAsset && (
                  <UilCopy
                    className="ml-2 h-8 w-8 text-gray-500 hover:cursor-pointer"
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        crossAsset?.address as string,
                      );
                    }}
                  />
                )}
                {/* <div className="h-full flex-col items-center justify-center gap-4"> */}
                <TokenSelectButton
                  color={crossAsset ? "rgb(60, 65, 80)" : "rgb(95,111,201)"}
                  onClick={() => setShowToTokenModal(true)}
                >
                  <ButtonContents>
                    <div className="jutsify-center flex flex items-center gap-1 break-words">
                      {crossAsset && (
                        <div className="relative h-6 w-6">
                          <Icon
                            chainName={crossAsset.Icon as string}
                            className="absolute h-6 w-6"
                          />

                          <Icon
                            chainName={
                              ChainIdToRenChain[ChainId.ARBITRUM_ONE] as string
                            }
                            className="absolute left-[50%] top-[45%] h-[14px] w-[14px] bg-black"
                          />
                        </div>
                      )}
                      <SelectedToken initialWidth={crossAsset ? true : false}>
                        {crossAsset ? crossAsset.shortName : "To asset"}
                      </SelectedToken>
                    </div>
                    <ChevronDown size={"25px"} />
                  </ButtonContents>
                </TokenSelectButton>
              </InfoWrapper>

              <div className=" flex w-full justify-between gap-2 text-gray-500">
                <div className="flex items-center gap-2 overflow-ellipsis text-sm">
                  <span>{"You receive"}</span>
                  {isFetchingTrade && (
                    <UilSpinner
                      className={"h-5 w-5 animate-spin text-blue-600"}
                    />
                  )}
                </div>

                {crossAsset && (
                  <div className="overflow-ellipsis text-sm">{`${formatToAssetBalance} ${crossAsset?.shortName}`}</div>
                )}
              </div>
            </div>
          </TokenAmountWrapper>

          <ButtonWrapper>
            <Button
              disabled={!trade?.outputAmount && chainId === asset.chainId}
              insufficentBalance={Number(inputValue) > formatAssetBalance}
              onClick={
                chainId !== asset.chainId
                  ? () => switchNetwork?.(asset.chainId)
                  : swap
              }
              // onClick={async () => connect({ connector: connectors[0] })}
            >
              {pendingTransaction
                ? "Swapping"
                : chainId !== asset.chainId
                  ? "Switch Network"
                  : Number(inputValue) > formatAssetBalance
                    ? "Insufficent balance"
                    : inputValue !== ""
                      ? "Swap"
                      : "Enter An Amount"}
            </Button>
          </ButtonWrapper>
        </BridgeModalContainer>
        {/* <GlowSecondary /> */}
        {address && (
          <div className="flex w-[440px] items-center justify-between">
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
              className={`${"text-gray-500"} font-sm my-1 hover:cursor-pointer hover:text-gray-400`}
              onClick={async () =>
                await SmartWalletRouter.encodeTransferToRelayer(
                  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  [address as any, (10n * 10n ** 18n) as any],
                  "0x6F451Eb92d7dE92DdF6939d9eFCE6799246B3a4b",
                  ChainId.BSC_TESTNET,
                )
              }
            >
              {"Get Test BUSD"}
            </div>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
              className={`${"text-gray-500"} font-sm my-1 hover:cursor-pointer hover:text-gray-400`}
              onClick={async () =>
                await SmartWalletRouter.encodeTransferToRelayer(
                  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  [address as any, (10n * 10n ** 18n) as any],
                  "0x501B55184813f7a29eb98DECD8EC9B6D07DEB263",
                  ChainId.BSC_TESTNET,
                )
              }
            >
              <span className=" px-2 text-center text-[15px] text-gray-400">
                Link to video demo{" "}
                <Link
                  className="bold text-blue-500"
                  href="https://youtu.be/v-LHx_rA62s"
                  referrerPolicy="no-referrer"
                  target="_blank"
                >
                  here
                </Link>
              </span>
            </div>
          </div>
        )}
      </div>
      <GlowSecondary />
    </>
  );
};

export default DexModal;
