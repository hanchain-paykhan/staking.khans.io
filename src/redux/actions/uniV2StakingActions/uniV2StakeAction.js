import Swal from "sweetalert2";
import { StakingUniV2Contract } from "../../../config/new/StakingUniV2Config";

function uniV2StakeAct(account, hanRakis6StakingNum) {
    return async (dispatch) => {
        try {
            const stake = await StakingUniV2Contract.methods.stake(hanRakis6StakingNum).send({ from: account });

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
                type: "SUCCESS_UNIV2_STAKING",
                payload: {},
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

export const uniV2StakeAction = { uniV2StakeAct };
