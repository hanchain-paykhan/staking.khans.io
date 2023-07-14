import { SPRV2StakingContract, web3 } from "../../../config/new/StakingSPRV2Config";

function SPRV2ResultViewAct(account) {
    return async (dispatch) => {
        try {
            if (account !== "") {
                // 내가 스테이킹한 정보 출력 함수 (스테이킹한 토큰 아이디 배열, 총 보상 받은 양, 클래임 받지 않은 보상 양, 스테이킹한 토큰 개수, 마지막 업데이트 시간)
                const getStakerDataApi = await SPRV2StakingContract.methods.getStakerData(account).call();

                const getSPRV2AmountStakedApi = getStakerDataApi.countStaked;

                const getSPRV2TotalRewardApi = web3.utils.fromWei(String(getStakerDataApi.totalReward), "ether");

                const getSPRV2UnClaimedRewardsApi = web3.utils.fromWei(String(getStakerDataApi.unclaimedRewards), "ether");

                const getSPRV2TimeOfLastUpdateApi = getStakerDataApi.timeOfLastUpdate;

                // 초 당 보상으로 줄 보상 금액
                const rewardTokenPerStakingTokenApi = await SPRV2StakingContract.methods.rewardTokenPerStakingToken().call();

                // 현재시간
                const SPRV2CurrentTimeApi = Math.floor(new Date().getTime() / 1000);

                const SPRV2StakedTime = SPRV2CurrentTimeApi - getSPRV2TimeOfLastUpdateApi;

                const SPRV2ResultValueApi = web3.utils.fromWei(String(SPRV2StakedTime * (getSPRV2AmountStakedApi * rewardTokenPerStakingTokenApi)), "ether");

                let [SPRV2ResultValue, getSPRV2UnClaimedRewards, getSPRV2TotalReward] = await Promise.all([SPRV2ResultValueApi, getSPRV2UnClaimedRewardsApi, getSPRV2TotalRewardApi]);
                dispatch({
                    type: "SPRV2_RESULT_VIEW",
                    payload: {
                        SPRV2ResultValue: SPRV2ResultValue,
                        getSPRV2UnClaimedRewards: getSPRV2UnClaimedRewards,
                        getSPRV2TotalReward: getSPRV2TotalReward,
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const SPRV2ResultViewAction = { SPRV2ResultViewAct };
