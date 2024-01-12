import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AboutPage from "./pages/About/index";
import MainPage from "./pages/Main/index";
import DefaultNavbar from "./components/Nav";
import TestPage from "./pages/testPage";
import React, { useState, useEffect } from "react";
import CreatePage from "./pages/createPage";
import ResultsPage from "./pages/resultsPage";
import HomePage from "./pages/Home";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import { db } from "./services/firebase.config";
import Signin from "./pages/AuthPage/Signin";
import QuestionCreate from "./pages/questionCreate";
function App() {
  const [testId, setTestId] = useState("");
  const [userResult, setUserResult] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const URL = process.env.REACT_APP_URL;
  const [isNavBarVisible, setNavBarVisibility] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <BrowserRouter>
        <DefaultNavbar URL={URL} user={user} darkMode={darkMode} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                setTestId={setTestId}
                testId={testId}
                URL={URL}
                user={user}
              />
            }
          />
          <Route
            path="/explore"
            element={
              <MainPage
                setTestId={setTestId}
                testId={testId}
                URL={URL}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                user={user}
                isNavBarVisible={isNavBarVisible}
              />
            }
          />
          <Route path="/About" element={<AboutPage />} />
          <Route
            path="/test"
            element={
              <TestPage
                testId={testId}
                setUserResult={setUserResult}
                userResult={userResult}
                URL={URL}
                user={user}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                setTestId={setTestId}
                testId={testId}
                setUserResult={setUserResult}
                userResult={userResult}
                URL={URL}
                user={user}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
          <Route
            path="/create"
            element={
              <CreatePage
                URL={URL}
                user={user}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                setTestId={setTestId}
              />
            }
          />
          <Route
            path="/question-add"
            element={<QuestionCreate URL={URL} user={user} />}
          />
          <Route
            path="/result"
            element={
              <ResultsPage
                testId={testId}
                URL={URL}
                userResult={userResult}
                user={user}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
        </Routes>
        <Signin setUser={setUser} user={user} />
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
