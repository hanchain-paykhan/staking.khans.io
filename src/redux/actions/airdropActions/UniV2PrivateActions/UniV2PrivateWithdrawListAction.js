import axios from "axios";

function UniV2PrivateWithdrawListAct(account) {
    return async (dispatch) => {
        try {
            if (account) {
                const getPvtUniV2DataArrayToBack = await axios.post(`https://back.khans.io/block/pvtUniV2StakerArray`, {
                    account,
                });

                const getUniPrivateStakerDataArrayApi = getPvtUniV2DataArrayToBack.data;

                let [getUniPrivateStakerDataArray] = await Promise.all([getUniPrivateStakerDataArrayApi]);

                dispatch({
                    type: "UNIV2_PRIVATE_WITHDRAW_TOKENLIST",
                    payload: { getUniPrivateStakerDataArray: getUniPrivateStakerDataArray },
                });
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const UniV2PrivateWithdrawListAction = { UniV2PrivateWithdrawListAct };
