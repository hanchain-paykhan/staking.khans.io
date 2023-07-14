let initialState = {
    munieResultValue: "",
    getMunieUnClaimedRewards: "",
    getMunieTotalReward: "",
};

function munieStakingResultReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "MUNIE_RESULT_VIEW":
            return {
                ...state,
                munieResultValue: payload.munieResultValue,
                getMunieUnClaimedRewards: payload.getMunieUnClaimedRewards,
                getMunieTotalReward: payload.getMunieTotalReward,
            };

        default:
            return {
                ...state,
            };
    }
}

export default munieStakingResultReducer;
