import { SheepooriTokenContract } from "../../../config/new/StakingSPRV2Config";

function SPRV2SingleApporveStateAct(stakingMunieTokenId, account) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        const getSPRV2SingleApprovedApi = await SheepooriTokenContract.methods.getApproved(stakingMunieTokenId).call();
        let [getSPRV2SingleApproved] = await Promise.all([getSPRV2SingleApprovedApi]);

        // 유효성 검사를 수행하여 잘못된 BigNumber 문자열 값인지 확인
        dispatch({
          type: "GET_SPRV2_SINGLE_APPROVE_STATE_VIEW",
          payload: {
            getSPRV2SingleApproved: getSPRV2SingleApproved,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: "ERROR_OCCURRED",
        payload: {
          error: error.message,
        },
      });
    }
  };
}

export const SPRV2SingleApporveStateAction = { SPRV2SingleApporveStateAct };
