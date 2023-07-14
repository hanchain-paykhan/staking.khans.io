import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USDCLogo } from "../../../../assets/_index";
import { FiRefreshCcwIcon } from "../../../Icons/reactIcons";
import "../AfterLogin/USDCAirDropSection.scss";

const BeforeUSDCAirDropSection = () => {
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
  return (
    <>
      {checkChainId === "0x1" ? (
        <div className="airDrop-USDC-Section">
          <div className="airDrop-USDC-LogoSection">
            <img src={USDCLogo} alt="-USDC-Logo" />
          </div>
          <div className="airDrop-USDC-Txt">
            <a>USDC</a>
          </div>
          <div className="airDrop-USDC-Btn">
            <button className="cant-USDC-learn-more" disabled={true}>
              Nothing to Claim
            </button>
          </div>
          <div className="airDrop-USDC-TimeStampSection">
            <div className="airDrop-USDC-TimeStampTitle">
              <a>Remaining Duration</a>
            </div>
            <div className="airDrop-USDC-TimeStampInfo">
              <a className="USDC-DayDate">N/A</a>
              <a className="USDC-HoursDate">N/A</a>
              <a className="USDC-MinDate">N/A</a>
              {/* <a> */}
              <FiRefreshCcwIcon className="airDrop-USDC-ReFreshTimeStamp" />
              {/* </a> */}
            </div>
            {/* <div className="airDrop-USDC-TimeStampInfo">
                    <a className="-USDC-DayDate">{claimDayDate}D</a>
                    <a className="-USDC-HoursDate">{claimHoursDate}H</a>
                    <a className="-USDC-MinDate">{claimMinDate}M</a>
                    <FiRefreshCcw className="airDrop-USDC-ReFreshTimeStamp" onClick={changeTimeStampState} />
                </div> */}
            <p></p>
          </div>
          {/* <div className="airDrop-USDC-PriceSection">
                <a>1 -USDC- = {getLatestPrice} USD</a>
            </div> */}
        </div>
      ) : (
        <div className="airDrop-USDC-Section">
          <div className="airDrop-USDC-LogoSection">
            <img src={USDCLogo} alt="-USDC-Logo" />
          </div>
          <div className="airDrop-USDC-Txt">
            <a>USDC</a>
          </div>

          <div className="airDrop-USDC-Btn">
            <button className="switch-Usdc-learn-more" disabled={true}>
              Switch to Ethereum
            </button>
          </div>

          <div className="airDrop-USDC-TimeStampSection">
            <div className="airDrop-USDC-TimeStampTitle">
              <a>Remaining Duration</a>
            </div>
            <div className="airDrop-USDC-TimeStampInfo">
              <a className="USDC-DayDate">N/A</a>
              <a className="USDC-HoursDate">N/A</a>
              <a className="USDC-MinDate">N/A</a>
              {/* <a> */}
              <FiRefreshCcwIcon className="airDrop-USDC-ReFreshTimeStamp" />
              {/* </a> */}
            </div>
            <p></p>
          </div>
          {/* <div className="airDrop-USDC-PriceSection">
                <a>1 -USDC- = {getLatestPrice} USD</a>
            </div> */}
        </div>
      )}
    </>
  );
};

export default BeforeUSDCAirDropSection;
