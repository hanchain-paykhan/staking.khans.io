import { StakingTokenContract } from "../../../config/StakingRakis6Config";
// import { StakingTokenContract } from "../../../config/StakingRakis6ConfigTest";

function stakingMaxAmountAct(account) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        const stakingTokenAmount = await StakingTokenContract.methods
          .balanceOf(account)
          .call();

        dispatch({
          type: "GET_STAKING_MAX_AMOUNT",
          payload: {
            stakingTokenAmount: stakingTokenAmount / 10 ** 18,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const stakingMaxAmountAction = { stakingMaxAmountAct };
