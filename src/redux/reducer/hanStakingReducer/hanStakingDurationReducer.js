let initialState = {
    hanClaimDayDate: "",
    hanClaimHoursDate: "",
    hanClaimMinDate: "",
    hanClaimSecDate: "",
};

function hanStakingDurationReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "HANCHAIN_DURATION_TIMESTAMP":
            return {
                ...state,
                hanClaimDayDate: payload.hanClaimDayDate,
                hanClaimHoursDate: payload.hanClaimHoursDate,
                hanClaimMinDate: payload.hanClaimMinDate,
                hanClaimSecDate: payload.hanClaimSecDate,
            };

        default:
            return {
                ...state,
            };
    }
}

export default hanStakingDurationReducer;
