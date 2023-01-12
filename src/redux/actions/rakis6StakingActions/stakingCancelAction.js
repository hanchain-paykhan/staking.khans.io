import {
  StakingContract,
  StakingAddress,
  web3,
} from "../../../config/StakingRakis6Config";
// import {
//   StakingContract,
//   StakingAddress,
//   web3,
// } from "../../../config/StakingRakis6ConfigTest";
import Swal from "sweetalert2";

function stakingCancelAct(account, withdrawAmount) {
  return async (dispatch) => {
    try {
      const withdraw = await web3.eth.sendTransaction({
        from: account,
        to: StakingAddress,
        gasPrice: "3000000",
        data: StakingContract.methods.withdraw(withdrawAmount).encodeABI(),
      });
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
        type: "SUCCESS_UNSTAKING",
        payload: { successUnStaking: true },
      });
    } catch (err) {
      console.log(err);
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

export const stakingCancelAction = { stakingCancelAct };
