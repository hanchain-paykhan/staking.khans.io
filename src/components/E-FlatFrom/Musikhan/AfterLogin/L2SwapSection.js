import React, { useEffect, useState } from "react";
import { MusiLogoXBack, OptimismRedLogo } from "../../../../assets/_index";
import Loading from "../../../SprStakingPage/Loading";
import { useDispatch, useSelector } from "react-redux";
import { L2SwapApproveAction } from "../../../../redux/actions/musikhanActions/L2Actions/L2SwapApproveAction";
import { L2SwapTokenSwapAction } from "../../../../redux/actions/musikhanActions/L2Actions/L2SwapTokenSwapAction";
import L2SwapModal from "./Modal/L2SwapModal";

import "./L2SwapSection.scss";
import { MdKeyboardArrowDownIcon, AiOutlineArrowDownIcon } from "../../../Icons/reactIcons";

const L2SwapSection = () => {
    const dispatch = useDispatch();

    const [checkChainId, setCheckChainId] = useState("");
    const [tokenL2SwapBalanceOf, setTokenL2BalanceOf] = useState("");
    const [musiL2SwapModal, setMusiL2SwapModal] = useState(false);

    const { account } = useSelector((state) => state.account);

    // L2 Swap
    const { L2SwapName, L2SwapSymbol, L2SwapExistTokenCa, L2SwapTokenCa, L2SwapContract } = useSelector((state) => state.L2SwapView);
    const { L2SwapTokenBalance } = useSelector((state) => state.L2SwapTokenBalanceView);
    const { successL2SwapTokenApprove } = useSelector((state) => state.L2SwapApprove);

    // L2 Swap Modal

    const openL2SwapModal = () => {
        setMusiL2SwapModal(true);
    };

    const closeL2SwapModal = () => {
        setMusiL2SwapModal(false);
    };

    //L2Swap TokenApporve
    const setL2SwapTokenApprove = () => {
        dispatch(L2SwapApproveAction.L2SwapApproveAct(account, L2SwapTokenBalance, L2SwapContract));
    };

    //L2SwapTokenSwap
    const setSwapL2TokenToL2 = () => {
        dispatch(L2SwapTokenSwapAction.L2SwapTokenSwapAct(account, L2SwapExistTokenCa, L2SwapTokenCa));
    };

    // L2 Swap ChangeTokenBalance
    const changeL2SwapTokenBalance = (e) => {
        setTokenL2BalanceOf(e.target.value);
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
                            <input type="number" placeholder="0.0" min="0" onChange={changeL2SwapTokenBalance} value={L2SwapTokenBalance} disabled></input>
                            <div className="musiStakingL2SwapPickerSection">
                                {successL2SwapTokenApprove === false ? (
                                    <button className="musiStakingL2SwapPicker_SelectBtn" onClick={openL2SwapModal}>
                                        <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                                        <span>{L2SwapSymbol}</span>
                                        <MdKeyboardArrowDownIcon size="15" />
                                    </button>
                                ) : (
                                    <button className="musiStakingL2SwapPicker_2SelectBtn">
                                        <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                                        <span>{L2SwapSymbol}</span>
                                        {/* <MdKeyboardArrowDown size="15" /> */}
                                    </button>
                                )}

                                <L2SwapModal open={musiL2SwapModal} close={closeL2SwapModal} header="Modal heading"></L2SwapModal>
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
                        {L2SwapSymbol === "" ? (
                            <div className="musiStakingBridegeSwitchBtnSection">
                                <button className="can-Musi-L2Swap-learn-more">SELECT TOKEN</button>
                            </div>
                        ) : L2SwapTokenBalance === "0" ? (
                            <div className="musiStakingBridegeSwitchBtnSection">
                                <button className="cant-Musi-L2Swap-learn-more" disabled={true}>
                                    INSUFFICIENT TOKEN BALANCE
                                </button>
                            </div>
                        ) : successL2SwapTokenApprove === false ? (
                            <div className="musiStakingBridegeSwitchBtnSection">
                                <button className="musi-L2Swap-learn-more" onClick={setL2SwapTokenApprove}>
                                    APPROVE
                                </button>
                            </div>
                        ) : (
                            <div className="musiStakingBridegeSwitchBtnSection">
                                <button className="musi-L2Swap-learn-more" onClick={setSwapL2TokenToL2}>
                                    SWAP
                                </button>
                            </div>
                        )}
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

export default L2SwapSection;
