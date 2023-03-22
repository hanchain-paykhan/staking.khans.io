// import { MunieStakingContract } from "../../../config/MunieConfig";
import { MunieStakingContract } from "../../../config/MunieConfigTest";
import Swal from "sweetalert2";

function munieStakingAct(tokenId, account) {
    return async (dispatch) => {
        const stake = await MunieStakingContract.methods.stake(tokenId).send({ from: account });
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
            type: "SUCCUESS_MUNIE_STAKING",
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

export const munieStakingAction = { munieStakingAct };
