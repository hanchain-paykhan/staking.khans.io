import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AirDropSignInPage.scss";
import { HanLogo } from "../../assets/_index";
import MetamaskIcon from "../../assets/images/MetamaskIcon.svg";
import { signUpAction } from "../../redux/actions/airdropActions/signUpActions/signUpAction";
import { connectAccount } from "../../redux/actions/connectAccount";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import OldLoginFooter from "../../components/AirDropPage/Login/OldLoginFooter";

const OldHanEplatSignInPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { account } = useSelector((state) => state.account);
    const { login, email } = useSelector((state) => state.signUpEmail);

    useEffect(() => {
        dispatch(connectAccount.getAccount());
        dispatch(signUpAction.loginAct(account));
        dispatch(signUpAction.getEmailAct(account));
    }, [account, login, email]);

    const nextPage = () => {
        navigate("/hanep/old/signup");
    };

    const loginState = () => {
        if (login) {
            sessionStorage.setItem(account, email);
        } else {
            Swal.fire({
                text: "You have not registered as a member.",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    nextPage();
                }
            });
        }
    };
    return (
        <div className="airDrop-SignIn-Page-Background">
            <div className="airDrop-SignIn-All-Container">
                <div className="airDrop-SignIn-Logo-Section">
                    <img src={HanLogo} alt="HanLogo"></img>
                    <h1>HAN e-Platform</h1>
                </div>
                <div className="airDrop-SignIn-Title-Section"></div>
                {login ? (
                    <div className="airDrop-SignIn-Connect-Metamask-Section">
                        <button onClick={loginState}>
                            <a href="/hanep/old">
                                <img src={MetamaskIcon} alt="MetamaskIcon"></img>
                                <span>Log in with Metamask</span>
                            </a>
                        </button>
                    </div>
                ) : (
                    <div className="airDrop-SignIn-Connect-Metamask-Section">
                        <button onClick={loginState}>
                            <a>
                                {/* <a href="/hanep/signup"> */}
                                <img src={MetamaskIcon} alt="MetamaskIcon"></img>
                                <span>Log in with METAMASK</span>
                            </a>
                        </button>
                    </div>
                )}
                <OldLoginFooter />
            </div>
        </div>
    );
};

export default OldHanEplatSignInPage;
