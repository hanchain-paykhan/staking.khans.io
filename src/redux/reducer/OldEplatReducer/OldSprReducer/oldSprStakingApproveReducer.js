let initialState = {
    getOldSprSingleApproved: "",
};

function oldSprStakingApproveReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "GET_OLD_SPR_STAKING_SINGLE_RESULT_VIEW_SUCCESS":
            return {
                ...state,
                getOldSprSingleApproved: payload.getOldSprSingleApproved,
            };
        default:
            return { ...state };
    }
}

//sprStakingViewAction.js

export default oldSprStakingApproveReducer;
