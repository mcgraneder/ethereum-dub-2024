import { Chain } from "~/utils/chainColours";
import ArbitrumIcon from "../../../../../public/svgs/chains/arbitrum.svg";
import AvalancheIcon from "../../../../../public/svgs/chains/avalanche.svg";
import BinanceSmartChainIcon from "../../../../../public/svgs/chains/binancesmartchain.svg";
import BitcoinIcon from "../../../../../public/svgs/chains/bitcoin.svg";
import BitcoinCashIcon from "../../../../../public/svgs/chains/bitcoincash.svg";
import CatalogIcon from "../../../../../public/svgs/chains/catalog.svg";
import DigiByteIcon from "../../../../../public/svgs/chains/digibyte.svg";
import DogecoinIcon from "../../../../../public/svgs/chains/dogecoin.svg";
import EthereumIcon from "../../../../../public/svgs/chains/ethereum.svg";
import FantomIcon from "../../../../../public/svgs/chains/fantom.svg";
import FilecoinIcon from "../../../../../public/svgs/chains/filecoin.svg";
import KavaIcon from "../../../../../public/svgs/chains/kava.svg";
import MoonbeamIcon from "../../../../../public/svgs/chains/moonbeam.svg";
import OptimismIcon from "../../../../../public/svgs/chains/optimism.svg";
import PolygonIcon from "../../../../../public/svgs/chains/polygon.svg";
import RenVMIcon from "../../../../../public/svgs/chains/renvm.svg";
import SolanaIcon from "../../../../../public/svgs/chains/solana.svg";
import TerraIcon from "../../../../../public/svgs/chains/terra.svg";
import ZcashIcon from "../../../../../public/svgs/chains/zcash.svg";

export const Icons: {
  [key: string]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
} = {
  [Chain.Arbitrum]: ArbitrumIcon,
  [Chain.Avalanche]: AvalancheIcon,
  [Chain.BinanceSmartChain]: BinanceSmartChainIcon,
  [Chain.Bitcoin]: BitcoinIcon,
  [Chain.BitcoinCash]: BitcoinCashIcon,
  [Chain.Catalog]: CatalogIcon,
  [Chain.DigiByte]: DigiByteIcon,
  [Chain.Dogecoin]: DogecoinIcon,
  [Chain.Ethereum]: EthereumIcon,
  [Chain.Fantom]: FantomIcon,
  [Chain.Filecoin]: FilecoinIcon,
  [Chain.Goerli]: EthereumIcon,
  [Chain.Kava]: KavaIcon,
  [Chain.Moonbeam]: MoonbeamIcon,
  [Chain.Optimism]: OptimismIcon,
  [Chain.Polygon]: PolygonIcon,
  [Chain.Solana]: SolanaIcon,
  [Chain.Terra]: TerraIcon,
  [Chain.Zcash]: ZcashIcon,
  RenVM: RenVMIcon,
};
