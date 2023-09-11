import React, { useState } from 'react';
import axios from 'axios';
import "./main.css";

export default function QuestionCreate(props) {
  const [createdQuestion, setCreatedQuestion] = useState({
    question: '',
    answerChoices: [
      { Label: 'A', Score: 1, Answer: '' },
      { Label: 'B', Score: 1, Answer: '' },
      { Label: 'C', Score: 1, Answer: '' },
      { Label: 'D', Score: 1, Answer: '' },
    ],
    testId: localStorage.getItem('newTestId'),
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(props.URL + 'questions/add-question', createdQuestion);
      console.log('Question post successful', response);
    } catch (error) {
      console.error('Error posting question', error);
    }
  };

  const handleQuestionInput = (event) => {
    const { name, value } = event.target;
    setCreatedQuestion((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  console.log(createdQuestion)

  const handleAnswerChoiceChange = (index, field, value) => {
    const updatedAnswerChoices = [...createdQuestion.answerChoices];
    updatedAnswerChoices[index][field] = value;

    setCreatedQuestion((previousData) => ({
      ...previousData,
      answerChoices: updatedAnswerChoices,
    }));
  };

  return (
    <div className="questionCreateContainer">
      <h1>Question one</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="question"
          placeholder="Enter a question"
          value={createdQuestion.question}
          onChange={handleQuestionInput}
        />
        <div>
          {createdQuestion.answerChoices.map((choice, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder={`Label for Choice ${choice.Label}`}
                value={choice.Label}
                onChange={(e) => handleAnswerChoiceChange(index, 'Label', e.target.value)}
              />
              <input
                type="number"
                placeholder={`Score for Choice ${choice.Label}`}
                value={choice.Score}
                onChange={(e) => handleAnswerChoiceChange(index, 'Score', parseInt(e.target.value))}
              />
              <input
                type="text"
                placeholder={`Answer for Choice ${choice.Label}`}
                value={choice.Answer}
                onChange={(e) => handleAnswerChoiceChange(index, 'Answer', e.target.value)}
              />
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
