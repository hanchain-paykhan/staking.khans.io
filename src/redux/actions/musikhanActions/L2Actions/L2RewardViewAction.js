import { MusikhanStakingContract, web3 } from "../../../../config/MusikhanConfig";
// import { MusikhanStakingContract } from "../../../../config/MusikhanConfigTest";

function L2RewardViewAct(rewardTokenName, rewardTokenSymbol, rewardUnClaimedReward, rewardClaimedReward, rewardTokenAmount, rewardTokenCa, rewardTimeOfLastUpdate, account) {
    return async (dispatch) => {
        try {
            if (account) {
                const rewardTokenNameToModalApi = rewardTokenName;
                const rewardTokenSymbolToModalApi = rewardTokenSymbol;

                const rewardUnClaimedRewardToModalApi = rewardUnClaimedReward;

                const rewardClaimedRewardToModalApi = rewardClaimedReward;

                const rewardTokenAmountToModalApi = rewardTokenAmount;

                const rewardTokenCaToModalApi = rewardTokenCa;
                const rewardListTimeToModalApi = rewardTimeOfLastUpdate;

                const rewardUnClaimedRewardToModal = rewardUnClaimedRewardToModalApi ? web3.utils.fromWei(String(rewardUnClaimedRewardToModalApi), "ether") : 0;
                const rewardClaimedRewardToModal = rewardClaimedRewardToModalApi ? web3.utils.fromWei(String(rewardClaimedRewardToModalApi), "ether") : 0;
                const hanTokenPerLpTokenApi = await MusikhanStakingContract.methods.hanTokenPerLpToken().call();

                dispatch({
                    type: "L2_REWARD_TOKEN_INFO_VIEW",
                    payload: {
                        rewardTokenName: rewardTokenNameToModalApi,
                        rewardTokenSymbol: rewardTokenSymbolToModalApi,
                        rewardUnClaimedReward: rewardUnClaimedRewardToModal,
                        rewardClaimedReward: rewardClaimedRewardToModal,
                        rewardTokenAmount: rewardTokenAmountToModalApi,
                        rewardTokenCa: rewardTokenCaToModalApi,
                        rewardListTime: rewardListTimeToModalApi,
                        hanTokenPerLpToken: hanTokenPerLpTokenApi,
                    },
                });
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const L2RewardViewAction = { L2RewardViewAct };
