import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AboutPage from "./pages/About/index";
import MainPage from "./pages/Main/index";
import DefaultNavbar from "./components/Nav";
import { Button } from "flowbite-react";
import TestPage from "./pages/testPage";
import React, { useState, useEffect } from "react";
import CreatePage from "./pages/createPage";
import ResultsPage from "./pages/resultsPage";

function App() {
  const [testId, setTestId] = useState();
  const [userResult, setUserResult] = useState("");
  const URL = "http://localhost:4000/";

  return (
    <>
      {/* <DefaultNavbar /> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage setTestId={setTestId} testId={testId} URL={URL} />
            }
          />
          <Route path="/About" element={<AboutPage />} />
          <Route
            path="/test"
            element={<TestPage testId={testId} setUserResult={setUserResult} userResult={userResult} URL={URL} />}
          />
          <Route path="/create" element={<CreatePage URL={URL} />} />
          <Route
            path="/result"
            element={<ResultsPage testId={testId} URL={URL} userResult={userResult} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
