import axios from "axios";

function munieDepositListAct(account) {
  return async (dispatch) => {
    try {
      if (account) {
        // 주소별 가지고 있는 민팅된 tokenID
        const getMyMunieTokenIdsApi = await axios.post(`https://back.khans.io/block/munieV2DepositList`, {
          account,
        });

        let [getMyMunieTokenIds] = await Promise.all([getMyMunieTokenIdsApi.data]);

        dispatch({
          type: "MUNIE_DEPOSIT_LIST",
          payload: {
            getMyMunieTokenIds: getMyMunieTokenIds,
          },
        });
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const munieDepositListAction = { munieDepositListAct };
