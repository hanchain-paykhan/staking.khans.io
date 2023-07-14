import axios from 'axios';
import { USDCAirDropContract } from '../../../../config/new/USDCAirDropConfig';

function usdcAirDropClaimedAct(account) {
    return async (dispatch) => {
        try {
            if (account !== '') {
                const getUsdcProofAmountToBack = await axios.post(`https://back.khans.io/block/usdcAirdrop`, {
                    account,
                });

                if (!getUsdcProofAmountToBack.data.proof) {
                    return;
                }

                const getUsdcProofToBackApi = getUsdcProofAmountToBack.data.proof;
                // console.log(getUsdcProofToBackApi);

                const getUsdcAmountToBackApi = String(getUsdcProofAmountToBack.data.eth_amount);

                // console.log(getUsdcAmountToBackApi);

                const usdcClaimedApi = await USDCAirDropContract.methods
                    .claimed(getUsdcProofToBackApi, getUsdcAmountToBackApi)
                    .call({ from: account });

                dispatch({
                    type: 'GET_USDC_AIRDROP_CLAIMED_SUCCESS',
                    payload: {
                        usdcClaimed: usdcClaimedApi,
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

export const usdcAirDropClaimedAction = { usdcAirDropClaimedAct };
