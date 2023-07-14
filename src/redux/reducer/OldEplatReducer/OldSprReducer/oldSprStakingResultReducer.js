let initialState = {
    oldSprResultValue: "",
    oldSprGetUnclaimedRewards: "",
    oldSprGetTotalReward: "",
};

function oldSprStakingResultReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "GET_OLD_SPR_STAKING_RESULT_VIEW_SUCCESS":
            return {
                ...state,
                oldSprResultValue: payload.oldSprResultValue,
                oldSprGetUnclaimedRewards: payload.oldSprGetUnclaimedRewards,
                oldSprGetTotalReward: payload.oldSprGetTotalReward,
            };
        default:
            return { ...state };
    }
}

//sprStakingViewAction.js

export default oldSprStakingResultReducer;
