import type { HardhatRuntimeEnvironment } from "hardhat/types";
import type { DeployFunction } from "hardhat-deploy/types";
import { Deployments } from "../utils/deploymentUtils";
import type { ChainId } from "@pancakeswap/sdk";
// import { shouldVerifyContract } from "../utils/deploy";
// import { verify } from "../scripts/verifyContract";
// import { deployThroughDeterministicFactory } from "@mean-finance/deterministic-factory/utils/deployThroughDeterministicFactory";
// import { SmartWalletFactory__factory } from "../typechain-types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deploy } = hre.deployments;
  const { relayer: deployer } = await hre.getNamedAccounts();
  const chainId = Number(await hre.getChainId()) as ChainId;

  console.log("Deployer Address", deployer);

  const WETH9 = Deployments[chainId].WETH9;
  const pancakeSwapV2Facotry = Deployments[chainId].PancakeSwapV2Facotry;
  const pancakeSwapV3Facotry = Deployments[chainId].PancakeSwapV3Facotry;

  const feeAssets = [
    Deployments[chainId].Cake,
    Deployments[chainId].Busd,
    Deployments[chainId].WETH9,
  ];

  const res = await deploy("SmartWalletFactory", {
    from: deployer,
    args: [pancakeSwapV2Facotry, pancakeSwapV3Facotry, WETH9, feeAssets],
    log: true,
    // skipIfAlreadyDeployed: true,
    // deterministicDeployment: true,
  });

  console.log("SmartWalletFactory Address", res.address);
  console.log("checking if contracct should be verified");

  //      const shouldVerify = await shouldVerifyContract(res);
  //      if (shouldVerify) {
  //           console.log("verifyng contract...");

  //           await verify({
  //                name: "SmartWalletFactory",
  //                path: "contracts/SmartWalletFactory.sol:SmartWalletFactory",
  //           });
  //           console.log("sucessuflly verified SmartWalletFactory");
  //      }
  //      console.log("contract does not need t be verified");
};
export default func;

func.tags = ["SmartWalletFactory"];
