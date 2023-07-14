let initialState = {
    privateUniV2StakingTokenBalance: 0,
    privateUniV2TotalStaked: "",
    totalUniV2PrivateStakedAmount: "",
    privateUniV2Allowance: 0,
    successPrivateUniV2Approve: false,
    getUniPrivateStakerDataArray: {},
    privateWithdrawAmountToModal: "",
    privateWithdrawIndex: "",
    privateUniV2RewardPerSecondView: "",
    privateUniV2TotalRewardReleased: "",
    stakingPrUniV2APR: 0,
};

function UniV2PrivateViewReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "UNIV2_PRIVATE_VIEW_SUCCESS":
            return {
                ...state,
                privateUniV2StakingTokenBalance: payload.privateUniV2StakingTokenBalance,
                privateUniV2TotalStaked: payload.privateUniV2TotalStaked,
                totalUniV2PrivateStakedAmount: payload.totalUniV2PrivateStakedAmount,
            };
        case "PRIVATE_UNIV2_APPROVE_STATE":
            return {
                ...state,
                privateUniV2Allowance: payload.privateUniV2Allowance,
            };
        case "PRIVATE_UNIV2_APPORVE_SUCCESS":
            return {
                ...state,
                successPrivateUniV2Approve: payload.successPrivateUniV2Approve,
            };
        case "UNIV2_PRIVATE_WITHDRAW_TOKENLIST":
            return {
                ...state,
                getUniPrivateStakerDataArray: payload.getUniPrivateStakerDataArray,
            };

        case "PRIVATE_WITHDRAW_VIEW_SUCCESS":
            return {
                ...state,
                privateWithdrawAmountToModal: payload.privateWithdrawAmountToModal,
                privateWithdrawIndex: payload.privateWithdrawIndex,
            };
        case "PRIVATE_UNIV2_REWARD_VIEW":
            return {
                ...state,
                privateUniV2RewardPerSecondView: payload.privateUniV2RewardPerSecondView,
                privateUniV2TotalRewardReleased: payload.privateUniV2TotalRewardReleased,
            };

        case "PRIVATE_UNIV2_APR":
            return {
                ...state,
                stakingPrUniV2APR: payload.stakingPrUniV2APR,
            };

        default:
            return { ...state };
    }
}

export default UniV2PrivateViewReducer;
