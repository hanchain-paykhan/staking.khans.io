import { MusikhanAirdropContract } from "../../../../config/MusikhanConfig";
// import { MusikhanAirdropContract } from "../../../../config/MusikhanConfigTest";
import axios from "axios";

function musiAirDropClaimedAct(account, musiKhanNewRoot, musiTokenl2Ca) {
    return async (dispatch) => {
        try {
            const getMusiProofAmountTokenToBack = await axios.post(`https://back.khans.io/block/musikhanAirdrop`, {
                // const getMusiProofAmountTokenToBack = await axios.post(`https://localhost:4000/block/musikhanAirdrop`, {
                account,
                musikhanTokenAddress: musiTokenl2Ca,
            });

            const getmusiProofToBack = getMusiProofAmountTokenToBack.data.proof;
            const getmusiAmountToBack = getMusiProofAmountTokenToBack.data.eth_amount;
            const getmusiTokenCaToBack = getMusiProofAmountTokenToBack.data.contract_address;

            // console.log(getmusiProofToBack);
            if (getmusiProofToBack && getmusiAmountToBack && getmusiTokenCaToBack) {
                const musiClaimedApi = await MusikhanAirdropContract.methods.claimed(getmusiProofToBack, getmusiAmountToBack, getmusiTokenCaToBack).call({ from: account });

                dispatch({
                    type: "MUSI_AIRDROP_CLAIMED_STATE",
                    payload: {
                        musiClaimed: musiClaimedApi,
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

export const musiAirDropClaimedAction = { musiAirDropClaimedAct };
