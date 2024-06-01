import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import x from '@eth-dub-2024/router-sdk'
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  console.log(x)
  return (
    <main className={GeistSans.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
