import { UilAngleDown } from "@iconscout/react-unicons";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useViewport } from "~/hooks/useViewport";
import AstralLogo from "../../../public/images/astralLogo.png";
import MetamaskIcon from "../../../public/svgs/metamask-fox.svg";
import { shortenAddress } from "../../utils/misc";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { useRouter } from "next/router";

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0px;
  z-index: 100;
  /* background: rgb(12, 18, 43); */

  ${(props: any) =>
    props.isNavbarDark &&
    css`
      background: rgb(12, 18, 43);
    `}
`;

export const Nav = styled.nav`
  padding: 20px 12px;
  width: 100%;
  height: 72px;
  z-index: 2;
  box-sizing: border-box;
  display: block;
`;

export const Box = styled.div`
  box-sizing: border-box;
  vertical-align: initial;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
`;

export const BoxItemContainer = styled.div`
  box-sizing: border-box;
  vertical-align: initial;
  -webkit-tap-highlight-color: transparent;
  justify-content: ${(props: any) => props.allignment};
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  width: 100%;
  align-items: center;
`;

export const Navbar = () => {
  const [isNavbarDark, setIsNavbarDark] = useState(false);
  const { address: account, isConnected: active } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { width } = useViewport();
  const { push } = useRouter();

  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setIsNavbarDark(true);
    } else {
      setIsNavbarDark(false);
    }
  };

  const closeConnection = useCallback(() => {
    disconnect();
    push("/");
  }, [push, disconnect]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  });

  return (
    <Wrapper isNavbarDark={isNavbarDark}>
      <Nav>
        <Box>
          <BoxItemContainer allignment={"flex-start"}>
            {width >= 1000 && (
              <div className="mr-5 flex h-full items-center gap-2 ">
                <Image alt="" src={AstralLogo} className="mx-4 h-10 w-10 " />
              </div>
            )}
          </BoxItemContainer>

          <BoxItemContainer allignment={"flex-end"}>
            <div className="mr-5 flex  h-full items-center">
              <PrimaryButton
                className="mt-[2px] bg-blue-500 py-[6px] hover:bg-blue-600"
                onClick={async () => {
                  !active
                    ? connect({ connector: connectors[0] })
                    : closeConnection();
                }}
              >
                <span className="xs:block mr-2 hidden">
                  {active ? shortenAddress(account) : "Connect"}
                </span>
                <span className="xs:block mr-2 hidden">|</span>
                {active ? (
                  <Image
                    src={MetamaskIcon}
                    alt="Alert Image"
                    height={16}
                    width={16}
                    unoptimized
                  />
                ) : (
                  <UilAngleDown className={"h-5 w-5"} />
                )}
              </PrimaryButton>
            </div>
          </BoxItemContainer>
        </Box>
      </Nav>
    </Wrapper>
  );
};

export default Navbar;
