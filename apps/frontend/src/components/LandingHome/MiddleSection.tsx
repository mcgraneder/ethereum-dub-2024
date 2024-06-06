import React, { useState } from "react";
import Image from "next/image";
import SwapImg from "../../../public/images/swapCard.png";
import LearnMoreButton from "../Buttons/LearnMoreButton";
import ReactCardFlip from "react-card-flip";
import { HiOutlineXCircle } from "react-icons/hi";
import styled from "styled-components";
import meshSrc from "../../../public/images/Mesh.png";
import { fadeIn } from "../../utils/fadeIn.";
import { motion } from "framer-motion";
import { StyledTitle } from "../CSS/HomePage.styles";
import {
  UilDollarSignAlt,
  UilAngleUp,
  UilBoltAlt,
  UilShieldCheck,
} from "@iconscout/react-unicons";

const DARK_MODE_GRADIENT =
  "radial-gradient(101.8% 4091.31% at 0% 0%, #63166d 0%, #5a2bb6 100%)";

const Banner = styled.div<{ isDarkMode: boolean }>`
  border-radius: 25px;

  position: relative;

  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: space-between;
  padding: 10px 15px;
  width: 100%;
  height: 100%;
  min-height: 150px;

  margin-top: 50px;

  box-shadow: 0px 10px 24px rgba(51, 53, 72, 0.04);

  background: ${DARK_MODE_GRADIENT};

  @media (max-width: 1020px) {
    flex-direction: column;
  }
`;

const ProtocolBanner = () => {
  return (
    <Banner>
      <Image
        alt=""
        src={meshSrc}
        className="absolute top-0 max-h-[100%] min-h-[150px] w-full"
      />
      <div className="flex max-w-[100%] flex-col gap-2 px-4 lg:max-w-[75%]">
        <div className="items-left my-1 flex pt-1 text-2xl lg:text-3xl">
          <span className="text-[rgb(216,222,255)]">
            Powered By the Eire Swap Protocol
          </span>
        </div>
        <div className="items-left mt-1 flex">
          <span className="text-sm text-gray-300 lg:text-base">
            Eire Swap is powered by the core solidity smart contracts that
            enable the secure and verified transfer of crypto assets between EVM
            chains through Advanced cryptographic protocols.
          </span>
        </div>
      </div>
      <a
        href={"https://github.com/mcgraneder/astral-sol"}
        rel="noopener noreferrer"
        target="_blank"
        className={`hover:bg-primary z-50  my-8 mr-4 hidden w-fit items-center rounded-full border-2 border-white px-8 text-white transition duration-200 ease-in-out hover:border-blue-300 hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 lg:flex `}
      >
        <span className={`text-base`}>Learn More</span>
      </a>
    </Banner>
  );
};

interface CrossButtonProps {
  onClick: () => void;
}

interface Props {
  children: React.ReactNode;
  className?: String;
}

