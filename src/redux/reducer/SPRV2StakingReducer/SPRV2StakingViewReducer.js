let initialState = {
    SPRV2AmountStaked: "",
    SPRV2StakedTokenIds: [],
    getMySPRV2TokenIds: [],
    depositSPRV2StakedAmount: "",
    stakedSPRV2TokenId: [],
    withdrawSPRV2StakedAmount: "",
    successSPRV2Approve: false,
    getSPRV2SingleApproved: "",
    getSPRV2StakingTokenIdImgVideoUrl: [],
};

function SPRV2StakingViewReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "SPRV2_STAKING_VIEW":
            return {
                ...state,
                SPRV2AmountStaked: payload.SPRV2AmountStaked,
                SPRV2StakedTokenIds: payload.SPRV2StakedTokenIds,
            };

        case "SPRV2_DEPOSIT_LIST":
            return {
                ...state,
                getMySPRV2TokenIds: payload.getMySPRV2TokenIds,
                depositSPRV2StakedAmount: payload.depositSPRV2StakedAmount,
            };

        case "SPRV2_WITHDRAW_LIST":
            return {
                ...state,
                stakedSPRV2TokenId: payload.stakedSPRV2TokenId,
                withdrawSPRV2StakedAmount: payload.withdrawSPRV2StakedAmount,
            };
        case "SUCCESS_SPRV2_APPROVE":
            return {
                ...state,
                successSPRV2Approve: payload.successSPRV2Approve,
            };

        case "GET_SPRV2_SINGLE_APPROVE_STATE_VIEW":
            return {
                ...state,
                getSPRV2SingleApproved: payload.getSPRV2SingleApproved,
            };

        case "GET_SPRV2_ALL_TOKEN_VIEW":
            return {
                ...state,
                getSPRV2StakingTokenIdImgVideoUrl: payload.getSPRV2StakingTokenIdImgVideoUrl,
            };

        case "SELECT_SPRV2_STAKING_NFT":
            return { ...state, myTokenId: payload };

        case "SELECT_SPRV2_UNSTAKING_NFT":
            return { ...state, myStakedTokenId: payload };
        default:
            return { ...state };
    }
}

export default SPRV2StakingViewReducer;
