import axios from "axios";

function munieStakingResultViewAct(account) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        const munieResultValueApi = await axios.post(`https://back.khans.io/block/munieV2ResultValue`, {
          account,
        });
        const getMunieUnClaimedRewardsApi = await axios.post(`https://back.khans.io/block/munieV2UnclaimedReward`, {
          account,
        });
        const getMunieTotalRewardApi = await axios.post(`https://back.khans.io/block/munieV2TotalReward`, {
          account,
        });

        let [munieResultValue, getMunieUnClaimedRewards, getMunieTotalReward] = await Promise.all([
          munieResultValueApi.data,
          getMunieUnClaimedRewardsApi.data,
          getMunieTotalRewardApi.data,
        ]);
        dispatch({
          type: "MUNIE_RESULT_VIEW",
          payload: {
            munieResultValue: munieResultValue,
            getMunieUnClaimedRewards: getMunieUnClaimedRewards,
            getMunieTotalReward: getMunieTotalReward,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const munieStakingResultViewAction = { munieStakingResultViewAct };
