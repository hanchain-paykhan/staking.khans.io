import axios from "axios";

export function hanStakingTokenListViewAct(account) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`https://back.khans.io/block/hanBonusStakerArray`, {
        account,
      });

      dispatch({
        type: "HAN_CHAIN_WITHDRAW_TOKEN_LIST",
        payload: {
          getHanStakerDataArray: response.data,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const hanStakingTokenListViewAction = { hanStakingTokenListViewAct };
