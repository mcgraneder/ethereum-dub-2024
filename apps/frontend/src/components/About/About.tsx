import React from "react";
import styled from "styled-components";
// import RenLogo1 from "../assets/icons/ren-logo-3f.svg"
// import RenLogo4 from "../assets/icons/renvm-logo.svg"
import { ArrowLeft } from "react-feather";
import Link from "next/link";

export const PageContainer = styled.div`
  font-family: SuisseIntl, Helvetica, Arial, sans-serif;
  padding-left: 24px;
  padding-right: 24px;
  width: 100%;
  display: block;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  background: ${(props: any) =>
    props.visible
      ? "linear-gradient(rgb(7,8,22) 0%, rgb(19,22,38) 45%)"
      : "linear-gradient(rgb(19,22,38) 40%, rgb(7,8,22) 80%)"};
`;
export const PageWrapper = styled.div`
  // margin: 0;
  // box-sizing: border-box;
  // width: 100%;
  // display: flex;
  // flex-wrap: wrap;
`;

export const AboutPageContentsConainer = styled.div`
  margin-top: -1px;
  min-height: calc(100vh - 137px);
  padding-top: 1px;
  display: block;
`;
export const AboutPageContentsWrapper = styled.div`
  margin-top: 124px;
  width: 100%;
  display: block;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const Title = styled.h1`
  font-size: 27px;
  margin-bottom: 15px;
  font-family: SuisseIntl, Helvetica, Arial, sans-serif;
  font-weight: bold;
  line-height: 1.2;
  display: block;
  color: White;
`;
export const Text = styled.p`
  margin-bottom: 23px;
  font-size: 17px;
  font-family: SuisseIntl, Helvetica, Arial, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  color: #adadad;

  a {
    text-decoration: none;
    color: rgb(13, 94, 209);
  }

  span {
    text-decoration: none;
    color: orange;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  margin-top: 48px;
  align-items: center;
`;

export const LeftIconContainer = styled.span`
  display: inline-flex;
  font-size: 50px;
  align-items: center;
  border-right: 2px solid White;
  padding-right: 25px;
`;
export const Icon = styled.img`
  width: 2.32692em;
  font-size: inherit;
  fill: currentColor;
  height: 1em;
  display: inline-block;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  flex-shrink: 0;
  user-select: none;
  pointer-events: none;
  overflow: hidden;
`;

export const RightIconContainer = styled.span`
  display: inline-flex;
  font-size: 42px;
  align-items: center;
  padding-top: 2px;
  padding-left: 25px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 25px;
  justify-content: space-between;
`;
export const BackContainer = styled.div`
  min-width: 72px;
  display: flex;
  justify-content: left;

  &:hover {
    cursor: pointer;
  }
`;

export const BackArrow = styled(ArrowLeft)`
  font-size: 1.125rem;
  lex: 0 0 auto;
  color: White;
  margin-right: 8px;
`;

export const HeaderText = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-self: center;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  color: White;
  // line-height: 25px;
`;
const About = () => {
  return (
    <PageContainer visible>
      <AboutPageContentsConainer>
        <AboutPageContentsWrapper>
          <HeaderContainer>
            <Link
              href={"/"}
              passHref
              className="hover: flex cursor-pointer justify-start"
            >
              <>
                <BackArrow size={"30px"} />
                <HeaderText>Back to Home page</HeaderText>
              </>
            </Link>
          </HeaderContainer>
          <Title>What is The Eire Swap Protocol?</Title>
          <Text>
            EireSwap will be a Uniswap like Dex, but where users have their own
            built-in smart wallet. The wallet utilises account abstraction
            primitives as well as cryptographic protocols, for example Schnorr
            Proof Of Knowledge, to take advantage of zero-knowledge (ZK) proofs
            in smart contracts. This facilitates extension of modern Automated
            Market Maker (AMM) protocols as utilised by Uniswap or Pancakeswap,
            so that users can get the advantages resulting for AA, like batching
            transactions and custom fee tokens. In this way, the typical swap
            flow seen in today's AMMs can be optimised into a one-signature
            flow. This is in addition to enabling one-signature cross chain
            trades secured by our ZK protocol.
            <br />
            <br />
            The main idea is to create a wallet contract that a user can own
            which will have a deterministic address: a smart wallet. This smart
            wallet acts a vessel, the means to execute their swap transactions
            through a relayer. Since a user's wallet contract’s address is
            deterministic, they can use it on any chain to execute any
            transaction they want on these chains in one flow. We also extend
            this to allow a user to create a unique private/public key pair for
            their wallet contract. With this, the wallet can implement its own
            ECDSA signature (for on-chain SC signing) and ZK proof algorithms.
            The private key is derived in secret off-chain and the public key is
            used as the salt in the deterministic CREATE2 smart contract
            address. Thus the user’s Externally Owned Account (EOA), smart
            contract wallet, and smart contract public key are all intrinsically
            linked.
            <br />
            <br />A unique feature that this design makes possible is the
            ability for the user to also execute cross chain swaps in a
            one-signature flow. This works in a two step process under the hood.
            There is both an origin chain transaction and a destination chain
            transaction; both are executed for the user by the relayer as
            components of a one-signature transaction flow.
          </Text>
          <Title>How does it work?</Title>
          <Text>
            As an example, let us imagine the user has USDT on Ethereum Mainnet
            and wants to swap it for WBNB on Binance’s BNB chain. Furthermore,
            let us assume that the relayer has access to USDT liquidity on both
            chains. In this cross chain flow, the user will build a batched
            transaction where they send USDT to the relayer’s smart wallet on
            Ethereum Mainnet. After this is done, the relayer will run a
            verification protocol. The verification will assert that the
            contract states are correct, meaning that the user’s USDT balance
            has gone down by the amount they want to swap (plus fee) and that
            the relayer's balance has gone up by the swap amount (plus fee).
            Upon successful completion of this verification, the relayer will
            execute the destination chain transaction themselves and send the
            end WBNB from the relayer’s smart wallet to the user’s smart wallet
            address on BNB.
            <br />
            <br />
            In this flow the the relayer can be considered the source of
            liquidity on all chains that cross chain swaps go through. USDT will
            be a gateway asset that will be the source of liquidity on all
            supported chains. The net relayer’s balance of USDT on all chains
            remains constant here, but in a particular swap across two chains,
            the funds that the relayer uses on the destination chain’s tx will
            be balanced out by the funds they gain from the user on the origin
            chain.
          </Text>
        </AboutPageContentsWrapper>
      </AboutPageContentsConainer>
    </PageContainer>
  );
};

export default About;
