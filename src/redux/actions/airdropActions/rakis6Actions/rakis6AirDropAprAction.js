// import axios from "axios";

function rakis6AirDropAprAct() {
    return async (dispatch) => {
        try {
            // const getHanQuantityLpQuantityPerYear1HanValue = await axios.get(`https://back.khans.io/block/pvtRakis6AprView`);
            // const HanQuantityLpQuantityPerYear1HanValueApi = getHanQuantityLpQuantityPerYear1HanValue.data;
            const HanQuantityLpQuantityPerYear1HanValueApi = 1;

            let [HanQuantityLpQuantityPerYear1HanValue] = await Promise.all([HanQuantityLpQuantityPerYear1HanValueApi]);

            dispatch({
                type: "RAKIS6_AIRDROP_APR",
                payload: {
                    HanQuantityLpQuantityPerYear1HanValue: HanQuantityLpQuantityPerYear1HanValue,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const rakis6AirDropAprAction = { rakis6AirDropAprAct };
