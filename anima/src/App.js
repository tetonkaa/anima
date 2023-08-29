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
import HomePage from "./pages/Home";
import Footer from "./components/Footer";
import Signup from "./pages/AuthPage/Signup";
import { db } from './services/firebase.config'
import Signin from "./pages/AuthPage/Signin";


function App() {
  const [testId, setTestId] = useState();
  const [userResult, setUserResult] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userDetails")));
  const URL = process.env.REACT_APP_URL;


  useEffect(() => {
    console.log(user);
  }, [user]);


  return (
    <>
      <DefaultNavbar URL={URL}  user={user} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage setTestId={setTestId} testId={testId} URL={URL} user={user} />
            }
            />
          {/* <Route path="/signin" element={<Signin URL={URL} />} />
          <Route path="/signup" element={<Signup URL={URL} />} /> */}
          <Route
            path="/test-list"
            element={
              <MainPage setTestId={setTestId} testId={testId} URL={URL} user={user} />
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
              />
            }
            />
          <Route path="/create" element={<CreatePage URL={URL} user={user} />} />
          <Route
            path="/result"
            element={
              <ResultsPage testId={testId} URL={URL} userResult={userResult} user={user} />
            }
            />
        </Routes>
      </BrowserRouter>
      <Signin setUser={setUser} user={user}/>
      <Footer />

    </>
  );
}

export default App;
