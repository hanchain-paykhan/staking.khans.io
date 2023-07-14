import axios from "axios";

function oldSprStakingResultViewAct(account) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        const getUnclaimedRewardsToBack = await axios.post(`https://back.khans.io/block/oldSprClaimedRewards`, {
          account,
        });
        // 주소 별 클레임 하지 않은 보상 토큰 양 Accumultaed Interset :
        const getUnclaimedRewardsApi = await getUnclaimedRewardsToBack.data;

        const getTotalRewardsToBack = await axios.post(`https://back.khans.io/block/oldSprTotalReward`, {
          account,
        });
        // 주소 별 지금까지 받은 총 보상 토큰 양 Rewarded Interest :
        const getTotalRewardApi = await getTotalRewardsToBack.data;

        const sprResultValueToBack = await axios.post(`https://back.khans.io/block/oldSprResultValue`, {
          account,
        });
        const sprResultValueApi = sprResultValueToBack.data;

        let [sprResultValue, getUnclaimedRewards, getTotalReward] = await Promise.all([
          sprResultValueApi,
          getUnclaimedRewardsApi,
          getTotalRewardApi,
        ]);

        dispatch({
          type: "GET_OLD_SPR_STAKING_RESULT_VIEW_SUCCESS",
          payload: {
            oldSprResultValue: Math.floor(sprResultValue * 100000000) / 100000000,
            oldSprGetUnclaimedRewards: Math.floor((getUnclaimedRewards / 10 ** 18) * 100000000) / 100000000,
            oldSprGetTotalReward: Math.floor((getTotalReward / 10 ** 18) * 100000000) / 100000000,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const oldSprStakingResultViewAction = { oldSprStakingResultViewAct };
