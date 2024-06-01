// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IWallet} from "../interfaces/IWallet.sol";

// here we combine the uniswap permitbatch allowance ransfer operation with
// another struct op which holds the calldata or batched txs in an array.
// the smart wallet uses permit to transfer uses tokens to custody of users wallet. then the
// ops proceed to run as being evoked by the relayer (Smart Wallet Factory Deployer) and called
//by users sw as msg.sender.

// Originlly hashing logoc was hsted in ECDSAWallet but abstracted it to q lin here because the
// bridge verifier needs access to the hashes to verify signed data. also having it as a lib allows
// more people to access the same hasing utils that an owner uses on their own days
library SmartWalletHasher {
  error InvalidDomain(string message);

  bytes32 public constant UPPER_BIT_MASK = (0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);

  bytes32 public constant USER_OP_TYPE_HASH = keccak256("UserOp(address to,uint256 amount,uint256 chainId,bytes data)");

  bytes32 public constant ALLOWANCE_DETAILS_OP_TYPE_HASH =
    keccak256("AllowanceOpDetails(address token,uint160 amount,uint48 expiration,uint48 nonce)");

  bytes32 public constant ALLOWANCE_OP_BATCH_TYPE_HASH =
    keccak256(
      "AllowanceOp(AllowanceOpDetails[] details,address spender,uint256 sigDeadline)AllowanceOpDetails(address token,uint160 amount,uint48 expiration,uint48 nonce)"
    );
  bytes32 private constant _TYPEHASH =
    keccak256(
      "ECDSAExec(AllowanceOp allowanceOp,UserOp[] userOps,UserOp[] bridgeOps,address wallet,uint256 nonce,uint256 chainID,uint256 bridgeChainID,uint256 sigChainID)AllowanceOp(AllowanceOpDetails[] details,address spender,uint256 sigDeadline)AllowanceOpDetails(address token,uint160 amount,uint48 expiration,uint48 nonce)UserOp(address to,uint256 amount,uint256 chainId,bytes data)"
    );

  function hash(IWallet.ECDSAExec memory _walletExec) internal pure returns (bytes32) {
    uint256 _bridgeChainId = _walletExec.bridgeChainID;
    uint256 _chainId = _walletExec.chainID;
    return
      keccak256(
        abi.encode(
          _TYPEHASH,
          hash(_walletExec.allowanceOp),
          hash(_walletExec.userOps, _chainId),
          hash(_walletExec.bridgeOps, _bridgeChainId),
          _walletExec.wallet,
          _walletExec.nonce,
          _chainId,
          _bridgeChainId,
          _walletExec.sigChainID
        )
      );
  }

  // extra custom functionality for this contract impl
  // prettier-ignore
  function hash(IWallet.UserOp[] memory _userOps, uint256 _domainChainId) internal pure returns (bytes32) {
    bytes32[] memory opHashes = new bytes32[](_userOps.length);

    for (uint256 i = 0; i < _userOps.length; i++) {
      verifyOperationDomain(_userOps[i].chainId, _domainChainId);

      opHashes[i] = keccak256(
        abi.encode(
            USER_OP_TYPE_HASH, 
            _userOps[i].to, 
            _userOps[i].amount, 
            _userOps[i].chainId, 
            keccak256(_userOps[i].data)
            )
      );
    }
    return keccak256(abi.encodePacked(opHashes));
  }

  // prettier-ignore
  function hash(IWallet.AllowanceOp memory allowanceOps) internal pure returns (bytes32) {
    bytes32[] memory allowanceHashes = new bytes32[](allowanceOps.details.length);

    for (uint256 i = 0; i < allowanceOps.details.length; ++i) {
      allowanceHashes[i] = _hashAllowanceDetails(allowanceOps.details[i]);
    }
    return
      keccak256(
        abi.encode(
            ALLOWANCE_OP_BATCH_TYPE_HASH, 
            keccak256(
                  abi.encodePacked(allowanceHashes)), 
                  allowanceOps.spender, 
                  allowanceOps.sigDeadline
            )
      );
  }

  function _hashAllowanceDetails(IWallet.AllowanceOpDetails memory details) private pure returns (bytes32) {
    return keccak256(abi.encode(ALLOWANCE_DETAILS_OP_TYPE_HASH, details));
  }

  function verifyOperationDomain(uint256 _opChainId, uint256 _domainChainId) private pure {
    if (_opChainId != _domainChainId) revert InvalidDomain("ECDSA: UserOps invalid domain");
  }
}
