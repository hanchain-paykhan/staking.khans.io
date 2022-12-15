let initialState = {
    getStakingTokenIdImgVideoUrl :[],
};


function getSprTokenImgVideoReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "GET_SPR_ALL_TOKEN_VIEW_SUCCESS":
            return {
                ...state,
                getStakingTokenIdImgVideoUrl : payload.getStakingTokenIdImgVideoUrl,
            }
        default:
            return { ...state};
    }
}

export default getSprTokenImgVideoReducer