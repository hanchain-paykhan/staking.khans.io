import axios from "axios";

function rakis6TotalRewardViewAct(account) {
    return async (dispatch) => {
        try {
            if (account) {
                const getTotalRewardView = await axios.post(`https://back.khans.io/block/pvtRakis6ToTalRewardView`, {
                    account,
                });
                const totalRewardViewApi = getTotalRewardView.data;

                let [totalRewardView] = await Promise.all([totalRewardViewApi]);

                dispatch({
                    type: "RAKIS6_AIRDROP_TOTAL_REWARD_VIEW",
                    payload: {
                        totalRewardView: totalRewardView,
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

export const rakis6TotalRewardViewAction = { rakis6TotalRewardViewAct };
