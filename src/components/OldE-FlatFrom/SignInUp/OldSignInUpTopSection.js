import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "../../../redux/actions/airdropActions/signUpActions/signUpAction";

const OldSignInUpTopSection = () => {
    const dispatch = useDispatch();

    const [loginState, setLoginState] = useState(false);
    const { account } = useSelector((state) => state.account);
    const [userEmail, setUserEmail] = useState("");

    const { login, email } = useSelector((state) => state.signUpEmail);

    const verification = () => {
        if (email === userEmail) {
            setLoginState(true);
        } else setLoginState(false);
    };

    const getEmail = () => {
        setUserEmail(sessionStorage.getItem(account));
    };

    useEffect(() => {
        getEmail();
        dispatch(signUpAction.loginAct(account));
        dispatch(signUpAction.getEmailAct(account));
        verification();
    }, [login, email, userEmail, account, loginState]);

    return (
        <div>
            {loginState === true ? (
                <div className="airDropSignEmailContinaer">
                    <div className="airDropSignIn-Email-Section">
                        <a>{userEmail}</a>
                    </div>
                </div>
            ) : (
                <div className="airDropSignInUpContinaer">
                    <div className="airDropSignIn-BtnSection">
                        <a href="/hanep/old/signin" target="_parent">
                            Log in
                        </a>
                    </div>
                    <div className="airDropSignUp-BtnSection">
                        <a href="/hanep/old/signup">Sign up</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OldSignInUpTopSection;
