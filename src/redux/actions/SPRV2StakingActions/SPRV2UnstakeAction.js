import Swal from "sweetalert2";
import { SPRV2StakingContract } from "../../../config/new/StakingSPRV2Config";

function SPRV2UnstakeAct(myStakedMunieTokenId, account) {
    return async (dispatch) => {
        try {
            const unStake = await SPRV2StakingContract.methods.unStake(myStakedMunieTokenId).send({ from: account });
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
                type: "SUCCESS_SPRV2_UNSTAKE",
                payload: { successSPRV2Unstake: true },
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

export const SPRV2UnstakeAction = { SPRV2UnstakeAct };
