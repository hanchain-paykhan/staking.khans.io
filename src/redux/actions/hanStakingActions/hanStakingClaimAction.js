import Swal from "sweetalert2";
import { HanBonusStakingContract } from "../../../config/StakingHanChain";
// import { StakingHanChainContract } from "../../../config/StakingHanchainTest";

function hanStakingClaimAct(account) {
    return async () => {
        try {
            const claimReward = await HanBonusStakingContract.methods.claimReward().send({ from: account });
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

export const hanStakingClaimAction = { hanStakingClaimAct };
