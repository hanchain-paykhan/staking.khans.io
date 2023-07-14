import axios from "axios";

import { StakingPrivateUniV2Address } from "../../../../config/new/StakingPrivateUniV2Config";

function UniV2PrivateApproveStateAct(account) {
    return async (dispatch) => {
        try {
            const getPvtUniV2Allowance = await axios.post(`https://back.khans.io/block/pvtUniV2Allowance`, {
                account,
                StakingPrivateUniV2Address,
            });

            const privateUniV2AllowanceApi = getPvtUniV2Allowance.data;

            let [privateUniV2Allowance] = await Promise.all([privateUniV2AllowanceApi]);
            dispatch({
                type: "PRIVATE_UNIV2_APPROVE_STATE",
                payload: { privateUniV2Allowance: privateUniV2Allowance },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const UniV2PrivateApproveStateAction = { UniV2PrivateApproveStateAct };
