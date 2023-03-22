const initialState = {
    authenticate: false,
    completePage: false,
};

const signUpReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "AGREE":
            return { ...state, authenticate: true };
        case "LOGOUT":
            return { ...state, authenticate: false };
        case "COMPLETE_SUCCESS":
            return { ...state, completePage: true };
        default:
            return { ...state };
    }
};

export default signUpReducer;
