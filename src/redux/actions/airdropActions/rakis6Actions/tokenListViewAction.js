import axios from "axios";

function tokenListViewAct(account) {
    return async (dispatch) => {
        try {
            if (account) {
                // 내가 스테이킹한 순서별로 amount, timeStared 가 저장된 struct 배열 출력 함수
                const getPvtRakis6StakerArrayData = await axios.post(`https://back.khans.io/block/pvtRakis6StakerArray`, {
                    account,
                });
                const stakerDataArrayApi = getPvtRakis6StakerArrayData.data;
                let [stakerDataArray] = await Promise.all([stakerDataArrayApi]);

                dispatch({
                    type: "WITHDRAW_TOKEN_LIST",
                    payload: {
                        stakerDataArray: stakerDataArray,
                    },
                });
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const tokenListViewAction = { tokenListViewAct };
