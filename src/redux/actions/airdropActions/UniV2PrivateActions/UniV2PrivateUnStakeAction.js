import Swal from "sweetalert2";
import { StakingPrivateUniV2Contract } from "../../../../config/new/StakingPrivateUniV2Config";

function UniV2PrivateUnStakeAct(account, privateWithdrawIndex) {
    return async () => {
        try {
            const withdraw = await StakingPrivateUniV2Contract.methods.withdraw(privateWithdrawIndex).send({ from: account });
            Swal.fire({
                title: "Success",
                text: "Expired amounts include rewards and are transferred!",
                icon: "success",

                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Fail",
                text: "UnStaking was Fail!",
                icon: "error",

                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    };
}

export const UniV2PrivateUnStakeAction = { UniV2PrivateUnStakeAct };
