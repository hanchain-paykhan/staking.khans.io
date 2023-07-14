import { USDCAirDropContract } from '../../../../config/new/USDCAirDropConfig';
import Swal from 'sweetalert2';

function usdcAirDropClaimAct(account, getUsdcProofToBack, getUsdcAmountToBack) {
    return async (dispatch) => {
        try {
            const usdcAirdropclaim = await USDCAirDropContract.methods
                .claim(getUsdcProofToBack, getUsdcAmountToBack)
                .send({ from: account });

            Swal.fire({
                text: 'Claim was successful!',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
            dispatch({
                type: 'SUCCESS_USDC_AIRDROP_CLAIM',
                payload: { successUsdcAirDropClaim: true },
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Fail',
                text: 'Claim was Fail!',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });
        }
    };
}

export const usdcAirDropClaimAction = { usdcAirDropClaimAct };
