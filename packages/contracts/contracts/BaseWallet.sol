//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import {SmartWallet} from "./SmartWallet.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";

contract BaseWallet is SmartWallet {
  using ECDSAUpgradeable for bytes32;

  bytes32 private constant Base_WALLET_STORAGE_POSITION = keccak256("wallet.base.v1");
  struct BaseWalletState {
    address owner;
    uint96 nonce;
  }

  function __BaseWallet_init(address _owner) public initializer {
    __SmartWallet_init_unchained();
    __BaseWallet_init_unchained(_owner);
  }

  function __BaseWallet_init_unchained(address _owner) internal onlyInitializing {
    state().owner = _owner;
  }

  function state() internal pure returns (BaseWalletState storage s) {
    bytes32 position = Base_WALLET_STORAGE_POSITION;
    assembly {
      s.slot := position
    }
  }

  function owner() external view returns (address) {
    return state().owner;
  }

  function nonce() public view virtual override returns (uint256) {
    return state().nonce;
  }

  function _incrementNonce() internal override {
    state().nonce++;
  }

  function _verify(UserOp[] memory userOps, bytes memory _signature) internal view override {}
}
