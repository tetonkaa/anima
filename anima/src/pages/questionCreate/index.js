import React, { useState } from "react";
import axios from "axios";
import "./main.css";
import QuestionCreateComponent from "../../components/questionCreateComponent/questionCreateComponent";

export default function QuestionCreate(props) {
const [questionForms, setQuestionForms] = useState([<QuestionCreateComponent key={0} />])
let handleAddForm = (e) => {
  e.preventDefault()
  setQuestionForms([...questionForms,<QuestionCreateComponent key={questionForms.length} />]);
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

  return (
    <div class="questionAddPageContainer">
      <QuestionCreateComponent URL={props.URL} />
      <form>
        {questionForms}
        <button onClick={handleAddForm}>ADD QUESTION</button>
      </form>
      <button type="submit">Finish Questions</button>
    </div>
  );
}
