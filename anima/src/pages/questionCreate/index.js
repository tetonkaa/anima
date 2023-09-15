import React, { useState } from "react";
import axios from "axios";
import "./main.css";
import QuestionCreateComponent from "../../components/questionCreateComponent/questionCreateComponent";


export default function QuestionCreate(props) {
const [questionForms, setQuestionForms] = useState([<QuestionCreateComponent URL={props.URL} key={0} />])
const [createdQuestions, setCreatedQuestions] = useState([]);

// const addQuestion = (createdQuestion) => {
//   // Add the question to the createdQuestions array
//   setCreatedQuestions({...createdQuestions, createdQuestion});
// };


let handleAddForm = (e) => {
  e.preventDefault()
  setQuestionForms([...questionForms,<QuestionCreateComponent key={questionForms.length}/>]);
}

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


  console.log(createdQuestions)

  return (
    <div class="questionAddPageContainer">
      <QuestionCreateComponent URL={props.URL} />
      <form>
        {questionForms}
        <button onClick={handleAddForm}>ADD QUESTION</button>
      </form>
      <button type="submit" onClick={handleFormSubmit}>Finish Questions</button>
    </div>
  );
}
