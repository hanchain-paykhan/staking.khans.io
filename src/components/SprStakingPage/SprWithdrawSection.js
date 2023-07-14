import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import { networksAction } from "../../redux/actions/networksAction";
import "./SprWithdrawSection.scss";
import { SPRV2UnstakeAction } from "../../redux/actions/SPRV2StakingActions/SPRV2UnstakeAction";
import { SPRV2StakingViewAction } from "../../redux/actions/SPRV2StakingActions/SPRV2StakingViewAction";
import { SPRV2WithdrawListAction } from "../../redux/actions/SPRV2StakingActions/SPRV2WithdrawListAction";
import { SlArrowLeftIcon, SlArrowRightIcon } from "../Icons/reactIcons";

const SprWithdrawSection = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
  const [mySPRV2StakedTokenId, setMySPRV2StakedTokenId] = useState("");

  const { account } = useSelector((state) => state.account);

  const { withdrawSPRV2StakedAmount, stakedSPRV2TokenId, SPRV2StakedTokenIds } = useSelector((state) => state.SPRV2StakingView);

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

  const sprUnStaking = () => {
    dispatch(SPRV2UnstakeAction.SPRV2UnstakeAct(Number(mySPRV2StakedTokenId), account));
  };

  const selectUnStakingCheckButton = (myStakedTokenId) => {
    // console.log(myStakedTokenId, "체크");
    dispatch({ type: "SELECT_SPRV2_UNSTAKING_NFT", payload: myStakedTokenId });
  };

  const checkOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName("test2");
    // console.log(checkboxes)
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      } else {
        setMySPRV2StakedTokenId(checkThis.value);
        // console.log(checkThis.value);
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
    if (window.ethereum?.chainId === "0x1") {
      setCheckChainId("0x1");
    }
    if (window.ethereum?.chainId === "0xa") {
      setCheckChainId("Oxa");
    }
  }, [window.ethereum?.chainId]);

  useEffect(() => {
    if (account) {
      dispatch(SPRV2StakingViewAction.SPRV2StakingViewAct(account));
      dispatch(SPRV2WithdrawListAction.SPRV2WithdrawListAct(account));
    }
  }, [stakedSPRV2TokenId]);

  return (
    <div>
      <div className="stakedSprCanAmountSection">
        <p>STAKED : {withdrawSPRV2StakedAmount} </p>
      </div>
      {SPRV2StakedTokenIds.length === 0 ? (
        <div className="sprStakingWithdrawContainer">
          <div className="sprStakingCantChoiceContainer">
            <div className="sprStakingCantChoiceSection">
              <a className="cantStakingSprBtn" disabled={true}>
                INSUFFICIENT BALANCE
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="sprStakingWithdrawContainer">
          <div className="sprUnStakingChoiceImgContainer">
            {stakedSPRV2TokenId !== "" ? (
              <Carousel
                responsive={responsive}
                arrows={false}
                className="mainUnSlider"
                partialVisible
                customButtonGroup={<ButtonGroup />}
                renderButtonGroupOutside
              >
                {stakedSPRV2TokenId.map((item, index) => {
                  return (
                    <div className="sprUnStakingSlider" key={index}>
                      <div className="sprUnStakingImgContainer" id="sprUnStakingImgIdCardContainer">
                        <div
                          className="sprUnStakingImgCard"
                          style={{
                            // backgroundImage: `url(https://gateway.pinata.cloud/ipfs/QmcTcBbZtNRbwnDSjGjwfYXt8SiWahPtMFSL77dgfzHPUX)`,
                            backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${item.image})`,
                          }}
                        >
                          <input
                            className="imgUnCheckBox"
                            name="test2"
                            type="radio"
                            key={index}
                            value={item.tokenId}
                            onClick={() => selectUnStakingCheckButton(item.tokenId)}
                            onChange={(e) => checkOnlyOne(e.target)}
                          />
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
          </div>
          <div className="sprUnStakeBtnSection">
            <button className="spr-learn-more" onClick={sprUnStaking}>
              UNSTAKE
            </button>
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

export default React.memo(SprWithdrawSection);
