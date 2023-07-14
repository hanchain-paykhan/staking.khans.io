import React, { lazy, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./SprStakingPage.scss";
import "react-multi-carousel/lib/styles.css";
import { connectAccount } from "../redux/actions/connectAccount";
import { networksAction } from "../redux/actions/networksAction";
const SprConnectWalletSection = lazy(() => import("../components/SprStakingPage/SprConnectWalletSection"));
const SprDepositSection = lazy(() => import("../components/SprStakingPage/SprDepositSection"));
const SprRewardSection = lazy(() => import("../components/SprStakingPage/SprRewardSection"));
const SprTopSection = lazy(() => import("../components/SprStakingPage/SprTopSection"));
const SprViewAdsSection = lazy(() => import("../components/SprStakingPage/SprViewAdsSection"));
const SprWithdrawSection = lazy(() => import("../components/SprStakingPage/SprWithdrawSection"));

const SprStakingPage = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
  const setup = () => {
    dispatch(connectAccount.getAccount());
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
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
      });
    }
  });

  useEffect(() => {
    // dispatch(musikhanViewAction.getL1TokenListAct());
    dispatch(networksAction.networksAct());
  }, []);

  useEffect(() => {
    if (window.ethereum?.chainId === "0x1") {
      setCheckChainId("0x1");
    }
    if (window.ethereum?.chainId === "0xa") {
      setCheckChainId("Oxa");
    }
  }, [window.ethereum?.chainId]);

  return (
    <div className="stakingSprPageContainer">
      <SprTopSection />

      <Tabs className="Tabs">
        <SprConnectWalletSection />
        <TabList>
          <Tab>DEPOSIT</Tab>
          <Tab>REWARDS</Tab>
          <Tab>WITHDRAW</Tab>
          <Tab>VIEW ADS</Tab>
        </TabList>
        <TabPanel>
          <SprDepositSection />
        </TabPanel>
        <TabPanel className="allTokenSprRewardsContainer">
          <SprRewardSection />
        </TabPanel>
        <TabPanel>
          <SprWithdrawSection />
        </TabPanel>
        <TabPanel>
          <SprViewAdsSection />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default SprStakingPage;
