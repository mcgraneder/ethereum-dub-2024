//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import {ECDSAWalletState} from "./ECDSAWalletState.sol";
import {ECDSAWallet} from "./ECDSAWallet.sol";
import {SmartWalletFactory} from "./SmartWalletFactory.sol";
import {IWallet} from "./interfaces/IWallet.sol";
import "hardhat/console.sol";

contract ECDSAWalletFactory {
  SmartWalletFactory public factory;
  ECDSAWallet public wallet;

  constructor(SmartWalletFactory _factory) {
    wallet = new ECDSAWallet();
    wallet.__ECDSAWallet_init(address(0));

    factory = _factory;
    factory.setEcdsaFactory(address(this));
  }

  function createWallet(address _owner) external payable returns (IWallet) {
    return factory.createWallet{value: msg.value}(address(wallet), abi.encodeWithSelector(ECDSAWalletState.__ECDSAWallet_init.selector, _owner));
  }

  function walletAddress(address _owner, uint256 _nonce) public view returns (address) {
    return factory.walletAddress(address(wallet), abi.encodeWithSelector(ECDSAWalletState.__ECDSAWallet_init.selector, _owner), _nonce);
  }

  function generateContractSignature(address _owner, bytes32 _data) external view returns (bytes32) {
    bytes32 timestamp = keccak256(abi.encodePacked(_data, msg.sender, block.number, block.timestamp));
    return
      keccak256(
        abi.encodePacked(
          factory.walletAddress(
            address(wallet),
            abi.encodeWithSelector(ECDSAWalletState.__ECDSAWallet_init.selector, _owner),
            uint256(timestamp)
          )
        )
      );
  }

  function recoverContractSignature(
    address _owner,
    uint256 _blockNumber,
    uint256 _blockTimestamp,
    bytes32 _dataHash
  ) public view returns (bytes32) {
    bytes32 timestamp = keccak256(abi.encodePacked(_dataHash, msg.sender, _blockNumber, _blockTimestamp));
    return
      keccak256(
        abi.encodePacked(
          factory.walletAddress(
            address(wallet),
            abi.encodeWithSelector(ECDSAWalletState.__ECDSAWallet_init.selector, _owner),
            uint256(timestamp)
          )
        )
      );
  }
}
