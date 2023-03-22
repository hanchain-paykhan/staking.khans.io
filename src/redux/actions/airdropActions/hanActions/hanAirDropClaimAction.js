import { HanAirdropContract } from "../../../../config/HanAirdropConfig";
// import { HanAirdropContract } from "../../../../config/HanAirdropConfigTest";
import Swal from "sweetalert2";

function hanAirDropClaimAct(getHanProofToBack, getHanAmountToBack, account) {
    return async (dispatch) => {
        try {
            const claim = await HanAirdropContract.methods.claim(getHanProofToBack, String(getHanAmountToBack)).send({ from: account });
            Swal.fire({
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
                type: "SUCCESS_HANAIRDROP_CLAIM",
                payload: { successHanAirDropClaim: true },
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

export const hanAirDropClaimAction = { hanAirDropClaimAct };
