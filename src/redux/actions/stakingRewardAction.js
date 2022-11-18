import {
  RewardTokenContract,
  StakingContract,
  RewardTokenAddress,
  StakingAddress,
  web3,
} from "../../config";
import Swal from "sweetalert2";

function stakingRewardAct(account) {
  return async (dispatch) => {
    // 클레임
    try {
      const claimReward = await web3.eth.sendTransaction({
        from: account,
        to: StakingAddress,
        gasPrice: "3000000",
        data: StakingContract.methods.claimReward(account).encodeABI(),
      });
      Swal.fire({
        title: "Success",
        text: "Claim was successful!",
        icon: "success",
        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
        confirmButtonText: "OK", // confirm 버튼 텍스트 지정
        // showCancelButton: true,
        // cancelButtonText: '취소',
        // cancelButtonColor: '#d33',

        // reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      dispatch({
        type: "SUCCESS_CLAIM",
        payload: { successClaim: true },
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Fail",
        text: "Claim was Fail!",
        icon: "error",

        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    }
  };
}

export const stakingRewardAction = { stakingRewardAct };
