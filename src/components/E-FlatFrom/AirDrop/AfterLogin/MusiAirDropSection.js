import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MusiAirDropSection.scss";
import MusiTokenListModal from "./Modal/MusiTokenListModal";
import { musiAirDropTimeStampAction } from "../../../../redux/actions/airdropActions/musiActions/musiAirDropTimeStampAction";
import { musiAirDropClaimAction } from "../../../../redux/actions/airdropActions/musiActions/musiAirDropClaimAction";
import { musiAirDropViewAction } from "../../../../redux/actions/airdropActions/musiActions/musiAirDropViewAction";
import { musiAirDropTokenListAction } from "../../../../redux/actions/airdropActions/musiActions/musiAirDropTokenListAction";
import { musiAirDropBackDataInfoAction } from "../../../../redux/actions/airdropActions/musiActions/musiAirDropBackDataInfoAction";
import { MusiLogoXBack } from "../../../../assets/_index";
import { GiClickIcon, FiRefreshCcwIcon } from "../../../Icons/reactIcons";

const MusiAirDropSection = () => {
    const dispatch = useDispatch();
    const [checkChainId, setCheckChainId] = useState("");
    const [musiTokenListModal, setMusiTokenListModal] = useState(false);

    const { account } = useSelector((state) => state.account);

    const { getLatestPrice } = useSelector((state) => state.airDropLatestPrice);
    const { musiSymbol, musiL2Ca, musiClaimDayDate, musiClaimHoursDate, musiClaimMinDate, getmusiProofToBack, getmusiTokenCaToBack, getmusiAmountToBack, musiCanClaim, musiClaimed } = useSelector(
        (state) => state.musiAirDropView
    );

    // MusiClaim
    const musiAirDropClaim = () => {
        dispatch(musiAirDropClaimAction.musiAirDropClaimAct(account, getmusiProofToBack, getmusiAmountToBack, getmusiTokenCaToBack));
    };

    // MusiKhan Modal
    const openMusiTokenListModal = () => {
        setMusiTokenListModal(true);
    };
    const closeMusiTokenListModal = () => {
        setMusiTokenListModal(false);
    };

    const changeMusiTimeStampState = () => {
        dispatch(musiAirDropTimeStampAction.musiAirDropTimeStampAct(musiL2Ca));
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
        dispatch(musiAirDropViewAction.musiAirDropViewAct(account));
        dispatch(musiAirDropBackDataInfoAction.musiAirDropBackDataInfoAct(account));
    }, [account]);

    useEffect(() => {
        dispatch(musiAirDropTokenListAction.musiAirDropTokenListAct());
    }, []);

    useEffect(() => {
        dispatch(musiAirDropTimeStampAction.musiAirDropTimeStampAct()).catch((error) => {
            // 오류 처리
            console.error("Failed to fetch timestamp:", error);
            // 오류 상태에 대한 처리를 진행할 수 있습니다.
            // 예를 들어, 타임스탬프 정보를 사용하는 부분을 비활성화하거나, 대체 데이터를 사용할 수 있습니다.
        });
    }, []);

    return (
        <>
            {checkChainId === "Oxa" ? (
                <div className="airDropMusikhanSection">
                    <div className="airDropMusiKhanLogoSection">
                        <img src={MusiLogoXBack} alt="MusikhanLogo" />
                    </div>
                    {musiSymbol ? (
                        <div className="airDropMusiTxt">
                            <p>{musiSymbol}</p>
                        </div>
                    ) : (
                        <div className="airDropMusiTxt">
                            <a>MusiKhan</a>
                        </div>
                    )}

                    {musiSymbol === "" ? (
                        <div className="musiBeforePickerSection">
                            <button className="musiAirDropBeforePicker_SelectBtn" onClick={openMusiTokenListModal}>
                                <span></span>
                                <GiClickIcon size="20" className="modalClickIcon" />
                            </button>
                            <MusiTokenListModal open={musiTokenListModal} close={closeMusiTokenListModal} header="Modal heading"></MusiTokenListModal>
                        </div>
                    ) : (
                        <div className="musiAfterPickerSection">
                            <button className="musiAirDropAfterPicker_SelectBtn" onClick={openMusiTokenListModal}>
                                <span></span>
                                <GiClickIcon size="20" className="modalClickIcon" />
                            </button>
                            <MusiTokenListModal open={musiTokenListModal} close={closeMusiTokenListModal} header="Modal heading"></MusiTokenListModal>
                        </div>
                    )}

                    {musiCanClaim === true ? (
                        <div className="airDropMusiBtn">
                            <button className="musi-learn-more" onClick={musiAirDropClaim}>
                                Claim
                            </button>
                        </div>
                    ) : musiClaimed === true ? (
                        <div className="airDropMusiBtn">
                            <button className="cant-musi-learn-more" disabled={true}>
                                Already Claimed
                            </button>
                        </div>
                    ) : (
                        <div className="airDropMusiBtn">
                            <button className="cant-musi-learn-more" disabled={true}>
                                Nothing to Claim
                            </button>
                        </div>
                    )}

                    <div className="airDropMusiTimeStampSection">
                        <div className="airDropMusiTimeStampTitle">
                            <a>Remaining Duration</a>
                        </div>
                        {musiClaimMinDate > 0 ? (
                            <div className="airDropMusiTimeStampInfo">
                                <a className="musiDayDate">{musiClaimDayDate}D</a>
                                <a className="musiHoursDate">{musiClaimHoursDate}H</a>
                                <a className="musiMinDate">{musiClaimMinDate}M</a>
                                <FiRefreshCcwIcon className="airDropMusiReFreshTimeStamp" onClick={changeMusiTimeStampState} />
                            </div>
                        ) : (
                            <div className="airDropMusiTimeStampInfo">
                                <a className="musiDayDate">N/A</a>
                                <a className="musiHoursDate">N/A</a>
                                <a className="musiMinDate">N/A</a>
                                <FiRefreshCcwIcon className="airDropCantMusiReFreshTimeStamp" />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="airDropMusikhanSection">
                    <div className="airDropMusiKhanLogoSection">
                        <img src={MusiLogoXBack} alt="MusikhanLogo" />
                    </div>
                    {musiSymbol ? (
                        <div className="airDropMusiTxt">
                            <p>{musiSymbol}</p>
                        </div>
                    ) : (
                        <div className="airDropMusiTxt">
                            <a>MusiKhan</a>
                        </div>
                    )}

                    {musiSymbol === "" ? (
                        <div className="musiBeforePickerSection">
                            <button className="musiAirDropBeforePicker_SelectBtn" onClick={openMusiTokenListModal}>
                                <span></span>
                                <GiClickIcon size="20" className="modalClickIcon" />
                            </button>
                            <MusiTokenListModal open={musiTokenListModal} close={closeMusiTokenListModal} header="Modal heading"></MusiTokenListModal>
                        </div>
                    ) : (
                        <div className="musiAfterPickerSection">
                            <button className="musiAirDropAfterPicker_SelectBtn" onClick={openMusiTokenListModal}>
                                <span></span>
                                <GiClickIcon size="20" className="modalClickIcon" />
                            </button>
                            <MusiTokenListModal open={musiTokenListModal} close={closeMusiTokenListModal} header="Modal heading"></MusiTokenListModal>
                        </div>
                    )}

                    <div className="airDropMusiBtn">
                        <button className="cant-musi-learn-more" disabled={true}>
                            Switch to Optimism
                        </button>
                    </div>

                    <div className="airDropMusiTimeStampSection">
                        <div className="airDropMusiTimeStampTitle">
                            <a>Remaining Duration</a>
                        </div>
                        {musiClaimMinDate > 0 ? (
                            <div className="airDropMusiTimeStampInfo">
                                <a className="musiDayDate">{musiClaimDayDate}D</a>
                                <a className="musiHoursDate">{musiClaimHoursDate}H</a>
                                <a className="musiMinDate">{musiClaimMinDate}M</a>
                                <FiRefreshCcwIcon className="airDropMusiReFreshTimeStamp" onClick={changeMusiTimeStampState} />
                            </div>
                        ) : (
                            <div className="airDropMusiTimeStampInfo">
                                <a className="musiDayDate">N/A</a>
                                <a className="musiHoursDate">N/A</a>
                                <a className="musiMinDate">N/A</a>
                                <FiRefreshCcwIcon className="airDropCantMusiReFreshTimeStamp" />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default MusiAirDropSection;
