import { MunieTokenContract, MunieStakingAddress } from "../../../../config/MunieConfig";
import Swal from "sweetalert2";

function oldMunieSingleApproveAct(stakingMunieTokenId, account) {
    return async (dispatch) => {
        try {
            if (account) {
                const munieApprove = await MunieTokenContract.methods.approve(MunieStakingAddress, stakingMunieTokenId).send({ from: account });
                if (munieApprove.status) {
                    Swal.fire({
                        title: "Success",
                        text: "Approve was successful!",
                        icon: "success",

                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK",
                    });
                    // .then((result) => {
                    //     if (result.isConfirmed) {
                    //         window.location.reload();
                    //     }
                    // });
                }
                dispatch({
                    type: "SUCCESS_OLD_MUNIE_APPROVE",
                    payload: { successOldMunieApprove: true },
                });
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Fail",
                text: "Approve was Fail!",
                icon: "error",

                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    };
}

export const oldMunieSingleApproveAction = { oldMunieSingleApproveAct };
