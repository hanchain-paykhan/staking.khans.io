import {
  StakingTokenContract,
  StakingContract,
  StakingAddress,
  StakingTokenAddress,
  web3,
} from "../../config";
import Swal from "sweetalert2";

function stakingApproveAct(account, stakingAmount) {
  return async (dispatch) => {
    try {
      const approve = await web3.eth.sendTransaction({
        from: account,
        to: StakingTokenAddress,
        gasPrice: "3000000",
        data: StakingTokenContract.methods
          .approve(StakingAddress, stakingAmount)
          .encodeABI(),
      });
      dispatch({ type: "SUCCESS_APPORVE", payload: { successApprove: true } });
      if (approve.status) {
        Swal.fire({
          title: "Success",
          text: "Approve was successful!",
          icon: "success",

          confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
          confirmButtonText: "OK", // confirm 버튼 텍스트 지정
          // showCancelButton: true,
          // cancelButtonText: '취소',
          // cancelButtonColor: '#d33',

          // reverseButtons: true,
        });
      }
    } catch (err) {
      console.log(err);
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

export const stakingApproveAction = { stakingApproveAct };
