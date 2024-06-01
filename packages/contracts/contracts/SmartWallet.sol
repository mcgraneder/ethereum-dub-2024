//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {IWallet} from "./interfaces/IWallet.sol";

abstract contract SmartWallet is UUPSUpgradeable, IWallet {
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

  function _verify(UserOp[] memory userOps, bytes memory _signature) internal view virtual;

  function _incrementNonce() internal virtual;

  function nonce() public view virtual returns (uint256);

  function exec(UserOp userOps, bytes memory signature) public {}

  function _authorizeUpgrade(address) internal view override {
    require(msg.sender == address(this));
  }
}
