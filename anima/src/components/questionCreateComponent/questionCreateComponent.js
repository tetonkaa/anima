import React, { useState } from "react";
import "./main.css";

export default function QuestionCreateComponent({
  sendDataToParent,
  onDeleteQuestion,
  numQuestionForms,
}) {
  const [createdQuestion, setCreatedQuestion] = useState({
    question: "",
    answerChoices: [
      { Label: "A", Score: 1, Answer: "" },
      { Label: "B", Score: 1, Answer: "" },
      { Label: "C", Score: 1, Answer: "" },
      { Label: "D", Score: 1, Answer: "" },
    ],
    testId: localStorage.getItem("newTestId"),
  });

  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const [isFormEnabled, setIsFormEnabled] = useState(true);

  const handleQuestionInput = (event) => {
    const { name, value } = event.target;
    setCreatedQuestion((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const isAnswerFilled = (index) => {
    return createdQuestion.answerChoices[index].Answer.length > 1;
  };

  const updateNextButtonState = () => {
    const areAnswersFilled = createdQuestion.answerChoices.every(
      (choice, index) => isAnswerFilled(index)
    );
    setIsNextButtonEnabled(areAnswersFilled);
  };

  const handleAnswerChoiceChange = (index, field, value) => {
    const updatedAnswerChoices = [...createdQuestion.answerChoices];
    updatedAnswerChoices[index][field] = value;
    setCreatedQuestion((previousData) => ({
      ...previousData,
      answerChoices: updatedAnswerChoices,
    }));

    updateNextButtonState();
  };

  const handleDeleteQuestion = (e) => {
    e.preventDefault();
    onDeleteQuestion();
  };

  const setQuestionClick = (e) => {
    e.preventDefault();
    sendDataToParent(createdQuestion);
    setIsFormEnabled(false);
  };
  console.log(createdQuestion)
  return (
    <div className="questionCreateContainer">
      <h1>Question</h1>
      <form>
        <fieldset disabled={!isFormEnabled}>
          <input
            className="questionInput"
            type="text"
            name="question"
            placeholder="Enter a question"
            value={createdQuestion.question}
            onChange={handleQuestionInput}
          />
          <div className="answerLabels">
            <h3>Answer</h3>
            <h3>Score</h3>
          </div>
          {createdQuestion.answerChoices.map((choice, index) => (
            <div key={index}>
              <input
                className="answerInput"
                type="text"
                placeholder={`Answer for Choice ${choice.Label}`}
                value={choice.Answer}
                onChange={(e) =>
                  handleAnswerChoiceChange(index, "Answer", e.target.value)
                }
                required
              />
              <input
                className="scoreInput"
                type="number"
                placeholder={`Score for Choice ${choice.Label}`}
                value={choice.Score}
                onChange={(e) =>
                  handleAnswerChoiceChange(
                    index,
                    "Score",
                    parseInt(e.target.value)
                  )
                }
                required
              />
            </div>
          ))}
          <button disabled={!isNextButtonEnabled} onClick={setQuestionClick}>
            Finish Question
          </button>

          {numQuestionForms > 1 && (
            <button onClick={handleDeleteQuestion} className="deleteButton">
              Delete Question
            </button>
          )}
        </fieldset>
      </form>
    </div>
  );
}


