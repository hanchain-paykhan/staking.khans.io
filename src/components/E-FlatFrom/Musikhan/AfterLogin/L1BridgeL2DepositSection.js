import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MusiLogoXBack, OptimismRedLogo } from "../../../../assets/_index";
import L1BridgeModal from "./Modal/L1BridgeModal";
import L2DepositModal from "./Modal/L2DepositModal";
import { L2MusikhanStakingAction } from "../../../../redux/actions/musikhanActions/L2Actions/L2MusikhanStakingAction";
import { L2MusikhanApproveAction } from "../../../../redux/actions/musikhanActions/L2Actions/L2MusikhanApproveAction";
import { L1TokenApproveAction } from "../../../../redux/actions/musikhanActions/L1Actions/L1TokenApproveAction";
import { L1SendTokenAction } from "../../../../redux/actions/musikhanActions/L1Actions/L1SendTokenAction";
import "./L1BridgeL2DepositSection.scss";
import Loading from "../../../SprStakingPage/Loading";
import { MdKeyboardArrowDownIcon, AiOutlineArrowDownIcon } from "../../../Icons/reactIcons";

const L1BridgeL2DepositSection = () => {
    const dispatch = useDispatch();
    const [tokenModal, setTokenModal] = useState(false);
    const [musiL2DepositModal, setMusiL2DepositModal] = useState(false);
    const [checkChainId, setCheckChainId] = useState("");
    const [stakingAmount, setStakingAmount] = useState("");
    const [tokenL1BalanceOf, setTokenL1BalanceOf] = useState("");

    const { account } = useSelector((state) => state.account);

    // L1
    const { L1TokenBalanceOf } = useSelector((state) => state.musiL1TokenBalance);
    const { L1TokenSymbol, L1TokenAddress, L2TokenAddressUseL1, L1Contract } = useSelector((state) => state.musikhanL1View);
    const { successL1TokenApprove } = useSelector((state) => state.musiL1Approve);

    // L1 Modal
    const openSelectTokenModal = () => {
        setTokenModal(true);
    };
    const closeSelectTokenModal = () => {
        setTokenModal(false);
    };

    //L1TokenApporve
    const setL1TokenApprove = () => {
        dispatch(L1TokenApproveAction.L1TokenApproveAct(account, L1TokenBalanceOf, L1Contract));
    };
    //L1TokenTransfer
    const sendL1TokenToL2 = () => {
        dispatch(L1SendTokenAction.L1SendTokenAct(account, L1TokenAddress, L2TokenAddressUseL1));
    };
    // L1 ChangeTokenBalance
    const changeL1TokenBalance = (e) => {
        setTokenL1BalanceOf(e.target.value);
    };

    //L2 Deposit
    const { L2DepositTokenSymbol, L2DepositBalance, musiAllowance, L2DepositTokenCa, L2Contract } = useSelector((state) => state.musikhanL2View);
    const { successL2TokenApprove } = useSelector((state) => state.musiL2Approve);

    // L2 Deposit Modal
    const openL2DepositModal = () => {
        setMusiL2DepositModal(true);
    };
    const closeL2DepositModal = () => {
        setMusiL2DepositModal(false);
    };

    //L2TokenApprove
    const setL2TokenApprove = () => {
        let l2StakingAmountSet = document.getElementById("maxStakingAmount").value;
        const stakingnum = l2StakingAmountSet;
        // const stakingnum = Web3.utils.toWei(String(stakingAmountSet), "ether");
        dispatch(L2MusikhanApproveAction.L2MusikhanApproveAct(account, stakingnum, L2Contract));
    };

    //L2TokenStaking
    const setL2TokenStaking = () => {
        let l2StakingAmountSet = document.getElementById("maxStakingAmount").value;
        const stakingnum = l2StakingAmountSet;
        // const stakingnum = Web3.utils.toWei(String(l2StakingAmountSet), "ether");
        dispatch(L2MusikhanStakingAction.L2MusikhanStakingAct(account, L2DepositTokenCa, stakingnum));
    };

    //L2StakingAmount
    const changeL2StakingAmount = (e) => {
        const pattern = /^(\d{0,4}([.]\d{0,18})?)?$/;
        if (pattern.test(e.target.value)) {
            setStakingAmount(e.target.value);
        }
    };

    //L2StakingMaxAmount
    const changeL2MaxStakingAmount = () => {
        setStakingAmount(L2DepositBalance);
    };

    useEffect(() => {
        if (window.ethereum?.chainId === "0x1") {
            setCheckChainId("0x1");
        }
        if (window.ethereum?.chainId === "0xa") {
            setCheckChainId("Oxa");
        }
    }, [window.ethereum?.chainId]);

    // useEffect(()=>{

    // },[])

    return (
        <div>
            {checkChainId === "0x1" ? (
                // Ethereum Bridge Section (Optimsim Deposit)
                <div className="musiStakingBridgeContainer">
                    <div className="musiStakingBridgeSection">
                        <div className="musiStakingBirdgeTitleSection">
                            <a className="musiStakingTitleTxt">From</a>
                            <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" className="musiStakingMainNetImg" alt="EtheruemIcon" />
                            <a className="musiStakingMainTxt">Ethereum Mainnet</a>
                        </div>
                        <div className="musiStakingBridgeAmountSection">
                            <input type="number" placeholder="0.0" min="0" onChange={changeL1TokenBalance} value={L1TokenBalanceOf} disabled></input>

                            <div className="musiStakingBridgePickerSection">
                                {successL1TokenApprove === false ? (
                                    <button className="musiStakingBridgePicker_SelectBtn" onClick={openSelectTokenModal}>
                                        <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                                        <span>{L1TokenSymbol}</span>
                                        <MdKeyboardArrowDownIcon size="15" />
                                    </button>
                                ) : (
                                    <button className="musiStakingBridgePicker_2SelectBtn">
                                        <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                                        <span>{L1TokenSymbol}</span>
                                        {/* <MdKeyboardArrowDown size="15" /> */}
                                    </button>
                                )}

                                <L1BridgeModal open={tokenModal} close={closeSelectTokenModal} header="Modal heading"></L1BridgeModal>
                            </div>
                        </div>
                        <div className="musiStakingBridgeArrowSection">
                            <AiOutlineArrowDownIcon />
                        </div>
                        <div className="musiStakingBirdgeOpTitleSection">
                            <a className="musiStakingOpTitleTxt">To</a>
                            <img src={OptimismRedLogo} className="musiStakingOpImg" alt="OptimismLogo" />
                            <a className="musiStakingOpTxt">Optimism</a>
                        </div>
                        {L1TokenBalanceOf === "" ? (
                            <>
                                <div className="musiStakingBridegeSwitchBtnSection">
                                    <button className="can-Musi-mainEth-learn-more">SELECT TOKEN</button>
                                </div>
                            </>
                        ) : L1TokenBalanceOf === "0" ? (
                            <div className="musiStakingBridegeSwitchBtnSection">
                                <button className="cant-Musi-mainEth-learn-more" disabled={true}>
                                    INSUFFICIENT TOKEN BALANCE
                                </button>
                            </div>
                        ) : successL1TokenApprove === false ? (
                            <>
                                <div className="musiStakingBridegeSwitchBtnSection">
                                    <button className="musi-mainEth-learn-more" onClick={setL1TokenApprove}>
                                        APPROVE
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="musiStakingBridegeSwitchBtnSection">
                                    <button className="musi-mainEth-learn-more" onClick={sendL1TokenToL2}>
                                        DEPOSIT
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="musiStakingEthBottomLineSection">
                        <hr className="ethBottomHr"></hr>
                    </div>
                </div>
            ) : checkChainId === "Oxa" ? (
                // Optimism Deposit Section
                <div className="musiStakingL2DepositContainer">
                    <div className="musiStakingL2DepositSection">
                        {L2DepositTokenSymbol === "" ? (
                            <>
                                <div className="musiStakingL2DepositAmountSection">
                                    <div className="musiStakingL2DepositAmountTitleSection">
                                        <p>
                                            Available: {L2DepositBalance} {L2DepositTokenSymbol}
                                        </p>
                                        <button className="amountMusiMaxBtn" onClick={changeL2MaxStakingAmount}>
                                            Max
                                        </button>
                                    </div>
                                    <input type="number" placeholder="0.0" min="0" step="0.0000000000000000001" id="maxStakingAmount" onChange={changeL2StakingAmount} value={stakingAmount}></input>
                                    <div className="musiStakingL2DepositPickerSection">
                                        <button className="musiStakingL2DepositPicker_SelectBtn" onClick={openL2DepositModal}>
                                            <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                                            <span>{L2DepositTokenSymbol}</span>
                                            <MdKeyboardArrowDownIcon size="15" />
                                        </button>
                                        <L2DepositModal open={musiL2DepositModal} close={closeL2DepositModal} header="Modal heading"></L2DepositModal>
                                    </div>
                                </div>
                                <div className="musiStakingL2DepositSwitchBtnSection">
                                    <button className="musi-L2Deposit-Enter-learn-more">SELECT TOKEN</button>
                                </div>
                            </>
                        ) : musiAllowance >= L2DepositBalance ? (
                            <>
                                <div className="musiStakingL2DepositAmountSection">
                                    <div className="musiStakingL2DepositAmountTitleSection">
                                        <p>
                                            Available: {L2DepositBalance} {L2DepositTokenSymbol}
                                        </p>
                                        <button className="amountCantMusiMaxBtn">Max</button>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="0.0"
                                        min="0"
                                        step="0.0000000000000000001"
                                        id="maxStakingAmount"
                                        disabled
                                        // onChange={changeL2StakingAmount}
                                        value={musiAllowance}
                                    ></input>
                                    <div className="musiStakingL2DepositPickerSection">
                                        <button className="musiStakingCantL2DepositPicker_SelectBtn" onClick={openL2DepositModal}>
                                            <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                                            <span>{L2DepositTokenSymbol}</span>
                                            <MdKeyboardArrowDownIcon size="15" />
                                        </button>
                                        <L2DepositModal open={musiL2DepositModal} close={closeL2DepositModal} header="Modal heading"></L2DepositModal>
                                    </div>
                                </div>
                                <div className="musiStakingL2DepositSwitchBtnSection">
                                    <button className="musi-L2Deposit-learn-more" onClick={setL2TokenStaking}>
                                        STAKING
                                    </button>
                                </div>
                            </>
                        ) : stakingAmount === "" ? (
                            <>
                                <div className="musiStakingL2DepositAmountSection">
                                    <div className="musiStakingL2DepositAmountTitleSection">
                                        <p>
                                            Available: {L2DepositBalance} {L2DepositTokenSymbol}
                                        </p>
                                        <button className="amountMusiMaxBtn" onClick={changeL2MaxStakingAmount}>
                                            Max
                                        </button>
                                    </div>
                                    <input type="number" placeholder="0.0" min="0" step="0.0000000000000000001" id="maxStakingAmount" onChange={changeL2StakingAmount} value={stakingAmount}></input>
                                    <div className="musiStakingL2DepositPickerSection">
                                        <button className="musiStakingL2DepositPicker_SelectBtn" onClick={openL2DepositModal}>
                                            <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                                            <span>{L2DepositTokenSymbol}</span>
                                            <MdKeyboardArrowDownIcon size="15" />
                                        </button>
                                        <L2DepositModal open={musiL2DepositModal} close={closeL2DepositModal} header="Modal heading"></L2DepositModal>
                                    </div>
                                </div>
                                <div className="musiStakingL2DepositSwitchBtnSection">
                                    <button className="musi-L2Deposit-Enter-learn-more">ENTER AMOUNT</button>
                                </div>
                            </>
                        ) : L2DepositBalance === 0 || stakingAmount > L2DepositBalance ? (
                            <>
                                <div className="musiStakingL2DepositAmountSection">
                                    <div className="musiStakingL2DepositAmountTitleSection">
                                        <p>
                                            Available: {L2DepositBalance} {L2DepositTokenSymbol}
                                        </p>
                                        <button className="amountMusiMaxBtn" onClick={changeL2MaxStakingAmount}>
                                            Max
                                        </button>
                                    </div>
                                    <input type="number" placeholder="0.0" min="0" step="0.0000000000000000001" id="maxStakingAmount" onChange={changeL2StakingAmount} value={stakingAmount}></input>
                                    <div className="musiStakingL2DepositPickerSection">
                                        <button className="musiStakingL2DepositPicker_SelectBtn" onClick={openL2DepositModal}>
                                            <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                                            <span>{L2DepositTokenSymbol}</span>
                                            <MdKeyboardArrowDownIcon size="15" />
                                        </button>
                                        <L2DepositModal open={musiL2DepositModal} close={closeL2DepositModal} header="Modal heading"></L2DepositModal>
                                    </div>
                                </div>
                                <div className="musiStakingL2DepositSwitchBtnSection">
                                    <button className="cant-Musi-L2Bridge-learn-more" disabled={true}>
                                        INSUFFICIENT TOKEN BALANCE
                                    </button>
                                </div>
                            </>
                        ) : successL2TokenApprove === false ? (
                            <>
                                <div className="musiStakingL2DepositAmountSection">
                                    <div className="musiStakingL2DepositAmountTitleSection">
                                        <p>
                                            Available: {L2DepositBalance} {L2DepositTokenSymbol}
                                        </p>
                                        <button className="amountMusiMaxBtn" onClick={changeL2MaxStakingAmount}>
                                            Max
                                        </button>
                                    </div>
                                    <input type="number" placeholder="0.0" min="0" step="0.0000000000000000001" id="maxStakingAmount" onChange={changeL2StakingAmount} value={stakingAmount}></input>
                                    <div className="musiStakingL2DepositPickerSection">
                                        <button className="musiStakingL2DepositPicker_SelectBtn" onClick={openL2DepositModal}>
                                            <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                                            <span>{L2DepositTokenSymbol}</span>
                                            <MdKeyboardArrowDownIcon size="15" />
                                        </button>
                                        <L2DepositModal open={musiL2DepositModal} close={closeL2DepositModal} header="Modal heading"></L2DepositModal>
                                    </div>
                                </div>
                                <div className="musiStakingL2DepositSwitchBtnSection">
                                    <button className="musi-L2Deposit-learn-more" onClick={setL2TokenApprove}>
                                        APPROVE
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="musiStakingL2DepositAmountSection">
                                    <div className="musiStakingL2DepositAmountTitleSection">
                                        <p>
                                            Available: {L2DepositBalance} {L2DepositTokenSymbol}
                                        </p>
                                        <button className="amountCantMusiMaxBtn">Max</button>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="0.0"
                                        min="0"
                                        step="0.0000000000000000001"
                                        id="maxStakingAmount"
                                        disabled
                                        // onChange={changeL2StakingAmount}
                                        value={stakingAmount}
                                    ></input>
                                    <div className="musiStakingL2DepositPickerSection">
                                        <button className="musiStakingCantL2DepositPicker_SelectBtn" onClick={openL2DepositModal}>
                                            <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                                            <span>{L2DepositTokenSymbol}</span>
                                            <MdKeyboardArrowDownIcon size="15" />
                                        </button>
                                        <L2DepositModal open={musiL2DepositModal} close={closeL2DepositModal} header="Modal heading"></L2DepositModal>
                                    </div>
                                </div>
                                <div className="musiStakingL2DepositSwitchBtnSection">
                                    <button className="musi-L2Deposit-learn-more" onClick={setL2TokenStaking}>
                                        STAKING
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                // Others Network Deposit Section
                <div className="cantConnectNetWorkContainer">
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default L1BridgeL2DepositSection;
