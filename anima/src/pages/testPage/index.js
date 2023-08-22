import axios from "axios";
import "./main.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {ReactComponent as Loading} from '../../assets/loading.svg'
export default function TestPage(props) {
  const thisTest = localStorage.getItem("currentTestId"); //define testId from local storage
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({
    testId: thisTest,
    userAnswers: {},
  }); //define user answers as object, using thisTest as key and answers as object for value

  const [answeredQuestions, setAnsweredQuestions] = useState({})

  async function getQuestions() {
    const { data } = await axios.get(props.URL + "test-questions/" + thisTest);
    setQuestions(data);
    return data;
  }

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const handleAnswerValue = (event, answerValue) => {
    const questionId = event.target.name;
    const answerScore = event.target.value;
    const answerLabel = event.target.id;

    userAnswers.userAnswers[questionId] = { [answerLabel]: answerScore };

    setAnsweredQuestions({ ...answeredQuestions, [questionId]: true });
  };
  /////////////////////

  async function handleAnswerSubmit() {
    const updateProps = (response) => {
      props.setUserResult(response);
    };
    axios.post(props.URL + "submit", userAnswers).then((response) => {
      updateProps(response.data.finalResult);
    });
    navigate("/result");
  }

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
                        name={questionItem._id}
                        value={answer.Score}
                        id={answer.Label}
                        onClick={(event) =>
                          // handleAnswerChange(event, questionItem._id)
                          handleAnswerValue(event, answer)
                        }
                      />
                      <span class="answer">{answer.Answer}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={Object.keys(answeredQuestions).length !== questions.length}
        onClick={handleAnswerSubmit}
      >
        Submit
      </button>
    </>
  ) : (
    <div className="loadingSvg">
      {/* <h1 className=" loader animate__animated animate__pulse animate__infinite 	infinite"> Loading...</h1> */}
    <Loading />
    </div>
  );
}
