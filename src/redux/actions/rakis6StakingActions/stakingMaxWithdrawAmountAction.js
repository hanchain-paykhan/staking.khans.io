import { StakingContract } from "../../../config/StakingRakis6Config";
// import { StakingContract } from "../../../config/StakingRakis6ConfigTest";
import BigNumber from "bignumber.js";

function stakingMaxWithdrawAmountAct(account) {
  return async (dispatch) => {
    const AmountBN = new BigNumber("1000000000000000000");
    try {
      if (account !== "") {
        const getWithdrawAmount = await StakingContract.methods
          .getAmount(account)
          .call();

        dispatch({
          type: "GET_STAKING_WITHDRAW_MAX_AMOUNT",
          payload: {
            getWithdrawAmount: getWithdrawAmount / 10 ** 18,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const stakingMaxWithdrawAmountAction = { stakingMaxWithdrawAmountAct };
