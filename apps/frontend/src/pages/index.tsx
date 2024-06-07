import type { NextPage } from "next";
import Home from "../components/LandingHome/Home";
import { Layout } from "../layouts";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const HomePage: NextPage = () => {
  const { isConnected } = useAccount();
  const { push } = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isConnected) push("/trade");
  }, [isConnected, push]);

  return (
    <>
      <Layout>
        <Home />
      </Layout>
    </>
  );
};

export default HomePage;
