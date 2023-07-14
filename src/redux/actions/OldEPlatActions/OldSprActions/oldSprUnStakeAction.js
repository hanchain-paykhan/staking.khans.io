import { SheepooriStakingContract } from "../../../../config/SheepooriStakingConfig";
import Swal from "sweetalert2";

function oldSprUnStakeAct(account, myStakedTokenId) {
  return async (dispatch) => {
    try {
      const unStake = await SheepooriStakingContract.methods.unstake(myStakedTokenId).send({ from: account });
      Swal.fire({
        title: "Success",
        text: "UnStake was successful!",
        icon: "success",

        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      dispatch({
        type: "SUCCESS_OLD_SPR_UNSTAKING",
        payload: { successOldSprUnStaking: true },
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

export const oldSprUnStakeAction = { oldSprUnStakeAct };
