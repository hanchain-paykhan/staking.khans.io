import { StakingTokenContract } from "../../config";

function stakingMaxAmountAct(account) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        const stakingTokenAmount = await StakingTokenContract.methods
          .balanceOf(account)
          .call();

        // let [stakingTokenAmount] = await Promise.all([stakingTokenAmountApi]);

        dispatch({
          type: "GET_STAKING_MAX_AMOUNT",
          payload: {
            stakingTokenAmount: (stakingTokenAmount / 10 ** 18),
          },
        });
        console.log(typeof stakingTokenAmount,"?");
      }
    } catch (error) {
      console.error(error);

    }
  };
}

export const stakingMaxAmountAction = { stakingMaxAmountAct };
