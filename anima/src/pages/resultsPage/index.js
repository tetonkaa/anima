import { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";
import Typewriter from "typewriter-effect";
import { ReactComponent as Loading } from "../../assets/loading.svg";
import { redirect } from "react-router-dom";
export default function ResultsPage(props) {
  const [renderedResult, setRenderedResult] = useState({});
  const thisTest = localStorage.getItem("currentTestId");
  const resultParam = {
    userResult: props.userResult,
  };

  async function getTestResults() {
    const { data } = await axios.post(
      props.URL + "result/" + thisTest,
      resultParam
    );
    setRenderedResult(data);
    return data;
  }

  ///async function to allow renderedResult to update upon request pull completion
  useEffect(() => {
    async function fetchResults() {
      const results = await getTestResults();
      setRenderedResult(results);
    }
    fetchResults();
  }, [thisTest, props.userResult]);

  useEffect(() => {
    console.log(renderedResult);
  }, [renderedResult]);

  console.log(renderedResult[Object.keys(renderedResult)[0]]);

  function loaded() {
    return (
      <div class="flex-col items-center mt-[10vh] h-[100%]">
        <div
          class="resultCard flex-col items-center mt-[5%] w-[80vw] h-[70vh] p-[10px] m-auto bg-red border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          style={{
            backgroundImage: `url(${renderedResult.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "bgshift 14s linear infinite alternate",
          }}
        >
          <a href="#">
            <img
              class="rounded-t-lg resultImage"
              src={renderedResult.image}
              alt=""
            />
          </a>
          <div
            id="resultsItems"
            class="p-5 flex-col justify-center align-center"
          >
            <a href={renderedResult.link}>
            <p class="resultName text-center" href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <Typewriter
                  options={{
                    strings: [renderedResult[Object.keys(renderedResult)[0]]],
                    autoStart: true,
                    deleteSpeed: 1000000000,
                    cursor: ""
                  }}
                />
              </h5>
            </p>
            </a>
            <a
              href="/test-list"
              id="retakeButton"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              New Test
              <svg
                class="w-3.5 h-3.5 ml-2"
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
      </div>
    );
  }

  return Object.keys(renderedResult).length > 0 ? (
    loaded()
  ) : (
    <div className="loadingSvg">
      {/* <h1 className=" loader animate__animated animate__pulse animate__infinite 	infinite"> Loading...</h1> */}
      <Loading />
    </div>
  );
}
