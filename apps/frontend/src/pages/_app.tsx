import { GeistSans } from "geist/font/sans";
import type { AppType } from "next/app";
import x from "@eth-dub-2024/router-sdk";
import "~/styles/globals.css";
import { SaasProvider } from "@saas-ui/react";
import { createStorage, createConfig, WagmiConfig } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { bscTestnet } from "wagmi/chains";
import { publicClient, noopStorage } from "../config/wagmiConfig";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SaasProvider>{children}</SaasProvider>;
}

export const wagmiconfig = createConfig({
  storage: createStorage({
    storage: typeof window !== "undefined" ? window.localStorage : noopStorage,
    key: "wagmi_v1.1",
  }),
  autoConnect: false,
  connectors: [new MetaMaskConnector({ chains: [bscTestnet] })],
  publicClient: publicClient,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  console.log(x);
  return (
    <main className={GeistSans.className}>
      <Providers>
        <WagmiConfig config={wagmiconfig}>
          <Component {...pageProps} />
        </WagmiConfig>
      </Providers>
    </main>
  );
};

export default MyApp;
