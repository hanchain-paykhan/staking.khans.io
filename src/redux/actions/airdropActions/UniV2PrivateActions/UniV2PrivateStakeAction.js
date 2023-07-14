import { StakingPrivateUniV2Contract } from "../../../../config/new/StakingPrivateUniV2Config";
import Swal from "sweetalert2";

function UniV2PrivateStakeAct(account, rakis6Stakingnum, privateRakis6Password) {
    return async (dispatch) => {
        try {
            // 스테이킹 함수
            const stake = await StakingPrivateUniV2Contract.methods.stake(privateRakis6Password, rakis6Stakingnum).send({ from: account });
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

export const UniV2PrivateStakeAction = { UniV2PrivateStakeAct };
