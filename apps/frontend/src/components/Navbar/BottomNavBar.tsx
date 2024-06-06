import styled from "styled-components";
import Github from "../../../public/svgs/github.svg";
import { useViewport } from "~/hooks/useViewport";
import Identicon from "~/Identicon/Identicon";

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  -webkit-box-pack: justify;
  justify-content: space-between;
  position: fixed;
  bottom: 0px;
  z-index: 1000;
  /* background: black; */
`;

export const Nav = styled.nav`
  padding: 20px 12px;
  width: 100%;
  height: 60px;
  z-index: 2;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  background: ${(props: any) => props.backgroundColor};
`;

export const Box = styled.div`
  box-sizing: border-box;
  vertical-align: initial;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  overflow: hidden;
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
  overflow: hidden;
`;

export const BottomNavBar = () => {
  const { width } = useViewport();
  return (
    <Wrapper>
      <Nav>
        <Box>
          <BoxItemContainer
            allignment={"flex-start"}
            backgroundColor={width >= 1000 ? "rgb(15,26,58)" : "transparent"}
          >
            {width >= 800 && (
              <div className="flex items-center justify-center gap-2 px-4">
                <Identicon />
                <span className="mr-6 text-gray-500">
                  Created by Evan McGrane
                </span>
                <div className="flex items-center gap-2 hover:cursor-pointer">
                  <Github className={"text-white"} />

                  <a
                    className=" text-gray-500 no-underline hover:text-gray-400"
                    rel="noopener noreferrer"
                    href="https://github.com/mcgraneder"
                    target={"_blank"}
                  >
                    Github
                  </a>
                </div>
              </div>
            )}
          </BoxItemContainer>
          {/* <BoxItemContainer
              allignment={"flex-end"}
              backgroundColor={width >= 1000 ? "rgb(15,26,58)" : "transparent"}
            >
              <NetworkWarning />
            </BoxItemContainer> */}
        </Box>
      </Nav>
    </Wrapper>
  );
};

export default BottomNavBar;
