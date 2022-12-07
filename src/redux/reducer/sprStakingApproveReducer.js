let initialState = {
    getSingleApproved :"",
};


function sprStakingApproveReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "GET_SPR_STAKING_SINGLE_RESULT_VIEW_SUCCESS":
            return {
                ...state,
                getSingleApproved : payload.getSingleApproved,
            }
        default:
            return { ...state};
    }
}

//sprStakingViewAction.js

export default sprStakingApproveReducer