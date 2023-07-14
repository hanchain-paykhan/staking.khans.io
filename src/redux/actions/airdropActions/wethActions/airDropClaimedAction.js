import axios from "axios";
import { AirDropContract } from "../../../../config/AirDropConfig";
// import {
//   AirDropAddress,
//   AirDropContract,
//   web3,
// } from "../../../config/AirDropConfigTest";

function airDropClaimedAct(account) {
    return async (dispatch) => {
        try {
            if (account !== "") {
                const getProofAmountToBack = await axios.post(`https://back.khans.io/block/wethAirdrop`, { account });

                if (!getProofAmountToBack.data.proof) {
                    return;
                }

                const claimedApi = await AirDropContract.methods.claimed(getProofAmountToBack.data.proof, String(getProofAmountToBack.data.eth_amount)).call({ from: account });

                let [claimed] = await Promise.all([claimedApi]);

                dispatch({
                    type: "GET_AIRDROP_CLAIMED_SUCCESS",
                    payload: {
                        claimed: claimed,
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const airDropClaimedAction = { airDropClaimedAct };
