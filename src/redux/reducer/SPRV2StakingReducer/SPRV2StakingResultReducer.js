let initialState = {
    SPRV2ResultValue: "",
    getSPRV2UnClaimedRewards: "",
    getSPRV2TotalReward: "",
};

function SPRV2StakingResultReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "SPRV2_RESULT_VIEW":
            return {
                ...state,
                SPRV2ResultValue: payload.SPRV2ResultValue,
                getSPRV2UnClaimedRewards: payload.getSPRV2UnClaimedRewards,
                getSPRV2TotalReward: payload.getSPRV2TotalReward,
            };

        default:
            return {
                ...state,
            };
    }
}

export default SPRV2StakingResultReducer;
