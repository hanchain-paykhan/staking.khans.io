import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import { HanLogo } from "../../../../assets/_index";
import { networksAction } from "../../../../redux/actions/networksAction";
import { oldSprUnStakeAction } from "../../../../redux/actions/OldEPlatActions/OldSprActions/oldSprUnStakeAction";
import { oldSprStakingViewAction } from "../../../../redux/actions/OldEPlatActions/OldSprActions/oldSprStakingViewAction";
import { SlArrowLeftIcon, SlArrowRightIcon, MdHelpIcon } from "../../../Icons/reactIcons";
import "./OldSprDepositSection.scss";

const OldSprWithdrawSection = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
  const [myStakedTokenId, setMyStakedTokenId] = useState("");

  const { account } = useSelector((state) => state.account);

  const { getOldSprAmountStaked, getOldSprStakedTokenIds, oldSprStakingTokenIdImg, getOldSprMyTokenIds } = useSelector(
    (state) => state.oldSprStakingView
  );

  // add to Reward Token
  const addRewardToken = async () => {
    const tokenAddress = "0x0c90C57aaf95A3A87eadda6ec3974c99D786511F";
    const tokenSymbol = "HAN";
    const tokenDecimals = 18;
    const tokenImage = "https://raw.githubusercontent.com/hanchain-paykhan/hanchain/3058eecc5d26f980db884f1318da6c4de18a7aea/logo/logo.svg";

    try {
      const wasAdded = await window.ethereum?.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
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
    dispatch(oldSprUnStakeAction.oldSprUnStakeAct(account, Number(myStakedTokenId)));
  };

  const selectUnStakingCheckButton = (myStakedTokenId) => {
    dispatch({ type: "SELECT_OLD_UNSTAKING_NFT", payload: myStakedTokenId });
  };

  const checkOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName("test2");
    // console.log(checkboxes)
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      } else {
        setMyStakedTokenId(checkThis.value);
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
    dispatch(oldSprStakingViewAction.oldSprStakingViewAct(account));
  }, [account]);
  return (
    <div>
      <div className="oldSprstakingAmountTitle">
        <div className="stakingSprAmountTitle">
          <div className="stakingSprAmountTxt">
            <a>0.000001157407407407 HAN</a>
          </div>

          <div className="tooltip-container">
            <i className="info-icon material-icons">
              <MdHelpIcon />
            </i>
            <div className="tooltip-content">
              <span>
                The right to possess digital content forever and get yourself a Sheepoori card -Ms. Caring one of three sheep siblings
                characters from Sewoori Union for AdKhan: Advertising Platform
              </span>
              <span className="align-right">
                <a href="https://medium.com/@HanIdentity/as-the-second-staking-of-the-hanchain-project-e29da8da25e3" target="_blank">
                  Read More
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="stakingSprAmountNum">
          <a>for each NFT per second</a>
        </div>
      </div>
      <div className="stakedSprCanAmountSection">
        <p>STAKED : {getOldSprAmountStaked} </p>
      </div>
      {getOldSprStakedTokenIds.length === 0 ? (
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
            {oldSprStakingTokenIdImg !== "" ? (
              <Carousel
                responsive={responsive}
                arrows={false}
                className="mainUnSlider"
                partialVisible
                customButtonGroup={<ButtonGroup />}
                renderButtonGroupOutside
              >
                {oldSprStakingTokenIdImg.map((item, index) => {
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
        <img src={HanLogo} onClick={addRewardToken} className="hanIcon" alt="HanLogo" />
      </div>
    </div>
  );
};

export default React.memo(OldSprWithdrawSection);
