import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  MainPage,
  StakingPage,
  SprStakingPage,
  StakingPageTest,
} from "./pages/_index";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/rakis6" element={<StakingPage />} />
        <Route path="/spr" element={<SprStakingPage />} />
        <Route path="/test" element={<StakingPageTest />} />
      </Routes>
    </>
  );
}

export default App;
