import { MunieStakingContract } from "../../../config/MunieConfigTest";

function munieStakingResultViewAct(account) {
    return async (dispatch) => {
        try {
            if (account !== "") {
                // 내가 스테이킹한 정보 출력 함수 (스테이킹한 토큰 아이디 배열, 총 보상 받은 양, 클래임 받지 않은 보상 양, 스테이킹한 토큰 개수, 마지막 업데이트 시간)
                const getStakerDataApi = await MunieStakingContract.methods.getStakerData(account).call();
                console.log(getStakerDataApi);

                // 초 당 보상으로 줄 보상 금액
                const rewardTokenPerStakingTokenApi = await MunieStakingContract.methods.rewardTokenPerStakingToken().call();
                console.log(rewardTokenPerStakingTokenApi);
                let [getStakerData] = await Promise.all([getStakerDataApi]);
                dispatch({
                    type: "MUNIE_RESUT_VIEW",
                    payload: {
                        getStakerData: getStakerData,
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const munieStakingResultViewAction = { munieStakingResultViewAct };
