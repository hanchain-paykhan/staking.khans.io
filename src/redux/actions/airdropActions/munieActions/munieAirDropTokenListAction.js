import axios from "axios";
import { MunieAirDropAddress } from "../../../../config/MunieAirDropConfig";
import { MunieTokenAddress } from "../../../../config/MunieAirDropConfig";

function munieAirDropTokenListAct() {
    return async (dispatch) => {
        try {
            const getAirDropMunieTokenImgToBack = await axios.get(
                `https://alchemyapi.khans.io/alchemy/getNFTs?owner=${MunieAirDropAddress}&contractAddress=${MunieTokenAddress}`
            );

            // console.log(getAirDropMunieTokenImgToBack);

            const getMunieAirDropTokenImgApi = getAirDropMunieTokenImgToBack.data.data;

            // console.log(typeof getMunieAirDropTokenImgApi);

            dispatch({
                type: "GET_MUNIE_AIRDROP_TOKENLIST",
                payload: { getMunieAirDropTokenImg: getMunieAirDropTokenImgApi },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const munieAirDropTokenListAction = { munieAirDropTokenListAct };
