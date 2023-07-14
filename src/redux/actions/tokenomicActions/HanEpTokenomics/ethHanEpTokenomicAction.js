import axios from "axios";

async function fetchData(url) {
  const response = await axios.get(url);
  return response.data;
}

export function ethHanEpTokenomicAct() {
  return async (dispatch) => {
    try {
      const apiUrls = [
        "https://back.khans.io/block/hanEpColdWalletEplatform",
        "https://back.khans.io/block/hanEpColdWalletPartner",
        "https://back.khans.io/block/hanEpColdWalletFounder",
        "https://back.khans.io/block/hanEpColdWalletTeamAdvisor",
        "https://back.khans.io/block/hanEpColdWalletReward",
        "https://back.khans.io/block/hanEpColdWalletPvtUniV2",
        "https://back.khans.io/block/hanEpColdWalletUniV2",
        "https://back.khans.io/block/hanEpColdWalletMunieV2",
        "https://back.khans.io/block/hanEpColdWalletSprV2",
        "https://back.khans.io/block/hanEpPvtUniV2OneYear",
        "https://back.khans.io/block/hanEpUniV2OneYear",
        "https://back.khans.io/block/hanEpMuniV2OneYear",
        "https://back.khans.io/block/hanEpSprV2OneYear",
      ];

      const fetchDataPromises = apiUrls.map((url) => fetchData(url));
      const [
        ethHanEpEplatform,
        ethHanEpPartner,
        ethHanEpFounder,
        ethHanEpTeamAdvisor,
        ethHanEpReward,
        ethHanEpPvtUniV2,
        ethHanEpUniV2,
        ethHanEpMunieV2,
        ethHanEpSPRV2,
        ethHanEpPvtUniV2OneYear,
        ethHanEpUniV2OneYear,
        ethHanEpMunieV2OneYear,
        ethHanEpSPRV2OneYear,
      ] = await Promise.all(fetchDataPromises);

      dispatch({
        type: "GET_ETH_HANEP_TOKENOMIC",
        payload: {
          ethHanEpEplatform,
          ethHanEpPartner,
          ethHanEpFounder,
          ethHanEpTeamAdvisor,
          ethHanEpReward,
          ethHanEpPvtUniV2,
          ethHanEpUniV2,
          ethHanEpMunieV2,
          ethHanEpSPRV2,
          ethHanEpPvtUniV2OneYear,
          ethHanEpUniV2OneYear,
          ethHanEpMunieV2OneYear,
          ethHanEpSPRV2OneYear,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}
