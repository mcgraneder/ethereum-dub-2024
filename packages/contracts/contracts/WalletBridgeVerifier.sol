// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./ECDSAWallet.sol";
import {SmartWalletHasher} from "./libraries/HasherLib.sol";
import {SignatureBuilder} from "./libraries/SignatureBuilderLib.sol";
import {CALLER} from "./libraries/Call.sol";
import "./interfaces/IWallet.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
import {IERC1271} from "./interfaces/IERC1271.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {ECDSAWalletView} from "./ECDSAWalletView.sol";
import {ERC20} from "solmate/src/tokens/ERC20.sol";

contract WalletBridgeVerifier {
  using ECDSAUpgradeable for bytes32;
  using SmartWalletHasher for IWallet.ECDSAExec;
  using SignatureBuilder for IWallet.Signature[];

  address public constant RELAYER = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

  event BridgeProofTimestamp(uint256 timestamp);
  mapping(address => mapping(address => uint256)) public userBalanceBedoreOps;
  mapping(uint256 => bytes) public bridgeProofs;
  mapping(uint256 => uint256) public bridgeProofsTimestamps;

  // Function to verify external data
  // 3 main steps to validate data
  //1 - validate signer from signature
  //2 - valdate ecex data struct from datahash
  // 3 verify contrat state has been update for both partieds according to the wallet ops

  //1 SIG VALIDATION
  // - make sure msg.sender is same as walletOewner in ECDSAExex
  // - make sure decodedChainId is same as in ECDSAExec
  // - make sure recover yields same signer as msg.sender and hence wallet owner
  // - lastly double verify this againsy the emitted data from walletowners contract
  //   (owner(), dataHash, _signature, _walletExec.wallet, nonce());
  function verifyBridgeReq(bytes calldata _encodedWalletExec, bytes calldata _sig) external {
    IWallet.ECDSAExec memory _decodedWalletExec = abi.decode(_encodedWalletExec, (IWallet.ECDSAExec));
    ECDSAWallet _decodedWallet = ECDSAWallet(payable(msg.sender));

    IWallet.UserOp[] memory userOperations = _decodedWalletExec.userOps;
    IWallet.ECDSAExecValidationDetails memory _userOpLogs = _decodedWallet.getUserValidatedData(_decodedWallet.nonce() - 1);

    (uint256 _decodedSigChainID, bytes memory _decodedSignature) = abi.decode(_sig, (uint256, bytes));
    bytes32 _decodedDataHash = _decodedWallet.domainSeperator(_decodedSigChainID).toTypedDataHash(_decodedWalletExec.hash());

    require(
      _decodedWallet.owner() == _userOpLogs.signer &&
        address(_decodedWallet) == _userOpLogs.wallet &&
        _decodedDataHash == _userOpLogs.dataHash &&
        keccak256(_sig) == keccak256(_userOpLogs.signature),
      "smart wallet contract Data is invalid"
    );

    IWallet.Signature[] memory signatures = new IWallet.Signature[](2);
    signatures[0] = IWallet.Signature(_decodedWallet.owner(), _decodedSignature, false);
    signatures[1] = IWallet.Signature(msg.sender, "0x", true);
    bytes memory contractSignature = signatures.buildSignatureBytes();

    _decodedWallet._verifySignatures(contractSignature, _decodedDataHash, _decodedWallet.owner(), 2);

    CALLER.IPTransfer memory transfer;
    CALLER.IPAllowance memory allowance;
    CALLER.IPSwap memory swap;

    uint32[3] memory EcdsaExecProtocol = CALLER.getSwapProtocol();
    for (uint i = 0; i < userOperations.length; i++) {
      bytes4 selector = extractSelector(userOperations[i].data);
      require(EcdsaExecProtocol[i] == uint32(selector), "selector doesnt match ivlaid scheme");

      if (EcdsaExecProtocol[0] == uint32(selector)) {
        transfer = CALLER.executeTransfer(userOperations[0].data);
      }
      if (EcdsaExecProtocol[1] == uint32(selector)) {
        allowance = CALLER.executeApprove(userOperations[1].data);
      }
      if (EcdsaExecProtocol[2] == uint32(selector)) {
        swap = CALLER.executeSwap(userOperations[2].data);
      }
    }

    address _decodedSigner = _decodedWallet.owner();
    uint256 userBalanceBeforeToken0 = userBalanceBedoreOps[_decodedSigner][transfer.token];
    uint256 userBalanceAfterToken0 = ERC20(transfer.token).balanceOf(_decodedSigner);

    uint256 walletBalanceAfterToken0 = ERC20(transfer.token).balanceOf(RELAYER);
    uint256 walletBalanceBeforeToken0 = userBalanceBedoreOps[RELAYER][transfer.token];

    uint256 amount = transfer.amount;
    uint256 feeAmount = userBalanceBeforeToken0 - (userBalanceAfterToken0 + amount);

    require(feeAmount > 0, "fee was not sent");
    require(userBalanceAfterToken0 == userBalanceBeforeToken0 - (amount + feeAmount), "userBalanxces dont check out");
    require(walletBalanceAfterToken0 == walletBalanceBeforeToken0 + feeAmount, "wallet balanxes dont check out");
    require(transfer.from == _decodedSigner && transfer.to == _decodedWalletExec.wallet, "state doesnt match details");

    bridgeProofs[_decodedWalletExec.nonce] = contractSignature;
    bridgeProofsTimestamps[_decodedWalletExec.nonce] = block.timestamp;
    emit BridgeProofTimestamp(block.timestamp);
  }

  function extractSelector(bytes memory _calldata) public pure returns (bytes4 selector) {
    assembly {
      selector := mload(add(_calldata, 0x20))
    }
  }

  function getBalance(address account, address token) external {
    uint256 balance = ERC20(token).balanceOf(account); // Reads balance relative to contract B's state
    userBalanceBedoreOps[account][token] = balance; // Store the balance in contract B's storage
  }
}
