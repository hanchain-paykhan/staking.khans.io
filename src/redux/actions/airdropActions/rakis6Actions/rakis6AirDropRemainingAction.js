import axios from "axios";

function rakis6AirDropRemainingAct(account, index) {
    return async (dispatch) => {
        try {
            if (account) {
                const getRemainingDurationApi = await axios.post(`https://back.khans.io/block/pvtRemainingDuration`, {
                    account,
                    index,
                });
                const rakis6ClaimDayDateApi = getRemainingDurationApi.data[0];
                const rakis6ClaimHoursDateApi = getRemainingDurationApi.data[1];
                const rakis6ClaimMinDateApi = getRemainingDurationApi.data[2];

                let [rakis6ClaimDayDate, rakis6ClaimHoursDate, rakis6ClaimMinDate] = await Promise.all([rakis6ClaimDayDateApi, rakis6ClaimHoursDateApi, rakis6ClaimMinDateApi]);

                dispatch({
                    type: "RAKIS6_AIRDROP_TIMESTAMP",
                    payload: {
                        rakis6ClaimDayDate: rakis6ClaimDayDate,
                        rakis6ClaimHoursDate: rakis6ClaimHoursDate,
                        rakis6ClaimMinDate: rakis6ClaimMinDate,
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

export const rakis6AirDropRemainingAction = { rakis6AirDropRemainingAct };
