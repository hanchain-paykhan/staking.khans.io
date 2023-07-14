import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HanEpL2ConnectWalletSection.scss";
import { connectAccount } from "../../../redux/actions/connectAccount";
import { OptimismRedLogo } from "../../../assets/_index";
import { FcCancelIcon } from "../../Icons/reactIcons";

const HanEpL2ConnectWalletSection = () => {
    const dispatch = useDispatch();
    const [checkChainId, setCheckChainId] = useState("");
    const { account } = useSelector((state) => state.account);

    const setup = () => {
        dispatch(connectAccount.getAccount());
    };

    const handleConnectWallet = async () => {
        if (window.ethereum === undefined) {
            window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn");
        } else {
            setup();
        }
    };

    useEffect(() => {
        if (window.ethereum?.chainId === "0x1") {
            setCheckChainId("0x1");
        }
        if (window.ethereum?.chainId === "0xa") {
            setCheckChainId("Oxa");
        }
    }, [window.ethereum?.chainId]);
    return (
        <div>
            {account === "" ? (
                <div className="connectHanEpL2MetaWalletSection">
                    <a className="social-button button--social-login button--google" href="#">
                        <img
                            width="20px"
                            height="20px"
                            src="https://static.coingecko.com/s/metamask_fox-99d631a5c38b5b392fdb2edd238a525ba0657bc9ce045077c4bae090cfc5b90a.svg"
                            className="social-icon fa fa-google"
                            alt="MetamaskIcon"
                        ></img>
                        <p onClick={handleConnectWallet}>Connect Wallet</p>
                    </a>
                </div>
            ) : checkChainId === "0x1" ? (
                <div className="connectHanEpL2EtherWalletSection">
                    <a className="social-button button--social-login button--google" href="#">
                        <img width="20px" height="20px" src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" className="social-icon fa fa-google" alt="EthereumIcon"></img>
                        {account.substr(0, 6)}...{account.slice(-6)}
                    </a>
                </div>
            ) : checkChainId === "Oxa" ? (
                <div className="connectHanEpL2OptiComWalletSection">
                    <a className="social-button button--social-login button--google" href="#">
                        <img width="20px" height="20px" src={OptimismRedLogo} className="social-icon fa fa-google" alt="OptimismIcon"></img>
                        {account.substr(0, 6)}...{account.slice(-6)}
                    </a>
                </div>
            ) : (
                <div className="cantConnectHanEpL2WalletSection">
                    <p className="cantConnectHanEpL2Txt">Please switch to network</p>
                    <a className="social-button button--social-login button--google" href="#">
                        <FcCancelIcon className="social-icon fa fa-google" />
                        {account.substr(0, 6)}...{account.slice(-6)}
                    </a>
                </div>
            )}
        </div>
    );
};

export default HanEpL2ConnectWalletSection;
