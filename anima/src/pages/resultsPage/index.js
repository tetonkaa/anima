import { useState, useEffect } from "react";
import axios from "axios";

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

  // useEffect(() => {
  //   renderedResult(...renderedResult, Object.keys)
  // })

  function loaded() {
    return (
      <>
        <a>{renderedResult[Object.keys(renderedResult)[0]]}</a>
        <img src={renderedResult.image} />
      </>
    );
  }

  return Object.keys(renderedResult).length > 0 ? (
    <>
      <a>{renderedResult[Object.keys(renderedResult)[0]]}</a>
      <img src={renderedResult.image} />
    </>
  ) : (
    <div>
      {/* <h1 className=" loader animate__animated animate__pulse animate__infinite 	infinite"> Loading...</h1> */}
      <svg
        className="loaderSVG"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="3" />
        <g>
          <circle cx="4" cy="12" r="3" />
          <circle cx="20" cy="12" r="3" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="spline"
            dur="1s"
            keySplines=".36,.6,.31,1;.36,.6,.31,1"
            values="0 12 12;180 12 12;360 12 12"
            repeatCount="indefinite"
          />
        </g>
      </svg>
    </div>
  );
}
