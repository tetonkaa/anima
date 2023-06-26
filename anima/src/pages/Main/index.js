import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";





export default function MainPage() {
    const [tests, setTests] = useState({});
    const [testList, setTestList] = useState();
    // const [category, setCategory] = useState("tests");
  
    async function getTestInfo() {
      const { data } = await axios.get(
        `http://localhost:4000`
      );
      console.log(data);
      return data;
    }
  
    useEffect(() => {
      getTestInfo().then((data) => setTests(data));
    }, []);
  
    useEffect(() => {
      setTestList({ tests }.tests.docs);
    }, [tests]);
  
    function loaded() {
      return (
   
          <div>
            {testList.map((test, i) => {
              return (
                <div>
                  
                  <p>{test.testName}</p>
                  <p>{test.description}</p>
                  
                </div>
              );
            })}
          </div>
      );
    }
  
    return testList ? (
      loaded()
    ) : (
      <div >
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