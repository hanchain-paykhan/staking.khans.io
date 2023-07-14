let initialState = {
    uniV2StakingTokenBalance: 0,
    uniV2StakedAmount: "",
    uniV2StakedrewardReleased: "",
    uniV2StakedunclaimedReward: "",
    uniV2TotalSupply: "",
    successUniV2Approve: false,
    uniV2ApproveState: 0,
    uniV2RewardView: "",
    stakingUniV2APR: 0,
};

function uniV2ViewReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "UNIV2_STAKING_VIEW_SUCCESS":
            return {
                ...state,
                uniV2StakingTokenBalance: payload.uniV2StakingTokenBalance,
                uniV2StakedAmount: payload.uniV2StakedAmount,
                uniV2StakedrewardReleased: payload.uniV2StakedrewardReleased,
                uniV2StakedunclaimedReward: payload.uniV2StakedunclaimedReward,
                uniV2TotalSupply: payload.uniV2TotalSupply,
            };

        case "UNIV2_STAKING_APPORVE_SUCCESS":
            return {
                ...state,
                successUniV2Approve: payload.successUniV2Approve,
            };

        case "UNIV2_STAKING_APPORVE_STATE":
            return {
                ...state,
                uniV2ApproveState: payload.uniV2ApproveState,
            };
        case "UNIV2_STAKING_REWARD_VIEW":
            return {
                ...state,
                uniV2RewardView: payload.uniV2RewardView,
            };
        case "UNIV2_STAKING_APR":
            return {
                ...state,
                stakingUniV2APR: payload.stakingUniV2APR,
            };

        default:
            return { ...state };
    }
}

export default uniV2ViewReducer;
