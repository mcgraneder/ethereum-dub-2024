import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDownCircle } from "react-feather";
import styled from "styled-components";
import { fadeIn } from "../../utils/fadeIn.";
import AssetRotator from "../AssetRotator/AssetRotator";
import { StyledSubTitle, StyledTitle } from "../CSS/HomePage.styles";
import Section2 from "./MiddleSection";

const LearnMoreArrow = styled(ArrowDownCircle)`
  margin-left: 14px;
  size: 20px;
  color: rgb(116, 132, 224);
  &:hover {
    color: rgb(95, 111, 201);
    cursor: pointer;
  }
`;

const DARK_MODE_GRADIENT =
  "radial-gradient(101.8% 4091.31% at 0% 0%, #4673FA 0%, #9646FA 100%)";

const Home = () => {
  const scrollPosition = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({
      top: 820,
      behavior: "smooth",
    });
  };
  return (
    <div className="text-bold overflow-x-hidden overflow-y-hidden px-0 text-white backdrop-blur-lg md:px-10 ">
      <div className="mx-0 my-auto flex min-h-screen flex-col  items-center justify-center ">
        <motion.div
          variants={fadeIn("down", 0.01)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.3 }}
          // transition={{ duration: 0.2}}
          className="mx-auto my-0 mb-12 flex flex-col items-center justify-center gap-12"
        >
          <AssetRotator />
        </motion.div>
        <div>
          <motion.div
            variants={fadeIn("up", 0.01)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.3 }}
            // transition={{ duration: 0.2}}
            className="mx-auto my-0 mt-4 flex flex-col items-center justify-center"
          >
            <StyledTitle size={55} margin={0} weight={800} align={"center"}>
              Trade and Bridge crypto assets seamlessly.
            </StyledTitle>

            <StyledSubTitle size={20}>
              <span className="text-gray-400">
                Take advantage of ultra fast cross chain swaps
                <br /> and pay in gas in any token you want
              </span>
            </StyledSubTitle>

            <div className="mt-4 flex flex-col gap-2">
              <Link
                href={"/"}
                passHref
                className="focus-visible:ring-primary my-4 flex w-[260px] items-center justify-center rounded-2xl bg-[rgb(116,132,224)] px-4 py-[14px] text-white hover:bg-[rgb(95,111,201)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                <span>Learn More</span>
              </Link>
            </div>
            <LearnMoreArrow onClick={scrollPosition} />
          </motion.div>
        </div>
      </div>

      <Section2 />
    </div>
  );
};

export default Home;
