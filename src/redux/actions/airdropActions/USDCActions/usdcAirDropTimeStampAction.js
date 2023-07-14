import { USDCAirDropContract } from '../../../../config/new/USDCAirDropConfig';

function usdcAirDropTimeStampAct(account) {
    return async (dispatch) => {
        try {
            if (account) {
                const usdcTimeStampToContractApi = await USDCAirDropContract.methods.remainingDuration().call();

                const reMainDurationtoContract = usdcTimeStampToContractApi * 1000;

                const claimUsdcDayDateApi = String(
                    Math.floor(reMainDurationtoContract / (1000 * 60 * 60 * 24))
                ).padStart(2, '0');

                const claimUsdcHoursDateApi = String(
                    Math.floor(reMainDurationtoContract / (1000 * 60 * 60)) % 24
                ).padStart(2, '0');

                const claimUsdcMinDateApi = String(Math.floor((reMainDurationtoContract / (1000 * 60)) % 60)).padStart(
                    2,
                    '0'
                );

                let [claimUsdcDayDate, claimUsdcHoursDate, claimUsdcMinDate] = await Promise.all([
                    claimUsdcDayDateApi,
                    claimUsdcHoursDateApi,
                    claimUsdcMinDateApi,
                ]);

                dispatch({
                    type: 'GET_USDC_AIRDROP_SUCCESS_TIMESTAMP',
                    payload: {
                        claimUsdcDayDate: claimUsdcDayDate,
                        claimUsdcHoursDate: claimUsdcHoursDate,
                        claimUsdcMinDate: claimUsdcMinDate,
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

export const usdcAirDropTimeStampAction = { usdcAirDropTimeStampAct };
