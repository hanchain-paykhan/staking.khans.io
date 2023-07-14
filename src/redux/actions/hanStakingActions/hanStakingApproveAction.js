import Swal from "sweetalert2";
import { HanChainContract, HanBonusStakingAddress } from "../../../config/StakingHanChain";
// import { MyTokenContract, StakingHanChainAddress } from "../../../config/StakingHanchainTest";

function hanStakingApproveAct(account, hanChainStakingNum) {
  return async (dispatch) => {
    try {
      const approve = await HanChainContract.methods.approve(HanBonusStakingAddress, hanChainStakingNum).send({ from: account });

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
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        dispatch({
          type: "HAN_CHAIN_APPROVE_SUCCESS",
          payload: {
            successHanChainApprove: true,
          },
        });
      }
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

export const hanStakingApproveAction = { hanStakingApproveAct };
