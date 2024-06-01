// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import {IWallet} from "../interfaces/IWallet.sol";

library SignatureBuilder {
  function buildSignatureBytes(IWallet.Signature[] memory sigs) internal pure returns (bytes memory) {
    uint256 SIGNATURE_LENGTH_BYTES = 65;

    bytes memory signatureBytes;
    bytes memory dynamicBytes;
    IWallet.Signature[] memory signatures = sortSignatures(sigs);

    for (uint256 i = 0; i < signatures.length; i++) {
      IWallet.Signature memory signature = signatures[i];
      if (signature.dynamic) {
        // Calculate dynamic part position
        bytes memory dynamicPartPosition = abi.encodePacked(signatures.length * SIGNATURE_LENGTH_BYTES + dynamicBytes.length / 2, bytes1(0x00));
        bytes memory dynamicPartLength = abi.encodePacked(slice0x(signature.signatureData).length);
        // Construct static part of the signature
        bytes memory staticSignature = abi.encodePacked(padWithZeros(abi.encodePacked(signature.signer), 32), dynamicPartPosition);
        bytes memory dynamicPartWithLength = abi.encodePacked(dynamicPartLength, slice0x(signature.signatureData));

        dynamicBytes = abi.encodePacked(dynamicBytes, dynamicPartWithLength);
        signatureBytes = abi.encodePacked(signatureBytes, staticSignature);
      } else {
        // If signature is not dynamic, directly concatenate signature data to signatureBytes
        signatureBytes = abi.encodePacked(signatureBytes, signature.signatureData);
      }
    }

    return abi.encodePacked(signatureBytes, dynamicBytes);
  }

  function padWithZeros(bytes memory input, uint256 length) internal pure returns (bytes memory) {
    if (input.length >= length) return input; // No padding needed, return input string

    uint256 zerosToPad = length - input.length;
    bytes memory paddedString = abi.encodePacked(bytes(new string(zerosToPad)), input);
    return paddedString;
  }

  function slice0x(bytes memory data) internal pure returns (bytes memory) {
    require(data.length >= 2, "Invalid input data");

    bytes memory slicedData = new bytes(data.length - 2);
    for (uint8 i = 2; i < data.length; i++) slicedData[i - 2] = data[i];
    return slicedData;
  }

  function slice16(bytes memory data) internal pure returns (bytes memory) {
    require(data.length >= 4, "Invalid input data");

    bytes memory slicedData = new bytes(data.length - 4);
    for (uint8 i = 4; i < data.length; i++) slicedData[i - 4] = data[i];
    return slicedData;
  }

  function sortSignatures(IWallet.Signature[] memory signatures) internal pure returns (IWallet.Signature[] memory) {
    uint256 n = signatures.length;
    for (uint256 i = 0; i < n - 1; i++) {
      for (uint256 j = 0; j < n - i - 1; j++) {
        // Compare the lowercased string representations of the signers
        if (signatures[j].signer > signatures[j + 1].signer) {
          IWallet.Signature memory temp = signatures[j];
          signatures[j] = signatures[j + 1];
          signatures[j + 1] = temp;
        }
      }
    }
    return signatures;
  }

  function signatureSplit(bytes memory signatures, uint256 pos) internal pure returns (uint8 v, bytes32 r, bytes32 s) {
    assembly {
      let signaturePos := mul(0x41, pos)
      r := mload(add(signatures, add(signaturePos, 0x20)))
      s := mload(add(signatures, add(signaturePos, 0x40)))
      v := byte(0, mload(add(signatures, add(signaturePos, 0x60))))
    }
  }
}
