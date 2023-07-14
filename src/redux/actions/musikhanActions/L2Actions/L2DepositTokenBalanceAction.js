import axios from "axios";

function L2DepositTokenBalanceAct(account, l2TokenAddress) {
  return async (dispatch) => {
    try {
      if (account) {
        const L2DepositBalanceStringApiToback = await axios.post(`https://back.khans.io/block/l2DepositTokenBalance`, {
          account,
          l2TokenAddress,
        });

        const musiAllowanceApi = await axios.post(`https://back.khans.io/block/l2DepositAllowance`, {
          account,
          l2TokenAddress,
        });

        dispatch({
          type: "L2_DEPOSIT_BALANCE",
          payload: {
            L2DepositBalance: L2DepositBalanceStringApiToback.data,
            musiAllowance: musiAllowanceApi.data,
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

export const L2DepositTokenBalanceAction = { L2DepositTokenBalanceAct };
