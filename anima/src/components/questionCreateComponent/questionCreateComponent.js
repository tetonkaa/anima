import React, { useState } from "react";
import axios from "axios";
import "./main.css";

export default function QuestionCreateComponent({URL, props, addQuestion, sendDataToParent} ) {
  const resultsData = localStorage.getItem("createdResults");
  const parsedResults = JSON.parse(resultsData);

  const firstResult = parsedResults[0];
  const secondResult = parsedResults[1];
  const thirdResult = parsedResults[2];
  const fourthResult = parsedResults[3];
  const keysOfFirstResult = Object.keys(firstResult);
  const placerHolderText0 = keysOfFirstResult[0];

  const keysOfSecondResult = Object.keys(secondResult);
  const placerHolderText1 = keysOfSecondResult[0];

  console.log(parsedResults);

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

  const setQuestionClick = (e) => {
    e.preventDefault();
    sendDataToParent (createdQuestion);
  };
  return (
    <div className="questionCreateContainer">
      <h1>Question</h1>
      <form>
        <input
          type="text"
          name="question"
          placeholder="Enter a question"
          value={createdQuestion.question}
          onChange={handleQuestionInput}
          readonly
        />
        <div>
          <input
            type="text"
            value={createdQuestion.answerChoices[0].Label}
            readonly
            disabled
          />
          <input
            type="number"
            placeholder={`Score for Choice ${createdQuestion.answerChoices[0].Label}`}
            value={createdQuestion.answerChoices[0].Score}
            onChange={(e) =>
              handleAnswerChoiceChange(0, "Score", parseInt(e.target.value))
            }
            required
          />
          <input
            type="text"
            placeholder={`Answer for Choice ${firstResult.a}`}
            value={createdQuestion.answerChoices[0].Answer}
            onChange={(e) =>
              handleAnswerChoiceChange(0, "Answer", e.target.value)
            }
            required
          />
        </div>

        <div>
          <input
            type="text"
            value={createdQuestion.answerChoices[1].Label}
            readonly
            disabled
          />
          <input
            type="number"
            placeholder={`Score for Choice ${createdQuestion.answerChoices[1].Label}`}
            value={createdQuestion.answerChoices[1].Score}
            onChange={(e) =>
              handleAnswerChoiceChange(1, "Score", parseInt(e.target.value))
            }
            required
          />
          <input
            type="text"
            placeholder={`Answer for Choice ${secondResult.b}`}
            value={createdQuestion.answerChoices[1].Answer}
            onChange={(e) =>
              handleAnswerChoiceChange(1, "Answer", e.target.value)
            }
            required
          />
        </div>

        <div>
          <input
            type="text"
            value={createdQuestion.answerChoices[2].Label}
            readonly
            disabled
          />
          <input
            type="number"
            placeholder={`Score for Choice ${createdQuestion.answerChoices[2].Label}`}
            value={createdQuestion.answerChoices[2].Score}
            onChange={(e) =>
              handleAnswerChoiceChange(2, "Score", parseInt(e.target.value))
            }
            required
          />
          <input
            type="text"
            placeholder={`Answer for Choice ${thirdResult.c}`}
            value={createdQuestion.answerChoices[2].Answer}
            onChange={(e) =>
              handleAnswerChoiceChange(2, "Answer", e.target.value)
            }
            required
          />
        </div>

        <div>
          <input
            type="text"
            value={createdQuestion.answerChoices[3].Label}
            readonly
            disabled
          />
          <input
            type="number"
            placeholder={`Score for Choice ${createdQuestion.answerChoices[3].Label}`}
            value={createdQuestion.answerChoices[3].Score}
            onChange={(e) =>
              handleAnswerChoiceChange(3, "Score", parseInt(e.target.value))
            }
            required
          />
          <input
            type="text"
            placeholder={`Answer for Choice ${fourthResult.d}`}
            value={createdQuestion.answerChoices[3].Answer}
            onChange={(e) =>
              handleAnswerChoiceChange(3, "Answer", e.target.value)
            }
            required
          />
        </div>
        <button onClick={setQuestionClick}>Send Data to Parent</button>
      </form>
    </div>
  );
}
