import { HanAirdropContract } from "../../../../config/HanAirdropConfig";
// import { HanAirdropContract } from "../../../../config/HanAirdropConfigTest";

function hanAirDropTimeStampAct() {
    return async (dispatch) => {
        try {
            // const hanAirDropRoot = await HanAirdropContract.methods.root().call();

            const hanTimeStampToContractApi = await HanAirdropContract.methods.remainingDuration().call();
            const hanReMainDurationtoContract = hanTimeStampToContractApi * 1000;
            const hanClaimDayDateApi = String(Math.floor(hanReMainDurationtoContract / (1000 * 60 * 60 * 24))).padStart(2, "0");

            const hanClaimHoursDateApi = String(Math.floor(hanReMainDurationtoContract / (1000 * 60 * 60)) % 24).padStart(2, "0");

            const hanClaimMinDateApi = String(Math.floor((hanReMainDurationtoContract / (1000 * 60)) % 60)).padStart(2, "0");
            let [hanClaimDayDate, hanClaimHoursDate, hanClaimMinDate] = await Promise.all([hanClaimDayDateApi, hanClaimHoursDateApi, hanClaimMinDateApi]);

            dispatch({
                type: "GET_HANAIRDROP_TIMESTAMP",
                payload: {
                    hanClaimDayDate: hanClaimDayDate,
                    hanClaimHoursDate: hanClaimHoursDate,
                    hanClaimMinDate: hanClaimMinDate,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const hanAirDropTimeStampAction = { hanAirDropTimeStampAct };
