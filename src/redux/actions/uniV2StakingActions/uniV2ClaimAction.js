import Swal from "sweetalert2";
import { StakingUniV2Contract } from "../../../config/new/StakingUniV2Config";

function uniV2ClaimAct(account) {
    return async (dispatch) => {
        try {
            const claimReward = await StakingUniV2Contract.methods.claimReward().send({ from: account });

            Swal.fire({
                title: "Success",
                text: "Claim was successful!",
                icon: "success",
                confirmButtonColor: "#3085d6",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
            dispatch({
                type: "SUCCESS_RAKIS6_STAKING",
                payload: {},
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

export const uniV2ClaimAction = { uniV2ClaimAct };
