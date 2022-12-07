// import {
//     SheepooriStakingAddress,
//     SheepooriStakingContract,
//     web3
// } from "../../config/SheepooriStakingConfig"
import {
    SheepooriStakingAddress,
    SheepooriStakingContract,
    web3
} from "../../config/SheepooriStakingConfigTest"
import Swal from "sweetalert2";


function sprStakingCancelAct(account, myStakedTokenId, gasPriceResult) {
    return async (dispatch) => {
        try {
            const unstake = await web3.eth.sendTransaction({
                    from: account,
                    to: SheepooriStakingAddress,
                    gasPrice: web3.utils.hexToNumber(gasPriceResult),
                    data: SheepooriStakingContract.methods.unstake(myStakedTokenId).encodeABI(),
                });
                Swal.fire({
                    title: 'Success',
                    text: 'UnStake was successful!',
                    icon: 'success',
                    
                    confirmButtonColor: '#3085d6', 
                    confirmButtonText: 'OK', 
 
                    
                }).then(result => {
                    if (result.isConfirmed) { 
                      window.location.reload()
                    }
                });
                  dispatch({
                    type: "SUCCESS_SPR_UNSTAKING",
                    payload: { successSprUnStaking: true },
                  });
        } catch(error) {
            console.error(error);
            Swal.fire({
                title: "Fail",
                text: "UnStaking was Fail!",
                icon: "error",
        
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    }
}

export const sprStakingCancelAction = {sprStakingCancelAct};