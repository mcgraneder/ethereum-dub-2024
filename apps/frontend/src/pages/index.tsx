import type { NextPage } from "next";
import Home from "../components/LandingHome/Home";
import { Layout } from "../layouts";

const HomePage: NextPage = () => {
  return (
    <>
      <Layout>
        <Home />
      </Layout>
    </>
  );
};

export default HomePage;
