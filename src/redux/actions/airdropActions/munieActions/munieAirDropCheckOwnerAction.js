import { MunieAirDropContract } from "../../../../config/MunieAirDropConfig";

function munieAirDropCheckOwnerAct(munieTokenid, account) {
  return async (dispatch) => {
    try {
      if (account) {
        const checkTokenOwner = MunieAirDropContract.methods.tokenOwner(munieTokenid).call({ from: account });

        checkTokenOwner.then((result) => {
          //   console.log(result);
          const tokenOwnerResult = result.toLowerCase();

          // console.log(tokenOwnerResult);

          dispatch({
            type: "MUNIE_AIRDROP_CHECKOWNER",
            payload: { tokenOwnerResult: tokenOwnerResult },
          });
        });
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const munieAirDropCheckOwnerAction = { munieAirDropCheckOwnerAct };
