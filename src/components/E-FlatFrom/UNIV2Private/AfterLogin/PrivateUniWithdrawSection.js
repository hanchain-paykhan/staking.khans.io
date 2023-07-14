import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { networksAction } from "../../../../redux/actions/networksAction";
import "./PrivateUniWithdrawSection.scss";
import PrivateUniWithdrawModal from "./Modal/PrivateUniWithdrawModal";
import { UniV2PrivateWithdrawListAction } from "../../../../redux/actions/airdropActions/UniV2PrivateActions/UniV2PrivateWithdrawListAction";
import { UniV2PrivateRemainingDurationAction } from "../../../../redux/actions/airdropActions/UniV2PrivateActions/UniV2PrivateRemainingDurationAction";
import { UniV2PrivateUnStakeAction } from "../../../../redux/actions/airdropActions/UniV2PrivateActions/UniV2PrivateUnStakeAction";
import { FiRefreshCcwIcon, GiClickIcon } from "../../../Icons/reactIcons";
// import { HanEpUnStakeAction } from "../../../../redux/actions/airdropActions/HanEpActions/HanEpUnStakeAction";

const PrivateUniWithdrawSection = () => {
    const dispatch = useDispatch();
    const [checkChainId, setCheckChainId] = useState("");
    const [hanEpWithdrawModal, setHanEpWithdrawModal] = useState(false);
    const { account } = useSelector((state) => state.account);

    const { privateUniV2TotalStaked, totalUniV2PrivateStakedAmount, privateWithdrawAmountToModal, privateWithdrawIndex, stakingPrUniV2APR } = useSelector((state) => state.UniV2PrivateView);
    const { prUniV2ClaimDayDate, prUniV2ClaimHoursDate, prUniV2ClaimMinDate, prUniV2ClaimSecDate } = useSelector((state) => state.UniV2PrRemainingDuration);

    const changeEthereumNetWork = () => {
        dispatch(networksAction.changeEthereumNetWorkAct());
    };

    // add to Reward Token
    const addRewardToken = async () => {
        const tokenAddress = "0x5052fa4a2a147eaAa4c0242e9Cc54a10A4f42070";
        const tokenSymbol = "HANeP";
        const tokenDecimals = 18;
        // const tokenImage = "https://raw.githubusercontent.com/hanchain-paykhan/hanchain/3058eecc5d26f980db884f1318da6c4de18a7aea/logo/logo.svg";

        try {
            const wasAdded = await window.ethereum?.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20",
                    options: {
                        address: tokenAddress,
                        symbol: tokenSymbol,
                        decimals: tokenDecimals,
                        // image: tokenImage,
                    },
                },
            });

            if (wasAdded) {
                console.log("Thanks for your interest!");
            } else {
                console.log("Your loss!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const openHanEpWithdrawModal = () => {
        setHanEpWithdrawModal(true);
    };

    const closeHanEpWithdrawModal = () => {
        setHanEpWithdrawModal(false);
    };

    const changePrivateRakis6TimeStampState = () => {
        dispatch(UniV2PrivateRemainingDurationAction.UniV2PrivateRemainingDurationAct(account, privateWithdrawIndex));
    };

    const setPrivateRakis6UnStake = () => {
        dispatch(UniV2PrivateUnStakeAction.UniV2PrivateUnStakeAct(account, privateWithdrawIndex));
    };

    useEffect(() => {
        dispatch(UniV2PrivateWithdrawListAction.UniV2PrivateWithdrawListAct(account));
    }, [account]);

    useEffect(() => {
        if (window.ethereum?.chainId === "0x1") {
            setCheckChainId("0x1");
        }
        if (window.ethereum?.chainId === "0xa") {
            setCheckChainId("Oxa");
        }
        if (window.ethereum?.chainId === "0x5") {
            setCheckChainId("0x5");
        }
        if (window.ethereum?.chainId === "0x1a4") {
            setCheckChainId("0x1a4");
        }
    }, [window.ethereum?.chainId]);
    // console.log("sec", prRakis6ClaimSecDate);
    return (
        <div>
            <>
                <div className="eplat-PrUni-Withdraw-Quaota-Section">
                    <p>TOTAL STAKED : {privateUniV2TotalStaked} </p>
                </div>
                <div className="eplat-PrUni-Withdraw-StakeAmount-Section">
                    <p>STAKED : {totalUniV2PrivateStakedAmount} </p>
                </div>
            </>
            <div className="eplat-PrUni-Withdraw-APR-Container">
                <div className="eplat-PrUni-Withdraw-APR-Title">
                    <a>APR</a>
                </div>
                <div className="eplat-PrUni-Withdraw-APR-Info">
                    <a>{stakingPrUniV2APR}%</a>
                </div>
            </div>
            <div className="eplat-PrUni-Withdraw-AmountSection">
                <input type="number" step="0.00000000000001" id="maxPrivateUnstakeAmount" placeholder="0" defaultValue={privateWithdrawAmountToModal}></input>
                <p>UNI-V2</p>
                {/* <button className="eplat-PrUni-Withdraw-AmountMaxBtn">Max</button> */}
                <button className="eplat-PrUni-Select-Token-Btn" onClick={openHanEpWithdrawModal}>
                    SELECT
                    <GiClickIcon className="eplat-PrUni-Select-Token-Icon" />
                </button>
                <PrivateUniWithdrawModal open={hanEpWithdrawModal} close={closeHanEpWithdrawModal} header="HanEp Withdraw Modal" />
            </div>
            <div className="eplat-PrUni-WithDraw-TimeContainer">
                <div className="eplat-PrUni-WithDraw-TimeTitle">
                    <a>Remaining Duration</a>
                </div>
                {prUniV2ClaimDayDate ? (
                    <div className="eplat-PrUni-WithDraw-TimeSection">
                        <a className="eplat-PrUni-DayDate">{prUniV2ClaimDayDate}D</a>
                        <a className="eplat-PrUni-HoursDate">{prUniV2ClaimHoursDate}H</a>
                        <a className="eplat-PrUni-MinDate">{prUniV2ClaimMinDate}M</a>
                        <a className="eplat-PrUni-SecDate">{prUniV2ClaimSecDate}S</a>
                        <FiRefreshCcwIcon className="eplat-PrUni-WithDraw-ReFreshIcon" onClick={changePrivateRakis6TimeStampState} />
                    </div>
                ) : (
                    <div className="eplat-PrUni-WithDraw-TimeSection">
                        <a className="eplat-PrUni-DayDate">N/A</a>
                        <a className="eplat-PrUni-HoursDate">N/A</a>
                        <a className="eplat-PrUni-MinDate">N/A</a>
                        <a className="eplat-PrUni-SecDate">N/A</a>
                        <FiRefreshCcwIcon className="eplat-PrUni-WithDraw-CantReFreshIcon" />
                    </div>
                )}
            </div>
            <div className="eplat-PrUni-WithDraw-BtnContainer">
                {privateWithdrawAmountToModal === "" ? (
                    <div className="eplat-PrUni--Withdraw-Can-BtnSection">
                        <button className="eplat-PrUni-Withdraw-SelectBtn" disabled={true}>
                            SELECT TOKEN
                        </button>
                    </div>
                ) : prUniV2ClaimSecDate === "00" ? (
                    <div className="eplat-PrUni--Withdraw-Can-BtnSection">
                        <button className="eplat-PrUni-Withdraw-CanBtn" onClick={setPrivateRakis6UnStake}>
                            UNSTAKE
                        </button>
                    </div>
                ) : (
                    <div className="eplat-PrUni-Withdraw-Can-BtnSection">
                        <button className="eplat-PrUni-Withdraw-SelectBtn" disabled={true}>
                            UNSTAKE
                        </button>
                    </div>
                )}
            </div>
            <div className="logoContainer">
                <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" onClick={changeEthereumNetWork} className="opIcon" alt="EthereumIcon" />
                <div className="HanEpTxtContinaer">
                    <span className="HanEpTxt" onClick={addRewardToken}>
                        HANeP
                    </span>
                </div>
                {/* <img src={USDCLogo} onClick={addRewardToken} className="hanIcon" alt="HanIcon" /> */}
            </div>
        </div>
    );
};

export default PrivateUniWithdrawSection;
