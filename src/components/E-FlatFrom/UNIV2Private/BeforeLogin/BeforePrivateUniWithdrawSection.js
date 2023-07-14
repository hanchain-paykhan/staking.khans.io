import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { networksAction } from "../../../../redux/actions/networksAction";
import Swal from "sweetalert2";
import { USDCLogo } from "../../../../assets/_index";
import { GiClick } from "react-icons/gi";
import { FiRefreshCcw } from "react-icons/fi";
import "../AfterLogin/PrivateUniWithdrawSection.scss";

const BeforePrivateUniWithdrawSection = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
  const { account } = useSelector((state) => state.account);

  const changeEthereumNetWork = () => {
    dispatch(networksAction.changeEthereumNetWorkAct());
  };

  const loginAlert = () => {
    Swal.fire({
      text: "Please try again after log in",
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
      footer: '<a href="/hanep/signin">Go to the login page?</a>',
    });
  };

  // add to Reward Token
  const addRewardToken = async () => {
    const tokenAddress = "0x50Bce64397C75488465253c0A034b8097FeA6578";
    const tokenSymbol = "HAN";
    const tokenDecimals = 18;
    // const tokenImage = "https://raw.githubusercontent.com/hanchain-paykhan/hanchain/3058eecc5d26f980db884f1318da6c4de18a7aea/logo/logo.svg";

    try {
      const wasAdded = await window.ethereum?.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            // image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (window.ethereum?.chainId === "0x1") {
      setCheckChainId("0x1");
    }
    if (window.ethereum?.chainId === "0xa") {
      setCheckChainId("Oxa");
    }
    if (window.ethereum?.chainId === "0x5") {
      setCheckChainId("0x5");
    }
    if (window.ethereum?.chainId === "0x1a4") {
      setCheckChainId("0x1a4");
    }
  }, [window.ethereum?.chainId]);
  return (
    <div>
      <>
        <div className="eplat-PrUni-Withdraw-Quaota-Section">
          <p>TOTAL STAKED : </p>
        </div>
        <div className="eplat-PrUni-Withdraw-StakeAmount-Section">
          <p>STAKED : </p>
        </div>
      </>
      <div className="eplat-PrUni-Deposit-APR-Container">
        <div className="eplat-PrUni-Deposit-APR-Title">
          <a>APR</a>
        </div>
        <div className="eplat-PrUni-Deposit-APR-Info">
          <a>%</a>
        </div>
      </div>
      <div className="eplat-PrUni-Withdraw-AmountSection">
        <input type="number" step="0.00000000000001" id="maxUnstakeAmount" placeholder="0" readOnly></input>
        <p>UNI-V2</p>
        {/* <button className="eplat-PrUni-Withdraw-AmountMaxBtn">Max</button> */}
        <button className="eplat-PrUni-Select-Token-Btn" onClick={loginAlert}>
          SELECT
          <GiClick className="eplat-PrUni-Select-Token-Icon" />
        </button>
      </div>
      <div className="eplat-PrUni-WithDraw-TimeContainer">
        <div className="eplat-PrUni-WithDraw-TimeTitle">
          <a>Remaining Duration</a>
        </div>
        {/* {rakis6ClaimDayDate ? (
                    <div className="eplat-PrUni-WithDraw-TimeSection">
                        <a className="rakis6DayDate">{rakis6ClaimDayDate}D</a>
                        <a className="rakis6HoursDate">{rakis6ClaimHoursDate}H</a>
                        <a className="rakis6MinDate">{rakis6ClaimMinDate}M</a>
                        <FiRefreshCcw className="eplat-PrUni-WithDraw-ReFreshIcon" onClick={changeRakis6TimeStampState} />
                    </div>
                ) : ( */}
        <div className="eplat-PrUni-WithDraw-TimeSection">
          <a className="rakis6DayDate">N/A</a>
          <a className="rakis6HoursDate">N/A</a>
          <a className="rakis6MinDate">N/A</a>
          <FiRefreshCcw className="eplat-PrUni-WithDraw-CantReFreshIcon" />
        </div>
        {/* )} */}
      </div>
      <div className="eplat-PrUni-WithDraw-BtnContainer">
        {/* <div className="eplat-PrUni-Withdraw-Can-BtnSection">
<button className="eplat-PrUni-Withdraw-CanBtn" onClickCapture={setRakis6UnStake}>
    UNSTAKE
</button>
</div> */}

        <div className="eplat-PrUni-Withdraw-Can-BtnSection">
          <button className="eplat-PrUni-Withdraw-SelectBtn" disabled={true}>
            UNSATKE
          </button>
        </div>
      </div>
      <div className="logoContainer">
        <img
          src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
          onClick={changeEthereumNetWork}
          className="opIcon"
          alt="EthereumIcon"
        />
        <div className="HanEpTxtContinaer">
          <span className="HanEpTxt" onClick={addRewardToken}>
            HANeP
          </span>
        </div>
        {/* <img src={USDCLogo} onClick={addRewardToken} className="hanIcon" alt="HanIcon" /> */}
      </div>
    </div>
  );
};

export default BeforePrivateUniWithdrawSection;
