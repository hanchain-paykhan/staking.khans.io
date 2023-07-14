import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Rakis6ConnectWalletSection.scss";
import { FcCancelIcon } from "../Icons/reactIcons";
import { connectAccount } from "../../redux/actions/connectAccount";
import { OptimismRedLogo } from "../../assets/_index";
import { stakingViewAction } from "../../redux/actions/rakis6StakingActions/stakingViewAction";

const Rakis6ConnectWalletSection = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
  const { account } = useSelector((state) => state.account);

  const { getAmount, canAmountStake } = useSelector((state) => state.stakingView);

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

  useEffect(() => {
    dispatch(stakingViewAction.stakingViewAct(account));
  }, [account]);

  return (
    <>
      <div className="stakedCanAmountSection">
        <p>STAKED : {getAmount}</p>
      </div>
      <div className="stakingCanAmountSection">
        <p>Available Quota : {canAmountStake}</p>
      </div>
      {account === "" ? (
        <div className="connectRakis6WalletSection">
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
      ) : checkChainId === "Oxa" ? (
        <div className="connectRakis6ComWalletSection">
          <a className="social-button button--social-login button--google" href="#">
            <img width="20px" height="20px" src={OptimismRedLogo} className="social-icon fa fa-google" alt="OptimismLogo"></img>
            {account.substr(0, 6)}...{account.slice(-6)}
          </a>
        </div>
      ) : (
        <div className="connectRakis6CantWalletSection">
          <p className="cantConnetRakis6Txt">Please swith to optimism</p>
          <a className="social-button button--social-login button--google" href="#">
            <FcCancelIcon className="social-icon fa fa-google" />
            {account.substr(0, 6)}...{account.slice(-6)}
          </a>
        </div>
      )}
    </>
  );
};

export default Rakis6ConnectWalletSection;
