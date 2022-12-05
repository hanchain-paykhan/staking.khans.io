import Web3 from "web3";

export const web3 = new Web3(window.ethereum);

/* --------------- TEST NET --------------- */

// export const StakingTokenAddress = "0xd5016570C803589B4675171326d1F3Ed4Cc51714";
// export const StakingTokenABI = {
//   abi: [
//     {
//       inputs: [],
//       stateMutability: "nonpayable",
//       type: "constructor",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "owner",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "spender",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "value",
//           type: "uint256",
//         },
//       ],
//       name: "Approval",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "to",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "value",
//           type: "uint256",
//         },
//       ],
//       name: "Transfer",
//       type: "event",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "owner",
//           type: "address",
//         },
//         {
//           internalType: "address",
//           name: "spender",
//           type: "address",
//         },
//       ],
//       name: "allowance",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "spender",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//       ],
//       name: "approve",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "account",
//           type: "address",
//         },
//       ],
//       name: "balanceOf",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "decimals",
//       outputs: [
//         {
//           internalType: "uint8",
//           name: "",
//           type: "uint8",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "spender",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "subtractedValue",
//           type: "uint256",
//         },
//       ],
//       name: "decreaseAllowance",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "spender",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "addedValue",
//           type: "uint256",
//         },
//       ],
//       name: "increaseAllowance",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "name",
//       outputs: [
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "symbol",
//       outputs: [
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "totalSupply",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "to",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//       ],
//       name: "transfer",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         {
//           internalType: "address",
//           name: "to",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//       ],
//       name: "transferFrom",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//   ],
// };
// export const StakingTokenContract = new web3.eth.Contract(
//   StakingTokenABI.abi,
//   StakingTokenAddress
// );

// export const RewardTokenAddress = "0xb354121349ddf985aDdE73c68c815f2295F7408b";
// export const RewardTokenABI = {
//   abi: [
//     {
//       inputs: [],
//       stateMutability: "nonpayable",
//       type: "constructor",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "owner",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "spender",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "value",
//           type: "uint256",
//         },
//       ],
//       name: "Approval",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "to",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "value",
//           type: "uint256",
//         },
//       ],
//       name: "Transfer",
//       type: "event",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "owner",
//           type: "address",
//         },
//         {
//           internalType: "address",
//           name: "spender",
//           type: "address",
//         },
//       ],
//       name: "allowance",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "spender",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//       ],
//       name: "approve",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "account",
//           type: "address",
//         },
//       ],
//       name: "balanceOf",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "decimals",
//       outputs: [
//         {
//           internalType: "uint8",
//           name: "",
//           type: "uint8",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "spender",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "subtractedValue",
//           type: "uint256",
//         },
//       ],
//       name: "decreaseAllowance",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "spender",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "addedValue",
//           type: "uint256",
//         },
//       ],
//       name: "increaseAllowance",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "name",
//       outputs: [
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "symbol",
//       outputs: [
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "totalSupply",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "to",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//       ],
//       name: "transfer",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         {
//           internalType: "address",
//           name: "to",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//       ],
//       name: "transferFrom",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//   ],
// };
// export const RewardTokenContract = new web3.eth.Contract(
//   RewardTokenABI.abi,
//   RewardTokenAddress
// );

