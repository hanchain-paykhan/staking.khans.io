import axios from "axios";

function oldMunieSingleApproveStateAct(stakingMunieTokenId, account) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        const getOldMunieApproveState = await axios.post(`https://back.khans.io/block/oldMunieApproveState`, {
          stakingMunieTokenId,
        });

        const getOldMunieSingleApprovedApi = getOldMunieApproveState.data;

        // const getOldMunieSingleApprovedApi = await MunieTokenContract.methods.getApproved(stakingMunieTokenId).call();
        // 유효성 검사를 수행하여 잘못된 BigNumber 문자열 값인지 확인

        let [getOldMunieSingleApproved] = await Promise.all([getOldMunieSingleApprovedApi]);

        dispatch({
          type: "GET_OLD_MUNIE_SINGLE_APPROVE_STATE_VIEW",
          payload: {
            getOldMunieSingleApproved: getOldMunieSingleApproved,
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

export const oldMunieSingleApproveStateAction = { oldMunieSingleApproveStateAct };
