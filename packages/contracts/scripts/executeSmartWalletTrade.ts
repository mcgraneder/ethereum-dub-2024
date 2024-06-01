import {
  JsonRpcProvider,
  type TransactionReceipt,
} from "@ethersproject/providers";
import { getV2Subgraphs, getV3Subgraphs } from "@pancakeswap/chains";
import {
  MaxAllowanceTransferAmount,
  PERMIT_EXPIRATION,
  PERMIT_SIG_EXPIRATION,
  toDeadline,
} from "@pancakeswap/permit2-sdk";
import {
  CurrencyAmount,
  ERC20Token,
  Percent,
  TradeType,
  type ChainId,
} from "@pancakeswap/sdk";
import {
  SMART_ROUTER_ADDRESSES,
  SmartRouter,
  SwapRouter,
  type SmartRouterTrade,
} from "@pancakeswap/smart-router";
import chalk from "chalk";
import type { PopulatedTransaction, ethers } from "ethers";
import hre from "hardhat";
import type { HttpNetworkConfig } from "hardhat/types";
import { formatUnits, hexToBigInt, maxUint256, type Address } from "viem";
import {
  ECDSAWalletFactory__factory,
  ECDSAWallet__factory,
  ERC20__factory,
} from "../typechain-types";
import { Deployments } from "../utils/deploymentUtils";
import { sign } from "../utils/sign";
import type { AllowanceOp, UserOp } from "../utils/types";
import { sleep } from "./deploySmartWallet";
import { getViemClient } from "./utils/client";

