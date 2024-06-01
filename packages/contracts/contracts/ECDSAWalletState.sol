//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "./SmartWallet.sol";
import "./SmartWalletFactory.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";

// ECDSA ERC1967 implementation contract for the Base samrt wallet Spec. this contract
// handles the EIP712 Data signtures and verification. aswell as adding extra custom Permit2
// funtionality to enable direct tranerring of assets from owners EOA to their smart wallet
// in one signature. This is idea for swap transactions. This impl also requires user pys
//rhe reylayer back the gas cost for exec execution. this functionality is implemented
// in the optional _walletExecCallback() func, users gas pay relayer back in Native and
// ERC20 assets
abstract contract ECDSAWalletState is SmartWallet {
  SmartWalletFactory factory;

  bytes32 public constant ECDSA_WALLET_STORAGE_POSITION = keccak256("wallet.ecdsa.v1");
  bytes32 public constant HASHED_NAME = keccak256(bytes("ECDSAWallet"));
  bytes32 public constant HASHED_VERSION = keccak256(bytes("0.0.1"));
  bytes32 public constant TYPE_HASH = keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");

  function __ECDSAWallet_init(address _owner) public initializer {
    __SmartWallet_init_unchained();
    __ECDSAWallet_init_unchained(_owner);
    factory = SmartWalletFactory(msg.sender);
  }

  function __ECDSAWallet_init_unchained(address _owner) internal onlyInitializing {
    state().owner = _owner;
  }

  // erc1967 proxy require state vars be initialised with storage pointer
  // creating normal state vars cant be read by individual proxy instances
  function state() internal pure returns (WalletState storage s) {
    bytes32 position = ECDSA_WALLET_STORAGE_POSITION;
    assembly {
      s.slot := position
    }
  }

  function domainSeperator(uint256 _chainID) public view returns (bytes32) {
    return keccak256(abi.encode(TYPE_HASH, HASHED_NAME, HASHED_VERSION, _chainID, address(this)));
  }

  // implemenation of base SW  spec
  function owner() public view virtual override returns (address) {
    return state().owner;
  }

  function nonce() public view virtual override returns (uint256) {
    return state().nonce;
  }

  function _incrementNonce() internal override {
    state().nonce++;
  }

  mapping(uint256 => ECDSAExecValidationDetails) public validationResultsMap;
  mapping(uint256 => bytes) public bridgeOpsDataMap;
  mapping(uint256 => bytes) public bridgeVerifierProof;
  mapping(uint256 => uint256) public bts;
  mapping(bytes32 => bytes) public signedMessages;
  mapping(uint256 => bytes) public signedMessages2;

  mapping(address => mapping(address => mapping(address => PackedAllowance))) public allowance;

  modifier onlyWalletSigners() {
    require(msg.sender == address(this) || msg.sender == owner(), "Only wallet signers allowed");
    _;
  }
  struct WalletState {
    address owner;
    uint96 nonce;
  }
}
