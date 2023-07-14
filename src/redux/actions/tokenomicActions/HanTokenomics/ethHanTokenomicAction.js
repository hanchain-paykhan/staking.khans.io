import axios from "axios";

async function fetchData(url) {
  const response = await axios.get(url);
  return response.data;
}

export function ethHanTokenomicAct() {
  return async (dispatch) => {
    try {
      const apiUrls = [
        "https://back.khans.io/block/ethColdWalletEplatForm",
        "https://back.khans.io/block/ethColdWalletPartner",
        "https://back.khans.io/block/ethColdWalletFounder",
        "https://back.khans.io/block/ethColdWalletTeamAndAdvisor",
        "https://back.khans.io/block/ethColdWalletReward",
        "https://back.khans.io/block/ethTokenomicMunie",
        "https://back.khans.io/block/ethTokenomicSpr",
        "https://back.khans.io/block/ethMunieOneYear",
        "https://back.khans.io/block/ethSprOneYear",
      ];

      const fetchDataPromises = apiUrls.map((url) => fetchData(url));
      const [ethEplatform, ethPartner, ethFounder, ethTeamAdvisor, ethReward, ethMunie, ethSpr, ethMunieOneYear, ethSprOneYear] =
        await Promise.all(fetchDataPromises);

      dispatch({
        type: "GET_ETH_HAN_TOKENOMIC",
        payload: {
          ethEplatform,
          ethPartner,
          ethFounder,
          ethTeamAdvisor,
          ethReward,
          ethMunie,
          ethSpr,
          ethMunieOneYear,
          ethSprOneYear,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}
