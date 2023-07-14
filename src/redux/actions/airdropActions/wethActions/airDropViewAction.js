import axios from "axios";
import { AirDropContract } from "../../../../config/AirDropConfig";
// import {
//   AirDropAddress,
//   AirDropContract,
//   web3,
// } from "../../../config/AirDropConfigTest";

function airDropViewAct(account) {
    return async (dispatch) => {
        try {
            if (account !== "") {
                const getProofAmountToBack = await axios.post(`https://back.khans.io/block/wethAirdrop`, { account });

                const getProofToBackApi = getProofAmountToBack.data.proof;

                const getAmountToBackApi = String(getProofAmountToBack.data.eth_amount);

                if (!getProofToBackApi || !getAmountToBackApi) {
                    return;
                }

                const canClaimApi = await AirDropContract.methods.canClaim(getProofToBackApi, getAmountToBackApi).call({ from: account });

                let [canClaim, getProofToBack, getAmountToBack] = await Promise.all([canClaimApi, getProofToBackApi, getAmountToBackApi]);

                dispatch({
                    type: "GET_AIRDROP_VIEW_SUCCESS",
                    payload: {
                        canClaim: canClaim,
                        getProofToBack: getProofToBack,
                        getAmountToBack: getAmountToBack,
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const airDropViewAction = { airDropViewAct };
