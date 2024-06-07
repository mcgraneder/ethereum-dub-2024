import { useRouter } from "next/router";
import type React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BottomNavBar from "../../components/Navbar/BottomNavBar";
import Navbar from "../../components/Navbar/Navbar";
import AppLoader from "./AppLoader";
import { useChainId } from "wagmi";
import { chainsColors } from "~/utils/chainColours";
import { ChainIdToRenChain } from "~/utils/chains";

export const G = styled.div`
  background: ${(props: any) =>
    props.visible
      ? "linear-gradient(rgb(7,8,22) 0%, rgb(19,22,38) 45%)"
      : "linear-gradient(rgb(19,22,38) 40%, rgb(7,8,22) 80%)"};
`;

export const GlowContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow-y: hidden;
  height: 100%;
  /* color: rgb(56, 52, 107); */
  color: rgb(36, 39, 54);
`;

export const Glow = styled.div`
  position: absolute;
  top: -500px;
  bottom: 0;
  background: ${(props: any) =>
    `radial-gradient(92.04% 92.04% at 50% 0%, ${props.colour} 0%, rgba(166, 151, 255, 0) 100%)`};
  filter: blur(80px);

  max-width: 750px;
  width: 50%;
  height: 50%;
`;
export const GlowSecondary = styled.div`
  position: absolute;
  top: 25px;
  bottom: 0;
  background: radial-gradient(
    72.04% 72.04% at 50% 10.99%,
    #592e96 0%,
    rgba(166, 151, 255, 0) 100%
  );
  filter: blur(90px);

  max-width: 450px;
  width: 50%;
  height: 50%;
`;
const ChainGlow = styled.div`
  position: absolute;
  top: -400px;
  bottom: 0;
  background: ${(props: any) =>
    `radial-gradient(92.04% 92.04% at 50% 0%, ${props.colour} 0%, rgba(166, 151, 255, 0) 30%)`};
  filter: blur(70px);
  opacity: 0.75;
  max-width: 850px;
  width: 100%;
  height: 30%;
`;
interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  const [loading, setLoading] = useState<boolean>(true);

  const chainId = useChainId();
  const [chainColour, setChainColour] = useState<string | null>(
    chainId ? chainsColors[ChainIdToRenChain[chainId]!].primary : null,
  );

  const { pathname } = useRouter();

  useEffect(() => {
    if (!chainId) return;
    const colour = chainsColors[ChainIdToRenChain[chainId]!];
    setChainColour(colour.primary);
  }, [chainId]);

  useEffect(() => {
    if (!loading) return;
    const interval: NodeJS.Timeout = setTimeout(() => setLoading(false), 3800);
    return () => clearTimeout(interval);
  }, []);

  return (
    <>
      {loading && pathname === "/" ? (
        <AppLoader />
      ) : (
        <G visible={false}>
          <div className="flex h-screen flex-col items-center text-white  lg:h-auto lg:min-h-screen">
            <GlowSecondary />
            <ChainGlow colour={chainColour ? chainColour : "transparent"} />

            <Navbar />
            <BottomNavBar />

            <div
              id="layout"
              className={`bg-black-900 coingrid-scrollbar relative z-50 w-full flex-1 items-center overflow-x-hidden overflow-y-scroll rounded-t-[40px]  pb-2 pt-6 sm:p-8   md:rounded-[40px] md:p-10 lg:mb-6 lg:overflow-y-auto`}
            >
              {children}
            </div>
          </div>
        </G>
      )}
    </>
  );
}

export default DefaultLayout;
