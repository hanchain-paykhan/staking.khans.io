import axios from "axios";

function L2RewardResultAct(rewardTimeOfLastUpdate, rewardTokenAmount) {
  return async (dispatch) => {
    try {
      const musiResultValueApi = await axios.post(`https://back.khans.io/block/l2RewardResult`, {
        rewardTimeOfLastUpdate,
        rewardTokenAmount,
      });

      dispatch({
        type: "L2_REWARD_RESULT_VIEW",
        payload: {
          musiResultValue: musiResultValueApi.data,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const L2RewardResultAction = { L2RewardResultAct };
