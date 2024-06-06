import type { NextPage } from "next";
import { useState } from "react";
import AssetListModal from "~/components/AssetListModal/AssetListModal";
import { whiteListedEVMAssets } from "~/utils/assetsConfig";
import { Asset } from "~/utils/chainColours";
import DexModal from "../components/TradeModal/TradeModal";
import { Layout } from "../layouts";

const TradePage: NextPage = () => {
  const [showTokenModal, setShowTokenModal] = useState<boolean>(false);
  const [showfeeTokenModal, setShowFeeTokenModal] = useState<boolean>(false);
  const [showToTokenModal, setShowToTokenModal] = useState<boolean>(false);

  const [asset, setAsset] = useState<any>(undefined);
  const [feeAsset, setFeeAsset] = useState<any>(undefined);
  const [toAsset, setToAsset] = useState<any>(undefined);

  const assetFilter = [...whiteListedEVMAssets];

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

      <Layout>
        <DexModal
          asset1={asset}
          toAsset1={toAsset}
          feeAsset1={feeAsset}
          setShowTokenModal={setShowTokenModal}
          setShowFeeTokenModal={setShowFeeTokenModal}
          setShowToTokenModal={setShowToTokenModal}
        />
      </Layout>
    </>
  );
};

export default TradePage;
