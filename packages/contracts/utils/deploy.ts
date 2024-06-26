import { ethers } from "hardhat";
import type { DeployResult } from "hardhat-deploy/dist/types";
import type { HardhatNetworkUserConfig, HardhatRuntimeEnvironment } from "hardhat/types";

let testChainId: number;

export const setTestChainId = (chainId: number): void => {
     testChainId = chainId;
};

export const getChainId = async (hre: HardhatRuntimeEnvironment): Promise<number> => {
     if (process.env.TEST || !!process.env.REPORT_GAS) {
          if (!testChainId) throw new Error("Should specify chain id of test");
          return testChainId;
     }
     if (process.env.FORK) return getRealChainIdOfFork(hre);
     return Number.parseInt(await hre.getChainId());
};

export const getRealChainIdOfFork = (hre: HardhatRuntimeEnvironment): number => {
     const config = hre.network.config as HardhatNetworkUserConfig;
     if (config.forking?.url.includes("eth")) return 1;
     if (config.forking?.url.includes("ftm") || config.forking?.url.includes("fantom")) return 250;
     if (config.forking?.url.includes("polygon")) return 137;
     throw new Error("Should specify chain id of fork");
};

export const shouldVerifyContract = async (deploy: DeployResult): Promise<boolean> => {
     if (process.env.REPORT_GAS || process.env.FORK || process.env.TEST) return false;
     if (!deploy.newlyDeployed || !deploy.receipt?.transactionHash) return false;
     const txReceipt = await ethers.provider.getTransaction(deploy.receipt.transactionHash);
     await txReceipt.wait(10);
     return true;
};