// export const StakingAddress = "0x5EE8c7E7200fB36A12E8D79Cb4A34B0Fc95Bd145";
// export const StakingABI = {
//   abi: [
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "_stakingToken",
//           type: "address",
//         },
//         {
//           internalType: "address",
//           name: "_rewardToken",
//           type: "address",
//         },
//         {
//           internalType: "address",
//           name: "_wethToken",
//           type: "address",
//         },
//         {
//           internalType: "address",
//           name: "_usdcToken",
//           type: "address",
//         },
//         {
//           internalType: "address",
//           name: "_uniV3Token",
//           type: "address",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "constructor",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "previousOwner",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "newOwner",
//           type: "address",
//         },
//       ],
//       name: "OwnershipTransferred",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: false,
//           internalType: "address",
//           name: "account",
//           type: "address",
//         },
//       ],
//       name: "Paused",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "user",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "reward",
//           type: "uint256",
//         },
//       ],
//       name: "RewardPaid",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "user",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//       ],
//       name: "Staked",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: false,
//           internalType: "address",
//           name: "account",
//           type: "address",
//         },
//       ],
//       name: "Unpaused",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "user",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//       ],
//       name: "Withdrawn",
//       type: "event",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "_user",
//           type: "address",
//         },
//       ],
//       name: "claimReward",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       name: "getAmount",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       name: "getBalance",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       name: "getRewardReleased",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       name: "getStakingStartTime",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "hanTokenPerLpToken",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "owner",
//       outputs: [
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "pause",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "paused",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "renounceOwnership",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "rewardToken",
//       outputs: [
//         {
//           internalType: "contract IERC20",
//           name: "",
//           type: "address",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "rewardTokenBalance",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "_newVolume",
//           type: "uint256",
//         },
//       ],
//       name: "setTokenVolume",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//       ],
//       name: "stake",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "stakingTimeData",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "stakingToken",
//       outputs: [
//         {
//           internalType: "contract IERC20",
//           name: "",
//           type: "address",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "stakingTokenBalance",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "tokenVolume",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "totalSupply",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "_amount",
//           type: "uint256",
//         },
//       ],
//       name: "transferHanToken",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "newOwner",
//           type: "address",
//         },
//       ],
//       name: "transferOwnership",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "_amount",
//           type: "uint256",
//         },
//       ],
//       name: "transferStakingToken",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "_tokenId",
//           type: "uint256",
//         },
//       ],
//       name: "transferUniToken",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "_amount",
//           type: "uint256",
//         },
//       ],
//       name: "transferUsdcToken",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "_amount",
//           type: "uint256",
//         },
//       ],
//       name: "transferWethToken",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "unappliedStakingToken",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "uniTokenBalance",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "uniV3Token",
//       outputs: [
//         {
//           internalType: "contract IERC721",
//           name: "",
//           type: "address",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "unpause",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "updateReward",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "usdcToken",
//       outputs: [
//         {
//           internalType: "contract IERC20",
//           name: "",
//           type: "address",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "usdcTokenBalance",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "wethToken",
//       outputs: [
//         {
//           internalType: "contract IERC20",
//           name: "",
//           type: "address",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "wethTokenBalance",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//       ],
//       name: "withdraw",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//   ],
// };
// export const StakingContract = new web3.eth.Contract(
//   StakingABI.abi,
//   StakingAddress
// );

/* --------------- MAIN NET --------------- */

