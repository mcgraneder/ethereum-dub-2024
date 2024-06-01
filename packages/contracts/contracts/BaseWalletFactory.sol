//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import {BaseWallet} from "./BaseWallet.sol";
import {BaseWalletState} from "./BaseWalletState.sol";
import {SmartWalletFactory} from "./SmartWalletFactory.sol";
import {IWallet} from "./interfaces/IWallet.sol";

contract BaseWalletFactory {
  SmartWalletFactory factory;
  BaseWallet wallet;

  constructor(SmartWalletFactory _factory) {
    wallet = new BaseWallet();
    wallet.__BaseWallet_init(address(0));

    factory = _factory;
  }

  function createWallet(address _owner) external returns (IWallet) {
    return factory.createWallet(address(wallet), abi.encodeWithSelector(BaseWalletState.__BaseWallet_init.selector, _owner));
  }

  function walletAddress(address _owner, uint256 _nonce) external view returns (address) {
    return factory.walletAddress(address(wallet), abi.encodeWithSelector(BaseWalletState.__BaseWallet_init.selector, _owner), _nonce);
  }
}
