import { MusikhanAirdropContract } from "../../../../config/MusikhanConfig";
import { MusikhanContract } from "../../../../config/MusikhanConfig";
// import { MusikhanAirdropContract } from "../../../../config/MusikhanConfigTest";
// import { MusikhanContract } from "../../../../config/MusikhanConfigTest";
import Web3 from "web3";
export const web3 = new Web3(window.ethereum);

function musiAirDropTokenListAct(account) {
    return async (dispatch) => {
        try {
            // 213개 토큰중에서 밸런스 오브가 없는 토큰을 없애고 있는 토큰만 돌려서 리스트를 가져와서 찍음

            const getCanClaimTokenList = await MusikhanAirdropContract.methods.getCanClaimTokenList().call();

            const musiAirDropTokenListArray = [];
            for (let i = 0; i < getCanClaimTokenList.length; i++) {
                const getMusiL2TokenInfo = await MusikhanContract.methods.getL2TokenInfo(getCanClaimTokenList[i]).call();
                //잘못 입력한 주소는 여기다 OR 로 걸면됨 야메 ㅋㅋ
                if (getMusiL2TokenInfo.l2Ca == "0xd297d08cc095C616cfB90F2AC52D0A230D0A4DcE") continue;
                musiAirDropTokenListArray.push(getMusiL2TokenInfo);
            }

            const musiAirDropTokenList = musiAirDropTokenListArray;

            dispatch({
                type: "MUSI_AIRDROP_TOKENLIST",
                payload: {
                    musiAirDropTokenList: musiAirDropTokenList,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const musiAirDropTokenListAction = { musiAirDropTokenListAct };
