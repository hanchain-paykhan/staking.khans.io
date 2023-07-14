import { SPRV2StakingContract, SheepooriTokenAddress, web3 } from "../../../config/new/StakingSPRV2Config";
import axios from "axios";
function SPRV2DepositListAct(account) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        // 주소별 가지고 있는 민팅된 tokenID
        const getMySPRV2TokenToBack = await axios.get(
          `https://alchemyapi.khans.io/alchemy/getNFTs?owner=${account}&contractAddress=${SheepooriTokenAddress}`
        );
        let getMySPRV2TokenIdsApi = getMySPRV2TokenToBack.data.data;

        if (getMySPRV2TokenIdsApi !== null && getMySPRV2TokenIdsApi.length !== undefined) {
          // 가지고 있는 민팅 ID로 Token정보 뽑기
          for (let i = 0; i < getMySPRV2TokenIdsApi.length; i++) {
            let mySPRV2MetaDataTokenid = getMySPRV2TokenIdsApi[i];
            let mTokenId = web3.utils.hexToNumber(mySPRV2MetaDataTokenid.nft.tokenId);
            getMySPRV2TokenIdsApi[i].tokenId = mTokenId;
          }
        } else {
          getMySPRV2TokenIdsApi = [];
        }

        const getSPRV2StakerData = await SPRV2StakingContract.methods.getStakerData(account).call();

        const depositSPRV2StakedAmountApi = getSPRV2StakerData.countStaked;

        let [getMySPRV2TokenIds, depositSPRV2StakedAmount] = await Promise.all([getMySPRV2TokenIdsApi, depositSPRV2StakedAmountApi]);

        dispatch({
          type: "SPRV2_DEPOSIT_LIST",
          payload: {
            getMySPRV2TokenIds: getMySPRV2TokenIds,
            depositSPRV2StakedAmount: depositSPRV2StakedAmount,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const SPRV2DepositListAction = { SPRV2DepositListAct };
