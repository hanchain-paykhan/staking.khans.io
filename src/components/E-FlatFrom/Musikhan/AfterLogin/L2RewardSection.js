import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../SprStakingPage/Loading";
import L2RewardModal from "./Modal/L2RewardModal";
import { L2MusikhanClaimAction } from "../../../../redux/actions/musikhanActions/L2Actions/L2MusikhanClaimAction";
import { L2RewardResultAction } from "../../../../redux/actions/musikhanActions/L2Actions/L2RewardResultAction";
import "./L2RewardSection.scss";
import { L2RewardViewAction } from "../../../../redux/actions/musikhanActions/L2Actions/L2RewardViewAction";
import { L2RewardTotalAction } from "../../../../redux/actions/musikhanActions/L2Actions/L2RewardTotalAction";
import { FiRefreshCcwIcon } from "../../../Icons/reactIcons";

const L2RewardSection = () => {
    const dispatch = useDispatch();
    const [musiL2RewardModal, setMusiL2RewardModal] = useState(false);
    const [checkChainId, setCheckChainId] = useState("");
    const { account } = useSelector((state) => state.account);

    //L2 Reward
    const { rewardTokenName, rewardTokenSymbol, rewardUnClaimedReward, rewardClaimedReward, rewardTokenAmount, musiResultValue, rewardTokenCa, totalRewardToken, rewardListTime } = useSelector(
        (state) => state.L2RewardView
    );

    // L2 Reward Modal
    const openL2RewardModal = () => {
        setMusiL2RewardModal(true);
    };
    const closeL2RewardModal = () => {
        setMusiL2RewardModal(false);
    };

    //L2TokenClaim
    const setL2TokenClaim = () => {
        dispatch(L2MusikhanClaimAction.L2MusikhanClaimAct(account, rewardTokenCa));
    };

    const changeMusiRewardState = () => {
        dispatch(L2RewardResultAction.L2RewardResultAct(rewardListTime, rewardTokenAmount));
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
        dispatch(L2RewardTotalAction.L2RewardTotalAct(account));
        // .catch((error) => {
        //     console.error("Failed to fetch total reward:", error);
        //     // 오류 상태에 대한 처리를 진행할 수 있습니다.
        //     // 예를 들어, 오류 메시지를 표시하거나, 대체 데이터를 사용할 수 있습니다.
        // });
    }, [account]);

    useEffect(() => {
        dispatch(L2RewardViewAction.L2RewardViewAct());
        dispatch(L2RewardResultAction.L2RewardResultAct());
    }, []);

    return (
        <div>
            {checkChainId === "0x1" ? (
                // Ethereum Rewards Section
                <div>
                    <h3>MainNet</h3>
                </div>
            ) : checkChainId === "Oxa" ? (
                // Optimism Rewards Section
                <div>
                    <div className="allMusiRewardsCumulativeSection">
                        <p>
                            Estimated Interest : {musiResultValue}
                            <FiRefreshCcwIcon className="allOpRefreshClaimIcon" onClick={changeMusiRewardState} />
                            HAN
                        </p>
                    </div>
                    <div className="amountMusiTokenRewardAccSection">
                        <p>Accumulated Interest : {rewardUnClaimedReward} HAN</p>
                    </div>
                    <div className="amountMusiTokenRewardTxtSection">
                        <p>Rewarded Interest : {rewardClaimedReward} HAN </p>
                    </div>
                    <div className="amountMusiTotalRewardTxtSection">
                        <p>Total Rewarded Interest : {totalRewardToken} HAN</p>
                    </div>
                    <div className="rewardsMusiClaimBtnSection">
                        {!rewardTokenName ? (
                            <button className="musi-oPBefore-SelectToken-Claim" onClick={openL2RewardModal}>
                                SELECT TOKEN
                            </button>
                        ) : (
                            <button className="musi-OpAfter-SelectToken-Claim" onClick={openL2RewardModal}>
                                {rewardTokenName}
                            </button>
                        )}

                        {musiResultValue + rewardUnClaimedReward <= 0 ? (
                            <button className="cant-Musi-opClaim-learn-more" disabled={true}>
                                NOTHING TO CLAIM
                            </button>
                        ) : (
                            <button className="musi-opClaim-learn-more" onClick={setL2TokenClaim}>
                                CLAIM
                            </button>
                        )}
                    </div>
                    <L2RewardModal open={musiL2RewardModal} close={closeL2RewardModal} />
                </div>
            ) : (
                // Others Network Reward Section
                <div className="cantConnectNetWorkContainer">
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default L2RewardSection;
