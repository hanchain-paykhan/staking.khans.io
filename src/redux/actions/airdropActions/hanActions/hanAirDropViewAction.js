import axios from "axios";
import { HanAirdropContract } from "../../../../config/HanAirdropConfig";
// import { HanAirdropContract } from "../../../../config/HanAirdropConfigTest";

function hanAirDropViewAct(account) {
    return async (dispatch) => {
        try {
            if (account !== "") {
                const hanAirDropRoot = await HanAirdropContract.methods.root().call();

                let backData = {};
                backData.account = account;
                backData.c_root = hanAirDropRoot;

                const getHanProofAmountToBack = await axios({
                    method: "POST", // [요청 타입]
                    url: `https://admin.khans.io/hanairdropdegree/changeAddress`, // [요청 주소]
                    data: JSON.stringify(backData), // [요청 데이터]
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    timeout: 3000,
                });

                const hanAirDropCanClaimApi = await HanAirdropContract.methods
                    .canClaim(getHanProofAmountToBack.data.proof, String(getHanProofAmountToBack.data.eth_amount))
                    .call({ from: account });

                const getHanProofToBackApi = getHanProofAmountToBack.data.proof;

                const getHanAmountToBackApi = getHanProofAmountToBack.data.eth_amount;

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
        } catch (error) {
            console.error(error);
        }
    };
}

export const hanAirDropViewAction = { hanAirDropViewAct };
