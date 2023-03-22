import { MunieStakingContract } from "../../../config/MunieConfigTest";

function munieStakingViewAct(account) {
    return async (dispatch) => {
        try {
            if (account !== "") {
                // 초 당 보상으로 줄 보상 금액
                const rewardTokenMuniePerStakingTokenApi = await MunieStakingContract.methods.rewardTokenPerStakingToken().call();
                let [rewardTokenMuniePerStakingToken] = await Promise.all([rewardTokenMuniePerStakingTokenApi]);
                dispatch({
                    type: "MUNIE_STAKING_VIEW",
                    payload: {
                        rewardTokenMuniePerStakingToken: rewardTokenMuniePerStakingToken,
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const munieStakingViewAction = { munieStakingViewAct };
