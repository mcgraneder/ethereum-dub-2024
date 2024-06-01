import { ethers } from "hardhat";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import type {
  BaseWalletFactory,
  BaseWalletFactory__factory,
  SmartWalletFactory__factory,
  BaseWallet,
} from "../typechain-types";
import type {
  ABC,
  XYZ,
} from "../typechain-types/contracts/utils/MockERC20s.sol";

describe("SmartWallet", () => {
  // Users
  let ALICE: SignerWithAddress;
  let BOB: SignerWithAddress;

  // Owner
  let OWNER: SignerWithAddress;

  // Forwarder
  let factory: BaseWalletFactory;
  let wallet: BaseWalletFactory;

  // Wallets
  let aliceWallet: BaseWallet;
  let bobWallet: BaseWallet;

  let abc: ABC;
  let xyz: XYZ;

  before(async () => {
    [OWNER, ALICE, BOB] = await ethers.getSigners();

    console.log("owner", OWNER.address);
    console.log("ALICE", ALICE.address);

    // deploy token
    const ABC = await ethers.getContractFactory("ABC");
    abc = (await ABC.deploy()) as ABC;
    await abc.deployed();

    // deploy XYZ
    const XYZ = await ethers.getContractFactory("XYZ");
    xyz = (await XYZ.deploy()) as XYZ;
    await xyz.deployed();

    // deploy Wallet implementation
    const Wallet = (await ethers.getContractFactory(
      "SmartWalletFactory",
    )) as SmartWalletFactory__factory;

    const wallet = await Wallet.connect(OWNER).deploy();
    await wallet.connect(OWNER).deployed();

    // deploy WalletFactory
    const WalletFactory = (await ethers.getContractFactory(
      "BaseWalletFactory",
    )) as BaseWalletFactory__factory;
    factory = await WalletFactory.connect(OWNER).deploy(wallet.address);
    await factory.connect(OWNER).deployed();
    // Setup user accounts
    await abc.transfer(ALICE.address, "100000000000000000000");
    await xyz.transfer(ALICE.address, "1000000000000000000000000");
  });

  // ----- UPDATE PARNER -----
  it("User should be able to create a wallet for themselves.", async () => {
    const aliceWalletAddress = await factory.walletAddress(OWNER.address, 0);
    await factory.createWallet(OWNER.address);
    aliceWallet = (await ethers.getContractAt(
      "BaseWallet",
      aliceWalletAddress,
    )) as BaseWallet;
    expect(await aliceWallet.owner()).to.equal(OWNER.address);
  });

  it("User should be able to create a wallet for someone else.", async () => {
    await factory.connect(ALICE).createWallet(BOB.address);
    const bobWalletAddress = await factory.walletAddress(BOB.address, 0);
    bobWallet = (await ethers.getContractAt(
      "BaseWallet",
      bobWalletAddress,
    )) as BaseWallet;
    expect(await bobWallet.owner()).to.equal(BOB.address);
  });
});
