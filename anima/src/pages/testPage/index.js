import axios from "axios";
import "./main.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function TestPage(props) {
  const [questions, setQuestions] = useState([{}]);
  const [questionsList, setQuestionsList] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  console.log("hit test page", props.testId);
  async function getQuestions() {
    const { data } = await axios.get(
      props.URL + "test-questions/" + props.testId
    );
    console.log(data);
    return data;
  }
  useEffect(() => {
    getQuestions().then((data) => setQuestions(data));
  }, []);

  useEffect(() => {
    setQuestionsList({ questions }.questions.docs);
    console.log(questions);
  }, [questions]);

  const handleAnswerChange = (event, questionId) => {
    // You can handle the selected answer here if needed
    console.log("Selected Answer:", event.target.value);
  };

  return (
    <>
      {questions.map((questionItem, i) => { // Rename the variable to questionItem
        return (
          <div key={questionItem._id} className="flex mainPageCards flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {questionItem.question} {/* Use questionItem instead of questions */}
              </h5>
              <ul>
                {questionItem.answerChoices.map((answer) => (
                  <li key={answer._id}>
                    <label>
                      <input
                        type="radio"
                        name={`answer_${questionItem._id}`} 
                        value={answer.Answer}
                        onChange={(event) => handleAnswerChange(event, questionItem._id)}
                      />
                      <span>{answer.Answer} - Score: {answer.Score}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
}
