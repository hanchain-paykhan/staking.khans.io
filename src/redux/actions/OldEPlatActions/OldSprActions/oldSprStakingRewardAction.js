import Swal from "sweetalert2";
import { SheepooriStakingContract } from "../../../../config/SheepooriStakingConfig";

function oldSprStakingRewardAct(account, gasPriceResult) {
    return async (dispatch) => {
        // 클레임
        try {
            const sheepooriClaimReward = await SheepooriStakingContract.methods.claimReward().send({ from: account });
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
                type: "SUCCESS_OLD_SPR_CLAIM",
                payload: { successOldSprClaim: true },
            });
        } catch (err) {
            console.log(err);
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

export const oldSprStakingRewardAction = { oldSprStakingRewardAct };
