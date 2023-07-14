import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HanAirDropSection.scss";
import { HanLogo } from "../../../../assets/_index";
import { hanAirDropClaimAction } from "../../../../redux/actions/airdropActions/hanActions/hanAirDropClaimAction";
import { hanAirDropTimeStampAction } from "../../../../redux/actions/airdropActions/hanActions/hanAirDropTimeStampAction";
import { hanAirDropViewAction } from "../../../../redux/actions/airdropActions/hanActions/hanAirDropViewAction";
import { hanAirDropClaimedAction } from "../../../../redux/actions/airdropActions/hanActions/hanAirDropClaimedAction";
import { FiRefreshCcwIcon } from "../../../Icons/reactIcons";

const HanAirDropSection = () => {
    const dispatch = useDispatch();

    const [checkChainId, setCheckChainId] = useState("");
    const { account } = useSelector((state) => state.account);
    const { getLatestPrice } = useSelector((state) => state.airDropLatestPrice);
    // hanAirDrop
    const { hanAirDropCanClaim, getHanProofToBack, getHanAmountToBack, hanClaimDayDate, hanClaimHoursDate, hanClaimMinDate, hanClaimed } = useSelector((state) => state.hanAirDropView);

    // HanClaim
    const hanAirDropClaim = () => {
        dispatch(hanAirDropClaimAction.hanAirDropClaimAct(getHanProofToBack, getHanAmountToBack, account));
    };

    const changeHanTimeStampState = () => {
        dispatch(hanAirDropTimeStampAction.hanAirDropTimeStampAct());
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
        dispatch(hanAirDropViewAction.hanAirDropViewAct(account));
        dispatch(hanAirDropClaimedAction.hanAirDropClaimedAct(account));
        dispatch(hanAirDropTimeStampAction.hanAirDropTimeStampAct());
    }, [account]);

    return (
        <>
            {checkChainId === "Oxa" ? (
                <div className="airDrop-Han-Section">
                    <div className="airDrop-Han-LogoSection">
                        <img src={HanLogo} alt="HanLogo" />
                    </div>
                    <div className="airDrop-Han-Txt">
                        <a>HAN</a>
                    </div>
                    {hanAirDropCanClaim === true ? (
                        <div className="airDrop-Han-Btn">
                            <button className="han-learn-more" onClick={hanAirDropClaim}>
                                Claim
                            </button>
                        </div>
                    ) : hanClaimed === true ? (
                        <div className="airDrop-Han-Btn">
                            <button className="cant-han-learn-more" disabled={true}>
                                Already Claim
                            </button>
                        </div>
                    ) : (
                        <div className="airDrop-Han-Btn">
                            <button className="cant-han-learn-more" disabled={true}>
                                Nothing to Claim
                            </button>
                        </div>
                    )}

                    <div className="airDrop-Han-TimeStampSection">
                        <div className="airDrop-Han-TimeStampTitle">
                            <a>Remaining Duration</a>
                        </div>
                        <div className="airDrop-Han-TimeStampInfo">
                            <a className="han-DayDate">{hanClaimDayDate}D</a>
                            <a className="han-HoursDate">{hanClaimHoursDate}H</a>
                            <a className="han-MinDate">{hanClaimMinDate}M</a>
                            {/* <a> */}
                            <FiRefreshCcwIcon className="airDrop-Han-ReFreshTimeStamp" onClick={changeHanTimeStampState} />
                            {/* </a> */}
                        </div>
                        <p></p>
                    </div>
                </div>
            ) : (
                <div className="airDrop-Han-Section">
                    <div className="airDrop-Han-LogoSection">
                        <img src={HanLogo} alt="HanLogo" />
                    </div>
                    <div className="airDrop-Han-Txt">
                        <a>HAN</a>
                    </div>
                    <div className="airDrop-Han-Btn">
                        <button className="cant-han-learn-more" disabled={true}>
                            Switch to Optimism
                        </button>
                    </div>
                    <div className="airDrop-Han-TimeStampSection">
                        <div className="airDrop-Han-TimeStampTitle">
                            <a>Remaining Duration</a>
                        </div>
                        <div className="airDrop-Han-TimeStampInfo">
                            <a className="han-DayDate">{hanClaimDayDate}D</a>
                            <a className="han-HoursDate">{hanClaimHoursDate}H</a>
                            <a className="han-MinDate">{hanClaimMinDate}M</a>
                            {/* <a> */}
                            <FiRefreshCcwIcon className="airDrop-Han-ReFreshTimeStamp" onClick={changeHanTimeStampState} />
                            {/* </a> */}
                        </div>
                        <p></p>
                    </div>
                </div>
            )}
        </>
    );
};

export default HanAirDropSection;
