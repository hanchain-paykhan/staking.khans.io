let initialState = {
    gasPriceResult :"",
};


function gasPriceResultReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "GET_GASPRICE_RESULT_SUCCESS":
            return {
                ...state,
                gasPriceResult : payload.gasPriceResult,
            }
        default:
            return { ...state};
    }
}

//sprStakingViewAction.js

export default gasPriceResultReducer