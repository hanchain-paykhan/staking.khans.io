import axios from "axios";

function oldMunieViewAct(account) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        const getOldMunieStakerDataNft = await axios.post(`https://back.khans.io/block/oldMunieStakerData`, {
          account,
        });

        const oldMunieStakedAmountApi = getOldMunieStakerDataNft.data[3];

        const oldMunieStakedTokenIdsApi = getOldMunieStakerDataNft.data[0];

        let [oldMunieStakedAmount, oldMunieStakedTokenIds] = await Promise.all([oldMunieStakedAmountApi, oldMunieStakedTokenIdsApi]);

        dispatch({
          type: "OLD_MUNIE_VIEW",
          payload: {
            oldMunieStakedAmount: oldMunieStakedAmount,
            oldMunieStakedTokenIds: oldMunieStakedTokenIds,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export const oldMunieViewAction = { oldMunieViewAct };
