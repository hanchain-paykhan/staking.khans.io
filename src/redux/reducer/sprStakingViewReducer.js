let initialState = {
    amountStaked:"",
    getAmountStaked:"",
    // tokenOwner:"",
    rewardTokenPerstakingToken:"",
    totalSupply:"",
    myTokenId:"",
    myStakedTokenId:"",
    tokenUrl:"",
    tokenUnStakingUrl :"",
    getTotalTokenIds:[],
    getStakedTokenIds:[],
    getMyTokenIds:[],
    stakingTokenIdImg:[],
    successSprApprove : false,
    successSprAllApprove : false,
    successSprStaking : false,
    succuessSprClaim : false,
    successSprUnStaking : false,
    isApprovedForAll : false,

};


function sprStakingViewReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "GET_SPR_STAKING_VIEW_SUCCESS":
            return {
                ...state,
                getAmountStaked : payload.getAmountStaked,
                amountStaked : payload.amountStaked,
                // tokenOwner : payload.tokenOwner,
                rewardTokenPerstakingToken : payload.rewardTokenPerstakingToken,
                totalSupply : payload.totalSupply,
                getTotalTokenIds : payload.getTotalTokenIds,
                getStakedTokenIds : payload.getStakedTokenIds,
                getMyTokenIds : payload.getMyTokenIds,
                isApprovedForAll : payload.isApprovedForAll,
                tokenUrl : payload.tokenUrl,
                tokenUnStakingUrl : payload.tokenUnStakingUrl,
                stakingTokenIdImg : payload.stakingTokenIdImg,
            }
        // case "GET_SPR_STAKING_BACKEND_VIEW_SUCCESS":
        //     return {
        //         ...state,
        //         getMyTokenIds : getMyTokenIds,

        //     }
        case "SUCCESS_SPR_APPROVE":
            return { ...state, successSprApprove: payload.successSprApprove}
        
        case "SUCCESS_SPR_ALL_APPROVE":
            return { ...state, successSprAllApprove: payload.successSprAllApprove }
        
        case "SUCCESS_SPR_STAKING":
            return { ...state, successSprStaking: payload.successSprStaking };

        case "SUCCESS_SPR_CLAIM":
            return { ...state, succuessSprClaim: payload.succuessSprClaim };

        case "SUCCESS_SPR_UNSTAKING":
            return { ...state, successSprUnStaking: payload.successSprUnStaking };
        
        case "SELECT_STAKING_NFT" :
            return { ...state, myTokenId : payload}

        case "SELECT_UNSTAKING_NFT" :
            return { ...state, myStakedTokenId : payload}

        default:
            return { ...state};
    }
}

export default sprStakingViewReducer