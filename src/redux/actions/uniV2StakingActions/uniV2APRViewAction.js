import BigNumber from "bignumber.js";
import { StakingUniV2Contract, uniV2Contract, web3 } from "../../../config/new/StakingUniV2Config";

function uniV2APRViewAct(account) {
    const AmountBN = new BigNumber("1000000000000000000");

    return async (dispatch) => {
        try {
            if (account) {
                const getHanEpTokenPerLpTokenApi = StakingUniV2Contract.methods.hanTokenPerLpToken().call();

                const getUniV2HapEpTotalSupplyApi = uniV2Contract.methods.totalSupply().call();

                // console.log("123", getUniV2HapEpTotalSupplyApi);
                const getUniV2HapEpGetReservesApi = uniV2Contract.methods.getReserves().call();

                // console.log("123123", getUniV2HapEpGetReservesApi);

                const [getHanEpTokenPerLpToken, totalSupply, reserves] = await Promise.all([getHanEpTokenPerLpTokenApi, getUniV2HapEpTotalSupplyApi, getUniV2HapEpGetReservesApi]);

                const hanEpTokenPerLpToken = web3.utils.fromWei(getHanEpTokenPerLpToken, "ether");
                const AmountBNInEther = web3.utils.fromWei(AmountBN.toString(), "ether");
                const reservesInEther = web3.utils.fromWei(reserves._reserve0.toString(), "ether");
                const totalSupplyInEther = web3.utils.fromWei(totalSupply.toString(), "ether");
                const calculatedValue = new BigNumber(AmountBNInEther).dividedBy(reservesInEther).multipliedBy(totalSupplyInEther).toFixed(18); // Truncate the last 18 digits

                const truncatedValue = parseFloat(calculatedValue);

                const stakingUniV2APR = parseFloat((hanEpTokenPerLpToken * 60 * 60 * 24 * 365 * truncatedValue * 100).toFixed(2));

                dispatch({
                    type: "UNIV2_STAKING_APR",
                    payload: {
                        stakingUniV2APR: stakingUniV2APR,
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

export const uniV2APRViewAction = { uniV2APRViewAct };
