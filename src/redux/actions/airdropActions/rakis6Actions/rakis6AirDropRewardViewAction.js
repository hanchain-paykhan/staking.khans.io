import axios from "axios";

function rakis6AirDropRewardViewAct(account) {
    return async (dispatch) => {
        try {
            if (account) {
                const getStakerDataApi = await axios.post(`https://back.khans.io/block/pvtRakis6StakerData`, {
                    account,
                });
                const rakis6UnClaimedRewardToEthApi = getStakerDataApi.data[0];
                const rakis6TotalRewardReceivedToEthApi = getStakerDataApi.data[1];
                const rakis6TotalRewardAmountApi = getStakerDataApi.data[2];

                let [rakis6UnClaimedRewardToEth, rakis6TotalRewardReceivedToEth, rakis6TotalRewardAmount] = await Promise.all([
                    rakis6UnClaimedRewardToEthApi,
                    rakis6TotalRewardReceivedToEthApi,
                    rakis6TotalRewardAmountApi,
                ]);
                dispatch({
                    type: "RAKIS6_REWARD_VIEW",
                    payload: {
                        rakis6UnClaimedRewardToEth: rakis6UnClaimedRewardToEth,
                        rakis6TotalRewardReceivedToEth: rakis6TotalRewardReceivedToEth,
                        rakis6TotalRewardAmount: rakis6TotalRewardAmount,
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

export const rakis6AirDropRewardViewAcion = { rakis6AirDropRewardViewAct };
