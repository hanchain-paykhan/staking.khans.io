let initialState = {
    oldMunieResultValue: "",
    getOldMunieUnClaimedRewards: "",
    getOldMunieTotalReward: "",
};

function oldMunieStakingResultReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "OLD_MUNIE_RESULT_VIEW":
            return {
                ...state,
                oldMunieResultValue: payload.oldMunieResultValue,
                getOldMunieUnClaimedRewards: payload.getOldMunieUnClaimedRewards,
                getOldMunieTotalReward: payload.getOldMunieTotalReward,
            };

        default:
            return {
                ...state,
            };
    }
}

export default oldMunieStakingResultReducer;
