import axios from "axios";

function UniV2PrivateRemainingDurationAct(account, index) {
    return async (dispatch) => {
        try {
            if (account) {
                const getPvtUniV2RemainingDuration = await axios.post(`https://back.khans.io/block/pvtUniV2RemainingDuration`, {
                    account,
                    index,
                });

                const prUniV2ClaimDayDateApi = getPvtUniV2RemainingDuration.data[0];
                const prUniV2ClaimHoursDateApi = getPvtUniV2RemainingDuration.data[1];
                const prUniV2ClaimMinDateApi = getPvtUniV2RemainingDuration.data[2];
                const prUniV2ClaimSecDateApi = getPvtUniV2RemainingDuration.data[3];

                let [prUniV2ClaimDayDate, prUniV2ClaimHoursDate, prUniV2ClaimMinDate, prUniV2ClaimSecDate] = await Promise.all([
                    prUniV2ClaimDayDateApi,
                    prUniV2ClaimHoursDateApi,
                    prUniV2ClaimMinDateApi,
                    prUniV2ClaimSecDateApi,
                ]);

                dispatch({
                    type: "PRIVATE_UNIV2_DURATION_TIMESTAMP",
                    payload: {
                        prUniV2ClaimDayDate: prUniV2ClaimDayDate,
                        prUniV2ClaimHoursDate: prUniV2ClaimHoursDate,
                        prUniV2ClaimMinDate: prUniV2ClaimMinDate,
                        prUniV2ClaimSecDate: prUniV2ClaimSecDate,
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

export const UniV2PrivateRemainingDurationAction = { UniV2PrivateRemainingDurationAct };
