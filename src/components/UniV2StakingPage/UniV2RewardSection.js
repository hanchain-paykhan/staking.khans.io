import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UniV2RewardSection.scss";
import { networksAction } from "../../redux/actions/networksAction";
import { uniV2RewardVIewAction } from "../../redux/actions/uniV2StakingActions/uniV2RewardVIewAction";
import { uniV2ClaimAction } from "../../redux/actions/uniV2StakingActions/uniV2ClaimAction";
import { FiRefreshCcwIcon } from "../Icons/reactIcons";

const UniV2RewardSection = () => {
    const dispatch = useDispatch();
    const [checkChainId, setCheckChainId] = useState("");
    const { account } = useSelector((state) => state.account);
    const { uniV2StakedAmount, usdcRakis6StakedrewardReleased, uniV2StakedunclaimedReward, uniV2RewardView, uniV2TotalSupply } = useSelector((state) => state.uniV2View);

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

    const changeUsdcRakis6RewardState = () => {
        dispatch(uniV2RewardVIewAction.uniV2RewardVIewAct(account));
    };

    const setUsdcClaim = () => {
        dispatch(uniV2ClaimAction.uniV2ClaimAct(account));
    };

    useEffect(() => {
        dispatch(uniV2RewardVIewAction.uniV2RewardVIewAct(account));
    }, [account]);

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
            <>
                <div className="uniV2-Staking-Reward-Quaota-Section">
                    <p>TOTAL STAKED : {uniV2TotalSupply}</p>
                </div>
                <div className="uniV2-Staking-Reward-StakeAmount-Section">
                    <p>STAKED : {uniV2StakedAmount} </p>
                </div>
                <div className="uniV2-Staking-Reward-EstSection">
                    <p>
                        Estimated Interest : {uniV2RewardView}
                        <FiRefreshCcwIcon className="uniV2-Staking-Reward-RefreshIcon" onClick={changeUsdcRakis6RewardState} />
                        HANeP
                    </p>
                </div>
                <div className="uniV2-Staking-Reward-AccSection">
                    <p>Accumulated Interest : {uniV2StakedunclaimedReward} HANeP</p>
                </div>
                <div className="uniV2-Staking-Reward-InterSection">
                    <p>Rewarded Interest : {usdcRakis6StakedrewardReleased} HANeP </p>
                </div>

                {/* 리워드 안될때 상태 추가 */}

                <div className="uniV2-Staking-Rewards-ClaimBtnSection">
                    {uniV2RewardView + uniV2StakedunclaimedReward <= 0 ? (
                        <button className="uniV2-Staking-Reward-CantBtn" disabled={true}>
                            NOTHING TO CLAIM
                        </button>
                    ) : (
                        <button className="uniV2-Staking-Reward-CanBtn" onClick={setUsdcClaim}>
                            CLAIM
                        </button>
                    )}
                </div>
            </>
            <div className="logoContainer">
                <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" onClick={changeEthereumNetWork} className="opIcon" alt="EthereumIcon" />
                <div className="HanEpTxtContinaer">
                    <span className="HanEpTxt" onClick={addRewardToken}>
                        HANeP
                    </span>
                </div>
                {/* <img src={HanLogo} onClick={addRewardToken} className="hanIcon" alt="HanIcon" /> */}
            </div>
        </div>
    );
};

export default UniV2RewardSection;
