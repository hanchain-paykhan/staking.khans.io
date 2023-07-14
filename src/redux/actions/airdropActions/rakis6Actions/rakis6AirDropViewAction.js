import axios from "axios";
import { PrivateStakingAddress } from "../../../../config/PrivateStakingRakis6Config";

function rakis6AirDropViewAct(account) {
    return async (dispatch) => {
        try {
            if (account) {
                const getPvtRakis6Balance = await axios.post(`https://back.khans.io/block/pvtRakis6BalanceOf`, {
                    account,
                });
                const rakis6StakingBalanceOfApi = getPvtRakis6Balance.data;

                // 컨트랙트에 유저가 총 스테이킹 할 수 있는 토큰 양 출력 함수
                const getTokenQuotaToContract = await axios.get(`https://back.khans.io/block/pvtRakis6Quota`);
                const rakis6AirDropTokenQuotaApi = getTokenQuotaToContract.data;

                // 컨트랙트에 유저가 총 스테이킹 한 금액 출력 함수
                const GetPvtRakis6TotalSupply = await axios.get(`https://back.khans.io/block/pvtRakis6TotalSupply`);
                const rakis6AirDropTotalSupplyApi = GetPvtRakis6TotalSupply.data;

                const canStakedQuatoAmountApi = rakis6AirDropTokenQuotaApi - rakis6AirDropTotalSupplyApi;

                const getPvtRakis6AllowanceAirDrop = await axios.post(`https://back.khans.io/block/pvtRakis6Allowance`, {
                    account,
                    PrivateStakingAddress,
                });
                const allowanceApi = getPvtRakis6AllowanceAirDrop.data;
                let [rakis6StakingBalanceOf, canStakedQuatoAmount, allowance] = await Promise.all([rakis6StakingBalanceOfApi, canStakedQuatoAmountApi, allowanceApi]);

                dispatch({
                    type: "RAKIS6_AIRDROP_VIEW",
                    payload: {
                        rakis6StakingBalanceOf: rakis6StakingBalanceOf,
                        canStakedQuatoAmount: canStakedQuatoAmount,
                        allowance: allowance,
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

export const rakis6AirDropViewAction = { rakis6AirDropViewAct };
