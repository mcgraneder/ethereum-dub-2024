export const SmartWalletFactoryAbi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_wallet',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: '_callID',
        type: 'bytes32',
      },
    ],
    name: 'WalletCreated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_impl',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: '_call',
        type: 'bytes',
      },
    ],
    name: 'createWallet',
    outputs: [
      {
        internalType: 'contract IWallet',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_impl',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: '_call',
        type: 'bytes',
      },
      {
        internalType: 'uint256',
        name: '_nonce',
        type: 'uint256',
      },
    ],
    name: 'walletAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const
