import { MunieAirDropContract } from "../../../../config/MunieAirDropConfig";

function munieAirDropViewAct(account, munieTokenName, munieTokenid) {
    return async (dispatch) => {
        try {
            if (account) {
                const selectMunieTokenName = munieTokenName;
                const selectMunieTokenId = munieTokenid;

                dispatch({
                    type: "MUNIE_AIRDROP_VIEW",
                    payload: { selectMunieTokenName: selectMunieTokenName, selectMunieTokenId: selectMunieTokenId },
                });
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    };
}

export const munieAirDropViewAction = { munieAirDropViewAct };
