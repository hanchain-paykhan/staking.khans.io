import Swal from "sweetalert2";
import { StakingPrivateUniV2Contract } from "../../../../config/new/StakingPrivateUniV2Config";

function UniV2PrivateClaimAct(account) {
    return async (dispatch) => {
        try {
            const claimReward = await StakingPrivateUniV2Contract.methods.claimReward().send({ from: account });
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
        } catch (error) {
            console.error(error);
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

export const UniV2PrivateClaimAction = { UniV2PrivateClaimAct };
