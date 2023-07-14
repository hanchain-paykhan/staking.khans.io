import React, { useEffect, useState } from "react";
import Loading from "../../../SprStakingPage/Loading";
import Swal from "sweetalert2";
import { MusiLogoXBack } from "../../../../assets/_index";
import { MdKeyboardArrowDownIcon } from "../../../Icons/reactIcons";
import "../AfterLogin/L2WithdrawSection.scss";

const BeforeWithdrawSection = () => {
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
        <div>
          <h3>MainNet</h3>
        </div>
      ) : checkChainId === "Oxa" ? (
        // Optimism Withdraw Section
        <div className="musiStakingL2WithdrawContainer">
          <div className="musiStakingL2WithdrawSection">
            <div className="musiStakingL2WithdrawAmountSection">
              <div className="musiStakingL2WithdrawAmountTitleSection">
                <p>Available: </p>
                <button className="amountMusiMaxBtn">Max</button>
              </div>
              <input type="number" placeholder="0.0" min="0" step="0.000000000000001"></input>
              <div className="musiStakingL2WithdrawPickerSection">
                <button className="musiStakingL2WithdrawPicker_SelectBtn" onClick={loginAlert}>
                  <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                  <MdKeyboardArrowDownIcon size="15" />
                </button>
              </div>
            </div>
            <div className="musiStakingL2WithdrawSwitchBtnSection">
              <button className="musi-L2Withdraw-Enter-learn-more">SELECT TOKEN</button>
            </div>
          </div>
        </div>
      ) : (
        // Others Network Withdraw Section
        <div className="cantConnectNetWorkContainer">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default BeforeWithdrawSection;
