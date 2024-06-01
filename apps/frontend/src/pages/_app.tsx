import { GeistSans } from "geist/font/sans";
import type { AppType } from "next/app";
import x from "@eth-dub-2024/router-sdk";
import "~/styles/globals.css";
import { SaasProvider } from "@saas-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SaasProvider>{children}</SaasProvider>;
}

const MyApp: AppType = ({ Component, pageProps }) => {
  console.log(x);
  return (
    <main className={GeistSans.className}>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </main>
  );
};

export default MyApp;
