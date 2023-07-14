import axios from "axios";

export function hanStakingRewardViewAct(account) {
  return async (dispatch) => {
    try {
      const [hanRewardPerSecondView, hanTotalRewardReleased] = await Promise.all([
        axios.post(`https://back.khans.io/block/hanBonusRewardView`, { account }),
        axios.post(`https://back.khans.io/block/hanBonusTotalRewardReleased`, { account }),
      ]);

      dispatch({
        type: "HAN_CHAIN_REWARD_VIEW",
        payload: {
          hanRewardPerSecondView: hanRewardPerSecondView.data,
          hanTotalRewardReleased: hanTotalRewardReleased.data,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const hanStakingRewardViewAction = { hanStakingRewardViewAct };
