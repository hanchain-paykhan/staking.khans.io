import { StakingContract } from "../../../config/StakingRakis6Config";
// import { StakingContract } from "../../../config/StakingRakis6ConfigTest";
import web3 from "web3";
import BigNumber from "bignumber.js";

function stakingResultViewAct(account) {
  const AmountBN = new BigNumber("1000000000000000000");

  return async (dispatch) => {
    try {
      if (account !== "") {
        const getAmountApi = await StakingContract.methods
          .getAmount(account)
          .call();

        const getStakingStartTimeApi = await StakingContract.methods
          .getStakingStartTime(account)
          .call();

        const getRewardReleasedApi = await StakingContract.methods
          .getRewardReleased(account)
          .call();

        const getBalanceApi = await StakingContract.methods
          .getBalance(account)
          .call();

        const currentTimeApi = Math.floor(new Date().getTime() / 1000);

        const hanTokenPerLpTokenApi = await StakingContract.methods
          .hanTokenPerLpToken()
          .call();

        const stakedTime = currentTimeApi - getStakingStartTimeApi;

        const resultValueApi =
          (stakedTime * (getAmountApi * hanTokenPerLpTokenApi)) /
          10 ** 18 /
          10 ** 18;

        let [resultValue, getBalance, getRewardReleased] = await Promise.all([
          resultValueApi,
          getBalanceApi,
          getRewardReleasedApi,
        ]);

        dispatch({
          type: "GET_STAKING_RESULT_VIEW_SUCCESS",
          payload: {
            resultValue: Math.floor(resultValue * 100000000) / 100000000,
            getBalance:
              Math.floor((getBalance / 10 ** 18) * 100000000) / 100000000,
            getRewardReleased:
              Math.floor((getRewardReleased / 10 ** 18) * 100000000) /
              100000000,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const stakingResultViewAction = { stakingResultViewAct };
