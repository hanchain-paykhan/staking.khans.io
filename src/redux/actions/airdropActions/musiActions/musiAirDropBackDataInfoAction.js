import axios from 'axios';
import { MusikhanAirdropContract } from '../../../../config/MusikhanConfig';
// import { MusikhanAirdropContract } from "../../../../config/MusikhanConfigTest";

function musiAirDropBackDataInfoAct(account, musiKhanNewRoot, musiTokenl2Ca) {
    return async (dispatch) => {
        try {
            // const getMusiProofAmountToBack = await axios.post(`https://localhost:4000/block/musikhanAirdrop`, {
            const getMusiProofAmountToBack = await axios.post(`https://back.khans.io/block/musikhanAirdrop`, {
                account,
                musikhanTokenAddress: musiTokenl2Ca,
            });

            const getmusiProofToBackAPi = getMusiProofAmountToBack.data.proof;
            const getmusiAmountToBackApi = getMusiProofAmountToBack.data.eth_amount;
            const getmusiTokenCaToBackApi = getMusiProofAmountToBack.data.contract_address;

            if (getmusiProofToBackAPi && getmusiTokenCaToBackApi && getmusiAmountToBackApi) {
                const musiCanClaimApi = await MusikhanAirdropContract.methods
                    .canClaim(getmusiProofToBackAPi, getmusiAmountToBackApi, getmusiTokenCaToBackApi)
                    .call({ from: account });

                let [getmusiProofToBack, getmusiTokenCaToBack, getmusiAmountToBack] = await Promise.all([
                    getmusiProofToBackAPi,
                    getmusiTokenCaToBackApi,
                    getmusiAmountToBackApi,
                ]);

                dispatch({
                    type: 'AIRDROP_MUSI_BACK_DATA_SUCCESS',
                    payload: {
                        getmusiProofToBack: getmusiProofToBack,
                        getmusiTokenCaToBack: getmusiTokenCaToBack,
                        getmusiAmountToBack: getmusiAmountToBack,
                        musiCanClaim: musiCanClaimApi,
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

export const musiAirDropBackDataInfoAction = { musiAirDropBackDataInfoAct };
