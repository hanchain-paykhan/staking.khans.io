let initialState = {
    getOldSprStakingTokenIdImgVideoUrl: [],
};

function oldSprAllStakedViewReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "GET_OLD_SPR_ALL_TOKEN_VIEW_SUCCESS":
            return {
                ...state,
                getOldSprStakingTokenIdImgVideoUrl: payload.getOldSprStakingTokenIdImgVideoUrl,
            };
        default:
            return { ...state };
    }
}

export default oldSprAllStakedViewReducer;
