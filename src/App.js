import "./App.css";
import { Routes, Route } from "react-router-dom";
import { MainPage, StakingPage } from "./pages/_index";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/rakis6" element={<StakingPage />} />
      </Routes>
    </>
  );
}

export default App;
