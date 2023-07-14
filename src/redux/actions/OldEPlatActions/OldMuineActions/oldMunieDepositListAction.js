import axios from "axios";

function oldMunieDepositListAct(account) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        // 주소별 가지고 있는 민팅된 tokenID
        const getOldMunieStakedNft = await axios.post(`https://back.khans.io/block/oldMunieDepositList`, {
          account,
        });

        const getMyOldMunieTokenIdsApi = getOldMunieStakedNft.data;

        let [getMyOldMunieTokenIds] = await Promise.all([getMyOldMunieTokenIdsApi]);

        dispatch({
          type: "OLD_MUNIE_DEPOSIT_LIST",
          payload: {
            getMyOldMunieTokenIds: getMyOldMunieTokenIds,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const oldMunieDepositListAction = { oldMunieDepositListAct };
