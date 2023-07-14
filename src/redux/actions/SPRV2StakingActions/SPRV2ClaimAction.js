import Swal from "sweetalert2";
import { SPRV2StakingContract } from "../../../config/new/StakingSPRV2Config";

function SPRV2ClaimAct(account) {
    return async (dispatch) => {
        try {
            const sprV2ClaimReward = await SPRV2StakingContract.methods.claimReward().send({ from: account });
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
                type: "SUCCESS_SPRV2_CLAIM",
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

export const SPRV2ClaimAction = { SPRV2ClaimAct };
