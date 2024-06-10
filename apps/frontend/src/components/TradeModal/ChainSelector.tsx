import { UilAngleDown } from "@iconscout/react-unicons";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSwitchNetwork } from "wagmi";
import { CHAINS, type ChainType } from "~/utils/chains";
import GreenDot from "../Icons/GreenDot";

export const FormWrapper = styled.div`
  position: fixed;
  //   left: 41.5%;
  //   top: 43%;
  transform: translate(-13%, 2%);
  width: 230px;
  background-color: rgb(13, 17, 28);
  text-align: right;
  padding: 10px;
  padding-bottom: 20px;
  border: 1.5px solid rgb(60, 65, 80);
  border-radius: 15px;
  display: block;
  z-index: 10000000000;
  box-shadow: 14px 19px 5px 0px rgba(0, 0, 0, 0.85);
`;

const getChainOptions = () => {
  return Object.values(CHAINS);
};

export const Breakpoints = {
  sm: 640,
  sm1: 470,
  sm2: 500,
  md: 768,
  lg: 1024,
  xl: 1280,
};
const TokenSelectDropdown = ({
  chainId,
  isFrom,
}: {
  chainId: number;
  isFrom: boolean;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeChain, setActiveChain] = useState<ChainType | undefined>(
    chainId ? CHAINS[chainId!] : undefined,
  );

  const { switchNetwork } = useSwitchNetwork();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chainId) return;
    const activeChain: ChainType | undefined = CHAINS[chainId];
    setActiveChain(activeChain);
  }, [chainId]);

  useEffect(() => {
    const checkIfClickedOutside = (e: Event) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node | null)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className=" h-fit w-[40%]" ref={ref}>
        <ChainSelectorButton
          setIsMenuOpen={setIsMenuOpen}
          activeChain={activeChain}
          isFrom={isFrom}
        />
        {isMenuOpen && (
          <FormWrapper>
            {getChainOptions()
              .filter((chain: ChainType) => chain.isTestnet)
              .map((chain: ChainType, index: number) => {
                return (
                  <ChainSelector
                    key={index}
                    chain={chain}
                    currentChain={chainId}
                    switchNetwork={switchNetwork}
                  />
                );
              })}
          </FormWrapper>
        )}
      </div>
    </>
  );
};

const ChainSelectorButton = ({
  setIsMenuOpen,
  activeChain,
  isFrom,
}: {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeChain: ChainType | undefined;
  isFrom: boolean;
}) => {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className="flex items-center rounded-2xl bg-[rgb(60,65,80)] bg-opacity-60 px-3 py-2 text-center hover:cursor-pointer hover:border-gray-500 hover:bg-black hover:bg-opacity-20"
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setIsMenuOpen((o: boolean) => !o);
      }}
    >
      {activeChain && <activeChain.logo />}
      <span className=" block w-full text-center">
        {activeChain
          ? `${isFrom ? "From" : "To"} ${activeChain.chainName}`
          : "Unknown"}
      </span>
      <UilAngleDown className={"mlg:h-8 mlg:w-8 h-5 w-5"} />
    </div>
  );
};
const ChainSelector = ({
  chain,
  currentChain,
  switchNetwork,
}: {
  chain: ChainType;
  currentChain: number | undefined;
  switchNetwork: any;
}) => {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className="hover:bg-tertiary flex flex-row items-center gap-3 rounded-lg px-2 py-2 hover:cursor-pointer"
      onClick={() => null}
    >
      <div className="flex h-full">
        <chain.logo className={"h-5 w-5"} />
      </div>
      <span className="text-[15px]">{chain.chainName}</span>
      {currentChain && currentChain == chain.id && <GreenDot />}
    </div>
  );
};

export default TokenSelectDropdown;
