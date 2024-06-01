//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

interface IWallet {
  event LogReceivedEther(address indexed _from, uint256 _amount);
  event LogCall(address indexed _contract, uint256 _value, bytes _data);

  struct UserOp {
    address to;
    uint256 value;
    bytes data;
  }

  function nonce() external view returns (uint256);

  function owner() external view returns (address);
}
