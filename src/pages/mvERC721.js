/**
 * @author sjlee
 */
state = {
	contractAbi: {},
	bytecode: "",
	deployedContract: {},
	accounts: {},
	contractAddress: undefined,
	estimateGas: "",
};

// 계정 변경 시 컨트랙트 다시 설정
ethereum.on("accountsChanged", (accounts) => {
	$("#linked_account").text(accounts[0]);
	state.accounts = accounts;
	getContractBuildData(state.contractAddress);
});

async function initWeb3(contractAddress) {
	if(typeof web3 !== "undefined") {
		printLinkedStatus("메타마스크 로그인 필요");
		
		if(ethereum.isMetaMask == true) {
			printLinkedStatus("메타마스크 활성화");
			
			try {
				window.web3 = new Web3(window.ethereum);
				
				state.accounts = await ethereum.request({
					method: "eth_requestAccounts",
				});
				
				state.contractAddress = contractAddress;
				getContractBuildData(state.contractAddress);
				getNftIsMinted($("#u_contract_address").val());
			} catch(e) {
				alert(e);
			}
		} else {
			$("#linked_status").text("메타마스크 사용 불가능");
		}
		$("#linked_account").text(state.accounts);
	} else {
		$("#linked_status").text("web3 missing");
	}
	
	$("#mint_item_btn").on("click", mintItem);
}

// contract build 내용 가져오기
function getContractBuildData(contractAddress) {
	$.ajax({
		// 같은 컨트랙트라서 그대로 사용
		url: "/mvkhan/getJsonBuildDataAj",
		type: "post",
		async: false,
		dataType: "json",
		success: (result) => {
			state.bytecode = result.bytecode;
			
			// 컨트랙트 생성 분기
			contractAddress != undefined ? state.deployedContract = new web3.eth.Contract(result.abi, state.contractAddress) : state.deployedContract = new web3.eth.Contract(result.abi);
		},
		error: (err) => {
			alert(err);
		}
	});
}

async function getNftIsMinted(tokenId) {
	const owner = tokenId == "" ? undefined : await state.deployedContract.methods.ownerOf(tokenId).call();
	
	if(owner) {
		$("#mv_upload_image_ipfs").hide();
		$("#file_upload_image_toipfs_btn").hide();
		$("#upload_json_toipfs_btn").hide();
	} else {
		$("#mv_upload_image_ipfs").show();
		$("#file_upload_image_toipfs_btn").show();
		$("#upload_json_toipfs_btn").show();
	}
}

async function mintItem() {
	const account = $("#recipient_nft_eth_addr").text() == "" ? undefined : $("#recipient_nft_eth_addr").text();
	
	if(account) {
		const id = $("#u_song_idx").val();
		
		// NFT 발행에 필요한 validation check
		const flag = validateAllParameter();
		
		if(flag) {
			// 컨트랙트에 전송할 파라미터 설정
			const data = {
				account: $("#recipient_nft_eth_addr").text(),
				imageHash: $("#mv_image_hash").val(),
				jsonUrl: $("#mv_json_hash").val(),
			};
			
			state.deployedContract.methods.mintItem(data.account, data.imageHash, data.jsonUrl).estimateGas({from: state.accounts[0]})
				.then((gas) => {
					let parameter = {
						from: state.accounts[0],
						gas: gas,
					};
					// 결과 나오기 전에 화면 벗어나지 않게 주의주기
					alert("발행된 토큰의 컨트랙트 주소를 저장하기위해 작업이 완료될 때까지 화면이동, 새로고침 하지마세요.");
					
					// NFT 발행
					state.deployedContract.methods.mintItem(data.account, data.imageHash, data.jsonUrl)
						.send(parameter)
						.then((result) => {
							alert("NFT 발행 완료\n"
								+ "트랜잭션 해쉬값 : " + result.transactionHash + "\n"
								+ "토큰 아이디 : " + result.events.Transfer.returnValues.tokenId);
							
							const tokenId = result.events.Transfer.returnValues.tokenId;
							
							updateTokenId(id, tokenId);
						})
						.catch((err) => {
							console.log(err);
							alert(err);
						});
				})
				.catch((err) => {
					alert(err.message);
				});
		}
	} else {
		alert("받는계정을 선택 후 진행해주세요.");
	}
}

function validateAllParameter() {
	let flag;
	
	let dataObj = {
		recipient		: $("#recipient_nft_eth_addr").text(),
		description		: $("#description_for_json").val(),
		external_url	: $("#external_for_json").val(),
		image			: $("#image_hash_for_json").val(),
		name			: $("#name_for_json").val(),
		attributes		: $("#attributes_for_json").val(),
		token_number	: $(".token_number").val()
	};
	
	$.each(dataObj, (key, value) => {
		// 빈 값 확인
		if(value == "") {
			alert("메타데이터에 들어갈 값 중에 빈 값이 존재합니다. 확인해주세요.");
			flag = false;
			return false;
		} else
			flag = true;
		
		// 토큰 번호 입력란에 숫자 제외 입력내용 확인
		if("token_number" == key) {
			let pattern = /^#[0-9]+$/;
			
			if(!pattern.test(value)) {
				alert("토큰 번호 입력란은 '#'으로 시작하며, 숫자만 존재해야합니다. 확인해주세요.");
				flag = false;
				return false;
			}
		}
	});
	
	return flag;
}

function updateTokenId(id, tokenId) {
	let url = "/mv/updateTokenIdAj";
	
	$.ajax({
		url: url,
		type: "post",
		data: {
			id: id,
			tokenId: tokenId
		},
		success: (result) => {
			$("#u_contract_address").val(tokenId);
		},
		error: (err) => {
			console.log(err);
			alert(err);
		}
	});
}

function printLinkedStatus(_text) {
	$("#linked_status").text(_text);
}

function disableMintBtn(target) {
	target ? $("#mint_token_btn").attr("disabled", true) : $("#mint_token_btn").attr("disabled", false); 
}