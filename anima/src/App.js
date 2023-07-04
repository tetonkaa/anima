import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AboutPage from "./pages/About/index";
import MainPage from "./pages/Main/index";
import DefaultNavbar from "./components/Nav";
import { Button } from "flowbite-react";

function App() {
  return (
    <>
      <DefaultNavbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/About" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
