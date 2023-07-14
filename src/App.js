import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUpAction } from "./redux/actions/airdropActions/signUpActions/signUpAction";
import { connectAccount } from "./redux/actions/connectAccount";
import { Loading } from "./components";

import "./App.css";

const MainPage = lazy(() => import(/* webpackChunkName: "mainPage" */ "./pages/MainPage"));
const StakingPage = lazy(() => import(/* webpackChunkName: "mainPage" */ "./pages/StakingPage"));
const SprStakingPage = lazy(() => import(/* webpackChunkName: "mainPage" */ "./pages/SprStakingPage"));
const AirDropSignInPage = lazy(() => import("./pages/airDrop/AirDropSignInPage"));
const AirDropSignUpPage = lazy(() => import("./pages/airDrop/AirDropSignUpPage"));
const HanEPlatFromPage = lazy(() => import("./pages/airDrop/HanEPlatFromPage"));
const BeforeLoginPlatFromPage = lazy(() => import("./pages/airDrop/BeforeLoginPlatFromPage"));
const HanStakingPage = lazy(() => import("./pages/HanStakingPage"));
const Uni2V2StakingPage = lazy(() => import("./pages/Uni2V2StakingPage"));
const BeforeOldHanEplatFromPage = lazy(() => import("./pages/oldPages/BeforeOldHanEplatFromPage"));
const OldHanEPlatFromPage = lazy(() => import("./pages/oldPages/OldHanEPlatFromPage"));
const OldHanEplatSignInPage = lazy(() => import("./pages/airDrop/OldHanEplatSignInPage"));
const OldHanEplatSingUpPage = lazy(() => import("./pages/airDrop/OldHanEplatSingUpPage"));
const HanTokenomicsPage = lazy(() => import("./pages/HanTokenomicsPage"));
const HanEpTokenomicsPage = lazy(() => import("./pages/HanEpTokenomicsPage"));

function App() {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.account);
  // const { email } = useSelector((state) => state.signUpEmail);
  const [loginState, setLoginState] = useState(false);
  const [email, setEmail] = useState("");
  const sessionEmail = sessionStorage.getItem(account);

  useEffect(() => {
    // dispatch(connectAccount.getAccount());
    dispatch(signUpAction.getEmailAct(account));
    if (sessionEmail === null) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, [account, loginState, email, sessionEmail]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/rakis6" element={<StakingPage />} />
        <Route path="/spr" element={<SprStakingPage />} />
        <Route path="/hanbonus" element={<HanStakingPage />} />
        <Route path="/univ2" element={<Uni2V2StakingPage />} />
        {loginState === false ? (
          <Route path="/hanep" element={<HanEPlatFromPage />} />
        ) : (
          <Route path="/hanep" element={<BeforeLoginPlatFromPage />} />
        )}
        {loginState === false ? (
          <Route path="/hanep/old" element={<OldHanEPlatFromPage />} />
        ) : (
          <Route path="/hanep/old" element={<BeforeOldHanEplatFromPage />} />
        )}
        <Route path="/hanep/signin" element={<AirDropSignInPage />} />
        <Route path="/hanep/signup" element={<AirDropSignUpPage />} />
        <Route path="/hanep/old/signin" element={<OldHanEplatSignInPage />} />
        <Route path="/hanep/old/signup" element={<OldHanEplatSingUpPage />} />
        <Route path="/hanscan" element={<HanTokenomicsPage />} />
        <Route path="/hanepscan" element={<HanEpTokenomicsPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
