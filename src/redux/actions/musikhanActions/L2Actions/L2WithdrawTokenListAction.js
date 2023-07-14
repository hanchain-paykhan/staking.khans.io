import axios from "axios";

function L2WithdrawTokenListAct(account) {
  return async (dispatch) => {
    try {
      const getMyStakingTokenListToBack = await axios.post(`https://back.khans.io/block/l2WithdrawTokenList`, {
        account,
      });

      dispatch({
        type: "L2_WITHDRAW_TOKEN_LIST",
        payload: {
          withdrawTokenList: getMyStakingTokenListToBack.data,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const L2WithdrawTokenListAction = { L2WithdrawTokenListAct };
