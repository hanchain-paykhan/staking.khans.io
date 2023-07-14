import Swal from "sweetalert2";
import { StakingUniV2Contract } from "../../../config/new/StakingUniV2Config";

function uniV2UnStakeAct(account, hanRakis6UnStakeNum) {
    return async (dispatch) => {
        try {
            const withdraw = await StakingUniV2Contract.methods.withdraw(hanRakis6UnStakeNum).send({ from: account });

            Swal.fire({
                title: "Success",
                text: "UnStake was successful!",
                icon: "success",
                confirmButtonColor: "#3085d6",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
            dispatch({
                type: "SUCCESS_UNIV2_UNSTAKE",
                payload: {},
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

export const uniV2UnStakeAction = { uniV2UnStakeAct };
