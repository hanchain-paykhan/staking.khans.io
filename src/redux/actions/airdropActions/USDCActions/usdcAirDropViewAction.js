import axios from 'axios';
import { USDCAirDropContract } from '../../../../config/new/USDCAirDropConfig';

function usdcAirDropViewAct(account) {
    return async (dispatch) => {
        try {
            if (account !== '') {
                const getUsdcProofAmountToBack = await axios.post(`https://back.khans.io/block/usdcAirdrop`, {
                    account,
                });

                const getUsdcProofToBackApi = getUsdcProofAmountToBack.data.proof;
                // console.log(getUsdcProofToBackApi);

                const getUsdcAmountToBackApi = String(getUsdcProofAmountToBack.data.eth_amount);

                // console.log(getUsdcAmountToBackApi);

                if (!getUsdcProofToBackApi || !getUsdcAmountToBackApi) {
                    return;
                }

                const canUsdcClaimApi = await USDCAirDropContract.methods
                    .canClaim(getUsdcProofToBackApi, getUsdcAmountToBackApi)
                    .call({ from: account });

                // console.log(canUsdcClaimApi);

                // console.log();

                // console.log(getUsdcProofAmountToBack);

                dispatch({
                    type: 'GET_USDC_AIRDROP_VIEW_SUCCESS',
                    payload: {
                        getUsdcProofToBack: getUsdcProofToBackApi,
                        getUsdcAmountToBack: getUsdcAmountToBackApi,
                        canUsdcClaim: canUsdcClaimApi,
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const usdcAirDropViewAction = { usdcAirDropViewAct };
