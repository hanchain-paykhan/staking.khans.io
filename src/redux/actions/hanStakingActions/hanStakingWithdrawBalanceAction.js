function hanStakingWithdrawBalanceAct(hanStakeAmount, index) {
    return async (dispatch) => {
        try {
            const hanWithdrawAmountToModalApi = hanStakeAmount;
            const hanWithdrawIndex = index;

            dispatch({
                type: "HAN_WITHDRAW_VIEW_SUCCESS",
                payload: {
                    hanWithdrawAmountToModal: hanWithdrawAmountToModalApi,
                    hanWithdrawIndex: hanWithdrawIndex,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const hanStakingWithdrawBalanceAction = { hanStakingWithdrawBalanceAct };
