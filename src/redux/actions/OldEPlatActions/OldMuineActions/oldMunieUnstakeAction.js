import { MunieStakingContract } from "../../../../config/MunieConfig";

import Swal from "sweetalert2";

function oldMunieUnstakeAct(myStakedMunieTokenId, account) {
    return async (dispatch) => {
        try {
            const unStake = await MunieStakingContract.methods.unStake(myStakedMunieTokenId).send({ from: account });
            Swal.fire({
                title: "Success",
                text: "UnStake was successful!",
                icon: "success",

                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
            dispatch({
                type: "SUCCESS_MUNIE_UNSTAKE",
                payload: { successMunieUnstake: true },
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Fail",
                text: "UnStake was Fail!",
                icon: "error",

                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    };
}

export const oldMunieUnstakeAction = { oldMunieUnstakeAct };
