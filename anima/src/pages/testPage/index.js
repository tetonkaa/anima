import axios from "axios";
import "./main.css";

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as Loading } from "../../assets/loading.svg";
import { toast, ToastContainer } from "react-toastify";
import AnimaParticles from "../../components/ Particles";
export default function TestPage(props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [thisTest, setThisTest] = useState(
    localStorage.getItem("currentTestId")
  );
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({
    testId: thisTest,
    userAnswers: {},
    user: props.user ? props.user.uid : "guest",
  }); //define user answers as object, using thisTest as key and answers as object for value
  const [animateQuestion, setAnimateQuestion] = useState(true);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [inviteLink, setInviteLink] = useState();
  const urlTestId = window.location.hash.replace("#", "");
  useEffect(() => {
    setInviteLink(process.env.REACT_APP_FRONTEND_URL + `test/#${thisTest}`);
  });

  async function getQuestions() {
    const { data } = await axios.get(props.URL + "test-questions/" + thisTest);
    setQuestions(data);
    return data;
  }

  useEffect(() => {
    if (urlTestId !== "") {
      localStorage.setItem("currentTestId", urlTestId);
      setThisTest(urlTestId);
      getQuestions();
    } else {
      getQuestions();
    }
  }, []);

  useEffect(() => {
    props.setDarkMode(true);
  }, []);

  const handleAnswerValue = (event, answer) => {
    const questionId = event.target.name;
    const answerLabel = answer.Label;

    setUserAnswers((prevUserAnswers) => {
      const updatedUserAnswers = {
        ...prevUserAnswers,
        userAnswers: {
          ...prevUserAnswers.userAnswers,
          [questionId]: { [answerLabel]: answer.Score },
        },
      };
      return updatedUserAnswers;
    });

    setAnsweredQuestions((prevAnsweredQuestions) => ({
      ...prevAnsweredQuestions,
      [questionId]: true,
    }));
  };
  const handleShare = () => {
    console.log(inviteLink);

    var copyText = document.getElementById("linkShare");

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyText.value);

    toast.success(`Link copied: ${copyText.value}`);
  };

  const handleNextQuestion = () => {
    setAnimateQuestion(true);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleAnimationEnd = () => {
    setAnimateQuestion(false);
  };

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
    <div className="testPageContainer">
      <ToastContainer />

<div className="mainPageSvg">
            <AnimaParticles />
          </div>
      <input type="text" value={inviteLink} id="linkShare"></input>
      <button
        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="button"
        onClick={handleShare}
      >
        Share This Test
      </button>
      <div>
      {questions.map((questionItem, i) => {
        return i === currentQuestionIndex ? (
          <div key={questionItem._id}>
            <div
              className={`flex testPageCards flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ${
                animateQuestion ? "fadeIn" : ""
              }`}
              onAnimationEnd={handleAnimationEnd}
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
                          onChange={(event) => handleAnswerValue(event, answer)}
                        />
                        <span className="answer">{answer.Answer}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : null;
        
      })}
      </div>

      <button
        type="button"
        className="d3Button text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        disabled={!answeredQuestions[questions[currentQuestionIndex]._id]}
        onClick={
          currentQuestionIndex === questions.length - 1
            ? handleAnswerSubmit
            : handleNextQuestion
        }
      >
        {currentQuestionIndex === questions.length - 1
          ? "Submit"
          : "Next Question"}
      </button>
    </div>
  ) : (
    <div className="loadingSvg">
      <Loading />
    </div>
  );
}
