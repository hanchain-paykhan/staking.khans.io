import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  MainPage,
  StakingPage,
  SprStakingPage,
} from "./pages/_index";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/rakis6" element={<StakingPage />} />
        <Route path="/spr" element={<SprStakingPage />} />
      </Routes>
    </>
  );
}

export default App;
