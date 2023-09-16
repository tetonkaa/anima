import React, { useState } from "react";
import axios from "axios";
import "./main.css";
import QuestionCreateComponent from "../../components/questionCreateComponent/questionCreateComponent";

export default function QuestionCreate(props) {
  const [createdQuestions, setCreatedQuestions] = useState([]);
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

  // const addQuestion = (createdQuestion) => {
  //   // Add the question to the createdQuestions array
  //   setCreatedQuestions({...createdQuestions, createdQuestion});
  // };

  let handleAddForm = (e) => {
    e.preventDefault();
    setQuestionForms([
      ...questionForms,
      <QuestionCreateComponent key={questionForms.length} />,
    ]);
  };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       props.URL + "questions/add-question",
  //       createdQuestion
  //     );
  //     console.log("Question post successful", response);
  //   } catch (error) {
  //     console.error("Error posting question", error);
  //   }
  // };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // You can now access the createdQuestions state here
      console.log("Created Questions:", createdQuestions);

      // Use axios to post the questions to the server here
      // ...
    } catch (error) {
      console.error("Error posting questions", error);
    }
  };

  console.log(createdQuestions);

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

  const handleAnswerChoiceChange = (index, field, value) => {
    const updatedAnswerChoices = [...createdQuestion.answerChoices];
    updatedAnswerChoices[index][field] = value;

    setCreatedQuestion((previousData) => ({
      ...previousData,
      answerChoices: updatedAnswerChoices,
    }));
  };

  const handleCreateQuestion = (e) => {
    // addQuestion(createdQuestion)
  };
  const [questionForms, setQuestionForms] = useState([
    <QuestionCreateComponent
      handleQuestionInput={handleQuestionInput}
      handleAnswerChoiceChange={handleAnswerChoiceChange}
      handleCreateQuestion={handleCreateQuestion}
      createdQuestion={createdQuestion}
      key={0}
    />,
  ]);
  return (
    <div class="questionAddPageContainer">
      <form>
        {questionForms}
        <button onClick={handleAddForm}>ADD QUESTION</button>
      </form>
      <button type="submit" onClick={handleFormSubmit}>
        Finish Questions
      </button>
    </div>
  );
}
