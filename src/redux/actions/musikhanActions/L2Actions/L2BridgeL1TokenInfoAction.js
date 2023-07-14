import { web3 } from "../../../../config/MusikhanConfig";
// import { MusikhanContract } from "../../../../config/MusikhanConfigTest";
import axios from "axios";

function L2BridgeL1TokenInfoAct(account) {
  return async (dispatch) => {
    try {
      if (account) {
        const getL1TokenInfoApiToBack = await axios.post(`https://back.khans.io/block/getL1TokenInfo`, {
          account,
        });
        const getL1TokenName = getL1TokenInfoApiToBack.data[0];
        const getL1TokenSymbol = getL1TokenInfoApiToBack.data[1];
        const getL1TokenAmount = getL1TokenInfoApiToBack.data[2];

        dispatch({
          type: "L2_BRIDGE_L1_TOKENINFO",
          payload: {
            mintL2TokenName: getL1TokenName,
            mintL2TokenSymbol: getL1TokenSymbol,
            getL1TokenAmount: web3.utils.fromWei(String(getL1TokenAmount), "ether"),
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

export const L2BridgeL1TokenInfoAction = { L2BridgeL1TokenInfoAct };
