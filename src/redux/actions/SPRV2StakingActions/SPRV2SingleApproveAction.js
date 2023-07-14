import Swal from "sweetalert2";
import { SheepooriTokenContract, SPRV2StakingAddress } from "../../../config/new/StakingSPRV2Config";

function SPRV2SingleApproveAct(stakingMunieTokenId, account) {
    return async (dispatch) => {
        try {
            if (account) {
                const sprV2Approve = await SheepooriTokenContract.methods.approve(SPRV2StakingAddress, stakingMunieTokenId).send({ from: account });
                if (sprV2Approve.status) {
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
                    type: "SUCCESS_SPRV2_APPROVE",
                    payload: { successSPRV2Approve: true },
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

export const SPRV2SingleApproveAction = { SPRV2SingleApproveAct };
