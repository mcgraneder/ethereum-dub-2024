//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import {IWallet} from "./interfaces/IWallet.sol";
import {IERC1271} from "./interfaces/IERC1271.sol";
import {SmartWalletHasher} from "./libraries/HasherLib.sol";
import {ERC20} from "solmate/src/tokens/ERC20.sol";
import "./BaseWalletState.sol";

abstract contract BaseWalletView is BaseWalletState {
  error SignatureExpired(string message);
  error InsufficentFeeAsset(string message);
  error InvalidWalletOpNonce(string message);
  error InvalidAllowanceOpNonce(string message);
  error InsufficentAllowance(string message);

  error InvalidBridgeOppNonce(string message);
  error InvalidSigChain(string message);
  error InvalidSignature(string message);
  error InvalidSigner(string message);

  address public constant bridgeVerifier = 0x11632F9766Ee9d9317F95562a6bD529652ead78f;

  function _verifyECDSAExecRequest(bytes memory signature, bytes32 hash, address claimedSigner) public view {
    if (claimedSigner.code.length > 0) {
      bytes4 magicValue = IERC1271(claimedSigner).isValidSignature(hash, signature);
      _verifySigner(magicValue);
    }
    if (claimedSigner.code.length == 0) {
      address signer;
      if (signature.length == 65) signer = extractEthClassicSig(signature, hash);
      else if (signature.length == 64) signer = extractEthCompactSig(signature, hash);
      else revert InvalidSigner("Signature length is Invalid");

      _verifySigner(signer);
    }
  }

  function _verifySigChain(uint256 _decodedSigChainID, ECDSAExec memory _walletExec) internal pure {
    if (_decodedSigChainID != _walletExec.sigChainID) revert InvalidSigChain("sig chain does not equal provided value");
  }

  function _verifyNonce(uint256 _nonceToCheck) internal view {
    if (_nonceToCheck != nonce()) revert InvalidWalletOpNonce("invalid nonce provided");
  }

  function _verifyAllowanceNonce(uint256 _nonceToCheck, uint256 _allowanceNonceFromMap) internal pure {
    if (_nonceToCheck != _allowanceNonceFromMap) revert InvalidWalletOpNonce("invalid nonce provided");
  }

  function _verifySignatureDeadline(uint256 _deadlineToCheck) internal view {
    if (block.timestamp >= _deadlineToCheck) revert SignatureExpired("permit signature has expired");
  }

  function _verifyFeeAssetBalance(address _feeAsset, uint256 gasCostInFeeAsset) internal view {
    if (ERC20(_feeAsset).balanceOf(owner()) < gasCostInFeeAsset) revert InsufficentFeeAsset("Inusefficent balance of fee asset");
  }

  function _verifySigner(address _claimedSigner) internal view {
    if (_claimedSigner == address(0)) revert InvalidSignature("Invalid Signature");
    if (_claimedSigner != state().owner) revert InvalidSigner("Signer is not Smart Wallet Owner");
  }

  function _verifySigner(bytes4 _claimedSigner) internal pure {
    if (_claimedSigner != IERC1271.isValidSignature.selector) revert InvalidSigner("Invalid Contract Signer");
  }

  function extractEthClassicSig(bytes memory signature, bytes32 hash) internal pure returns (address) {
    if (signature.length != 65) revert InvalidSignature("Classic sig len should be 65");
    (bytes32 r, bytes32 s) = abi.decode(signature, (bytes32, bytes32));
    uint8 v = uint8(signature[64]);
    address signer = ecrecover(hash, v, r, s);
    return signer;
  }

  function extractEthCompactSig(bytes memory signature, bytes32 hash) internal pure returns (address) {
    if (signature.length != 64) revert InvalidSignature("Compact sig len should be 64");
    (bytes32 r, bytes32 vs) = abi.decode(signature, (bytes32, bytes32));
    bytes32 s = vs & SmartWalletHasher.UPPER_BIT_MASK;
    uint8 v = uint8(uint256(vs >> 255)) + 27;
    address signer = ecrecover(hash, v, r, s);
    return signer;
  }
}
