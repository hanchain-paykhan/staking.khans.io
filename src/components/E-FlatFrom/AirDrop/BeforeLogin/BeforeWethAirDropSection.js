import React, { useEffect, useState } from "react";
import { WETHLogo } from "../../../../assets/_index";
import { useDispatch, useSelector } from "react-redux";
import "../AfterLogin/WethAirDropSection.scss";
import { FiRefreshCcwIcon } from "../../../Icons/reactIcons";

const BeforeWethAirDropSection = () => {
  const [checkChainId, setCheckChainId] = useState("");
  const { getLatestPrice } = useSelector((state) => state.airDropLatestPrice);

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
      <div className="airDropWethSection">
        <div className="airDropWethLogoSection">
          <img src={WETHLogo} />
        </div>
        <div className="airDropWethTxt">
          <a>WETH</a>
        </div>
        {checkChainId === "Oxa" ? (
          <div className="airDropWethBtn">
            <button className="cant-weth-learn-more" disabled={true}>
              Nothing to Claim
            </button>
          </div>
        ) : (
          <div className="airDropWethBtn">
            <button className="switch-weth-learn-more" disabled={true}>
              Switch to Optimism
            </button>
          </div>
        )}
        <div className="airDropWethTimeStampSection">
          <div className="airDropWethTimeStampTitle">
            <a>Remaining Duration</a>
          </div>
          <div className="airDropWethTimeStampInfo">
            <a className="wethDayDate">N/A</a>
            <a className="wethHoursDate">N/A</a>
            <a className="wethMinDate">N/A</a>
            <FiRefreshCcwIcon className="airDropWethReFreshTimeStamp" />
          </div>
          <p></p>
        </div>
        <div className="airDropWethPriceSection">
          <a>1 WETH = {getLatestPrice} USD</a>
        </div>
      </div>
    </>
  );
};

export default BeforeWethAirDropSection;
