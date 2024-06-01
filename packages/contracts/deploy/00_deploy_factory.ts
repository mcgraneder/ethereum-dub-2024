import type { DeployFunction } from "hardhat-deploy/types";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
// import { shouldVerifyContract } from "../utils/deploy";
// import { verify } from "../scripts/verifyContract";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();

  console.log("Deployer Address", deployer);

  const res = await deploy("SmartWalletFactory", {
    from: deployer,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    deterministicDeployment: "0x01",
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