// Arrakis
export const StakingTokenAddress = "0x3fa8CEE6795220Ac25DD35D4d39ec306a3e4fb3f";
export const StakingTokenABI = {
  abi: [
    {
      inputs: [
        { internalType: "address payable", name: "_gelato", type: "address" },
        { internalType: "address", name: "_arrakisTreasury", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "receiver",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "burnAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount0Out",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount1Out",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint128",
          name: "liquidityBurned",
          type: "uint128",
        },
      ],
      name: "Burned",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "feesEarned0",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "feesEarned1",
          type: "uint256",
        },
      ],
      name: "FeesEarned",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "receiver",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "mintAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount0In",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount1In",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint128",
          name: "liquidityMinted",
          type: "uint128",
        },
      ],
      name: "Minted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousManager",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newManager",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "int24",
          name: "lowerTick_",
          type: "int24",
        },
        {
          indexed: false,
          internalType: "int24",
          name: "upperTick_",
          type: "int24",
        },
        {
          indexed: false,
          internalType: "uint128",
          name: "liquidityBefore",
          type: "uint128",
        },
        {
          indexed: false,
          internalType: "uint128",
          name: "liquidityAfter",
          type: "uint128",
        },
      ],
      name: "Rebalance",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint16",
          name: "managerFeeBPS",
          type: "uint16",
        },
        {
          indexed: false,
          internalType: "address",
          name: "managerTreasury",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint16",
          name: "gelatoRebalanceBPS",
          type: "uint16",
        },
        {
          indexed: false,
          internalType: "uint16",
          name: "gelatoSlippageBPS",
          type: "uint16",
        },
        {
          indexed: false,
          internalType: "uint32",
          name: "gelatoSlippageInterval",
          type: "uint32",
        },
      ],
      name: "UpdateManagerParams",
      type: "event",
    },
    {
      inputs: [],
      name: "GELATO",
      outputs: [{ internalType: "address payable", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "RESTRICTED_MINT_ENABLED",
      outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "arrakisBalance0",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "arrakisBalance1",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "arrakisFeeBPS",
      outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "arrakisTreasury",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "burnAmount", type: "uint256" },
        { internalType: "address", name: "receiver", type: "address" },
      ],
      name: "burn",
      outputs: [
        { internalType: "uint256", name: "amount0", type: "uint256" },
        { internalType: "uint256", name: "amount1", type: "uint256" },
        { internalType: "uint128", name: "liquidityBurned", type: "uint128" },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "subtractedValue", type: "uint256" },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "int24", name: "newLowerTick", type: "int24" },
        { internalType: "int24", name: "newUpperTick", type: "int24" },
        {
          internalType: "uint160",
          name: "swapThresholdPrice",
          type: "uint160",
        },
        { internalType: "uint256", name: "swapAmountBPS", type: "uint256" },
        { internalType: "bool", name: "zeroForOne", type: "bool" },
      ],
      name: "executiveRebalance",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "gelatoRebalanceBPS",
      outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "gelatoSlippageBPS",
      outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "gelatoSlippageInterval",
      outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amount0Max", type: "uint256" },
        { internalType: "uint256", name: "amount1Max", type: "uint256" },
      ],
      name: "getMintAmounts",
      outputs: [
        { internalType: "uint256", name: "amount0", type: "uint256" },
        { internalType: "uint256", name: "amount1", type: "uint256" },
        { internalType: "uint256", name: "mintAmount", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getPositionID",
      outputs: [
        { internalType: "bytes32", name: "positionID", type: "bytes32" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getUnderlyingBalances",
      outputs: [
        { internalType: "uint256", name: "amount0Current", type: "uint256" },
        { internalType: "uint256", name: "amount1Current", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint160", name: "sqrtRatioX96", type: "uint160" },
      ],
      name: "getUnderlyingBalancesAtPrice",
      outputs: [
        { internalType: "uint256", name: "amount0Current", type: "uint256" },
        { internalType: "uint256", name: "amount1Current", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "_name", type: "string" },
        { internalType: "string", name: "_symbol", type: "string" },
        { internalType: "address", name: "_pool", type: "address" },
        { internalType: "uint16", name: "_managerFeeBPS", type: "uint16" },
        { internalType: "int24", name: "_lowerTick", type: "int24" },
        { internalType: "int24", name: "_upperTick", type: "int24" },
        { internalType: "address", name: "_manager_", type: "address" },
      ],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "lowerTick",
      outputs: [{ internalType: "int24", name: "", type: "int24" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "manager",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "managerBalance0",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "managerBalance1",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "managerFeeBPS",
      outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "managerTreasury",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "mintAmount", type: "uint256" },
        { internalType: "address", name: "receiver", type: "address" },
      ],
      name: "mint",
      outputs: [
        { internalType: "uint256", name: "amount0", type: "uint256" },
        { internalType: "uint256", name: "amount1", type: "uint256" },
        { internalType: "uint128", name: "liquidityMinted", type: "uint128" },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pool",
      outputs: [
        { internalType: "contract IUniswapV3Pool", name: "", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint160",
          name: "swapThresholdPrice",
          type: "uint160",
        },
        { internalType: "uint256", name: "swapAmountBPS", type: "uint256" },
        { internalType: "bool", name: "zeroForOne", type: "bool" },
        { internalType: "uint256", name: "feeAmount", type: "uint256" },
        { internalType: "address", name: "paymentToken", type: "address" },
      ],
      name: "rebalance",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "restrictedMintToggle",
      outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "toggleRestrictMint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "token0",
      outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "token1",
      outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amount0Owed", type: "uint256" },
        { internalType: "uint256", name: "amount1Owed", type: "uint256" },
        { internalType: "bytes", name: "", type: "bytes" },
      ],
      name: "uniswapV3MintCallback",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "int256", name: "amount0Delta", type: "int256" },
        { internalType: "int256", name: "amount1Delta", type: "int256" },
        { internalType: "bytes", name: "", type: "bytes" },
      ],
      name: "uniswapV3SwapCallback",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "int16", name: "newManagerFeeBPS", type: "int16" },
        {
          internalType: "address",
          name: "newManagerTreasury",
          type: "address",
        },
        { internalType: "int16", name: "newRebalanceBPS", type: "int16" },
        { internalType: "int16", name: "newSlippageBPS", type: "int16" },
        { internalType: "int32", name: "newSlippageInterval", type: "int32" },
      ],
      name: "updateManagerParams",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "upperTick",
      outputs: [{ internalType: "int24", name: "", type: "int24" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "version",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawArrakisBalance",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawManagerBalance",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
export const StakingTokenContract = new web3.eth.Contract(
  StakingTokenABI.abi,
  StakingTokenAddress
);

export const RewardTokenAddress = "0x50Bce64397C75488465253c0A034b8097FeA6578";
export const RewardTokenABI = {
  abi: [
    {
      inputs: [
        { internalType: "address", name: "_l2Bridge", type: "address" },
        { internalType: "address", name: "_l1Token", type: "address" },
        { internalType: "string", name: "_name", type: "string" },
        { internalType: "string", name: "_symbol", type: "string" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "Burn",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "Mint",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_from", type: "address" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
      ],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "subtractedValue", type: "uint256" },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "l1Token",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "l2Bridge",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_to", type: "address" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes4", name: "_interfaceId", type: "bytes4" },
      ],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
export const RewardTokenContract = new web3.eth.Contract(
  RewardTokenABI.abi,
  RewardTokenAddress
);

export const StakingAddress = "0xd2429C4c5b379d055b0B3fc8f6CC39bcAb1065Fe";
export const StakingABI = {
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_stakingToken",
          type: "address",
        },
        {
          internalType: "address",
          name: "_rewardToken",
          type: "address",
        },
        {
          internalType: "address",
          name: "_wethToken",
          type: "address",
        },
        {
          internalType: "address",
          name: "_usdcToken",
          type: "address",
        },
        {
          internalType: "address",
          name: "_uniV3Token",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Paused",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "reward",
          type: "uint256",
        },
      ],
      name: "RewardPaid",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Staked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Unpaused",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Withdrawn",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address",
        },
      ],
      name: "claimReward",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "getAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "getBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "getRewardReleased",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "getStakingStartTime",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "hanTokenPerLpToken",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "paused",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "rewardToken",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "rewardTokenBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_newVolume",
          type: "uint256",
        },
      ],
      name: "setTokenVolume",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "stake",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "stakingTimeData",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "stakingToken",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "stakingTokenBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenVolume",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "transferHanToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "transferStakingToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256",
        },
      ],
      name: "transferUniToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "transferUsdcToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "transferWethToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "unappliedStakingToken",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "uniTokenBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "uniV3Token",
      outputs: [
        {
          internalType: "contract IERC721",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "unpause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "updateReward",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "usdcToken",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "usdcTokenBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "wethToken",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "wethTokenBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
export const StakingContract = new web3.eth.Contract(
  StakingABI.abi,
  StakingAddress
);

export const WETHAddress = "0x4200000000000000000000000000000000000006";
export const WETHABI = {
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "src",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "guy",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "wad",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "dst",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "wad",
          type: "uint256",
        },
      ],
      name: "Deposit",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "src",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "dst",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "wad",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "src",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "wad",
          type: "uint256",
        },
      ],
      name: "Withdrawal",
      type: "event",
    },
    { payable: true, stateMutability: "payable", type: "fallback" },
    {
      constant: true,
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "address", name: "", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "guy", type: "address" },
        { internalType: "uint256", name: "wad", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "deposit",
      outputs: [],
      payable: true,
      stateMutability: "payable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "dst", type: "address" },
        { internalType: "uint256", name: "wad", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "src", type: "address" },
        { internalType: "address", name: "dst", type: "address" },
        { internalType: "uint256", name: "wad", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "uint256", name: "wad", type: "uint256" }],
      name: "withdraw",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
