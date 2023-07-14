import { MunieStakingContract } from "../../../../config/MunieConfig";

import Swal from "sweetalert2";

function oldMunieStakeAct(stakingMunieTokenId, account) {
    return async (dispatch) => {
        const stake = await MunieStakingContract.methods.stake(stakingMunieTokenId).send({ from: account });
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
            type: "SUCCUESS_OLD_MUNIE_STAKING",
            payload: { successOldMunieStaking: true },
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

export const oldMunieStakeAction = { oldMunieStakeAct };