async function main(config: ScriptConfig) {
  const chainId = 97;
  const bridgeChainId = 97;
  const sigChainId = 421614;

  const { getNamedAccounts, deployments, network } = hre;
  const { get } = deployments;
  const { deployer, user } = await getNamedAccounts();

  const provider = new JsonRpcProvider(
    hre.config.networks[hre.network.name] as HttpNetworkConfig,
  );

  const providerSigChain = new JsonRpcProvider(
    hre.config.networks["arbitrumSepoilla"] as HttpNetworkConfig,
  );

  const signers = hre.network.config.accounts as string[];

  console.log(
    chalk.yellow(
      "Setting up Contracts and Network Config",
      user,
      hre.network.name,
    ),
  );
  await sleep(1500);

  const userWalletSignerSigChain = new hre.ethers.Wallet(
    signers[2],
    providerSigChain,
  );
  // console.log(userWalletSignerSigChain, userWalletSigner);
  const userWalletSigner = new hre.ethers.Wallet(signers[2], provider);
  const smartWalletSigner = new hre.ethers.Wallet(signers[1], provider);
  console.log(userWalletSignerSigChain, userWalletSigner);

  const factory = await get("ECDSAWalletFactory");
  const smartWalletFactory = ECDSAWalletFactory__factory.connect(
    factory.address,
    smartWalletSigner,
  );

  const userSmartWalletAddress = await smartWalletFactory
    .connect(userWalletSigner)
    .walletAddress(user, BigInt(0));
  const userSmartWallet = ECDSAWallet__factory.connect(
    userSmartWalletAddress,
    provider,
  );

  console.log(userSmartWalletAddress);

  const userWalletContractCode = await provider.getCode(userSmartWalletAddress);
  if (userWalletContractCode === "0x") {
    console.log(
      chalk.yellow(
        `Smart wallet not deployed for ${userWalletSigner.address}, please run deloySmartWallet.ts`,
      ),
    );
    return;
  }

  const CakeContract = ERC20__factory.connect(
    Deployments[chainId].Cake,
    provider,
  );
  const BusdContract = ERC20__factory.connect(
    Deployments[chainId].Busd,
    provider,
  );

  const CAKE = new ERC20Token(
    chainId,
    CakeContract.address as Address,
    await CakeContract.decimals(),
    //     await CakeContract.name(),
    await CakeContract.symbol(),
  );
  const BUSD = new ERC20Token(
    chainId,
    BusdContract.address as Address,
    await BusdContract.decimals(),
    //     await BusdContract.name(),
    await BusdContract.symbol(),
  );

  const baseAsset = config.baseAsset === CAKE.symbol ? CAKE : BUSD;
  const quoteAsset = config.quoteAsset === CAKE.symbol ? CAKE : BUSD;
  const feeAsset = config.feeAsset === CAKE.symbol ? CAKE : BUSD;
  const amountIn = CurrencyAmount.fromRawAmount(baseAsset, config.amountIn);

  const [
    userCakeBalanceBefore,
    deployerCakeBalanceBefore,
    userBusdBalanceBefore,
    deployerBusdBalanceBefore,
  ] = await Promise.all([
    CakeContract.balanceOf(user),
    CakeContract.balanceOf(deployer),
    BusdContract.balanceOf(user),
    BusdContract.balanceOf(deployer),
  ]);
  console.log(
    chalk.yellow(
      `\nSwapping from CAKE to BUSD on ${network.name} network.
            User CAKE balance: ${formatBalance(userCakeBalanceBefore)},
            Relayer CAKE balance: ${formatBalance(deployerCakeBalanceBefore)}
            User BUSD balance: ${formatBalance(userBusdBalanceBefore)},
            Relayer BUSD balance: ${formatBalance(deployerBusdBalanceBefore)}
            Proceeding to Build Permit tx\n\n`,
    ),
  );
  await sleep(1000);

  const permit2Address = userSmartWalletAddress as Address;
  if (
    (await BusdContract.allowance(user, permit2Address)).toBigInt() <
    amountIn.quotient
  ) {
    console.log(chalk.yellow("Making One time approval for CAKE..."));
    const busdApproval = await BusdContract.connect(userWalletSigner).approve(
      permit2Address,
      maxUint256,
    );
    await busdApproval.wait(1);
  }
  if (
    (await CakeContract.allowance(user, permit2Address)).toBigInt() <
    amountIn.quotient
  ) {
    console.log(chalk.yellow("Making One time approval for BUSD..."));
    const cakeApproval = await CakeContract.connect(userWalletSigner).approve(
      permit2Address,
      maxUint256,
    );
    await cakeApproval.wait(1);
  }

  const allowance = await userSmartWallet.allowance(
    user,
    baseAsset.address,
    userSmartWalletAddress,
  );
  const allowance2 = await userSmartWallet.allowance(
    user,
    feeAsset.address,
    userSmartWalletAddress,
  );
  const permitDetails: AllowanceOp = {
    details: [
      {
        token: baseAsset.address,
        amount: MaxAllowanceTransferAmount,
        expiration: BigInt(toDeadline(PERMIT_EXPIRATION)),
        nonce: BigInt(allowance.nonce),
      },
      // second permit is always for fee
      {
        token: feeAsset.address,
        amount: MaxAllowanceTransferAmount,
        expiration: BigInt(toDeadline(PERMIT_EXPIRATION)),
        nonce:
          feeAsset.address === baseAsset.address
            ? BigInt(allowance2.nonce + 1)
            : BigInt(allowance2.nonce), // only increment if both permits are same asset
      },
    ],
    spender: permit2Address,
    sigDeadline: BigInt(toDeadline(PERMIT_SIG_EXPIRATION)),
  };

  const gasPrice = (await provider.getGasPrice()).toBigInt();
  let transferToWalletTx: PopulatedTransaction;
  try {
    transferToWalletTx = await userSmartWallet
      .connect(smartWalletSigner)
      .populateTransaction.transferFrom(
        user,
        permit2Address,
        amountIn.quotient,
        baseAsset.address,
      );
  } catch (error) {
    console.log(chalk.red("Transaction failed at the permit transfer step"));
    throw new Error(parseContractError(error));
  }

  console.log(
    chalk.yellow(
      "Permit transfer build successfully,..Proceeding to build V3 smart router trade\n\n",
    ),
  );
  await sleep(1000);

  const quoteProvider = SmartRouter.createQuoteProvider({
    onChainProvider: () => getViemClient({ chainId }) as never,
  });

  let bestTradeRoute: SmartRouterTrade<TradeType>;
  try {
    const [v2Pools, v3Pools] = await Promise.all([
      SmartRouter.getV2CandidatePools({
        onChainProvider: () => getViemClient({ chainId }),
        v2SubgraphProvider: () => getV2Subgraphs({})[chainId as never],
        v3SubgraphProvider: () => getV3Subgraphs({})[chainId],
        currencyA: baseAsset,
        currencyB: quoteAsset,
      } as never),
      SmartRouter.getV3CandidatePools({
        onChainProvider: () => getViemClient({ chainId }),
        subgraphProvider: () => getV3Subgraphs({})[chainId],
        currencyA: baseAsset,
        currencyB: quoteAsset,
        subgraphFallback: true,
      } as never),
    ]);
    const pools = [...v2Pools, ...v3Pools];

    bestTradeRoute = (await SmartRouter.getBestTrade(
      amountIn,
      quoteAsset,
      TradeType.EXACT_INPUT,
      {
        gasPriceWei: await getViemClient({ chainId }).getGasPrice(),

        maxHops: 2,
        maxSplits: 2,
        poolProvider: SmartRouter.createStaticPoolProvider(pools),
        quoteProvider,
        quoterOptimization: true,
      },
    )) as SmartRouterTrade<TradeType>;
  } catch (error) {
    console.log(
      chalk.red("Transaction failed at the smart router build step"),
      error,
    );
    throw new Error(parseContractError(error));
  }

  console.log(
    chalk.yellow(
      "V3 Trade built successfully,..Proceeding to build and execute Smart Wallet Operations\n\n",
    ),
  );
  await sleep(1000);

  const routerAddress = SMART_ROUTER_ADDRESSES[chainId];
  const rawApprovalTx = await CakeContract.connect(
    smartWalletSigner,
  ).populateTransaction.approve(routerAddress, amountIn.quotient);

  const rawV3TradeTx = SwapRouter.swapCallParameters(bestTradeRoute, {
    recipient: user as Address,
    slippageTolerance: new Percent(1),
  });
  const smartWalletOperations = [
    {
      to: transferToWalletTx.to,
      amount: BigInt(0),
      chainId: BigInt(chainId),
      data: transferToWalletTx.data,
    },
    {
      to: rawApprovalTx.to,
      amount: BigInt(0),
      chainId: BigInt(chainId),
      data: rawApprovalTx.data,
    },
    {
      to: routerAddress,
      amount: hexToBigInt(rawV3TradeTx.value),
      chainId: BigInt(chainId),
      data: rawV3TradeTx.calldata,
    },
  ] as UserOp[];

  const bridgeOps = [] as UserOp[];
  console.log(bridgeOps, userSmartWalletAddress);

  const currentWalletTxNonce = await userSmartWallet?.nonce();
  const smartWalletSignature = await sign(
    smartWalletOperations,
    bridgeOps,
    permitDetails,
    currentWalletTxNonce.toBigInt(),
    userWalletSignerSigChain,
    await userWalletSigner.getChainId(),
    await userWalletSigner.getChainId(),
    Number(bridgeChainId),
    userSmartWalletAddress,
  );

  let smartWalletTxReceipt: TransactionReceipt;
  try {
    const smartWallTxGas = await userSmartWallet
      .connect(smartWalletSigner)
      .estimateGas.exec(
        smartWalletSignature.values,
        smartWalletSignature.signature,
      );

    const rawSmartWalletTx = await userSmartWallet
      .connect(smartWalletSigner)
      .populateTransaction.exec(
        smartWalletSignature.values,
        smartWalletSignature.signature,
        {
          gasLimit: smartWallTxGas,
          gasPrice,
        },
      );

    const deployerTransaction =
      await smartWalletSigner.sendTransaction(rawSmartWalletTx);
    smartWalletTxReceipt = await deployerTransaction.wait(1);
  } catch (error) {
    console.log(
      chalk.red("Transaction failed at the smart router build step"),
      error,
    );
    throw new Error(parseContractError(error));
  }

  const [
    userCakeBalanceAfter,
    deployerCakeBalanceAfter,
    userBusdBalanceAfter,
    deployerBusdBalanceAfter,
  ] = await Promise.all([
    CakeContract.balanceOf(user),
    CakeContract.balanceOf(deployer),
    BusdContract.balanceOf(user),
    BusdContract.balanceOf(deployer),
  ]);
  console.log(
    chalk.green(
      `\nSuccessfully swaped from 5 CAKE to BUSD on ${network.name} network\n.
            User CAKE balance before/after: ${formatBalance(userCakeBalanceBefore)} / ${formatBalance(userCakeBalanceAfter)},
            Relayer CAKE balance before/after: ${formatBalance(deployerCakeBalanceBefore)} / ${formatBalance(deployerCakeBalanceAfter)}
            User BUSD balance before/after: ${formatBalance(userBusdBalanceBefore)} / ${formatBalance(userBusdBalanceAfter)},
            Relayer BUSD balance before/after: ${formatBalance(deployerBusdBalanceBefore)} / ${formatBalance(deployerBusdBalanceAfter)}
            \nTransaction Hash: ${smartWalletTxReceipt.transactionHash}\n\n`,
    ),
  );
}

const formatBalance = (b: ethers.BigNumber) =>
  Number(formatUnits(b.toBigInt(), 18)).toFixed(3);
type ScriptConfig = {
  baseAsset: string;
  quoteAsset: string;
  feeAsset: string;
  amountIn: bigint;
};

function parseContractError<T>(err: T): string {
  return (
    err as {
      reason: string;
    }
  ).reason;
}

main({
  baseAsset: "CAKE",
  quoteAsset: "BUSD",
  feeAsset: "CAKE",
  amountIn: BigInt(1 * 10 ** 18),
}).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
