"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    props.setDarkMode(true);
  }, []);

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
                Take a variety of customized assessments to reveal personality
                traits and recommendations.
              </p>
              <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                <a
                  href="#"
                  onClick={handleRandomTest}
                  class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
                >
                  Take a Random Test
                </a>
              </div>
            </div>
          </section>

          <div className="mainPageSvg">
            <AnimaParticles />
          </div>
          {tests.slice(0, 4).map((test, i) => {
            return (
              <div className="mainCardContainer">
                <Link
                  to="/test"
                  key={test._id}
                  href="#"
                  className="flex mainPageCards flex-col items-center bg-white rounded-lg shadow md:flex-col md:max-w-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={() => handleTestNavigator(test._id)}
                >

                  <div class="max-w-sm bg-none   rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                      <img class="rounded-t-lg" src={test.testPic} alt="" />
                    </a>
                    <div class="p-5">
                      <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-white-900 dark:text-white">
                          {test.testName}
                        </h5>
                      </a>
                      <p class="mb-3 font-normal text-white-700 dark:text-gray-400">
                        {test.description}
                      </p>
                      <a
                        href="#"
                        onClick={() => handleTestNavigator(test._id)}
                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Take test
                        <svg
                          class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  //   <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  //     <a href="#">
  //         <img class="rounded-t-lg" src={test.testPic} alt="" />
  //     </a>
  //     <div class="p-5">
  //         <a href="#">
  //             <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{test.testName}</h5>
  //         </a>
  //         <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{test.description}</p>
  //         <a href="#" onClick={() => handleTestNavigator(test._id)} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  //             Take test
  //              <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
  //                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  //             </svg>
  //         </a>
  //     </div>
  // </div>

  return tests.length > 0 ? (
    loaded()
  ) : (
    <div className="loadingSvg">
      <Loading />
    </div>
  );
}
