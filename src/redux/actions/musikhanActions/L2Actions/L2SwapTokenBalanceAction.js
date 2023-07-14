import axios from "axios";

function L2SwapTokenBalanceAct(account, existTokenCa) {
  return async (dispatch) => {
    try {
      const L2SwapBalanceOfApiToBack = await axios.post(`https://back.khans.io/block/l2SwapTokenBalance`, {
        account,
        existTokenCa,
      });

      dispatch({
        type: "L2_SWAP_TOKEN_BALANCE",
        payload: {
          L2SwapTokenBalance: L2SwapBalanceOfApiToBack.data,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const L2SwapTokenBalanceAction = { L2SwapTokenBalanceAct };
