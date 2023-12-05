"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TestSideBar from "../../components/testSidebar/testSidebar";
import axios from "axios";
import "./main.css";
import { Routes, Route, Link } from "react-router-dom";
import { ReactComponent as Loading } from "../../assets/loading.svg";
import AnimaParticles from "../../components/ Particles";
import { ReactComponent as Blob1 } from "../../assets/blob-haikei(1).svg";
import { ReactComponent as Blob2 } from "../../assets/blob-haikei(2).svg";
import { ReactComponent as Blob3 } from "../../assets/blob-haikei(3).svg";
import { ReactComponent as Blob4 } from "../../assets/blob-haikei(4).svg";
import BackgroundImage from "../../assets/testBgImage.png";
export default function MainPage(props) {
  const [tests, setTests] = useState([]);
  const [testList, setTestList] = useState();
  const navigate = useNavigate();
  async function getTestInfo() {
    const { data } = await axios.get(props.URL);
    // console.log(data);
    return data;
  }

  useEffect(() => {
    getTestInfo().then((data) => setTests(data));
  }, []);

  const handleTestNavigator = (testId) => {
    localStorage.setItem("currentTestId", testId);
    props.setTestId(testId);
  };

  useEffect(() => {
    setTestList({ tests }.tests.docs);
  }, [tests]);

  const getRandomTestId = () => {
    if (tests.length === 0) {
      return null; // No tests available
    }

    const randomIndex = Math.floor(Math.random() * 4);
    return tests[randomIndex]._id;
  };

  const handleRandomTest = () => {
    const randomTestId = getRandomTestId();
    if (randomTestId) {
      localStorage.setItem("currentTestId", randomTestId);
      props.setTestId(randomTestId);
      navigate("/test");
    }
  };

  console.log(props.testId);
  function loaded() {
    return (
      <>
        <div class="mainPageContainer">
          <section
            class="bg-center bg-cover  bg-gray-400 bg-blend-multiply"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
          >
            <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
              <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                Discover your persona.
              </h1>
              <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                Take a variety of customized assessments to reveal outcomes
                defined by your answers.{" "}
              </p>
              <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                <a
                  href="#"
                  class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                >
                  Get started
                  <svg
                    class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  onClick={handleRandomTest}
                  class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
                >
                  Random Test
                </a>
              </div>
            </div>
          </section>

          <div className="mainPageSvg">
            <AnimaParticles/>
          </div>
          {tests.slice(0, 4).map((test, i) => {
            return (
              <div className="mainCardContainer">
                <Link
                  to="/test"
                  key={test._id}
                  href="#"
                  className="flex mainPageCards flex-col items-center bg-white rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={() => handleTestNavigator(test._id)}
                >
                  <img
                    className="object-cover w-full rounded-t-lg  md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src={test.testPic}
                    alt=""
                  />
                  <div className="flex flex-col justify-between pl-4 leading-normal">
                    <h5 className="font-bold">{test.testName}</h5>
                    <p className="mb-3">{test.description}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return tests.length > 0 ? (
    loaded()
  ) : (
    <div className="loadingSvg">
      <Loading />
    </div>
  );
}
