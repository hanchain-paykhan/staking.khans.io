import { StakingUniV2Contract, web3 } from "../../../config/new/StakingUniV2Config";

function uniV2RewardVIewAct(account) {
    return async (dispatch) => {
        try {
            if (account) {
                // 실시간 보상 받을 수 있는 토큰 양

                const stakersApi = await StakingUniV2Contract.methods.stakers(account).call();

                const hanRakis6StartTime = stakersApi.startTime;

                const hanRakis6StakedAmount = web3.utils.fromWei(String(stakersApi.amount), "ether");

                const currentTimeApi = Math.floor(new Date().getTime() / 1000);

                const stakedStartTime = currentTimeApi - hanRakis6StartTime;

                const hanTokenPerLpTokenApi = await StakingUniV2Contract.methods.hanTokenPerLpToken().call();

                const hanTokenPerLpToken = web3.utils.fromWei(String(hanTokenPerLpTokenApi), "ether");

                const uniV2RewardView = stakedStartTime * (hanRakis6StakedAmount * hanTokenPerLpToken);

                dispatch({
                    type: "UNIV2_STAKING_REWARD_VIEW",
                    payload: {
                        uniV2RewardView: uniV2RewardView,
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

export const uniV2RewardVIewAction = { uniV2RewardVIewAct };
