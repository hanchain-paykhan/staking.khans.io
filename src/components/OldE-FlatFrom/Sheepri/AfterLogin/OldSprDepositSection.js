import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import Loading from "../../../SprStakingPage/Loading";
import { HanLogo } from "../../../../assets/_index";
import { networksAction } from "../../../../redux/actions/networksAction";
import { oldSprStakeAction } from "../../../../redux/actions/OldEPlatActions/OldSprActions/oldSprStakeAction";
import { oldSprStakingSingleApproveStateAction } from "../../../../redux/actions/OldEPlatActions/OldSprActions/oldSprStakingSingleApproveStateAction";
import { oldSprStakingViewAction } from "../../../../redux/actions/OldEPlatActions/OldSprActions/oldSprStakingViewAction";
import { oldSprStakingApporveAction } from "../../../../redux/actions/OldEPlatActions/OldSprActions/oldSprStakingApporveAction";
import "./OldSprDepositSection.scss";
import { SlArrowRightIcon, SlArrowLeftIcon, MdHelpIcon } from "../../../Icons/reactIcons";

const OldSprDepositSection = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
  const [stakingmyTokenId, setMyTokenId] = useState(1);
  const { account } = useSelector((state) => state.account);

  const { getOldSprAmountStaked, getOldSprMyTokenIds } = useSelector((state) => state.oldSprStakingView);

  const { getOldSprSingleApproved } = useSelector((state) => state.oldSprStakingApprove);

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

  const sprStaking = () => {
    dispatch(oldSprStakeAction.oldSprStakeAct(account, Number(stakingmyTokenId)));
  };

  const sprSingleApprove = () => {
    dispatch(oldSprStakingApporveAction.oldSprStakingApporveAct(account, Number(stakingmyTokenId)));
  };

  const handleClickButton = (myTokenId) => {
    // console.log(myTokenId, " 체크");
    dispatch({ type: "SELECT_OLD_STAKING_NFT", payload: myTokenId });
    // dispatch(sprStakingViewAction.sprStakingViewAct(account, Number(myStakedTokenId)));
  };

  const stakingCheckOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName("test3");
    // console.log(checkboxes)
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      } else {
        setMyTokenId(checkThis.value);
        // console.log(typeof Number(checkThis.value))
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
    dispatch(oldSprStakingViewAction.oldSprStakingViewAct(account));
  }, [account]);

  useEffect(() => {
    dispatch(oldSprStakingSingleApproveStateAction.oldSprStakingSingleApproveStateAct(account, Number(stakingmyTokenId)));
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
      {getOldSprAmountStaked ? (
        getOldSprMyTokenIds.length === 0 ? (
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
              {getOldSprMyTokenIds !== "" ? (
                <Carousel
                  responsive={responsive}
                  arrows={false}
                  className="mainUnSlider"
                  partialVisible
                  customButtonGroup={<ButtonGroup />}
                  renderButtonGroupOutside
                >
                  {getOldSprMyTokenIds.map((item, index) => {
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
              <button className="cant-spr-learn-more" disabled={true}>
                STAKE
              </button>
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
        <img src={HanLogo} onClick={addRewardToken} className="hanIcon" alt="HanIcon" />
      </div>
    </div>
  );
};

export default React.memo(OldSprDepositSection);
