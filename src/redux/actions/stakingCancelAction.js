import {
  StakingContract,
  StakingAddress,
  web3,
} from "../../config";
import Swal from "sweetalert2";


function stakingCancelAct(account, withdrawAmount) {
  return async (dispatch) => {
    try{
        const withdraw = await web3.eth.sendTransaction({
          from: account,
          to: StakingAddress,
          gasPrice: "3000000",
          data: StakingContract.methods.withdraw(withdrawAmount).encodeABI(),
        });
        Swal.fire({
          title: 'Success',
          text: 'UnStake was successful!',
          icon: 'success',
          
          confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
          confirmButtonText: 'OK', // confirm 버튼 텍스트 지정
          // cancelButtonText: '취소', 
          // showCancelButton: true, 
          // cancelButtonColor: '#d33',
          
          // reverseButtons: true, 
          
      }).then(result => {
          // 만약 Promise리턴을 받으면,
          if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
            window.location.reload()
            //  Swal.fire('승인이 완료되었습니다.', '화끈하시네요~!', 'success');
          }
      });
        // if(!alert("withdraw success")) window.location.reload()
        dispatch({
          type: "SUCCESS_UNSTAKING",
          payload: { successUnStaking: true },
        });
    }catch(err) {
      console.log(err)
      Swal.fire({
        title: 'Fail',
        text: 'UnStaking was Fail!',
        icon: 'error',
        
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      })
    }
  };
}

export const stakingCancelAction = { stakingCancelAct };
