import React, { useEffect } from "react";
import "./AirDropSignUpPage.scss";
import { HanLogo } from "../../assets/_index";
import { useSelector, useDispatch } from "react-redux";
import { connectAccount } from "../../redux/actions/connectAccount";
import { OldHanEpAgreeTerm, OldHanEpSignComplete, OldHanEpSignEmail } from "../../components";

const OldHanEplatSingUpPage = () => {
    const { authenticate, completePage } = useSelector((state) => state.signUp);
    const dispatch = useDispatch();

    const setup = () => {
        dispatch(connectAccount.getAccount());
    };
    const networkChanged = (chainId) => {
        console.log({ chainId });
    };
    useEffect(() => {
        window.ethereum?.on("chainChanged", networkChanged);

        return () => {
            window.ethereum?.removeListener("chainChanged", networkChanged);
        };
    }, []);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum?.on("chainChanged", () => {
                window.location.reload();
            });
            window.ethereum?.on("accountsChanged", () => {
                window.location.reload();
                setup();
            });
        }
    }, []);

    useEffect(() => {
        setup();
        window.ethereum?.on("accountsChanged", () => {
            setup();
        });
    }, []);
    return (
        <div className="airDrop-SignUp-Page-Background">
            <div className="airDrop-SignUp-All-Container">
                <div className="airDrop-SignUp-Logo-Section">
                    <img src={HanLogo} alt="HanLogo"></img>
                    <h1>HAN e-Platform</h1>
                </div>
                <div>
                    {authenticate === false ? (
                        <>
                            <OldHanEpAgreeTerm />
                        </>
                    ) : completePage === false ? (
                        <>
                            <OldHanEpSignEmail />
                        </>
                    ) : (
                        <>
                            <OldHanEpSignComplete />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OldHanEplatSingUpPage;
