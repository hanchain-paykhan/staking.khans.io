import axios from "axios";

function L1TokenBalanceViewAct(account, l1TokenAddress) {
  return async (dispatch) => {
    try {
      const L1TokenBalanceOfApiToBack = await axios.post(`https://back.khans.io/block/l1tokenbalance`, {
        account,
        l1TokenAddress,
      });

      // console.log("L1TokenBalanceOfApiToBack", L1TokenBalanceOfApiToBack.data);

      dispatch({
        type: "L1_TOKEN_BALANCE_SUCCESS",
        payload: {
          L1TokenBalanceOf: L1TokenBalanceOfApiToBack.data,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const L1TokenBalanceViewAction = { L1TokenBalanceViewAct };
