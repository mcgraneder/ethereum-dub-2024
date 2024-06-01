import { defaultAbiCoder } from "@ethersproject/abi";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Signer, Wallet, ethers } from "ethers";

import type { Address } from "viem";
import {
  buildContractSignature,
  buildSignature,
  buildSignatureBytes,
} from "./buildSignatures";
import {
  SignaturePartType,
  encodeSignature,
  optimize2SignersTopology,
} from "./encode";

export enum TxType {
  SourceChainOp = "SourceChainOp",
  DestinationChainOp = "DestinationChainOp",
}
export interface UserOp {
  to: Address;
  amount: bigint;
  data: Address;
}

export interface AllowanceOp {
  details: {
    token: Address;
    amount: bigint;
    expiration: bigint;
    nonce: bigint;
  }[];
  spender: Address;
  sigDeadline: bigint;
}

export const sign = async (
  userOps: UserOp[],
  bridgeOps: UserOp[],
  allowanceOp: AllowanceOp,
  nonce: bigint,
  account: SignerWithAddress,
  relayer: SignerWithAddress,
  sigChainId: number,
  chainId: number,
  bridgeChainID: number,
  verifyingContract: string,
  txType: TxType,
) => {
  const domain = {
    name: "ECDSAWallet",
    version: "0.0.1",
    chainId: chainId,
    verifyingContract,
  };

  const types = {
    AllowanceOp: [
      { name: "details", type: "AllowanceOpDetails[]" },
      { name: "spender", type: "address" },
      { name: "sigDeadline", type: "uint256" },
    ],
    AllowanceOpDetails: [
      { name: "token", type: "address" },
      { name: "amount", type: "uint160" },
      { name: "expiration", type: "uint48" },
      { name: "nonce", type: "uint48" },
    ],
    UserOp: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "chainId", type: "uint256" },
      { name: "data", type: "bytes" },
    ],
    ECDSAExec: [
      { name: "allowanceOp", type: "AllowanceOp" },
      { name: "userOps", type: "UserOp[]" },
      { name: "bridgeOps", type: "UserOp[]" },
      { name: "wallet", type: "address" },
      { name: "nonce", type: "uint256" },
      { name: "chainID", type: "uint256" },
      { name: "bridgeChainID", type: "uint256" },
      { name: "sigChainID", type: "uint256" },
    ],
  };
  const values = {
    allowanceOp: allowanceOp,
    userOps: userOps,
    bridgeOps,
    wallet: verifyingContract,
    nonce,
    chainID: chainId,
    bridgeChainID: bridgeChainID,
    sigChainID: sigChainId,
  };

  let s2;
  let signatures: string;
  let signatures2: string;

  const userSignature = buildSignature(
    account.address,
    await account._signTypedData(domain, types, values),
  );
  s2 = userSignature.data;
  signatures = buildSignatureBytes([userSignature]);
  // signatures2 = buildSignatureBytes([userSignature]);

  const relayerSignature = buildSignature(
    relayer.address,
    await relayer._signTypedData(domain, types, values),
  );

  const smartWalletSignature = buildContractSignature(
    verifyingContract,
    relayerSignature.data,
    // true,
  );
  signatures2 = buildSignatureBytes([
    relayerSignature,
    userSignature,
    smartWalletSignature,
  ]);

  const encodedSignaturesWithChainId = defaultAbiCoder.encode(
    ["uint256", "bytes"],
    [sigChainId, signatures],
  );

  const encodedSignaturesWithChainId2 = defaultAbiCoder.encode(
    ["uint256", "bytes"],
    [sigChainId, signatures2],
  );

  return {
    signature: encodedSignaturesWithChainId,
    values,
    s2: encodedSignaturesWithChainId2,
  };
};

export const signMessage = async (
  message: ethers.BytesLike,
): Promise<string> => {
  return this.signDigest(
    ethers.utils.keccak256(ethers.utils.arrayify(message)),
  );
};

export const signDigest = async (digest: ethers.BytesLike): Promise<string> => {
  const subdigest = ethers.utils.arrayify(
    subdigestOf(this.address, digest, this.options.chainId),
  );
  return this.signSubdigest(subdigest);
};

export const staticSubdigestSign = async (
  subdigest: ethers.BytesLike,
  useNoChainId = true,
): string => {
  const signatureType = useNoChainId
    ? SignatureType.NoChaindDynamic
    : this.options.encodingOptions?.signatureType;
  return encodeSignature(this.config, [], [ethers.utils.hexlify(subdigest)], {
    ...this.options.encodingOptions,
    signatureType,
  });
};

let LAST_CHECKPOINT = 0;

export const getConfig = (signerss: any) => {
  const options = {
    ...{
      address: signerss,
      signing: 1,
      idle: 0,
      topologyConverter: optimize2SignersTopology,
    },
  };

  const signersWeight = Array.isArray(options.signing)
    ? options.signing
    : new Array(options.signing).fill(0).map(() => 1);
  const idleWeight = Array.isArray(options.idle)
    ? options.idle
    : new Array(options.idle).fill(0).map(() => 1);

  const signers = signersWeight.map((s) =>
    isAnyStaticSigner(s) ? s : ethers.Wallet.createRandom(),
  );
  const idle = idleWeight.map(() =>
    ethers.utils.getAddress(ethers.utils.hexlify(ethers.utils.randomBytes(20))),
  );
  let cand = Math.floor(Date.now() / 1000);

  if (cand === LAST_CHECKPOINT) {
    cand++;
  }

  LAST_CHECKPOINT = cand;
  return {
    checkpoint: cand,
    threshold: 1,
    signers: signers
      .map((s, i) => ({
        address: s.address,
        weight: signersWeight[i],
      }))
      .concat(
        idle.map((s, i) => ({
          address: s,
          weight: idleWeight[i],
        })),
      ),
  };
};

export const signSubdigest = async (
  subdigest: ethers.BytesLike,
): Promise<string> => {
  const sigParts = await Promise.all(
    this.signers.map(async (s) => {
      if (isSequenceSigner(s)) {
        return {
          address: s.address,
          signature: await s.signDigest(subdigest).then((s) => s + "03"),
          type: SignaturePartType.Dynamic,
        };
      }

      return {
        address: await s.getAddress(),
        signature: await s.signMessage(subdigest).then((s) => s + "02"),
        type: SignaturePartType.Signature,
      };
    }),
  );

  return encodeSignature(
    this.config,
    sigParts,
    [],
    this.options.encodingOptions,
  );
};
