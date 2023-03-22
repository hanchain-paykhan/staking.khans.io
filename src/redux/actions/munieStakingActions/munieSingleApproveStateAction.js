// import { MunieTokenContract } from "../../../config/MunieConfig";
import { MunieTokenContract } from "../../../config/MunieConfigTest";

function munieSingleApproveStateAct(account, stakingmyTokenId) {
    return async (dispatch) => {
        try {
            if (account !== "") {
                const getMunieSingleApprovedAPi = await MunieTokenContract.methods.getApproved(stakingmyTokenId).call();

                dispatch({
                    type: "GET_MUNIE_SINGLE_APPROVE_STATE_VIEW",
                    payload: {
                        getMunieSingleApproved: getMunieSingleApprovedAPi,
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const munieSingleApproveStateAction = { munieSingleApproveStateAct };
