import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USDCLogo } from "../../../../assets/_index";
import "./USDCAirDropSection.scss";
import { usdcAirDropViewAction } from "../../../../redux/actions/airdropActions/USDCActions/usdcAirDropViewAction";
import { usdcAirDropTimeStampAction } from "../../../../redux/actions/airdropActions/USDCActions/usdcAirDropTimeStampAction";
import { usdcAirDropPriceAction } from "../../../../redux/actions/airdropActions/USDCActions/usdcAirDropPriceAction";
import { usdcAirDropClaimedAction } from "../../../../redux/actions/airdropActions/USDCActions/usdcAirDropClaimedAction";
import { usdcAirDropClaimAction } from "../../../../redux/actions/airdropActions/USDCActions/usdcAirDropClaimAction";
import { FiRefreshCcwIcon } from "../../../Icons/reactIcons";

const USDCAirDropSection = () => {
    const dispatch = useDispatch();
    const [checkChainId, setCheckChainId] = useState("");
    const { account } = useSelector((state) => state.account);

    const { getUsdcProofToBack, getUsdcAmountToBack, canUsdcClaim, claimUsdcDayDate, claimUsdcHoursDate, claimUsdcMinDate, usdcClaimed, successUsdcAirDropClaim } = useSelector(
        (state) => state.usdcAirDropView
    );

    const usdcAirDropClaim = () => {
        dispatch(usdcAirDropClaimAction.usdcAirDropClaimAct(account, getUsdcProofToBack, getUsdcAmountToBack));
    };

    const changeUsdcTimeStampState = () => {
        dispatch(usdcAirDropTimeStampAction.usdcAirDropTimeStampAct());
    };

    useEffect(() => {
        dispatch(usdcAirDropViewAction.usdcAirDropViewAct(account));
        dispatch(usdcAirDropTimeStampAction.usdcAirDropTimeStampAct(account));
        // dispatch(usdcAirDropPriceAction.usdcAirDropPriceAct(account));
        dispatch(usdcAirDropClaimedAction.usdcAirDropClaimedAct(account));
    }, [account]);

    // console.log('USDCAirDrop', account);

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
                    {canUsdcClaim === true ? (
                        <div className="airDrop-USDC-Btn">
                            <button className="USDC-can-learn-more" onClick={usdcAirDropClaim}>
                                CLAIM
                            </button>
                        </div>
                    ) : usdcClaimed === true ? (
                        <div className="airDrop-USDC-Btn">
                            <button className="cant-USDC-learn-more" disabled={true}>
                                Already Claimed
                            </button>
                        </div>
                    ) : (
                        <div className="airDrop-USDC-Btn">
                            <button className="cant-USDC-learn-more" disabled={true}>
                                Nothing to Claim
                            </button>
                        </div>
                    )}

                    <div className="airDrop-USDC-TimeStampSection">
                        <div className="airDrop-USDC-TimeStampTitle">
                            <a>Remaining Duration</a>
                        </div>
                        <div className="airDrop-USDC-TimeStampInfo">
                            <a className="USDC-DayDate">{claimUsdcDayDate}D</a>
                            <a className="USDC-HoursDate">{claimUsdcHoursDate}H</a>
                            <a className="USDC-MinDate">{claimUsdcMinDate}M</a>
                            {/* <a> */}
                            <FiRefreshCcwIcon className="airDrop-USDC-ReFreshTimeStamp" onClick={changeUsdcTimeStampState} />
                            {/* </a> */}
                        </div>

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
                            <FiRefreshCcwIcon className="airDrop-USDC-ReFreshTimeStamp" onClick={changeUsdcTimeStampState} />
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

export default USDCAirDropSection;
