import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HanEpL2WithdrawSection.scss";
import { networksAction } from "../../../../redux/actions/networksAction";
import { HanLogo } from "../../../../assets/_index";
import HanEpL2WithdrawModal from "./Modal/HanEpL2WithdrawModal";
import { FiRefreshCcwIcon, GiClickIcon } from "../../../Icons/reactIcons";

const HanEpL2WithdrawSection = () => {
    const dispatch = useDispatch();
    const [checkChainId, setCheckChainId] = useState("");
    const [uniV2WithdrawModal, setuniV2WithdrawModal] = useState(false);
    const { account } = useSelector((state) => state.account);

    const changeEthereumNetWork = () => {
        dispatch(networksAction.changeEthereumNetWorkAct());
    };

    // add to Reward Token
    const addRewardToken = async () => {
        const tokenAddress = "0x50Bce64397C75488465253c0A034b8097FeA6578";
        const tokenSymbol = "HAN";
        const tokenDecimals = 18;
        const tokenImage = "https://raw.githubusercontent.com/hanchain-paykhan/hanchain/3058eecc5d26f980db884f1318da6c4de18a7aea/logo/logo.svg";

        try {
            const wasAdded = await window.ethereum?.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20",
                    options: {
                        address: tokenAddress,
                        symbol: tokenSymbol,
                        decimals: tokenDecimals,
                        image: tokenImage,
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

    const openUniV2WithdrawModal = () => {
        setuniV2WithdrawModal(true);
    };

    const closeUniV2WithdrawModal = () => {
        setuniV2WithdrawModal(false);
    };

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
    return (
        <div>
            <>
                <div className="eplat-HanEp-Withdraw-Quaota-Section">
                    <p>TOTAL STAKED : </p>
                </div>
                <div className="eplat-HanEp-Withdraw-StakeAmount-Section">
                    <p>STAKED : </p>
                </div>
            </>
            <div className="eplat-HanEp-Withdraw-APR-Container">
                <div className="eplat-HanEp-Withdraw-APR-Title">
                    <a>APR</a>
                </div>
                <div className="eplat-HanEp-Withdraw-APR-Info">
                    <a>%</a>
                </div>
            </div>
            <div className="eplat-HanEp-Withdraw-AmountSection">
                <input type="number" step="0.00000000000001" id="maxUnstakeAmount" placeholder="0" readOnly></input>
                <p>HANeP</p>
                {/* <button className="eplat-HanEp-Withdraw-AmountMaxBtn">Max</button> */}
                <button className="eplat-HanEp-Select-Token-Btn" onClick={openUniV2WithdrawModal}>
                    SELECT
                    <GiClickIcon className="eplat-HanEp-Select-Token-Icon" />
                </button>
                <HanEpL2WithdrawModal open={uniV2WithdrawModal} close={closeUniV2WithdrawModal} header="HanEp Withdraw Modal" />
            </div>
            <div className="eplat-HanEp-WithDraw-TimeContainer">
                <div className="eplat-HanEp-WithDraw-TimeTitle">
                    <a>Remaining Duration</a>
                </div>
                {/* {rakis6ClaimDayDate ? (
            <div className="eplat-HanEp-WithDraw-TimeSection">
                <a className="rakis6DayDate">{rakis6ClaimDayDate}D</a>
                <a className="rakis6HoursDate">{rakis6ClaimHoursDate}H</a>
                <a className="rakis6MinDate">{rakis6ClaimMinDate}M</a>
                <FiRefreshCcw className="eplat-HanEp-WithDraw-ReFreshIcon" onClick={changeRakis6TimeStampState} />
            </div>
        ) : ( */}
                <div className="eplat-HanEp-WithDraw-TimeSection">
                    <a className="rakis6DayDate">N/A</a>
                    <a className="rakis6HoursDate">N/A</a>
                    <a className="rakis6MinDate">N/A</a>
                    <FiRefreshCcwIcon className="eplat-HanEp-WithDraw-CantReFreshIcon" />
                </div>
                {/* )} */}
            </div>
            <div className="eplat-HanEp-WithDraw-BtnContainer">
                {/* <div className="eplat-HanEp-Withdraw-Can-BtnSection">
<button className="eplat-HanEp-Withdraw-CanBtn" onClickCapture={setRakis6UnStake}>
UNSTAKE
</button>
</div> */}

                <div className="eplat-HanEp-Withdraw-Can-BtnSection">
                    <button className="eplat-HanEp-Withdraw-SelectBtn" disabled={true}>
                        COMING SOON
                    </button>
                </div>
            </div>
            <div className="logoContainer">
                <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" onClick={changeEthereumNetWork} className="opIcon" alt="EthereumIcon" />
                <img src={HanLogo} onClick={addRewardToken} className="hanIcon" alt="HanIcon" />
            </div>
        </div>
    );
};

export default HanEpL2WithdrawSection;
