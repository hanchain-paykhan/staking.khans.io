import React, { lazy, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { HanLogo } from "../../assets/_index";
import "./OldHanEPlatFromPage.scss";
import { MunieConnectWalletSection } from "../../components/E-FlatFrom";
import { networksAction } from "../../redux/actions/networksAction";
import { connectAccount } from "../../redux/actions/connectAccount";
import { SprConnectWalletSection } from "../../components";
const OldMunieDepositSection = lazy(() => import("../../components/OldE-FlatFrom/Munie/AfterLogin/OldMunieDepositSection"));
const OldMunieRewardSection = lazy(() => import("../../components/OldE-FlatFrom/Munie/AfterLogin/OldMunieRewardSection"));
const OldMunieViewAdsSection = lazy(() => import("../../components/OldE-FlatFrom/Munie/AfterLogin/OldMunieViewAdsSection"));
const OldMunieWithdrawSection = lazy(() => import("../../components/OldE-FlatFrom/Munie/AfterLogin/OldMunieWithdrawSection"));
const OldSignInUpTopSection = lazy(() => import("../../components/OldE-FlatFrom/SignInUp/OldSignInUpTopSection"));
const OldSprDepositSection = lazy(() => import("../../components/OldE-FlatFrom/Sheepri/AfterLogin/OldSprDepositSection"));
const OldSprRewardSection = lazy(() => import("../../components/OldE-FlatFrom/Sheepri/AfterLogin/OldSprRewardSection"));
const OldSprViewAdsSection = lazy(() => import("../../components/OldE-FlatFrom/Sheepri/AfterLogin/OldSprViewAdsSection"));
const OldSprWithdrawSection = lazy(() => import("../../components/OldE-FlatFrom/Sheepri/AfterLogin/OldSprWithdrawSection"));

const OldHanEPlatFromPage = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
  const [changeMainTab, setChangeMainTab] = useState(1);

  const mainTabArr = ["Munie", "Sheepoori"];

  const musiL2TabArr = ["DEPOSIT", "REWARDS", "WITHDRAW", "MINT", "SWAP"];

  const musiOtherNetTabArr = ["DEPOSIT", "REWARDS", "WITHDRAW", "BRIDGE"];

  const munieTabArr = ["DEPOSIT", "REWARD", "WITHDRAW", "VIEW ADS"];

  const setup = () => {
    dispatch(connectAccount.getAccount());
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
  };

  const mainTabChange = () => {
    setChangeMainTab(changeMainTab + 1);
    dispatch({ type: "MAIN_TAB_CHANGE", payload: changeMainTab });
  };

  useEffect(() => {
    window.ethereum?.on("chainChanged", networkChanged);

    return () => {
      window.ethereum?.removeListener("chainChanged", networkChanged);
    };
  }, []);

  useEffect(() => {
    setup();
    window.ethereum?.on("accountsChanged", () => {
      setup();
    });
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum?.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum?.on("accountsChanged", () => {
        window.location.reload();
        setup();
      });
    }
  }, []);

  useEffect(() => {
    if (window.ethereum?.chainId === "0x1") {
      setCheckChainId("0x1");
    }
    if (window.ethereum?.chainId === "0xa") {
      setCheckChainId("Oxa");
    }
    if (window.ethereum?.chainId === "0x5") {
      setCheckChainId("0x5");
    }
    if (window.ethereum?.chainId === "0x1a4") {
      setCheckChainId("0x1a4");
    }
  }, [window.ethereum?.chainId]);

  useEffect(() => {
    // dispatch(musikhanViewAction.getL1TokenListAct());
    dispatch(networksAction.networksAct());
  }, []);
  return (
    <div className="platFromPageMainContainer">
      <div className="platFromPageNewChange">
        This is the previous Staking. New version is live at <a href="/hanep">staking.khans.io/hanep</a>
      </div>
      <div className="platFromPageLogoContainer">
        <img className="platFromTopLogo" src={HanLogo} alt="HanLogo" />
        <a>HAN e-Platform</a>
      </div>
      <Tabs forceRenderTabPanel defaultIndex={1} className="mainTabs">
        <OldSignInUpTopSection />
        <TabList className="mainTabList">
          {/* <Tab>AirDrop</Tab>
                    <Tab>MusiKhan</Tab>
                    <Tab>Rakis6</Tab>
                    <Tab>Munie</Tab> */}
          {mainTabArr?.map((item, index) => {
            return (
              <Tab key={index} onClick={mainTabChange}>
                {item}
              </Tab>
            );
          })}
        </TabList>

        <TabPanel>
          <Tabs forceRenderTabPanel className="subTabs">
            <MunieConnectWalletSection />
            <TabList className="subTabList">
              {munieTabArr?.map((item, index) => {
                return <Tab key={index}>{item}</Tab>;
              })}
            </TabList>
            <TabPanel>
              <OldMunieDepositSection />
            </TabPanel>
            <TabPanel>
              <OldMunieRewardSection />
            </TabPanel>
            <TabPanel>
              <OldMunieWithdrawSection />
            </TabPanel>
            <TabPanel>
              <OldMunieViewAdsSection />
            </TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel>
          <Tabs forceRenderTabPanel className="subTabs">
            <SprConnectWalletSection />
            <TabList className="subTabList">
              {munieTabArr?.map((item, index) => {
                return <Tab key={index}>{item}</Tab>;
              })}
            </TabList>
            <TabPanel>
              <OldSprDepositSection />
            </TabPanel>
            <TabPanel>
              <OldSprRewardSection />
            </TabPanel>
            <TabPanel>
              <OldSprWithdrawSection />
            </TabPanel>
            <TabPanel>
              <OldSprViewAdsSection />
            </TabPanel>
          </Tabs>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default OldHanEPlatFromPage;
