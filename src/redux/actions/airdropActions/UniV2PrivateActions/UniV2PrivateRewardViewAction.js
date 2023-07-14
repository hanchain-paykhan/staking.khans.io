import axios from "axios";

function UniV2PrivateRewardViewAct(account) {
    return async (dispatch) => {
        try {
            // 내가 받을 수 있는 총 보상 출력 함수
            const getPvtUniV2RewardView = await axios.post(`https://back.khans.io/block/pvtUniV2RewardView`, {
                account,
            });
            const privateUniV2RewardPerSecondViewApi = getPvtUniV2RewardView.data;

            // 총 보상받은 토큰 양
            const getPvtUniV2TotalRewardReleased = await axios.post(`https://back.khans.io/block/pvtUniV2TotalRewardReleased`, {
                account,
            });

            const privateUniV2TotalRewardReleasedApi = getPvtUniV2TotalRewardReleased.data;

            let [privateUniV2RewardPerSecondView, privateUniV2TotalRewardReleased] = await Promise.all([privateUniV2RewardPerSecondViewApi, privateUniV2TotalRewardReleasedApi]);

            dispatch({
                type: "PRIVATE_UNIV2_REWARD_VIEW",
                payload: {
                    privateUniV2RewardPerSecondView: privateUniV2RewardPerSecondView,
                    privateUniV2TotalRewardReleased: privateUniV2TotalRewardReleased,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const UniV2PrivateRewardViewAction = { UniV2PrivateRewardViewAct };
