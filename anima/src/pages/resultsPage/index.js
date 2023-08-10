import { useState, useEffect } from "react";
import axios from "axios";

export default function ResultsPage(props) {
  const [renderedResult, setRenderedResult] = useState({});
  const thisTest = localStorage.getItem("currentTestId");
  const resultParam = {
    userResult: props.userResult,
  };

  console.log(resultParam);
  async function getTestResults() {
    const { data } = await axios.post(
      props.URL + "result/" + thisTest,
      resultParam
    );
    setRenderedResult(data);
    console.log(renderedResult);
  }
  useEffect(() => {
    getTestResults();
  }, []);

  {
    return (
      <>
        <h1>Results Page</h1>
      </>
    );
  }
}
