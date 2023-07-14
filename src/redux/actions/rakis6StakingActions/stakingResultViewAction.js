import { StakingContract, web3 } from "../../../config/StakingRakis6Config";
// import { StakingContract } from "../../../config/StakingRakis6ConfigTest";
import axios from "axios";

function stakingResultViewAct(account) {
    // const AmountBN = new BigNumber("1000000000000000000");

    return async (dispatch) => {
        try {
            if (account !== "") {
                const getStakedAmountApi = await axios.post(`https://back.khans.io/block/rakis6GetAmount`, {
                    account,
                });

                const getAmount = getStakedAmountApi.data;

                const getStakingStartTimeApi = await axios.post(`https://back.khans.io/block/rakis6StartTime`, {
                    account,
                });

                const getRewardReleasedToBack = await axios.post(`https://back.khans.io/block/rakis6RewardBalance`, {
                    account,
                });
                const getRewardReleasedApi = getRewardReleasedToBack.data;

                const getBalanceToBack = await axios.post(`https://back.khans.io/block/rakis6GetBalance`, {
                    account,
                });

                const getBalanceApi = getBalanceToBack.data;

                const currentTimeApi = Math.floor(new Date().getTime() / 1000);
                const getHanTokenPerLpTokenApi = await axios.get(`https://back.khans.io/block/rakis6HanTokenPerLp`);

                const hanTokenPerLpFromWei = web3.utils.fromWei(String(getHanTokenPerLpTokenApi.data), "ether");

                const stakedTime = currentTimeApi - getStakingStartTimeApi.data;
                const resultValueApi = stakedTime * (getAmount * hanTokenPerLpFromWei);

                let [resultValue, getBalance, getRewardReleased] = await Promise.all([resultValueApi, getBalanceApi, getRewardReleasedApi]);

                dispatch({
                    type: "GET_STAKING_RESULT_VIEW_SUCCESS",
                    payload: {
                        // resultValue: Math.floor(resultValue * 100000000) / 100000000,
                        // getBalance: Math.floor((getBalance / 10 ** 18) * 100000000) / 100000000,
                        // getRewardReleased: Math.floor((getRewardReleased / 10 ** 18) * 100000000) / 100000000,
                        resultValue: resultValue.toFixed(18),
                        getBalance: getBalance,
                        getRewardReleased: getRewardReleased,
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const stakingResultViewAction = { stakingResultViewAct };
