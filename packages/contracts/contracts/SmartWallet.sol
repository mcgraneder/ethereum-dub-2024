//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "./interfaces/IWallet.sol";
import "./libraries/FeeHelperLib.sol";
import {ECDSAWalletFactory} from "./ECDSAWalletFactory.sol";

// this contract is the base implementation of the Smart wallet as serves as
// a template that can be built upon in inheriting implementation contracts that can
// add therir own custom functionalities
abstract contract SmartWallet is UUPSUpgradeable, IWallet {
  error InsufficentWalletBalance(string message);
  error InvalidRequestDomain(string message);

  receive() external payable {
    emit LogReceivedEther(msg.sender, msg.value);
  }

  function __SmartWallet_init() public initializer {
    __SmartWallet_init_unchained();
  }

  function __SmartWallet_init_unchained() internal onlyInitializing {
    if (address(this).balance > 0) {
      emit LogReceivedEther(msg.sender, address(this).balance);
    }
  }

  // virtual functions that are rquired to be implemented
  function _walletExecCallback(uint256 execGasUse, ECDSAExec memory walletExec, bytes memory _sig) internal virtual;

  function _verify(ECDSAExec memory _walletExec, bytes memory _signature, uint8 _threshold) internal virtual;

  function _verifyBridgeProof(bytes memory _bridgeProof, ECDSAExec memory _walletExec) internal virtual;

  function getBalanceFromBridgeVerifier(AllowanceOpDetails[] memory _tradeDetails) internal virtual;

  function _incrementNonce() internal virtual;

  function nonce() public view virtual returns (uint256);

  function owner() public view virtual returns (address);

  function exec(ECDSAExec memory _walletExec, bytes memory _signature) external {
    uint256 gasStart = gasleft();
    // _verify2(_walletExec, _signature);

    _verify(_walletExec, _signature, 1);
    _incrementNonce();

    if (_walletExec.bridgeOps.length > 0) {
      getBalanceFromBridgeVerifier(_walletExec.allowanceOp.details);
    }

    UserOp[] memory walletOperations = _walletExec.userOps;
    for (uint32 i = 0; i < walletOperations.length; i++) {
      _verifyBalanceForPayablewalletOperations(walletOperations[i].amount);
      _call(payable(walletOperations[i].to), walletOperations[i].amount, walletOperations[i].data);
    }

    _walletExecCallback(gasStart, _walletExec, _signature);
  }

  function execBridge(ECDSAExec memory _walletExec, bytes memory _signature, bytes memory _bridgeProof) external {
    _verifyBridgeProof(_bridgeProof, _walletExec);

    _verify(_walletExec, _signature, 3);
    // _verifyRequestDomain(_walletExec);

    uint256 _bridgeChainID = _walletExec.bridgeChainID;

    UserOp[] memory walletOperations = _walletExec.bridgeOps;
    // if (block.chainid != _bridgeChainID) revert("wrong bridge chain id");

    for (uint32 i = 0; i < walletOperations.length; i++) {
      _verifyBalanceForPayablewalletOperations(walletOperations[i].amount);
      _call(payable(walletOperations[i].to), walletOperations[i].amount, walletOperations[i].data);
    }
  }

  // if user wants to execute themselves we dont need sig or verify
  function execFomEoa(UserOp[] calldata userwalletOperations) external {
    for (uint32 i = 0; i < userwalletOperations.length; i++) {
      require(address(this).balance >= userwalletOperations[i].amount, "SmartWallet: insufficient base asset balance");
      _call(payable(userwalletOperations[i].to), userwalletOperations[i].amount, userwalletOperations[i].data);
    }
  }

  function _call(address payable _contract, uint256 _value, bytes memory _data) internal returns (bytes memory) {
    (bool ok, bytes memory resp) = _contract.call{value: _value}(_data);

    emit LogCall(_contract, _value, _data);
    if (!ok) {
      assembly {
        revert(add(resp, 32), mload(resp))
      }
    }
    return resp;
  }

  function _delegateCall(address payable _contract, uint256 _value, bytes memory _data) internal returns (bytes memory) {
    (bool ok, bytes memory resp) = _contract.delegatecall(_data);

    emit LogCall(_contract, _value, _data);
    if (!ok) {
      assembly {
        revert(add(resp, 32), mload(resp))
      }
    }
    return resp;
  }

  function _verifyBalanceForPayablewalletOperations(uint256 _amountToCheck) internal view {
    if (address(this).balance < _amountToCheck) revert InsufficentWalletBalance("SmartWallet: insufficient base asset balance");
  }

  function _verifyRequestDomain(ECDSAExec memory _walletExec) internal pure {
    if (_walletExec.bridgeOps.length == 0) revert InvalidRequestDomain("Invalid request to execute cross chain ops");
  }

  function _authorizeUpgrade(address) internal view override {
    require(msg.sender == address(this));
  }
}
