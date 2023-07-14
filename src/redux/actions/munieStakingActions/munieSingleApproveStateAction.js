import axios from "axios";

function munieSingleApproveStateAct(stakingMunieTokenId, account) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        const getMunieV2ApproveState = await axios.post(`https://back.khans.io/block/munieV2ApproveState`, {
          stakingMunieTokenId,
        });

        console.log("getMunieV2ApproveState", getMunieV2ApproveState.data);

        dispatch({
          type: "GET_MUNIE_SINGLE_APPROVE_STATE_VIEW",
          payload: {
            getMunieSingleApproved: getMunieV2ApproveState.data,
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

export const munieSingleApproveStateAction = { munieSingleApproveStateAct };
