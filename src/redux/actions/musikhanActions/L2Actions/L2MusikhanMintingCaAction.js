import axios from "axios";

function L2MusikhanMintingCaAct() {
    return async (dispatch) => {
        try {
            const l2TokenAllListToBack = await axios.get(`https://back.khans.io/block/l2TokenList`);

            const l2AllTokenListApi = l2TokenAllListToBack.data;

            let [l2AllTokenList] = await Promise.all([l2AllTokenListApi]);
            dispatch({
                type: "GET_MY_MINTING_TOKENCA",
                payload: {
                    l2AllTokenList: l2AllTokenList,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const L2MusikhanMintingCaAction = { L2MusikhanMintingCaAct };
