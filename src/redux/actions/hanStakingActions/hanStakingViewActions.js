import axios from "axios";

export function hanStakingViewAct(account) {
  return async (dispatch) => {
    try {
      if (!account) {
        return null;
      }

      const [hanChainBalanceOfResponse, totalSupplyResponse, totalStakedAmountResponse] = await Promise.all([
        axios.post(`https://back.khans.io/block/hanBonusBalance`, { account }),
        axios.post(`https://back.khans.io/block/hanBonusTotalSupply`, { account }),
        axios.post(`https://back.khans.io/block/hanBonusTotalStaked`, { account }),
      ]);

      const hanChainBalanceOf = parseFloat(hanChainBalanceOfResponse.data);
      const totalSupply = totalSupplyResponse.data;
      const totalHanStakedAmount = totalStakedAmountResponse.data;

      dispatch({
        type: "HAN_STAKING_VIEW",
        payload: {
          hanChainBalanceOf,
          totalSupply,
          totalHanStakedAmount,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const hanStakingViewAction = { hanStakingViewAct };
