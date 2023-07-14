import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WETHLogo } from "../../../../img/_index";
import { FiRefreshCcw } from "react-icons/fi";
import AirDropLoading from "../../../AirDropPage/AirDropLoading";
import { airDropClaimAction } from "../../../../redux/actions/airdropActions/wethActions/airDropClaimAction";
import { airDropTimeStampAction } from "../../../../redux/actions/airdropActions/wethActions/airDropTimeStampAction";

const BeforeWethAirDropSection = () => {
    const dispatch = useDispatch();

    const [checkChainId, setCheckChainId] = useState("");

    const { account } = useSelector((state) => state.account);
    const { getLatestPrice } = useSelector((state) => state.airDropLatestPrice);
    const { gasPriceResult } = useSelector((state) => state.gasPrice);
    const { successAirDropClaim, canClaim, getProofToBack, getAmountToBack, claimed, claimDayDate, claimHoursDate, claimMinDate, successMusiAirDropClaim } =
        useSelector((state) => state.airDropView);
    console.log("WethAccount", account);

    // WethClaim
    const airDropClaim = () => {
        dispatch(airDropClaimAction.airDropClaimAct(account, getProofToBack, getAmountToBack, gasPriceResult));
    };

    const changeTimeStampState = () => {
        dispatch(airDropTimeStampAction.airDropTimeStampAct());
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
                        {/* <a> */}
                        <FiRefreshCcw className="airDropWethReFreshTimeStamp" />
                        {/* </a> */}
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
