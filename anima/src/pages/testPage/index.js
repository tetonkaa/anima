import axios from "axios";
import "./main.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as Loading } from "../../assets/loading.svg";
import { toast, ToastContainer } from 'react-toastify';
export default function TestPage(props) {
  const [thisTest, setThisTest] = useState(
    localStorage.getItem("currentTestId")
  ); //define testId from local storage
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({
    testId: thisTest,
    userAnswers: {},
    user: props.user ? props.user.uid : "guest",
  }); //define user answers as object, using thisTest as key and answers as object for value

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
  },[]);


  const handleAnswerValue = (event, answerValue) => {
    const questionId = event.target.name;
    const answerScore = event.target.value;
    const answerLabel = event.target.id;

    userAnswers.userAnswers[questionId] = { [answerLabel]: answerScore };

    setAnsweredQuestions({ ...answeredQuestions, [questionId]: true });
  };
  const handleShare = () => {
    console.log(inviteLink);
    // Get the text field
    var copyText = document.getElementById("linkShare");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text
    toast.success(`Link copied: ${copyText.value}`);
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
    <div class="testPageContainer">
      <ToastContainer />
      <input type="text" value={inviteLink} id="linkShare"></input>
      <button class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" type="button" onClick={handleShare}>
        Share This Test
      </button>
            {questions.map((questionItem, i) => {
        return (
          <div>
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
          </div>
        );
      })}
      <button
        type="button"
        class="d3Button text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        disabled={Object.keys(answeredQuestions).length !== questions.length}
        onClick={handleAnswerSubmit}
      >
        Submit
      </button>
    </div>
  ) : (
    <div className="loadingSvg">
      {/* <h1 className=" loader animate__animated animate__pulse animate__infinite 	infinite"> Loading...</h1> */}
      <Loading />
    </div>
  );
}
