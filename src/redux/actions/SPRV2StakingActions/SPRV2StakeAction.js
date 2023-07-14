import Swal from "sweetalert2";
import { SPRV2StakingContract } from "../../../config/new/StakingSPRV2Config";

function SPRV2StakeAct(stakingMunieTokenId, account) {
    return async (dispatch) => {
        const stake = await SPRV2StakingContract.methods.stake(stakingMunieTokenId).send({ from: account });
        Swal.fire({
            title: "Success",
            text: "Staking was successful!",
            icon: "success",
            confirmButtonColor: "#3085d6",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        });
        dispatch({
            type: "SUCCUESS_SPR_STAKING",
            payload: { successMunieStaking: true },
        });
        try {
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Fail",
                text: "Staking was Fail!",
                icon: "error",

                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    };
}

export const SPRV2StakeAction = { SPRV2StakeAct };
