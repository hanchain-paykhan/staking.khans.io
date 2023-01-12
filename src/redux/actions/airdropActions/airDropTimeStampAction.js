import {
  AirDropAddress,
  AirDropContract,
  web3,
} from "../../../config/AirDropConfig";
// import {
//   AirDropAddress,
//   AirDropContract,
//   web3,
// } from "../../../config/AirDropConfigTest";

function airDropTimeStampAct() {
  return async (dispatch) => {
    try {
      const timeStampToContractApi = await AirDropContract.methods
        .remainingDuration()
        .call();

      const claimDate = new Date(timeStampToContractApi * 1000);

      const claimDayDateApi = claimDate.getDay();
      const claimHoursDateApi = claimDate.getHours();
      const claimMinDateApi = claimDate.getMinutes();

      let [claimDayDate, claimHoursDate, claimMinDate] = await Promise.all([
        claimDayDateApi,
        claimHoursDateApi,
        claimMinDateApi,
      ]);

      dispatch({
        type: "GET_AIRDROP_SUCCESS_TIMESTAMP",
        payload: {
          claimDayDate: String(claimDayDate).padStart(2, "0"),
          claimHoursDate: String(claimHoursDate).padStart(2, "0"),
          claimMinDate: String(claimMinDate).padStart(2, "0"),
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const airDropTimeStampAction = { airDropTimeStampAct };
