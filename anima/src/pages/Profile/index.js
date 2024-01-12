import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./main.css";
import { Routes, Route, Link } from "react-router-dom";

export default function Profile(props) {
  const user = props.user.uid;
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`${props.URL}tests?user=${user}`);
        setTests(response.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, [user]);

  useEffect(() => {
    props.setDarkMode(false);
  }, []);

  const handleTestNavigator = (testId) => {
    localStorage.setItem("currentTestId", testId);
    props.setTestId(testId);
    console.log("type: " + typeof testId);
  };

  return (
    <div className="profilePageContainer">
      <h1>Profile Page</h1>
      <div className="flex flex-row mainCardContainer">
        {tests.map((test, i) => {
          return (
            <div className="mainCard">
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
                      class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
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
    </div>
  );
}
