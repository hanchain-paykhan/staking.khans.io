import React, { useEffect, useState } from "react";
import "./AirDropSignComplete.scss";
import { useSelector, useDispatch } from "react-redux";
import { signUpAction } from "../../redux/actions/airdropActions/signUpActions/signUpAction";
import Swal from "sweetalert2";
import LoginFooter from "./Login/LoginFooter";
import { AiOutlineHomeIcon } from "../Icons/reactIcons";

const AirDropSignComplete = () => {
    const dispatch = useDispatch();
    const { account } = useSelector((state) => state.account);
    const { login, email } = useSelector((state) => state.signUpEmail);

    const loginState = () => {
        if (login) {
            Swal.fire({
                text: "Go to Airdrop page",
                // text: "Duplicate email or wallet address",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
            sessionStorage.setItem(account, email);
        }
    };

    useEffect(() => {
        dispatch(signUpAction.loginAct(account));
        dispatch(signUpAction.getEmailAct(account));
    }, [account, email]);
    return (
        <div className="airDrop-SignUp-Wrap-Step3">
            <div className="airDrop-SignUp-Wrap-Step3-Section">
                <div className="airDrop-SignUp-ComPlete-Message-Section">
                    <h1>Sign up is Complete</h1>
                </div>
                {/* <div className="airDrop-SignUp-Complete-Message-Section2">
                    <p>When you log in</p>
                </div>
                <div className="airDrop-SignUp-Complete-Message-Section3">
                    <p>a variety of services are available</p>
                </div> */}
                <div className="airDrop-SignUp-Complete-BtnSection">
                    <a className="airDrop-SignUp-Go-AirDrop-Btn" href="/hanep">
                        <AiOutlineHomeIcon className="airDrop-SignUp-Go-AirDrop-Btn-Icon" />
                        Main
                    </a>
                    <button className="airDrop-SignUp-Login-Btn" onClick={loginState}>
                        {login ? <a href="/hanep"> Sign in</a> : <a href="/hanep/signup"> Log in</a>}
                    </button>
                </div>
            </div>
            <LoginFooter />
        </div>
    );
};

export default AirDropSignComplete;
