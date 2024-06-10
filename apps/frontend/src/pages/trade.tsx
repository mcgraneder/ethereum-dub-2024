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
import UserInfoModal from "~/components/UserInformationModal/UserInformationModal";

const TradePage: NextPage = () => {
  const [showTokenModal, setShowTokenModal] = useState<boolean>(false);
  const [showfeeTokenModal, setShowFeeTokenModal] = useState<boolean>(false);
  const [showToTokenModal, setShowToTokenModal] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const [asset, setAsset] = useState<any>(assetsBaseConfig.CAKE);
  const [feeAsset, setFeeAsset] = useState<any>(undefined);
  const [toAsset, setToAsset] = useState<any>(assetsBaseConfig.BNB);
  const [crossAsset, setCrossAsset] = useState<any>(undefined);

  const swapAssets = useCallback(() => {
    setAsset(toAsset);
    setToAsset(asset);
  }, [asset, toAsset]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const warning = localStorage.getItem("tradePageWarning");

    if (warning !== "true") setShowWarning(true);
  }, []);

  const closeWarning = useCallback(() => {
    setShowWarning(false);
    localStorage.setItem("tradePageWarning", "true");
  }, []);

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
        assetFilter={[Asset.CAKE]}
      />
      <AssetListModal
        setShowTokenModal={setShowToTokenModal}
        visible={showToTokenModal}
        setAsset={setCrossAsset}
        assetFilter={[Asset.USDT]}
      />

      <TransactionFlowModals text={text} asset={asset} setText={setText} />

      <UserInfoModal
        isHomePageWarning={false}
        open={showWarning}
        close={closeWarning}
        message={
          <span>
            This page is not yet functional and I have only scaffolded out some
            basic CSS as a placeholder for ppl who visit this demo app
            <br />
            <br />I am currently working on the cross chain DEX contracts which
            will alow users to trade their bridged sythetic Ren assets amoung
            AMMs deployed all all of the chains supported by this app
          </span>
        }
      />
      <Layout>
        <DexModal
          asset={asset}
          toAsset={toAsset}
          feeAsset={feeAsset}
          crossAsset={crossAsset}
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
