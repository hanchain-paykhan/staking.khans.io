import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { networksAction } from "../../../../redux/actions/networksAction";
import "./PrivateUniRewardSection.scss";
import { UniV2PrivateRewardViewAction } from "../../../../redux/actions/airdropActions/UniV2PrivateActions/UniV2PrivateRewardViewAction";
import { UniV2PrivateClaimAction } from "../../../../redux/actions/airdropActions/UniV2PrivateActions/UniV2PrivateClaimAction";
import { FiRefreshCcwIcon } from "../../../Icons/reactIcons";

const PrivateUniRewardSection = () => {
    const dispatch = useDispatch();
    const [checkChainId, setCheckChainId] = useState("");
    const { account } = useSelector((state) => state.account);
    const { privateUniV2TotalStaked, totalUniV2PrivateStakedAmount, privateUniV2RewardPerSecondView, privateUniV2TotalRewardReleased, stakingPrUniV2APR } = useSelector(
        (state) => state.UniV2PrivateView
    );

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

    const changePrivateUniV2RewardState = () => {
        dispatch(UniV2PrivateRewardViewAction.UniV2PrivateRewardViewAct(account));
    };

    const setPrivateUniV2Claim = () => {
        dispatch(UniV2PrivateClaimAction.UniV2PrivateClaimAct(account));
    };

    useEffect(() => {
        dispatch(UniV2PrivateRewardViewAction.UniV2PrivateRewardViewAct(account));
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

    return (
        <div>
            <>
                <>
                    <div className="eplat-PrUni-Reward-Quaota-Section">
                        <p>TOTAL STAKED : {privateUniV2TotalStaked} </p>
                    </div>
                    <div className="eplat-PrUni-Reward-StakeAmount-Section">
                        <p>STAKED : {totalUniV2PrivateStakedAmount} </p>
                    </div>
                </>
                <div className="eplat-PrUni-Reward-APR-Container">
                    <div className="eplat-PrUni-Reward-APR-Title">
                        <a>APR</a>
                    </div>
                    <div className="eplat-PrUni-Reward-APR-Info">
                        <a>{stakingPrUniV2APR}%</a>
                    </div>
                </div>
                <div className="eplat-PrUni-Reward-EstSection">
                    <p>
                        Estimated Interest : {privateUniV2RewardPerSecondView}
                        <FiRefreshCcwIcon className="eplat-PrUni-Reward-RefreshIcon" onClick={changePrivateUniV2RewardState} />
                        HANeP
                    </p>
                </div>
                {/* <div className="eplat-PrUni-Reward-AccSection">
            <p>Accumulated Interest : {hanRewardPerSecondView} HAN</p>
        </div> */}
                <div className="eplat-PrUni-Reward-InterSection">
                    <p>Rewarded Interest : {privateUniV2TotalRewardReleased} HANeP </p>
                </div>

                {/* 리워드 안될때 상태 추가 */}
                {privateUniV2RewardPerSecondView === "0" ? (
                    <div className="eplat-PrUni-Rewards-ClaimBtnSection">
                        <button className="eplat-PrUni-Reward-CantBtn" disabled={true}>
                            NOTHING TO CLAIM
                        </button>
                    </div>
                ) : (
                    <div className="eplat-PrUni-Rewards-ClaimBtnSection">
                        <button className="eplat-PrUni-Reward-CanBtn" onClick={setPrivateUniV2Claim}>
                            CLAIM
                        </button>
                    </div>
                )}
            </>
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

export default PrivateUniRewardSection;
