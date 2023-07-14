import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HanLogo } from "../../../../assets/_index";
import { hanAirDropClaimAction } from "../../../../redux/actions/airdropActions/hanActions/hanAirDropClaimAction";
import { hanAirDropTimeStampAction } from "../../../../redux/actions/airdropActions/hanActions/hanAirDropTimeStampAction";
import Swal from "sweetalert2";
import { FiRefreshCcwIcon } from "../../../Icons/reactIcons";
import "../AfterLogin/HanAirDropSection.scss";

const BeforeHanAirDropSection = () => {
  const dispatch = useDispatch();

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
    <>
      <div className="airDrop-Han-Section">
        <div className="airDrop-Han-LogoSection">
          <img src={HanLogo} alt="HanLogo" />
        </div>
        <div className="airDrop-Han-Txt">
          <a>HAN</a>
        </div>
        {checkChainId === "Oxa" ? (
          <div className="airDrop-Han-Btn">
            <button className="cant-han-learn-more" disabled={true}>
              Nothing to Claim
            </button>
          </div>
        ) : (
          <div className="airDrop-Han-Btn">
            <button className="cant-han-learn-more" disabled={true}>
              Switch to Optimism
            </button>
          </div>
        )}

        <div className="airDrop-Han-TimeStampSection">
          <div className="airDrop-Han-TimeStampTitle">
            <a>Remaining Duration</a>
          </div>
          <div className="airDrop-Han-TimeStampInfo">
            <a className="han-DayDate">N/A</a>
            <a className="han-HoursDate">N/A</a>
            <a className="han-MinDate">N/A</a>
            {/* <a> */}
            <FiRefreshCcwIcon className="airDrop-Han-ReFreshTimeStamp" />
            {/* </a> */}
          </div>
          <p></p>
        </div>
      </div>
    </>
  );
};

export default BeforeHanAirDropSection;
