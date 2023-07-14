import axios from "axios";

async function fetchData(url) {
  const response = await axios.get(url);
  return response.data;
}

export function opHanTokenomicAct() {
  return async (dispatch) => {
    try {
      const apiUrls = [
        "https://back.khans.io/block/opTokenomicHanBonus",
        "https://back.khans.io/block/opTokenomicMusikhan",
        "https://back.khans.io/block/opTokenomicPvtRakis6",
        "https://back.khans.io/block/opTokenomicRakis6",
        "https://back.khans.io/block/opHanBonusOneyear",
        "https://back.khans.io/block/opMusikhanOneyear",
        "https://back.khans.io/block/opPvtRakis6Oneyear",
        "https://back.khans.io/block/opRakis6Oneyear",
      ];

      const fetchDataPromises = apiUrls.map((url) => fetchData(url));
      const [opHanBonus, opMusikhan, opPvtRakis6, opRakis6, hanBonusOneYear, musikhanOneYear, pvtRakis6OneYear, rakis6OneYear] =
        await Promise.all(fetchDataPromises);

      dispatch({
        type: "GET_OP_HAN_TOKENOMIC",
        payload: {
          opHanBonus,
          opMusikhan,
          opPvtRakis6,
          opRakis6,
          hanBonusOneYear,
          musikhanOneYear,
          pvtRakis6OneYear,
          rakis6OneYear,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}
