import axios from "axios";

function UniV2PrivateAPRViewAct(account) {
    return async (dispatch) => {
        try {
            if (account) {
                const getPvtUniV2APRView = await axios.get(`https://back.khans.io/block/pvtUniV2AprView`);
                const stakingPrUniV2APRApi = getPvtUniV2APRView.data;

                let [stakingPrUniV2APR] = await Promise.all([stakingPrUniV2APRApi]);

                dispatch({
                    type: "PRIVATE_UNIV2_APR",
                    payload: {
                        stakingPrUniV2APR: stakingPrUniV2APR,
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

export const UniV2PrivateAPRViewAction = { UniV2PrivateAPRViewAct };
