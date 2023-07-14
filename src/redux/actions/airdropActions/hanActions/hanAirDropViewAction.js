import axios from "axios";
import { HanAirdropContract } from "../../../../config/HanAirdropConfig";
// import { HanAirdropContract } from "../../../../config/HanAirdropConfigTest";

function hanAirDropViewAct(account) {
    return async (dispatch) => {
        try {
            if (account !== "") {
                const getHanProofAmountToBack = await axios.post(`https://back.khans.io/block/hanchainAirdrop`, { account });

                const getHanProofToBackApi = getHanProofAmountToBack.data.proof;

                const getHanAmountToBackApi = String(getHanProofAmountToBack.data.eth_amount);

                if (getHanProofToBackApi && getHanAmountToBackApi) {
                    const hanAirDropCanClaimApi = await HanAirdropContract.methods
                        .canClaim(getHanProofToBackApi, getHanAmountToBackApi)
                        .call({ from: account });

                    let [hanAirDropCanClaim, getHanProofToBack, getHanAmountToBack] = await Promise.all([
                        hanAirDropCanClaimApi,
                        getHanProofToBackApi,
                        getHanAmountToBackApi,
                    ]);
                    dispatch({
                        type: "HAN_AIRDROP_VIEW",
                        payload: {
                            hanAirDropCanClaim: hanAirDropCanClaim,
                            getHanProofToBack: getHanProofToBack,
                            getHanAmountToBack: getHanAmountToBack,
                        },
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const hanAirDropViewAction = { hanAirDropViewAct };
