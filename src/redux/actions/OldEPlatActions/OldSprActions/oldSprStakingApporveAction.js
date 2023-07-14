import Swal from "sweetalert2";
import { SheepooriTokenContract, SheepooriStakingAddress } from "../../../../config/SheepooriStakingConfig";

function oldSprStakingApporveAct(account, stakingmyTokenId) {
  return async (dispatch) => {
    try {
      const sprApprove = await SheepooriTokenContract.methods.approve(SheepooriStakingAddress, stakingmyTokenId).send({ from: account });
      if (sprApprove.status) {
        Swal.fire({
          title: "Success",
          text: "Approve was successful!",
          icon: "success",

          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        // .then((result) => {
        //     if (result.isConfirmed) {
        //         window.location.reload();
        //     }
        // });
      }
      dispatch({
        type: "SUCCESS_OLD_SPR_APPROVE",
        payload: { successOldSprApprove: true },
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Fail",
        text: "Approve was Fail!",
        icon: "error",

        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    }
  };
}

export const oldSprStakingApporveAction = { oldSprStakingApporveAct };