export const WETHContract = new web3.eth.Contract(WETHABI.abi, WETHAddress);

export const ArrakisAddress = "0x3fa8CEE6795220Ac25DD35D4d39ec306a3e4fb3f";
export const ArrakisABI = {
  abi: [
    {
      inputs: [
        { internalType: "address payable", name: "_gelato", type: "address" },
        { internalType: "address", name: "_arrakisTreasury", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "receiver",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "burnAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount0Out",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount1Out",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint128",
          name: "liquidityBurned",
          type: "uint128",
        },
      ],
      name: "Burned",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "feesEarned0",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "feesEarned1",
          type: "uint256",
        },
      ],
      name: "FeesEarned",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "receiver",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "mintAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount0In",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount1In",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint128",
          name: "liquidityMinted",
          type: "uint128",
        },
      ],
      name: "Minted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousManager",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newManager",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "int24",
          name: "lowerTick_",
          type: "int24",
        },
        {
          indexed: false,
          internalType: "int24",
          name: "upperTick_",
          type: "int24",
        },
        {
          indexed: false,
          internalType: "uint128",
          name: "liquidityBefore",
          type: "uint128",
        },
        {
          indexed: false,
          internalType: "uint128",
          name: "liquidityAfter",
          type: "uint128",
        },
      ],
      name: "Rebalance",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint16",
          name: "managerFeeBPS",
          type: "uint16",
        },
        {
          indexed: false,
          internalType: "address",
          name: "managerTreasury",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint16",
          name: "gelatoRebalanceBPS",
          type: "uint16",
        },
        {
          indexed: false,
          internalType: "uint16",
          name: "gelatoSlippageBPS",
          type: "uint16",
        },
        {
          indexed: false,
          internalType: "uint32",
          name: "gelatoSlippageInterval",
          type: "uint32",
        },
      ],
      name: "UpdateManagerParams",
      type: "event",
    },
    {
      inputs: [],
      name: "GELATO",
      outputs: [{ internalType: "address payable", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "RESTRICTED_MINT_ENABLED",
      outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "arrakisBalance0",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "arrakisBalance1",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "arrakisFeeBPS",
      outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "arrakisTreasury",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "burnAmount", type: "uint256" },
        { internalType: "address", name: "receiver", type: "address" },
      ],
      name: "burn",
      outputs: [
        { internalType: "uint256", name: "amount0", type: "uint256" },
        { internalType: "uint256", name: "amount1", type: "uint256" },
        { internalType: "uint128", name: "liquidityBurned", type: "uint128" },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "subtractedValue", type: "uint256" },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "int24", name: "newLowerTick", type: "int24" },
        { internalType: "int24", name: "newUpperTick", type: "int24" },
        {
          internalType: "uint160",
          name: "swapThresholdPrice",
          type: "uint160",
        },
        { internalType: "uint256", name: "swapAmountBPS", type: "uint256" },
        { internalType: "bool", name: "zeroForOne", type: "bool" },
      ],
      name: "executiveRebalance",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "gelatoRebalanceBPS",
      outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "gelatoSlippageBPS",
      outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "gelatoSlippageInterval",
      outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amount0Max", type: "uint256" },
        { internalType: "uint256", name: "amount1Max", type: "uint256" },
      ],
      name: "getMintAmounts",
      outputs: [
        { internalType: "uint256", name: "amount0", type: "uint256" },
        { internalType: "uint256", name: "amount1", type: "uint256" },
        { internalType: "uint256", name: "mintAmount", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getPositionID",
      outputs: [
        { internalType: "bytes32", name: "positionID", type: "bytes32" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getUnderlyingBalances",
      outputs: [
        { internalType: "uint256", name: "amount0Current", type: "uint256" },
        { internalType: "uint256", name: "amount1Current", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint160", name: "sqrtRatioX96", type: "uint160" },
      ],
      name: "getUnderlyingBalancesAtPrice",
      outputs: [
        { internalType: "uint256", name: "amount0Current", type: "uint256" },
        { internalType: "uint256", name: "amount1Current", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "_name", type: "string" },
        { internalType: "string", name: "_symbol", type: "string" },
        { internalType: "address", name: "_pool", type: "address" },
        { internalType: "uint16", name: "_managerFeeBPS", type: "uint16" },
        { internalType: "int24", name: "_lowerTick", type: "int24" },
        { internalType: "int24", name: "_upperTick", type: "int24" },
        { internalType: "address", name: "_manager_", type: "address" },
      ],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "lowerTick",
      outputs: [{ internalType: "int24", name: "", type: "int24" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "manager",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "managerBalance0",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "managerBalance1",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "managerFeeBPS",
      outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "managerTreasury",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "mintAmount", type: "uint256" },
        { internalType: "address", name: "receiver", type: "address" },
      ],
      name: "mint",
      outputs: [
        { internalType: "uint256", name: "amount0", type: "uint256" },
        { internalType: "uint256", name: "amount1", type: "uint256" },
        { internalType: "uint128", name: "liquidityMinted", type: "uint128" },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pool",
      outputs: [
        { internalType: "contract IUniswapV3Pool", name: "", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint160",
          name: "swapThresholdPrice",
          type: "uint160",
        },
        { internalType: "uint256", name: "swapAmountBPS", type: "uint256" },
        { internalType: "bool", name: "zeroForOne", type: "bool" },
        { internalType: "uint256", name: "feeAmount", type: "uint256" },
        { internalType: "address", name: "paymentToken", type: "address" },
      ],
      name: "rebalance",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "restrictedMintToggle",
      outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "toggleRestrictMint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "token0",
      outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "token1",
      outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amount0Owed", type: "uint256" },
        { internalType: "uint256", name: "amount1Owed", type: "uint256" },
        { internalType: "bytes", name: "", type: "bytes" },
      ],
      name: "uniswapV3MintCallback",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "int256", name: "amount0Delta", type: "int256" },
        { internalType: "int256", name: "amount1Delta", type: "int256" },
        { internalType: "bytes", name: "", type: "bytes" },
      ],
      name: "uniswapV3SwapCallback",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "int16", name: "newManagerFeeBPS", type: "int16" },
        {
          internalType: "address",
          name: "newManagerTreasury",
          type: "address",
        },
        { internalType: "int16", name: "newRebalanceBPS", type: "int16" },
        { internalType: "int16", name: "newSlippageBPS", type: "int16" },
        { internalType: "int32", name: "newSlippageInterval", type: "int32" },
      ],
      name: "updateManagerParams",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "upperTick",
      outputs: [{ internalType: "int24", name: "", type: "int24" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "version",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawArrakisBalance",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawManagerBalance",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
export const ArrakisContract = new web3.eth.Contract(
  ArrakisABI.abi,
  ArrakisAddress
);