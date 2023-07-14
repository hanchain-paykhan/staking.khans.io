import Swal from "sweetalert2";
import { HanBonusStakingContract } from "../../../config/StakingHanChain";
// import { StakingHanChainContract } from "../../../config/StakingHanchainTest";

function hanStakingStakeAct(account, hanChainStakingNum) {
    return async (dispatch) => {
        try {
            const stake = await HanBonusStakingContract.methods.stake(hanChainStakingNum).send({ from: account });

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
                type: "SUCCESS_HANCHAIN_STAKING",
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

export const hanStakingStakeAction = { hanStakingStakeAct };
