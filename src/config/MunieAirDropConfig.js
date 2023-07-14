import Web3 from "web3";

export const web3 = new Web3(window.ethereum);

export const MunieAirDropAddress = "0x467953F60DE44cc625B54Cd9C92D529bA9d26e03";
export const MunieAirDropABI = {
    abi: [
        {
            inputs: [
                {
                    internalType: "uint256",

                    name: "_tokenId",

                    type: "uint256",
                },
            ],

            name: "getToken",

            outputs: [],

            stateMutability: "nonpayable",

            type: "function",
        },

        {
            inputs: [
                {
                    internalType: "contract IERC721",

                    name: "_token",

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
                    indexed: false,

                    internalType: "address",

                    name: "user",

                    type: "address",
                },

                {
                    indexed: false,

                    internalType: "uint256",

                    name: "tokenId",

                    type: "uint256",
                },
            ],

            name: "GetToken",

            type: "event",
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

                    name: "token",

                    type: "address",
                },

                {
                    indexed: false,

                    internalType: "uint256",

                    name: "amount",

                    type: "uint256",
                },
            ],

            name: "RecoveredERC20",

            type: "event",
        },

        {
            anonymous: false,

            inputs: [
                {
                    indexed: false,

                    internalType: "address",

                    name: "token",

                    type: "address",
                },

                {
                    indexed: false,

                    internalType: "uint256",

                    name: "tokenId",

                    type: "uint256",
                },
            ],

            name: "RecoveredERC721",

            type: "event",
        },

        {
            inputs: [
                {
                    internalType: "address",

                    name: "_tokenAddress",

                    type: "address",
                },

                {
                    internalType: "uint256",

                    name: "_tokenAmount",

                    type: "uint256",
                },
            ],

            name: "recoverERC20",

            outputs: [],

            stateMutability: "nonpayable",

            type: "function",
        },

        {
            inputs: [
                {
                    internalType: "address",

                    name: "_tokenAddress",

                    type: "address",
                },

                {
                    internalType: "uint256",

                    name: "_tokenId",

                    type: "uint256",
                },
            ],

            name: "recoverERC721",

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
            inputs: [
                {
                    internalType: "address",

                    name: "_owner",

                    type: "address",
                },

                {
                    internalType: "uint256",

                    name: "_tokenId",

                    type: "uint256",
                },
            ],

            name: "setTokenOwner",

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

            name: "token",

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
            inputs: [
                {
                    internalType: "uint256",

                    name: "",

                    type: "uint256",
                },
            ],

            name: "tokenOwner",

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
    ],
};

export const MunieTokenAddress = "0x03d32959696319026bbde564f128eb110aabe7af";
export const MunieTokenABI = {
    abi: [
        { inputs: [], stateMutability: "nonpayable", type: "constructor" },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "owner", type: "address" },
                { indexed: true, internalType: "address", name: "approved", type: "address" },
                { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
            ],
            name: "Approval",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "owner", type: "address" },
                { indexed: true, internalType: "address", name: "operator", type: "address" },
                { indexed: false, internalType: "bool", name: "approved", type: "bool" },
            ],
            name: "ApprovalForAll",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
                { indexed: true, internalType: "address", name: "newOwner", type: "address" },
            ],
            name: "OwnershipTransferred",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "from", type: "address" },
                { indexed: true, internalType: "address", name: "to", type: "address" },
                { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
            ],
            name: "Transfer",
            type: "event",
        },
        {
            inputs: [
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "tokenId", type: "uint256" },
            ],
            name: "approve",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "owner", type: "address" }],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
            name: "getApproved",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "owner", type: "address" },
                { internalType: "address", name: "operator", type: "address" },
            ],
            name: "isApprovedForAll",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "recipient", type: "address" },
                { internalType: "string", name: "hash", type: "string" },
                { internalType: "string", name: "metadata", type: "string" },
            ],
            name: "mintItem",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        { inputs: [], name: "name", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
        { inputs: [], name: "owner", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
        {
            inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
            name: "ownerOf",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
        {
            inputs: [
                { internalType: "address", name: "from", type: "address" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "tokenId", type: "uint256" },
            ],
            name: "safeTransferFrom",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "from", type: "address" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "tokenId", type: "uint256" },
                { internalType: "bytes", name: "_data", type: "bytes" },
            ],
            name: "safeTransferFrom",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "operator", type: "address" },
                { internalType: "bool", name: "approved", type: "bool" },
            ],
            name: "setApprovalForAll",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
            name: "supportsInterface",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
        },
        { inputs: [], name: "symbol", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
        {
            inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
            name: "tokenURI",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "from", type: "address" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "tokenId", type: "uint256" },
            ],
            name: "transferFrom",
            outputs: [],
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
    ],
};
export const MunieTokenContract = new web3.eth.Contract(MunieTokenABI.abi, MunieTokenAddress);

export const MunieAirDropContract = new web3.eth.Contract(MunieAirDropABI.abi, MunieAirDropAddress);
