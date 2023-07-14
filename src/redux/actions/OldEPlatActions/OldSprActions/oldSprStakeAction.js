import { SheepooriStakingContract } from "../../../../config/SheepooriStakingConfig";
import Swal from "sweetalert2";

function oldSprStakeAct(account, stakingmyTokenId) {
    return async (dispatch) => {
        try {
            const stake = await SheepooriStakingContract.methods.stake(stakingmyTokenId).send({ from: account });
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
                payload: { successSprStaking: true },
            });
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

export const oldSprStakeAction = { oldSprStakeAct };
