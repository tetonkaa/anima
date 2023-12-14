import React, { useState } from "react";
import axios from "axios";
import "./main.css";
import { useNavigate } from "react-router-dom";
import QuestionCreateComponent from "../../components/questionCreateComponent/questionCreateComponent";

export default function QuestionCreate(props) {
  const [createdQuestions, setCreatedQuestions] = useState([]);
  

  const navigate = useNavigate();

  const handleQuestionData = (data) => {
    console.log("created question", data);
    setCreatedQuestions((previousQuestions) => [...previousQuestions, data]);
  };

  const [numQuestionForms, setNumQuestionForms] = useState(1);

  const handleAddForm = (e) => {
    e.preventDefault();
    setNumQuestionForms((prevNum) => prevNum + 1);
  };

  const handleDeleteForm = (index) => {
    if (numQuestionForms > 1) {
      setNumQuestionForms((prevNum) => prevNum - 1);
      setCreatedQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions.splice(index, 1);
        return updatedQuestions;
      });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        props.URL + "questions/add-question",
        createdQuestions
        );

      console.log("Question post successful", response);
      // Navigate to the desired page after submitting questions

      navigate("/test");
    } catch (error) {
      console.error("Error posting question", error);
    }
  };

  return (
    <div className="questionAddPageContainer">
      {[...Array(numQuestionForms)].map((_, index) => (
        <QuestionCreateComponent
          key={index}
          sendDataToParent={handleQuestionData}
          onDeleteQuestion={() => handleDeleteForm(index)}
          numQuestionForms={numQuestionForms}
        />
      ))}
      <form>
        {/* Any additional form-related elements go here */}
      </form>
      <button onClick={handleAddForm}>ADD QUESTION</button>
      <button onClick={handleFormSubmit}>Finish Questions</button>
    </div>
  );
}

