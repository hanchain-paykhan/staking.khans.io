import axios from "axios";

function oldMunieWithdrawListAct(account) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        // 스테이킹한 총 토큰 아이디 배열 출력 함수
        const getOldMunieStakedNft = await axios.post(`https://back.khans.io/block/oldMunieStakedNft`, {
          account,
        });

        const stakedOldMunieTokenIdApi = getOldMunieStakedNft.data;

        let [stakedOldMunieTokenId] = await Promise.all([stakedOldMunieTokenIdApi]);

        dispatch({
          type: "OLD_MUNIE_WITHDRAW_LIST",
          payload: {
            stakedOldMunieTokenId: stakedOldMunieTokenId,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const oldMunieWithdrawListAction = { oldMunieWithdrawListAct };
