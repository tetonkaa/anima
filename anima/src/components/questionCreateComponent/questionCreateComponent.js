import React, { useState } from "react";
import "./main.css";

export default function QuestionCreateComponent({
  handleQuestionInput,
  handleAnswerChoiceChange,
  handleCreateQuestion,
  createdQuestion,
  ...props
}) {
  
  return (
    <div className="questionCreateContainer">
      <h1>Question</h1>
      <form>
        <input
          type="text"
          name="question"
          placeholder="Enter a question"
          onChange={handleQuestionInput}
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
        <button type="button" onClick={handleCreateQuestion}>
          Submit
        </button>
      </form>
    </div>
  );
}
