pragma solidity ^0.8.0;
import "hardhat/console.sol";
import {SignatureBuilder} from "./SignatureBuilderLib.sol";

library CALLER {
  uint32 public constant TRANSFER_SELECTOR = 0x36c78516;
  uint32 public constant ALLOWANCE_SELECTOR = 0x095ea7b3;
  uint32 public constant SWAP_SELECTOR = 0xd3986f08;

  struct IPTransfer {
    address from;
    address to;
    uint160 amount;
    address token;
  }
  struct IPAllowance {
    address spender;
    uint256 amount;
  }
  struct IPSwap {
    uint256 amount;
    address reciever;
  }

  function executeTransfer(bytes memory msgData) internal pure returns (IPTransfer memory) {
    (address from, address to, uint160 amount, address token) = abi.decode(
      SignatureBuilder.slice16(msgData),
      (address, address, uint160, address)
    );
    return IPTransfer(from, to, amount, token);
  }

  function executeTransfer2(bytes memory msgData) internal pure returns (address from, address to, uint160 amount, address token) {
    return abi.decode(SignatureBuilder.slice16(msgData), (address, address, uint160, address));
  }

  function executeSwap(bytes memory msgData) internal pure returns (IPSwap memory) {
    (uint256 amount, address reciever) = abi.decode(SignatureBuilder.slice16(msgData), (uint256, address));
    return IPSwap(amount, reciever);
  }

  function executeApprove(bytes memory msgData) internal pure returns (IPAllowance memory) {
    (address spender, uint256 amount) = abi.decode(SignatureBuilder.slice16(msgData), (address, uint256));
    return IPAllowance(spender, amount);
  }

  function getSwapProtocol() internal pure returns (uint32[3] memory) {
    return [TRANSFER_SELECTOR, ALLOWANCE_SELECTOR, SWAP_SELECTOR];
  }
}
