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


function sprStakingAct(account, stakingmyTokenId, gasPriceResult) {

    return async (dispatch) => {
        try {
            const stake = await web3.eth.sendTransaction({
                from: account,
                to: SheepooriStakingAddress,
                gasPrice: web3.utils.hexToNumber(gasPriceResult),
                data: SheepooriStakingContract.methods.stake(stakingmyTokenId).encodeABI(),
              });
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
                    type: "SUCCUESS_SPR_STAKING",
                    payload : { successSprStaking: true},
                })
        } catch(error) {
            console.error(error);
            Swal.fire({
                title: "Fail",
                text: "Staking was Fail!",
                icon: "error",
        
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    }
}

export const sprStakingAction = {sprStakingAct};