import axios from "axios";
import { HanAirdropContract } from "../../../../config/HanAirdropConfig";
// import { HanAirdropContract } from "../../../../config/HanAirdropConfigTest";

function hanAirDropClaimedAct(account) {
    return async (dispatch) => {
        try {
            if (account !== "") {
                const getHanProofAmountToBack = await axios.post(`https://back.khans.io/block/hanchainAirdrop`, {
                    account,
                });

                // const getProofAmountToBack = await axios({
                //     method: "POST", // [요청 타입]
                //     url: `https://admin.khans.io/block/hanchainAirdrop`, // [요청 주소]
                //     data: JSON.stringify(backData), // [요청 데이터]
                //     headers: {
                //         "Content-Type": "application/json; charset=utf-8",
                //     },
                //     timeout: 3000,
                // });

                // console.log(getHanProofAmountToBack);

                // await setTimeout(0);

                if (getHanProofAmountToBack.data.proof) {
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
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const hanAirDropClaimedAction = { hanAirDropClaimedAct };
