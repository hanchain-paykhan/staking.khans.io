let initialState = {
    sprResultValue:"",
    getUnclaimedRewards:"",
    getTotalReward:"",
};


function sprStakingResultReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "GET_SPR_STAKING_RESULT_VIEW_SUCCESS":
            return {
                ...state,
                sprResultValue : payload.sprResultValue,
                getUnclaimedRewards : payload.getUnclaimedRewards,
                getTotalReward : payload.getTotalReward,
            }
        default:
            return { ...state};
    }
}

//sprStakingViewAction.js

export default sprStakingResultReducer