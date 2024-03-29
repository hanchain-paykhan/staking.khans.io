import { MunieStakingContract } from "../../../../config/MunieConfig";

import Swal from "sweetalert2";

function oldMunieStakingRewardAct(account) {
    return async (dispatch) => {
        try {
            const claimReward = await MunieStakingContract.methods.claimReward().send({ from: account });
            Swal.fire({
                title: "Success",
                text: "Claim was successful!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
            dispatch({
                type: "SUCCESS_OLDMUNIE_CLAIM",
                payload: { successMunieClaim: true },
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Fail",
                text: "Claim was Fail!",
                icon: "error",

                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    };
}

export const oldMunieStakingRewardAction = { oldMunieStakingRewardAct };
