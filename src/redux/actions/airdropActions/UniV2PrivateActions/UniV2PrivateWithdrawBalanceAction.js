function UniV2PrivateWithdrawBalanceAct(privateStakeAmount, index) {
    return async (dispatch) => {
        try {
            const privateWithdrawAmountToModalApi = privateStakeAmount;
            const privateWithdrawIndex = index;

            dispatch({
                type: "PRIVATE_WITHDRAW_VIEW_SUCCESS",
                payload: {
                    privateWithdrawAmountToModal: privateWithdrawAmountToModalApi,
                    privateWithdrawIndex: privateWithdrawIndex,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const UniV2PrivateWithdrawBalanceAction = { UniV2PrivateWithdrawBalanceAct };
