import axios from "axios";

const agree = () => {
    return (dispatch) => {
        dispatch({ type: "AGREE" });
    };
};

const nextComPage = () => {
    return (dispatch) => {
        dispatch({ type: "COMPLETE_SUCCESS" });
    };
};

const getEmailAct = (account) => {
    return async (dispatch) => {
        try {
            const res = await axios.post("https://back.khans.io/block/getEmail", {
                account,
            });
            dispatch({
                type: "EMAIL",
                payload: { email: res.data },
            });
        } catch (err) {
            console.log(err);
        }
    };
};

const sendCodeAct = (email) => {
    return async (dispatch) => {
        try {
            const res = await axios.post("https://back.khans.io/block/sendMail", {
                email,
            });
            dispatch({
                type: "CODE",
                payload: { code: res.data },
            });
        } catch (err) {
            console.log(err);
        }
    };
};

const emailDuplicateCheckAct = (email, account) => {
    return async (dispatch) => {
        try {
            const res = await axios.post("https://back.khans.io/block/joinCheck", {
                email,
                account,
            });
            dispatch({
                type: "DUPLICATE_CHECK",
                payload: { duplicate: res.data },
            });
        } catch (err) {
            console.log(err);
        }
    };
};

const signUpAct = (email, account) => {
    return async (dispatch) => {
        try {
            const res = await axios.post("https://back.khans.io/block/join", {
                email,
                account,
            });
            dispatch({
                type: "SIGNUP",
                payload: { signUp: res.data },
            });
        } catch (err) {
            console.log(err);
        }
    };
};

const loginAct = (account) => {
    return async (dispatch) => {
        try {
            const res = await axios.post("https://back.khans.io/block/login", {
                account,
            });
            dispatch({
                type: "LOGIN",
                payload: { login: res.data },
            });
        } catch (err) {
            console.log(err);
        }
    };
};

const captchaAct = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: "CAPTCHA", payload: { captcha: true } });
        } catch (err) {
            console.log(err);
        }
    };
};

const findMetaMailAct = (email) => {
    return async (dispatch) => {
        try {
            const res = await axios.post("https://back.khans.io/block/findMetaMail", {
                email,
            });
            dispatch({
                type: "FIND",
                payload: { find: res.data },
            });
        } catch (err) {
            console.log(err);
        }
    };
};

const checkEmailAct = (email) => {
    return async (dispatch) => {
        try {
            const res = await axios.post("https://back.khans.io/block/checkEmail", {
                email,
            });
            if (res.data) {
                dispatch({
                    type: "CHECK_EMAIL",
                    payload: { checkEmail: res.data },
                });
                return true;
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const signUpAction = {
    agree,
    nextComPage,
    emailDuplicateCheckAct,
    signUpAct,
    loginAct,
    sendCodeAct,
    getEmailAct,
    captchaAct,
    findMetaMailAct,
    checkEmailAct,
};
