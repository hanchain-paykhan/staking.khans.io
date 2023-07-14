import { MunieAirDropContract } from "../../../../config/MunieAirDropConfig";
import Swal from "sweetalert2";

function munieAirDropGetTokenAct(account, selectMunieTokenId) {
    return async () => {
        try {
            if (account) {
                // console.log(account, selectMunieTokenId);
                const getToken = await MunieAirDropContract.methods.getToken(selectMunieTokenId).send({ from: account });
                Swal.fire({
                    title: "Success",
                    text: "Claim was successful!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Fail",
                text: "Claim was Fail!",
                icon: "error",

                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    };
}

export const munieAirDropGetTokenAction = { munieAirDropGetTokenAct };
