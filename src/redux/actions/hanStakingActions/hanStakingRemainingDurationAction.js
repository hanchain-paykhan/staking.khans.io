import axios from "axios";

export function hanStakingRemainingDurationAct(account, index) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`https://back.khans.io/block/hanBonusRemainingDuration`, {
        account,
        index,
      });

      const [hanClaimDayDate, hanClaimHoursDate, hanClaimMinDate, hanClaimSecDate] = response.data;

      dispatch({
        type: "HANCHAIN_DURATION_TIMESTAMP",
        payload: {
          hanClaimDayDate,
          hanClaimHoursDate,
          hanClaimMinDate,
          hanClaimSecDate,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const hanStakingRemainingDurationAction = { hanStakingRemainingDurationAct };
