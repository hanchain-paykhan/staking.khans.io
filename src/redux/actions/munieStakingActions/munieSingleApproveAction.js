import Swal from "sweetalert2";
import { MunieTokenContract, MunieV2StakingAddress } from "../../../config/new/StakingMunieV2Config";

function munieSingleApproveAct(stakingMunieTokenId, account) {
    return async (dispatch) => {
        try {
            if (account) {
                // console.log(stakingMunieTokenId);
                const munieApprove = await MunieTokenContract.methods.approve(MunieV2StakingAddress, stakingMunieTokenId).send({ from: account });
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
                    type: "SUCCESS_MUNIE_APPROVE",
                    payload: { successMunieApprove: true },
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

export const munieSingleApproveAction = { munieSingleApproveAct };
