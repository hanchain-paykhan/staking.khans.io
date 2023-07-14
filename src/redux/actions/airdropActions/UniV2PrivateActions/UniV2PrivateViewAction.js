import axios from "axios";

function UniV2PrivateViewAct(account) {
  return async (dispatch) => {
    try {
      if (account) {
        const getPvtUniV2Balance = await axios.post(`https://back.khans.io/block/pvtUniV2Balance`, {
          account,
        });

        const privateUniV2StakingTokenBalanceApi = getPvtUniV2Balance.data;

        const getPvtUniV2TotalSupply = await axios.get(`https://back.khans.io/block/pvtUniV2TotalSupply`);

        const privateUniV2TotalStakedApi = getPvtUniV2TotalSupply.data;

        const getPvtUniV2StakedAmount = await axios.post(`https://back.khans.io/block/pvtUniV2StakedAmount`, {
          account,
        });
        const totalUniV2PrivateStakedAmountApi = getPvtUniV2StakedAmount.data;

        let [privateUniV2StakingTokenBalance, privateUniV2TotalStaked, totalUniV2PrivateStakedAmount] = await Promise.all([
          privateUniV2StakingTokenBalanceApi,
          privateUniV2TotalStakedApi,
          totalUniV2PrivateStakedAmountApi,
        ]);

        dispatch({
          type: "UNIV2_PRIVATE_VIEW_SUCCESS",
          payload: {
            privateUniV2StakingTokenBalance: privateUniV2StakingTokenBalance,
            privateUniV2TotalStaked: privateUniV2TotalStaked,
            totalUniV2PrivateStakedAmount: totalUniV2PrivateStakedAmount,
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

export const UniV2PrivateViewAction = { UniV2PrivateViewAct };
