import { MusikhanAirdropContract } from "../../../../config/MusikhanConfig";
// import { MusikhanAirdropContract } from "../../../../config/MusikhanConfigTest";

function musiAirDropTimeStampAct(musiTokenl2Ca) {
    return async (dispatch) => {
        try {
            const musiTimeStampToContractAPi = await MusikhanAirdropContract.methods.getAirdropTokenData(musiTokenl2Ca).call();

            const tokenAirDropStartTime = musiTimeStampToContractAPi.startTime;
            const newTimeStampToUnixTime = Math.floor(new Date().getTime() / 1000);

            const timeStampSubStartTime = newTimeStampToUnixTime - tokenAirDropStartTime;

            const claimDurationToContract = musiTimeStampToContractAPi.claimDuration;

            const remainDuration = (claimDurationToContract - timeStampSubStartTime) * 1000;

            const musiClaimDayDateApi = Number(String(Math.floor(remainDuration / (1000 * 60 * 60 * 24))).padStart(2, "0"));

            const musiClaimHoursDateApi = Number(String(Math.floor(remainDuration / (1000 * 60 * 60)) % 24).padStart(2, "0"));

            const musiClaimMinDateApi = Number(String(Math.floor((remainDuration / (1000 * 60)) % 60)).padStart(2, "0"));
            const musiKhanNewRootApi = musiTimeStampToContractAPi.root;
            let [musiClaimDayDate, musiClaimHoursDate, musiClaimMinDate, musiKhanNewRoot] = await Promise.all([
                musiClaimDayDateApi,
                musiClaimHoursDateApi,
                musiClaimMinDateApi,
                musiKhanNewRootApi,
            ]);

            dispatch({
                type: "GET_MUSI_AIRDROP_TIMESAMP",
                payload: {
                    musiClaimDayDate: musiClaimDayDate,
                    musiClaimHoursDate: musiClaimHoursDate,
                    musiClaimMinDate: musiClaimMinDate,
                    musiKhanNewRoot: musiKhanNewRoot,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const musiAirDropTimeStampAction = { musiAirDropTimeStampAct };
