import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MusiLogoXBack, OptimismRedLogo } from "../../../../assets/_index";
import Loading from "../../../SprStakingPage/Loading";
import Swal from "sweetalert2";
import { MdKeyboardArrowDownIcon, AiOutlineArrowDownIcon } from "../../../Icons/reactIcons";
import "../AfterLogin/L1BridgeL2DepositSection.scss";

const BeforeL1BridgeL2DepositSection = () => {
  const [checkChainId, setCheckChainId] = useState("");

  const { account } = useSelector((state) => state.account);

  useEffect(() => {
    if (window.ethereum?.chainId === "0x1") {
      setCheckChainId("0x1");
    }
    if (window.ethereum?.chainId === "0xa") {
      setCheckChainId("Oxa");
    }
  }, [window.ethereum?.chainId]);

  const loginAlert = () => {
    Swal.fire({
      text: "Please try again after log in",
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
      footer: '<a href="/hanep/signin">Go to the login page?</a>',
    });
  };

  return (
    <div>
      {checkChainId === "0x1" ? (
        // Ethereum Bridge Section (Optimsim Deposit)
        <div className="musiStakingBridgeContainer">
          <div className="musiStakingBridgeSection">
            <div className="musiStakingBirdgeTitleSection">
              <a className="musiStakingTitleTxt">From</a>
              <img
                src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                className="musiStakingMainNetImg"
                alt="EtheruemIcon"
              />
              <a className="musiStakingMainTxt">Ethereum Mainnet</a>
            </div>
            <div className="musiStakingBridgeAmountSection">
              <input type="number" placeholder="0.0" min="0" disabled></input>

              <div className="musiStakingBridgePickerSection">
                <button className="musiStakingBridgePicker_SelectBtn" onClick={loginAlert}>
                  <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                  <MdKeyboardArrowDownIcon size="15" />
                </button>
              </div>
            </div>
            <div className="musiStakingBridgeArrowSection">
              <AiOutlineArrowDownIcon />
            </div>
            <div className="musiStakingBirdgeOpTitleSection">
              <a className="musiStakingOpTitleTxt">To</a>
              <img src={OptimismRedLogo} className="musiStakingOpImg" alt="OptimismIcon" />
              <a className="musiStakingOpTxt">Optimism</a>
            </div>
            <>
              <div className="musiStakingBridegeSwitchBtnSection">
                <button className="can-Musi-mainEth-learn-more">SELECT TOKEN</button>
              </div>
            </>
          </div>
          <div className="musiStakingEthBottomLineSection">
            <hr className="ethBottomHr"></hr>
          </div>
        </div>
      ) : checkChainId === "Oxa" ? (
        // Optimism Deposit Section
        <div className="musiStakingL2DepositContainer">
          <div className="musiStakingL2DepositSection">
            <>
              <div className="musiStakingL2DepositAmountSection">
                <div className="musiStakingL2DepositAmountTitleSection">
                  <p>Available : </p>
                  <button className="amountMusiMaxBtn">Max</button>
                </div>
                <input type="number" placeholder="0.0" min="0" step="0.0000000000000000001"></input>
                <div className="musiStakingL2DepositPickerSection">
                  <button className="musiStakingL2DepositPicker_SelectBtn" onClick={loginAlert}>
                    <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                    <MdKeyboardArrowDownIcon size="15" />
                  </button>
                </div>
              </div>
              <div className="musiStakingL2DepositSwitchBtnSection">
                <button className="musi-L2Deposit-Enter-learn-more">SELECT TOKEN</button>
              </div>
            </>
          </div>
        </div>
      ) : (
        // Others Network Deposit Section
        <div className="cantConnectNetWorkContainer">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default BeforeL1BridgeL2DepositSection;
