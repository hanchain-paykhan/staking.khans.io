import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SPRV2StakingAddress } from "../../config/new/StakingSPRV2Config";
import Carousel from "react-multi-carousel";
import Loading from "./Loading";
import "./SprDepositSection.scss";
import { networksAction } from "../../redux/actions/networksAction";
import { SPRV2StakeAction } from "../../redux/actions/SPRV2StakingActions/SPRV2StakeAction";
import { SPRV2SingleApproveAction } from "../../redux/actions/SPRV2StakingActions/SPRV2SingleApproveAction";
import { SPRV2SingleApporveStateAction } from "../../redux/actions/SPRV2StakingActions/SPRV2SingleApporveStateAction";
import { SPRV2StakingViewAction } from "../../redux/actions/SPRV2StakingActions/SPRV2StakingViewAction";
import { SlArrowRightIcon, SlArrowLeftIcon } from "../Icons/reactIcons";
import { SPRV2DepositListAction } from "../../redux/actions/SPRV2StakingActions/SPRV2DepositListAction";

const SprDepositSection = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");

  const [stakingmyTokenId, setMyTokenId] = useState(1);
  const { account } = useSelector((state) => state.account);

  const { getMySPRV2TokenIds, getSPRV2SingleApproved, SPRV2AmountStaked, successSPRV2Approve } = useSelector(
    (state) => state.SPRV2StakingView
  );

  // add to Reward Token
  const addRewardToken = async () => {
    const tokenAddress = "0x5052fa4a2a147eaAa4c0242e9Cc54a10A4f42070";
    const tokenSymbol = "HANeP";
    const tokenDecimals = 18;
    // const tokenImage = "https://raw.githubusercontent.com/hanchain-paykhan/hanchain/3058eecc5d26f980db884f1318da6c4de18a7aea/logo/logo.svg";

    try {
      const wasAdded = await window.ethereum?.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            // image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeEthereumNetWork = () => {
    dispatch(networksAction.changeEthereumNetWorkAct());
  };

  const sprStaking = () => {
    dispatch(SPRV2StakeAction.SPRV2StakeAct(Number(stakingmyTokenId), account));
  };

  const sprSingleApprove = () => {
    dispatch(SPRV2SingleApproveAction.SPRV2SingleApproveAct(Number(stakingmyTokenId), account));
  };

  const handleClickButton = (myTokenId) => {
    dispatch({ type: "SELECT_SPRV2_STAKING_NFT", payload: myTokenId });
  };

  const stakingCheckOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName("test3");
    // console.log(checkboxes)
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      } else {
        setMyTokenId(checkThis.value);
      }
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      // partialVisibilityGutter: 96,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className="carousel-button-group">
        <div className="sliderRightBtn">
          <SlArrowRightIcon id="sliderRightBtn" onClick={() => next()} />
        </div>
        <div className="sliderLeftBtn">
          <SlArrowLeftIcon id="sliderLeftBtn" className={currentSlide === 0 ? "disable" : ""} onClick={() => previous()} />
        </div>
        {/* <ButtonThree onClick={() => goToSlide(currentSlide + 1)}> Go to any slide </ButtonThree> */}
      </div>
    );
  };

  useEffect(() => {
    dispatch(SPRV2StakingViewAction.SPRV2StakingViewAct(account));
    dispatch(SPRV2DepositListAction.SPRV2DepositListAct(account));
  }, [account]);

  useEffect(() => {
    dispatch(SPRV2SingleApporveStateAction.SPRV2SingleApporveStateAct(Number(stakingmyTokenId), account));
  }, [account, Number(stakingmyTokenId)]);

  useEffect(() => {
    if (window.ethereum?.chainId === "0x1") {
      setCheckChainId("0x1");
    }
    if (window.ethereum?.chainId === "0xa") {
      setCheckChainId("Oxa");
    }
  }, [window.ethereum?.chainId]);

  return (
    <div>
      <div className="stakedSprCanAmountSection">
        <p>STAKED : {SPRV2AmountStaked} </p>
      </div>
      {getMySPRV2TokenIds !== null ? (
        getMySPRV2TokenIds?.length === 0 ? (
          <div className="sprStakingDepositContainer">
            <div className="sprStakingCantChoiceImgContainer">
              <div className="sprStakingCantChoiceImgSection">
                <a className="cantStakingSprBtn" disabled={true}>
                  INSUFFICIENT BALANCE
                </a>
              </div>
            </div>
            {/* <div className="sprStakingSelectBtnSection">
                  <button onClick={sprMint}>Test Minting</button>
                  <button onClick={test}>Test Token</button>
                </div> */}
          </div>
        ) : (
          <div className="sprStakingDepositContainer">
            <div className="sprStakingBeforeChoiceImgContainer">
              {getMySPRV2TokenIds !== "" ? (
                <Carousel
                  responsive={responsive}
                  arrows={false}
                  className="mainUnSlider"
                  partialVisible
                  customButtonGroup={<ButtonGroup />}
                  renderButtonGroupOutside
                >
                  {getMySPRV2TokenIds?.map((item, index) => {
                    return (
                      <div className="sprStakingSlider" key={index}>
                        <div className="sprStakingImgContainer">
                          <div
                            className="sprStakingImgCard"
                            style={{
                              // backgroundImage: `url(https://gateway.pinata.cloud/ipfs/QmcTcBbZtNRbwnDSjGjwfYXt8SiWahPtMFSL77dgfzHPUX)`,
                              backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${item.nft.image})`,
                            }}
                          >
                            <input
                              className="imgCheckBox"
                              name="test3"
                              type="radio"
                              key={index}
                              value={item.tokenId}
                              onClick={() => handleClickButton}
                              onChange={(e) => stakingCheckOnlyOne(e.target)}
                            ></input>
                          </div>
                          <div className="sprStakingImgTokenId">
                            <p>Sheepoori # {item.tokenId}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              ) : null}
              {/* <div className='sprStakingSelectBtnSection'>
                                  <button onClick={sprMint}>
                                    Test Minting
                                  </button>
                                  <button onClick={test}>
                                    Test Token
                                  </button>
                    </div> */}
            </div>
            <div className="depositSprStakeBtnSection">
              {getSPRV2SingleApproved === SPRV2StakingAddress ? (
                <button className="spr-learn-more" onClick={sprStaking}>
                  STAKE
                </button>
              ) : successSPRV2Approve === false ? (
                <button className="spr-learn-more" onClick={sprSingleApprove}>
                  APPROVE
                </button>
              ) : (
                <button className="spr-learn-more" onClick={sprStaking}>
                  STAKE
                </button>
              )}
            </div>
          </div>
        )
      ) : (
        <div className="sprStakingDepositContainer">
          <div className="sprStakingCantChoiceImgContainer">
            <Loading />
          </div>
        </div>
      )}
      <div className="logoContainer">
        <img
          src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
          onClick={changeEthereumNetWork}
          className="opIcon"
          alt="EthereumIcon"
        />
        <div className="HanEpTxtContinaer">
          <span className="HanEpTxt" onClick={addRewardToken}>
            HANeP
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SprDepositSection);
