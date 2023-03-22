import axios from "axios";
import { HanAirdropContract } from "../../../../config/HanAirdropConfig";
// import { HanAirdropContract } from "../../../../config/HanAirdropConfigTest";

function hanAirDropClaimedAct(account) {
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

                await setTimeout(0);

                const hanClaimedApi = await HanAirdropContract.methods
                    .claimed(getHanProofAmountToBack.data.proof, String(getHanProofAmountToBack.data.eth_amount))
                    .call({ from: account });

                dispatch({
                    type: "GET_HANAIRDROP_CLAIMED",
                    payload: {
                        hanClaimed: hanClaimedApi,
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const hanAirDropClaimedAction = { hanAirDropClaimedAct };
