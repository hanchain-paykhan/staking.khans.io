import Swal from "sweetalert2";
import { SheepooriTokenContract, SheepooriStakingAddress } from "../../../../config/SheepooriStakingConfig";

function oldSprStakingAllApporveAct(account) {
    return async (dispatch) => {
        try {
            const setApprovalForAll = await SheepooriTokenContract.methods.setApprovalForAll(SheepooriStakingAddress).send({ from: account });
            dispatch({
                type: "SUCCESS_OLD_SPR_ALL_APPROVE",
                payload: { successOldSprAllApprove: true },
            });
            if (setApprovalForAll.status) {
                Swal.fire({
                    title: "Success",
                    text: "Approve was successful!",
                    icon: "success",

                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                });
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
            // window.
        }
    };
}

export const oldSprStakingAllApporveAction = { oldSprStakingAllApporveAct };
