import axios from "axios";
import "./main.css";

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as Loading } from "../../assets/loading.svg";
import { toast, ToastContainer } from "react-toastify";
import AnimaParticles from "../../components/ Particles";
import { ReactComponent as ShareSVG } from "../../assets/share-social-outline.svg";
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
    console.log(questions + "questions log");
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

  console.log(localStorage.getItem("currentTestId"));
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
  console.log(answeredQuestions);
  console.log(userAnswers);

  return questions.length > 0 ? (
    <div className="testPageContainer">
      <ToastContainer />

      <div className="mainPageSvg">
        <AnimaParticles />
      </div>
      <input type="text" value={inviteLink} id="linkShare"></input>
      <div
        className={`questionContainer ${animateQuestion ? "fadeIn" : ""} `}
        onAnimationEnd={handleAnimationEnd}
      >
      <button
        className="shareButton"
        type="button"
        onClick={handleShare}
      >
        <ShareSVG/>
      </button>
        {questions.map((questionItem, i) => {
          return i === currentQuestionIndex ? (
            <div key={questionItem._id}>
              <div>
                <div className="testPageCards">
                  <h5 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white ">
                    {questionItem.question}
                  </h5>
                </div>
              </div>

              <ul className="answerOptions">
                {questionItem.answerChoices.map((answer) => (
                  <li key={answer._id}>
                    <label className="answerSelection" htmlFor={answer.Label}>
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
          ) : null;
        })}
      </div>

      <button
        type="button"
        className="nextQuestionButton inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400 "
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
