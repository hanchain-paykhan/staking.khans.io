import axios from "axios";

function oldSprStakingSingleApproveStateAct(account, stakingmyTokenId) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        // SingleApprove 상태
        const getOldSprApporveState = await axios.post(`https://back.khans.io/block/oldSprApporveState`, {
          stakingmyTokenId,
        });
        const getSingleApprovedAPi = getOldSprApporveState.data;

        let [getSingleApproved] = await Promise.all([getSingleApprovedAPi]);

        dispatch({
          type: "GET_OLD_SPR_STAKING_SINGLE_RESULT_VIEW_SUCCESS",
          payload: {
            getOldSprSingleApproved: getSingleApproved,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const oldSprStakingSingleApproveStateAction = { oldSprStakingSingleApproveStateAct };
