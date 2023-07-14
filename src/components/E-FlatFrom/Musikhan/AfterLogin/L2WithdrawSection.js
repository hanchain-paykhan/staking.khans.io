import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import L2WithdrawModal from "./Modal/L2WithdrawModal";
import Loading from "../../../SprStakingPage/Loading";
import { L2MusikhanUnStakingAction } from "../../../../redux/actions/musikhanActions/L2Actions/L2MusikhanUnStakingAction";
import "./L2WithdrawSection.scss";
import { MusiLogoXBack } from "../../../../assets/_index";
import { MdKeyboardArrowDownIcon } from "../../../Icons/reactIcons";

const L2WithdrawSection = () => {
    const dispatch = useDispatch();
    const [checkChainId, setCheckChainId] = useState("");
    const [unStakingAmount, setUnStakingAmount] = useState("");
    const [musiL2WithdrawModal, setMusiL2WithdrawModal] = useState(false);
    const { account } = useSelector((state) => state.account);

    //L2 WITHDRAW
    const { L2WithdrawTokenSymbol, L2WithdrawAmountStaked, L2WithdrawTokenCa } = useSelector((state) => state.musikhanL2View);

    //L2UnStakingAmount
    const changeL2UnStakingAmount = (e) => {
        const pattern = /^(\d{0,4}([.]\d{0,18})?)?$/;
        if (pattern.test(e.target.value)) {
            setUnStakingAmount(e.target.value);
        }
    };

    const changeL2MaxUnStakingAmount = (e) => {
        setUnStakingAmount(L2WithdrawAmountStaked);
    };

    //L2TokenUnStaking
    const setL2TokenUnStaking = () => {
        let l2UnStakingAmountSet = document.getElementById("maxUnStakingAmount").value;
        const unStakingNum = l2UnStakingAmountSet;
        dispatch(L2MusikhanUnStakingAction.L2MusikhanUnStakingAct(account, L2WithdrawTokenCa, unStakingNum));
    };

    // L2 Withdraw Modal
    const openL2WithdrawModal = () => {
        setMusiL2WithdrawModal(true);
    };
    const closeL2WithdrawModal = () => {
        setMusiL2WithdrawModal(false);
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
                                <p>
                                    Available: {L2WithdrawAmountStaked} {L2WithdrawTokenSymbol}
                                </p>
                                <button className="amountMusiMaxBtn" onClick={changeL2MaxUnStakingAmount}>
                                    Max
                                </button>
                            </div>
                            <input type="number" placeholder="0.0" min="0" step="0.000000000000001" id="maxUnStakingAmount" onChange={changeL2UnStakingAmount} value={unStakingAmount}></input>
                            <div className="musiStakingL2WithdrawPickerSection">
                                <button className="musiStakingL2WithdrawPicker_SelectBtn" onClick={openL2WithdrawModal}>
                                    <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                                    <span>{L2WithdrawTokenSymbol}</span>
                                    <MdKeyboardArrowDownIcon size="15" />
                                </button>
                                <L2WithdrawModal open={musiL2WithdrawModal} close={closeL2WithdrawModal} header="Modal heading"></L2WithdrawModal>
                            </div>
                        </div>
                        <div className="musiStakingL2WithdrawSwitchBtnSection">
                            {L2WithdrawTokenSymbol === "" ? (
                                <button className="musi-L2Withdraw-Enter-learn-more">SELECT TOKEN</button>
                            ) : unStakingAmount === "" ? (
                                <button className="musi-L2Withdraw-Enter-learn-more">ENTER AMOUNT</button>
                            ) : L2WithdrawAmountStaked === 0 || unStakingAmount > L2WithdrawAmountStaked ? (
                                <button className="cant-Musi-L2Withdraw-learn-more" disabled={true}>
                                    INSUFFICIENT TOKEN BALANCE
                                </button>
                            ) : (
                                // <button className="musi-L2Withdraw-learn-more" onClick={setL2TokenUnStaking}>
                                <button className="musi-L2Withdraw-learn-more" disabled={true}>
                                    UNSTAKE
                                </button>
                            )}
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

export default L2WithdrawSection;
