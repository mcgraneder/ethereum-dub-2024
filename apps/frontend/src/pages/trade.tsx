import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import AssetListModal from "~/components/AssetListModal/AssetListModal";
import { assetsBaseConfig, whiteListedEVMAssets } from "~/utils/assetsConfig";
import { Asset } from "~/utils/chainColours";
import DexModal from "../components/TradeModal/TradeModal";
import { Layout } from "../layouts";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import TransactionFlowModals from "~/components/TxConfirmationModalFlow";

const TradePage: NextPage = () => {
  const [showTokenModal, setShowTokenModal] = useState<boolean>(false);
  const [showfeeTokenModal, setShowFeeTokenModal] = useState<boolean>(false);
  const [showToTokenModal, setShowToTokenModal] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const [asset, setAsset] = useState<any>(assetsBaseConfig.CAKE);
  const [feeAsset, setFeeAsset] = useState<any>(undefined);
  const [toAsset, setToAsset] = useState<any>(undefined);

  const { isConnected } = useAccount();
  const { push } = useRouter();

  const swapAssets = useCallback(() => {
    setAsset(toAsset);
    setToAsset(asset);
  }, [asset, toAsset]);
  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   // if (!isConnected) push("/");
  // }, [isConnected, push]);

  return (
    <>
      <AssetListModal
        setShowTokenModal={setShowTokenModal}
        visible={showTokenModal}
        setAsset={setAsset}
        assetFilter={[Asset.CAKE]}
      />
      <AssetListModal
        setShowTokenModal={setShowFeeTokenModal}
        visible={showfeeTokenModal}
        setAsset={setFeeAsset}
        assetFilter={[Asset.BUSD]}
      />
      <AssetListModal
        setShowTokenModal={setShowToTokenModal}
        visible={showToTokenModal}
        setAsset={setToAsset}
        assetFilter={[Asset.BUSD]}
      />

      <TransactionFlowModals text={text} asset={asset} setText={setText} />

      <Layout>
        <DexModal
          asset={asset}
          toAsset={toAsset}
          feeAsset={feeAsset}
          setShowTokenModal={setShowTokenModal}
          setShowFeeTokenModal={setShowFeeTokenModal}
          setShowToTokenModal={setShowToTokenModal}
          swapAssets={swapAssets}
        />
      </Layout>
    </>
  );
};

export default TradePage;
