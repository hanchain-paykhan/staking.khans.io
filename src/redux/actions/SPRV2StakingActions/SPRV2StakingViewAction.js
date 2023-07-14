import { SPRV2StakingContract } from "../../../config/new/StakingSPRV2Config";

function SPRV2StakingViewAct(account) {
    return async (dispatch) => {
        try {
            if (account !== "") {
                // 주소 별 스테이킹한 토큰 아이디 반환 getstakedTokenId 주소별 토큰 아이디 반환
                const getSPRV2StakerData = await SPRV2StakingContract.methods.getStakerData(account).call();
                // console.log("주소별 스테이킹한 토큰 아이디 ", getMunieStakerData);

                // console.log(getMunieStakerData.countStaked);

                const SPRV2AmountStakedApi = getSPRV2StakerData.countStaked;

                const SPRV2StakedTokenIdsApi = getSPRV2StakerData.tokenIds;
                // console.log("munieStakedTokenId", munieStakedTokenIdsApi);

                let [SPRV2AmountStaked, SPRV2StakedTokenIds] = await Promise.all([SPRV2AmountStakedApi, SPRV2StakedTokenIdsApi]);
                dispatch({
                    type: "SPRV2_STAKING_VIEW",
                    payload: {
                        SPRV2AmountStaked: SPRV2AmountStaked,
                        SPRV2StakedTokenIds: SPRV2StakedTokenIds,
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const SPRV2StakingViewAction = { SPRV2StakingViewAct };
