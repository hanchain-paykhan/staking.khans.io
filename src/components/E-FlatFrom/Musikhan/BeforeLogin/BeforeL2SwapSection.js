import React, { useEffect, useState } from "react";
import { MusiLogoXBack, OptimismRedLogo } from "../../../../assets/_index";
import Loading from "../../../SprStakingPage/Loading";
import Swal from "sweetalert2";
import { MdKeyboardArrowDownIcon, AiOutlineArrowDownIcon } from "../../../Icons/reactIcons";
import "../AfterLogin/L2SwapSection.scss";

const BeforeL2SwapSection = () => {
  const [checkChainId, setCheckChainId] = useState("");

  const loginAlert = () => {
    Swal.fire({
      text: "Please try again after log in",
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
      footer: '<a href="/hanep/signin">Go to the login page?</a>',
    });
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
      {checkChainId === "0x1" ? (
        // Ethereum Swap Section
        <div>
          <h1>MainNet</h1>
        </div>
      ) : checkChainId === "Oxa" ? (
        // Optimism Swap Section
        <div className="musiStakingL2SwapContainer">
          <div className="musiStakingL2SwapSection">
            <div className="musiStakingL2SwapTitleSection">
              <a className="musiStakingL2SwapTitleFrTxt">From</a>
              <img src={OptimismRedLogo} className="musiStakingL2SwapFrImg" alt="OptimismLogo" />
              <a className="musiStakingL2SwapTxt">Old Version Musikhan</a>
            </div>
            <div className="musiStakingL2SwapAmountSection">
              <input type="number" placeholder="0.0" min="0" disabled></input>
              <div className="musiStakingL2SwapPickerSection">
                <button className="musiStakingL2SwapPicker_SelectBtn" onClick={loginAlert}>
                  <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                  <MdKeyboardArrowDownIcon size="15" />
                </button>
              </div>
            </div>
            <div className="musiStakingBridgeArrowSection">
              <AiOutlineArrowDownIcon />
            </div>
            <div className="musiStakingL2SwapOpTitleSection">
              <a className="musiStakingL2SwapOpTitleTxt">To</a>
              <img src={OptimismRedLogo} className="musiStakingL2SwapOpImg" alt="OptimismLogo" />
              <a className="musiStakingL2SwapOpTxt">New Version Musikhan</a>
            </div>
            <div className="musiStakingBridegeSwitchBtnSection">
              <button className="can-Musi-L2Swap-learn-more">SELECT TOKEN</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cantConnectNetWorkContainer">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default BeforeL2SwapSection;
