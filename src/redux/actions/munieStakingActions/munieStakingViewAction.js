import axios from "axios";

function munieStakingViewAct(account) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        const getMunieV2StakedAmountApi = await axios.post(`https://back.khans.io/block/munieV2StakedAmount`, {
          account,
        });
        const getMunieV2StakedTokenIdApi = await axios.post(`https://back.khans.io/block/munieV2StakedTokenid`, {
          account,
        });

        let [munieAmountStaked, munieStakedTokenIds] = await Promise.all([getMunieV2StakedAmountApi.data, getMunieV2StakedTokenIdApi.data]);
        dispatch({
          type: "MUNIE_STAKING_VIEW",
          payload: {
            munieAmountStaked: munieAmountStaked,
            munieStakedTokenIds: munieStakedTokenIds,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const munieStakingViewAction = { munieStakingViewAct };