export const Container = ({ children, className = "", ...rest }: Props) => {
  return (
    <div
      className={`bg-bg-[rgb(13,17,28)] relative w-full overflow-hidden rounded-2xl drop-shadow-2xl lg:w-auto ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export const Title = ({ children, className = "", ...rest }: Props) => {
  return (
    <h3 className={`font-semibold tracking-wide ${className}`} {...rest}>
      {children}
    </h3>
  );
};

export const Description = ({
  children,
  className = "",
  ...rest
}: Props & { left?: boolean }) => {
  return (
    <p className={`font-normal tracking-wide ${className}`} {...rest}>
      {children}
    </p>
  );
};

const CrossButton = ({ onClick }: CrossButtonProps) => {
  return (
    <span className="absolute right-4 top-3 cursor-pointer" onClick={onClick}>
      <HiOutlineXCircle className="h-8 w-8 text-blue-500" />
    </span>
  );
};

const Cards = {
  tradeFreely: "trade_freely",
  ownMoney: "ownMoney",
  freeTransfer: "freeTransfer",
  ultraSecure: "ultraSecure",
  atomic: "atomic",
};

function Section2() {
  const [flipped, setFlipped] = useState({
    [Cards.freeTransfer]: false,
    [Cards.ownMoney]: false,
    [Cards.tradeFreely]: false,
    [Cards.ultraSecure]: false,
    [Cards.atomic]: false,
  });

  // const { toggleWalletModal } = useAuth();
  const flip = (key: string, value: boolean) => {
    console.log("flipping");
    setFlipped((f) => ({ ...f, [key]: value }));
  };

  return (
    //  <>
    <motion.div
      variants={fadeIn("up", 0.01)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.15 }}
      id="features"
      className="max-w-screen z-50 flex flex-col items-center px-0 lg:px-12"
    >
      <StyledTitle size={50} margin={0} weight={800} align={"center"}>
        Why Use Eire Swap
      </StyledTitle>
      <div className="md2:flex-row mt-12 flex w-full flex-col items-center justify-between gap-8">
        <ReactCardFlip
          containerClassName="h-[250px] w-full"
          isFlipped={flipped.ownMoney}
          flipDirection="horizontal"
        >
          <Container className=" border-tertiary h-[250px] w-full border bg-[rgb(13,17,28)] ">
            <Image alt="" src={SwapImg} className="absolute right-0 -z-10" />
            {/* <Image alt="" src={SwapImg} className="absolute"/> */}
            <div className=" mlg:mt-10 mlg:ml-16 ml-8 mt-6 flex flex-col items-start justify-between">
              <Title className="mlg:text-3xl text-left text-2xl  text-[rgb(216,222,255)]">
                One Signature Cross Chain Swaps
              </Title>
              <LearnMoreButton onClick={() => flip(Cards.ownMoney, true)} />

              <Description
                className={
                  "mlg:text-base max-w-[60%] text-left text-sm text-gray-300"
                }
              >
                Take advantage of one signature cross chain swaps that execute
                in seconds thanks to our cutting edge backend technology
              </Description>
            </div>
          </Container>
          <Container className="border-tertiary flex h-[250px] items-center justify-center border bg-[rgb(13,17,28)] ">
            <CrossButton onClick={() => flip(Cards.ownMoney, false)} />
            <Image alt="" src={SwapImg} className="absolute right-0 -z-50 " />
            <div className="ml-16 flex flex-col items-start gap-4">
              <Title className="w-full text-center text-2xl text-[rgb(216,222,255)] lg:text-left">
                Bridging With Eire Swap
              </Title>
              <Description className="my-2 max-w-[80%] text-left text-[16px] text-gray-300">
                Our AMM utilises account abstraction. this allows for batching
                multiple transactions into one single execution. Our Relayer
                will execute your from and to chain transactions for you in one
                execution, secured by our ultra lightweight ZK protocol
              </Description>
            </div>
          </Container>
        </ReactCardFlip>
        <ReactCardFlip
          containerClassName="h-[250px] w-full"
          isFlipped={flipped.freeTransfer}
          flipDirection="horizontal"
        >
          <Container className="bg-bg-[rgb(13,17,28)] border-tertiary relative h-[250px] w-full border bg-[rgb(13,17,28)] ">
            <div className="absolute -z-50 h-full w-full translate-y-4 bg-[url('/svgs/coins.svg')] bg-contain bg-bottom bg-no-repeat lg:translate-x-9 lg:bg-right" />
            <div className=" mlg:mt-10 mlg:ml-16 ml-8 mt-6 flex  flex-col items-start justify-between">
              <Title className="mlg:text-3xl text-center text-2xl text-[rgb(216,222,255)]  lg:text-left">
                Pay Gas In Any Asset
              </Title>
              <LearnMoreButton onClick={() => flip(Cards.freeTransfer, true)} />

              <Description
                className={
                  "mlg:text-base max-w-[60%] text-left text-sm text-gray-300"
                }
              >
                Pay for classic and cross chain swaps in any allowing for a
                super convieniant trading experience
              </Description>
            </div>
          </Container>
          <Container className="border-tertiary bg-section4-part3-web flex h-[250px] items-center justify-center border p-8  lg:h-[250px] lg:p-16">
            <CrossButton onClick={() => flip(Cards.freeTransfer, false)} />
            {/* <WaveB
                            className={'absolute right-[20px] top-10 -z-50 h-36 w-36'}
                        /> */}

            <div className="flex flex-col items-start gap-4">
              <Title className="w-full text-center text-2xl text-[rgb(216,222,255)] lg:text-left">
                Custom Fee Assets
              </Title>
              <Description className="my-2 max-w-[80%] text-center  text-gray-300 lg:text-left">
                If you want to pay for gas Fees in a custom token, an extra
                transaction simply gets added to the batch that compensates the
                relayer for covering the native gas. Even if the asset is some
                meme coin our relayer will convert this to a stable with an
                extra step
              </Description>
            </div>
          </Container>
        </ReactCardFlip>
      </div>
      <div className="mlg1:flex-row mt-8 flex w-full flex-col items-center justify-between gap-8">
        <Container className="bg-bg-[rgb(13,17,28)] border-tertiary relative h-[250px] w-full min-w-[25%] border bg-[rgb(13,17,28)]">
          <div className="mgl1:mx-12 mlg1:mt-3 mx-6 mt-5 flex flex-col">
            <div className="flex flex-row items-center justify-between">
              <Title className="mlg:text-3xl items-center text-center text-2xl text-[rgb(216,222,255)] lg:w-80 lg:text-left">
                Fast Trades
              </Title>
              <UilBoltAlt className="h-12 w-12 font-semibold" />
            </div>
            <div className="mt-14 max-w-[100%] break-words text-gray-300  lg:mt-8 lg:max-w-full">
              Trading on Eire is super quick and fast. Trades always get
              resolvedin the blink of an eye. No more waiting!
            </div>
            <div
              className="mt-4 flex gap-1 font-semibold text-blue-600 hover:cursor-pointer hover:text-blue-500"
              onClick={() => null}
            >
              <span>Trade Now</span>
              <span>
                <UilAngleUp />
              </span>
            </div>
          </div>
        </Container>
        <Container className="bg-bg-[rgb(13,17,28)] border-tertiary relative h-[250px] w-full min-w-[25%] border bg-[rgb(13,17,28)]">
          <div className="mgl1:mx-12 mlg1:mt-3 mx-6 mt-5 flex flex-col">
            <div className="flex flex-row items-center justify-between">
              <Title className="mlg:text-3xl items-center  text-left text-2xl text-[rgb(216,222,255)] lg:w-80">
                Ultra Safe
              </Title>
              <UilShieldCheck className="h-12 w-12 font-semibold" />
            </div>
            <div className="mt-14 max-w-[100%]  break-words text-gray-300  lg:mt-8 lg:max-w-full">
              Eire Swap is super safe and all cross-chain transactions are
              secured with cryptography and ZK technology
            </div>
            <div
              className="mt-4 flex gap-1 font-semibold text-blue-600 hover:cursor-pointer hover:text-blue-500"
              onClick={() => null}
            >
              <span>Trade Now</span>
              <span>
                <UilAngleUp />
              </span>
            </div>
          </div>
        </Container>
        <Container className="bg-bg-[rgb(13,17,28)] border-tertiary relative h-[250px] w-full min-w-[25%] border bg-[rgb(13,17,28)]">
          <div className="mgl1:mx-12 mlg1:mt-3 mx-6 mt-5 flex flex-col">
            <div className="flex flex-row items-center justify-between">
              <Title className="mlg:text-3xl items-center text-center text-2xl text-[rgb(216,222,255)] lg:w-80 lg:text-left">
                Low Fees
              </Title>
              <UilDollarSignAlt className="h-12 w-12 font-semibold" />
            </div>
            <div className="mt-14 max-w-[100%]  break-words text-gray-300 lg:mt-8 lg:max-w-full">
              Eire Swap has low bridge fees compared to other competitors. Trade
              more & spend less.
            </div>
            <div
              className="mt-4 flex gap-1 font-semibold text-blue-600 hover:cursor-pointer hover:text-blue-500"
              onClick={() => null}
            >
              <span>Trade Now</span>
              <span>
                <UilAngleUp />
              </span>
            </div>
          </div>
        </Container>
      </div>
      <ProtocolBanner />
    </motion.div>
  );
}

export default Section2;
