import Swal from "sweetalert2";
import { HanBonusStakingContract } from "../../../config/StakingHanChain";
// import { StakingHanChainContract } from "../../../config/StakingHanchainTest";

function hanStakingUnStakeAct(account, hanWithdrawIndex) {
    return async () => {
        try {
            const withdraw = await HanBonusStakingContract.methods.withdraw(hanWithdrawIndex).send({ from: account });
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

export const hanStakingUnStakeAction = { hanStakingUnStakeAct };
