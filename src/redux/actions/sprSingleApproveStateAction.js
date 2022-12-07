import {
    SheepooriTokenContract
} from "../../config/SheepooriStakingConfig"
// import {
//     SheepooriTokenContract,
// } from "../../config/SheepooriStakingConfigTest"


function sprSingleApproveStateAct(account, stakingmyTokenId) {
    return async (dispatch ) => {
        try {
            if (account !== "") {
                // SingleApprove 상태
                console.log(stakingmyTokenId)
                 const getSingleApprovedAPi = await SheepooriTokenContract.methods
                 .getApproved(8)
                 .call();
                
                console.log(getSingleApprovedAPi,"123322342344")
            
                
                let [
                    getSingleApproved,
                ] = await Promise.all([   
                    getSingleApprovedAPi,
                ]);
                            
                dispatch({
                    type: "GET_SPR_STAKING_SINGLE_RESULT_VIEW_SUCCESS",
                    payload : {
                        getSingleApproved : getSingleApproved,
                    },
                });
            }
        } catch(error) {
            console.error(error);
        }
    }
}

export const sprSingleApproveStateAction = {sprSingleApproveStateAct}