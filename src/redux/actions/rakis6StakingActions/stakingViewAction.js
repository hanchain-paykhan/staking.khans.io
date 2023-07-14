import axios from "axios";
import { StakingAddress } from "../../../config/StakingRakis6Config";

function stakingViewAct(account) {
  return async (dispatch) => {
    try {
      if (account) {
        const getStakedAmountApi = await axios.post(`https://back.khans.io/block/rakis6GetAmount`, {
          account,
        });

        const getAmountApi = getStakedAmountApi.data;

        // 스테이킹 할 수 있는 토큰
        const getStakingTokenBalanceApi = await axios.post(`https://back.khans.io/block/rakis6StakedTokenAmount`, {
          account,
        });

        const stakingTokenBalanceApi = getStakingTokenBalanceApi.data;

        const getHanTokenPerLpTokenApi = await axios.get(`https://back.khans.io/block/rakis6HanTokenPerLp`);

        const hanTokenPerLpTokenApi = getHanTokenPerLpTokenApi.data;

        const getTokenVolumeApi = await axios.get(`https://back.khans.io/block/rakis6TokenVolume`);

        const tokenVolumeFromWei = getTokenVolumeApi.data;

        const getTotalSupplyApi = await axios.get(`https://back.khans.io/block/rakis6TotalSupply`);

        const totalSupplyFromWei = getTotalSupplyApi.data;

        const getAllowanceAmountApi = await axios.post(`https://back.khans.io/block/rakis6AllowanceState`, {
          account,
          StakingAddress,
        });

        const allowanceAmountApi = getAllowanceAmountApi.data;

        const getHanQuantityLpQuantityPerYear1HanValueApi = await axios.get(`https://back.khans.io/block/rakis6Apr`);
        const HanQuantityLpQuantityPerYear1HanValueApi = getHanQuantityLpQuantityPerYear1HanValueApi.data;

        const canAmountStakeApi = tokenVolumeFromWei - totalSupplyFromWei;
        // console.log("canAmount", canAmountStakeApi);

        let [getAmount, stakingTokenBalance, canAmountStake, hanTokenPerLpToken, allowanceAmount, HanQuantityLpQuantityPerYear1HanValue] =
          await Promise.all([
            getAmountApi,
            stakingTokenBalanceApi,
            canAmountStakeApi,
            hanTokenPerLpTokenApi,
            allowanceAmountApi,
            HanQuantityLpQuantityPerYear1HanValueApi,
          ]);

        dispatch({
          type: "GET_STAKING_VIEW_SUCCESS",
          payload: {
            // getAmount: Math.floor((getAmount / 10 ** 18) * 100000000000000) / 100000000000000,
            getAmount: getAmount,
            stakingTokenBalance: stakingTokenBalance,
            // stakingTokenBalance: Math.floor((stakingTokenBalance / 10 ** 18) * 100000000000000) / 100000000000000,
            // canAmountStake: Math.floor((canAmountStake / 10 ** 18) * 100000000000000) / 100000000000000,
            canAmountStake: canAmountStake,
            hanTokenPerLpToken: hanTokenPerLpToken,
            allowanceAmount: allowanceAmount,
            HanQuantityLpQuantityPerYear1HanValue: HanQuantityLpQuantityPerYear1HanValue,
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

export const stakingViewAction = { stakingViewAct };
