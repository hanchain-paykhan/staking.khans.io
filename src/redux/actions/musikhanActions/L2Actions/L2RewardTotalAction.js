import axios from "axios";

function L2RewardTotalAct(account) {
  return async (dispatch) => {
    try {
      if (account) {
        const musiL2TotalRewardApi = await axios.post(`https://back.khans.io/block/l2TotalReward`, {
          account,
        });
        dispatch({
          type: "L2_TOTAL_REWARD_TOKEN",
          payload: {
            totalRewardToken: musiL2TotalRewardApi.data,
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

export const L2RewardTotalAction = { L2RewardTotalAct };
