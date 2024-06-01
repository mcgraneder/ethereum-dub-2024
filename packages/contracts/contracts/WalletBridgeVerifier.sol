// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./BaseWallet.sol";

import "./interfaces/IWallet.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
import {IERC1271} from "./interfaces/IERC1271.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract WalletBridgeVerifier {
  // here we combine the uniswap permitbatch allowance ransfer operation with
  // another struct op which holds the calldata or batched txs in an array.
  // the smart wallet uses permit to transfer uses tokens to custody of users wallet. then the
  // ops proceed to run as being evoked by the relayer (Smart Wallet Factory Deployer) and called
  //by users sw as msg.sender.
  bytes32 constant UPPER_BIT_MASK = (0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
  using ECDSAUpgradeable for bytes32;

  // Function to verify external data
  function verifyBridgeReq(bytes calldata _encodedWalletExec, bytes calldata sig) external {
    IWallet.ECDSAExec memory walletExec = abi.decode(_encodedWalletExec, (IWallet.ECDSAExec));
    address walletOwner = walletExec.wallet;
    uint256 nonce = walletExec.nonce;

    ECDSAWallet f = ECDSAWallet(payable(walletOwner));
    bytes32 domain = f.domainSeperator(walletExec.sigChainID);

    (address claimedSigner, bytes32 dataHash, bytes memory signature, address wallet, uint256 _nonce) = f.validationResultsMap(nonce);
    (uint256 _decodedSigChainID, bytes memory _sig) = abi.decode(sig, (uint256, bytes));
    (uint256 _decodedSigChainID1, bytes memory _signature) = abi.decode(signature, (uint256, bytes));
    //     require(waletOwnerRecoveryEvents.length > 0, "Array is empty");
    console.log(walletOwner);
    //     RecoveryDetails memory recoveryInfo = waletOwnerRecoveryEvents[uint(waletOwnerRecoveryEvents.length - 1)];
    console.log(ECDSAWallet(payable(walletOwner)).owner(), walletExec.sigChainID);
    //make sure recieved data matches log
    _ecdasRecovery(_signature, dataHash, walletOwner, address(this));
    //     //     compareStructs(walletExec);
    //     bytes32 h = blockhash(block.number - 1);
    //     console.logBytes32(h);
    verifySigner(_signature, dataHash, domain);
  }

  function verifySigner(bytes memory _sig, bytes32 _dataHash, bytes32 _domainSeparator) internal pure returns (address) {
    // Recover the signer's address from the signature and the reconstructed typed data
    address signer = ECDSA.recover(keccak256(abi.encodePacked("\x19\x01", _domainSeparator, _dataHash)), _sig);
    require(signer != address(0), "Invalid signer");
    return signer;
  }

  function _ecdasRecovery(bytes memory signature, bytes32 hash, address claimedSigner, address wallet) public {
    bytes32 r;
    bytes32 s;
    uint8 v;

    if (claimedSigner.code.length == 0) {
      if (signature.length == 65) {
        (r, s) = abi.decode(signature, (bytes32, bytes32));
        v = uint8(signature[64]);
      } else if (signature.length == 64) {
        // EIP-2098
        bytes32 vs;
        (r, vs) = abi.decode(signature, (bytes32, bytes32));
        s = vs & UPPER_BIT_MASK;
        v = uint8(uint256(vs >> 255)) + 27;
      } else {
        revert("Signature length is Invalid");
      }
      address signer = ecrecover(hash, v, r, s);
      console.log(signer);
      if (signer == address(0)) revert("Invalid Signature");
      if (signer != claimedSigner) revert("Signer is not Smart Wallet Owner");
    } else {
      bytes4 magicValue = IERC1271(claimedSigner).isValidSignature(hash, signature);
      console.log("cccccc");
      if (magicValue != IERC1271.isValidSignature.selector) revert("Signer is not a valid contract signer");
    }
  }

  function compareStructs(IWallet.ECDSAExec memory originalData, IWallet.ECDSAExec memory recoveredData) internal pure returns (bool) {
    if (originalData.allowanceOp.sigDeadline != recoveredData.allowanceOp.sigDeadline) {
      return false;
    }

    if (originalData.allowanceOp.spender != recoveredData.allowanceOp.spender) {
      return false;
    }

    if (originalData.userOps.length != recoveredData.userOps.length) {
      return false;
    }

    for (uint256 i = 0; i < originalData.userOps.length; i++) {
      if (originalData.userOps[i].to != recoveredData.userOps[i].to) {
        return false;
      }
      if (originalData.userOps[i].amount != recoveredData.userOps[i].amount) {
        return false;
      }
      if (originalData.userOps[i].chainId != recoveredData.userOps[i].chainId) {
        return false;
      }
    }

    return true;
  }
}
