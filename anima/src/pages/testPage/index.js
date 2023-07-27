import axios from "axios";
import "./main.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function TestPage(props) {
  const [questions, setQuestions] = useState([]);
  const [questionsList, setQuestionsList] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentTest, setCurrentTest] = useState()

  let aTotal = 0
  let bTotal = 0
  let cTotal = 0
  let dTotal = 0

  console.log("aTotal"+aTotal)
  console.log("bTotal"+bTotal)
  console.log("cTotal"+cTotal)
  console.log("dTotal"+dTotal)
  
  const thisTest = localStorage.getItem("currentTestId"); //define local storage from initial page load to store testId
  

  async function getQuestions() {
    const { data } = await axios.get(
      props.URL + "test-questions/" + thisTest
    );
    setQuestions(data);
    return data;
  }


  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const handleAnswerChange = (event, questionId) => {
    // You can handle the selected answer here if needed
    console.log("Selected Answer:", event.target.value)
    
  };

  const handleAnswerValue = (event, answerValue) => {
    // You can handle the selected answer here if needed
    console.log("Selected Answer:", event.target.id)
    console.log("Answer Score:", event.target.value)
    
  };

  return questions.length > 0 ? (
    <>
      {questions.map((questionItem, i) => {
        return (
          <div
            key={questionItem._id}
            className="flex mainPageCards flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {questionItem.question}
              </h5>
              <ul>
                {questionItem.answerChoices.map((answer) => (
                  <li key={answer._id}>
                    <label>
                      <input
                        type="radio"
                        name={`answer_${questionItem._id}`}
                        value={answer.Score}
                        id={answer.Label}
                        onChange={(event) =>
                          // handleAnswerChange(event, questionItem._id)
                          handleAnswerValue(event, answer)
                        }
                      />
                      <span>
                        {answer.Answer} 
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
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
