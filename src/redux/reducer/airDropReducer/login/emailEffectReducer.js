const initialState = {
    testArr: "",
    codeTimer: false,
    duplicate: false,
    signUp: false,
    login: false,
    code: "",
    email: "",
    captcha: false,
    find: false,
    checkEmail: false,
};

const emailEffectReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SIGNUP_EMAIL_VERIFICATION":
            return { ...state, testArr: payload.testArr };
        case "TIMER_START":
            return { ...state, codeTimer: payload };
        case "DUPLICATE_CHECK":
            return { ...state, duplicate: payload.duplicate };
        case "SIGNUP":
            return { ...state, signUp: payload.signUp };
        case "LOGIN":
            return { ...state, login: payload.login };
        case "CODE":
            return { ...state, code: payload.code };
        case "EMAIL":
            return { ...state, email: payload.email };
        case "CAPTCHA":
            return { ...state, captcha: payload.captcha };
        case "FIND":
            return { ...state, find: payload.find };
        case "CHECK_EMAIL":
            return { ...state, checkEmail: payload.checkEmail };
        default:
            return { ...state };
    }
};

export default emailEffectReducer;
