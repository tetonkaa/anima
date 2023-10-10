import React, { useState } from "react";
import axios from "axios";
import "./main.css";
import QuestionCreateComponent from "../../components/questionCreateComponent/questionCreateComponent";

export default function QuestionCreate(props) {
  const handleQuestionData = (data) => {
    console.log("created question", data);
    setCreatedQuestions((previousQuestions) => {
      // Ensure that previousQuestions is initialized as an array
      const questionsArray = Array.isArray(previousQuestions)
        ? previousQuestions
        : [];

      // Use the spread operator to create a new array with the new question
      return [...questionsArray, data];
    });
  };
  const [questionForms, setQuestionForms] = useState([
    <QuestionCreateComponent
      URL={props.URL}
      sendDataToParent={handleQuestionData}
    />,
  ]);
  const [createdQuestions, setCreatedQuestions] = useState([]);

  // const addQuestion = (createdQuestion) => {
  //   // Add the question to the createdQuestions array
  //   setCreatedQuestions({...createdQuestions, createdQuestion});
  // };

  let handleAddForm = (e) => {
    e.preventDefault();
    setQuestionForms([
      ...questionForms,
      <QuestionCreateComponent
        key={questionForms.length}
        sendDataToParent={handleQuestionData}
      />,
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

  return (
    <div class="questionAddPageContainer">
      <QuestionCreateComponent
        URL={props.URL}
        sendDataToParent={handleQuestionData}
      />
      <form>
        {questionForms}
        <button onClick={handleAddForm}>ADD QUESTION</button>
      </form>
      <button
        type="submit"
        className="boldThing text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
        onClick={handleFormSubmit}
      >
        Finish Questions
      </button>
    </div>
  );
}
