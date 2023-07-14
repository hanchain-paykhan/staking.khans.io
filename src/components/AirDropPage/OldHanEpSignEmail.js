import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signUpAction } from "../../redux/actions/airdropActions/signUpActions/signUpAction";
import "./AirDropSignEmail.scss";
import { useState } from "react";
import { connectAccount } from "../../redux/actions/connectAccount";
import Swal from "sweetalert2";
import Captcha from "./Login/Captcha";
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from "react-simple-captcha";

const OldHanEpSignEmail = () => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [checkInputCode, setCheckInputCode] = useState(false);
    const [validTime, setValidTime] = useState(false);
    const [sendEmail, setSendEmail] = useState(false);
    const [codeState, setCodeState] = useState(false);
    const [checkIdModal, setCheckIdModal] = useState(false);
    const [time, setTime] = useState(180);
    const [start, setStart] = useState(false);
    const { duplicate, code } = useSelector((state) => state.signUpEmail);
    const { account } = useSelector((state) => state.account);

    const date = new Date(time * 1000);
    const min = String(date.getMinutes()).padStart(2, "0");
    const sec = String(date.getSeconds()).padStart(2, "0");

    const emailAddress = (e) => {
        setAddress(e.target.value);
    };

    const checkCode = (e) => {
        setInputCode(e.target.value);
    };

    const openCheckIdModal = () => {
        setCheckIdModal(true);
    };

    const closeCheckIdModal = () => {
        setCheckIdModal(false);
    };

    const checkDuplicate = () => {
        if (CheckEmail(address) === true) {
            if (duplicate && address !== "") {
                Swal.fire({
                    title: "Address available",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                    html: `<h3 style='color:red'>Click "get code"</h3>`,
                });
                setSendEmail(true);
            } else {
                Swal.fire({
                    text: "Duplicate email or wallet address",
                    // text: "Duplicate email or wallet address",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                });
                setSendEmail(false);
            }
        }
    };

    const CheckEmail = (str) => {
        const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        if (!reg_email.test(str)) {
            Swal.fire({
                text: "Email format is incorrect",
                // text: "Email format is incorrect",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
            return false;
        } else {
            return true;
        }
    };

    const sendCode = () => {
        if (start) {
            Swal.fire({
                text: "We have already sent you a verification code.",
                // text: "Duplicate email or wallet address",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        } else {
            if (sendEmail) {
                dispatch(signUpAction.sendCodeAct(address));
                codeTime();
                setValidTime(false);
                setCodeState(true);
                setStart(true);

                Swal.fire({
                    text: "Please check the verification code in your email",
                    // text: "Duplicate email or wallet address",
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                });
            } else {
                Swal.fire({
                    text: "Please check email duplicates first.",
                    // text: "Duplicate email or wallet address",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                });
            }
        }
    };

    const codeTime = () => {
        const timer = setInterval(() => {
            setTime((time) => time - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
            setValidTime(true);
            setStart(false);
            setTime(180);
        }, 180001);
    };

    const authenticateCode = () => {
        if (code == inputCode && codeState === true && inputCode !== "") {
            setCheckInputCode(true);
            Swal.fire({
                text: "Verification code is correct",
                // text: "Duplicate email or wallet address",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        } else {
            setCheckInputCode(false);
            Swal.fire({
                text: "Verification code is incorrect",
                // text: "Duplicate email or wallet address",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    };

    const codeValid = () => {
        if (!validTime) {
            authenticateCode();
        } else {
            Swal.fire({
                text: "Time has passed. Please send the request again",
                // text: "Duplicate email or wallet address",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    };

    const signUp = () => {
        if (checkInputCode) {
            dispatch(signUpAction.signUpAct(address, account));
            dispatch(signUpAction.nextComPage());
        } else {
            Swal.fire({
                // title: "Please check your verification code",
                text: "Please check your verification code",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    };

    useEffect(() => {
        dispatch(connectAccount.getAccount());
        dispatch(signUpAction.emailDuplicateCheckAct(address, account));
    }, [address, account]);
    return (
        <div className="airDrop-SignUp-Wrap-Step2">
            <div className="airDrop-SignUp-Wrap-Step2-Section">
                <div className="airDrop-SignUp-Email-Enter-Section">
                    {codeState === true ? (
                        <div>
                            <input onChange={emailAddress} value={address} type="email" placeholder="Please enter your email." disabled="disabled" required></input>
                        </div>
                    ) : (
                        <div>
                            <input onChange={emailAddress} value={address} type="email" placeholder="Please enter your email." required></input>
                        </div>
                    )}
                    {!sendEmail ? (
                        <button onClick={checkDuplicate}>Check</button>
                    ) : checkInputCode !== true ? (
                        <button onClick={sendCode}>Get Code</button>
                    ) : (
                        <button disabled="disabled">Code sent</button>
                    )}
                </div>
                <div className="airDrop-SignUp-Code-Check-Container">
                    {checkInputCode !== true ? (
                        <div className="airDrop-SignUp-Code-Check-Section">
                            <input onChange={checkCode} placeholder="Please enter your verification code."></input>
                            <button onClick={codeValid}>Submit</button>
                        </div>
                    ) : (
                        <div className="airDrop-SignUp-Code-Check-Section">
                            <input disabled="disabled" placeholder="Code."></input>
                            <button disabled="disabled">Complete</button>
                        </div>
                    )}
                    <div className="airDrop-SignUp-Email-Timer-Section">
                        {checkInputCode !== true ? (
                            <p>
                                {min} : {sec}
                            </p>
                        ) : (
                            <p>success</p>
                        )}
                    </div>
                </div>

                <div className="airDrop-SignUp-Metamask-Account-Section">
                    <p>Address : {account} </p>
                    <div className="airDrop-SignUp-CheckId-Section">
                        <a onClick={openCheckIdModal}>Forgot your account ?</a>
                    </div>
                </div>

                <div className="airDrop-SignUp-Email-CompelteBtn-Section">
                    <button onClick={signUp}>Sign up</button>
                </div>

                <Captcha open={checkIdModal} address={address} close={closeCheckIdModal} header="Modal heading"></Captcha>
            </div>
        </div>
    );
};

export default OldHanEpSignEmail;
