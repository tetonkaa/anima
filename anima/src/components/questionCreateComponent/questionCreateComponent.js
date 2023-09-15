import React, { useState } from "react";
import axios from "axios";
import "./main.css";

export default function QuestionCreateComponent(URL, props,addQuestion) {
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

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       URL.URL + "questions/add-question",
  //       createdQuestion
  //     );
  //     console.log("Question post successful", response);
  //   } catch (error) {
  //     console.error("Error posting question", error);
  //   }
  // };

  
  const handleQuestionInput = (event) => {
    const { name, value } = event.target;
    setCreatedQuestion((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };
  
  // console.log(createdQuestion)
  console.log(URL.URL);
  
  const handleAnswerChoiceChange = (index, field, value) => {
    const updatedAnswerChoices = [...createdQuestion.answerChoices];
    updatedAnswerChoices[index][field] = value;
    
    setCreatedQuestion((previousData) => ({
      ...previousData,
      answerChoices: updatedAnswerChoices,
    }));
  };
  
  const handleCreateQuestion = (e) =>{
    // addQuestion(createdQuestion)
  }
  return (
    <div className="questionCreateContainer">
      <h1>Question</h1>
      <form >
        <input
          type="text"
          name="question"
          placeholder="Enter a question"
          value={createdQuestion.question}
          onChange={handleQuestionInput}
          readonly
        />
        <div>
          {createdQuestion.answerChoices.map((choice, index) => (
            <div key={index}>
              <input type="text" value={choice.Label} readonly disabled />
              <input
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
              <input
                type="text"
                placeholder={`Answer for Choice ${choice.Label}`}
                value={choice.Answer}
                onChange={(e) =>
                  handleAnswerChoiceChange(index, "Answer", e.target.value)
                }
                required
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={handleCreateQuestion}>Submit</button>
      </form>
    </div>
  );
}
