import axios from "axios";
import { useState, useEffect } from "react";
import "./main.css";
import { Link, useNavigate } from "react-router-dom";
import QuestionCreateComponent from "../../components/questionCreateComponent/questionCreateComponent";
import Typewriter from "typewriter-effect";

export default function CreatePage(props) {
  const [testData, setTestData] = useState({
    //create default test state
    testName: "",
    description: "",
    results: [
      { a: "Persona 1", image: "" },
      { b: "Persona 2", image: "" },
      { c: "Persona 3", image: "" },
      { d: "Persona 4", image: "" },
    ],
    testPic: "",
    user: "",
  });
  const [currentInputField, setCurrentInputField] = useState(1);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(props.user).length > 0) {
      setTestData((testData) => {
        const value = props.user.uid;
        return { ...testData, user: value };
      });
      console.log(testData.user + "User assigned to test create");
      console.log(props.user.uid + "log in on create");
    } else {
      console.log("not signed in");
      console.log(testData.user);
    }
  }, [props.user]);

  const handleNextClick = (e) => {
    e.preventDefault();
    setCurrentInputField(currentInputField + 1);
  };

  console.log(currentInputField + "current input field value");

  const handleBackClick = (e) => {
    e.preventDefault();
    setCurrentInputField(currentInputField - 1);
  };

  const renderCurrentInputField = () => {
    const placeholderImages = [
      "https://cdn.discordapp.com/attachments/1110618287924072449/1153925002815610893/tetonka._sillouhette_of_a_woman_akin_to_a_character_card_in_a_v_fb105f0a-a0c3-482c-b23a-662aecb2b317.png",
      "https://cdn.discordapp.com/attachments/1110618287924072449/1153936178299543632/tetonka._character_sillouhette_in_modern_clothing_solid_white_b_35ff4178-58dc-4d7e-839a-4fa42ee81671.png",
      "https://cdn.discordapp.com/attachments/1110618287924072449/1153936528205172746/tetonka._sillouhette_of_a_character_akin_to_a_character_card_in_afa4c2ed-e28f-4000-83a8-739907b20168.png",
      "https://cdn.discordapp.com/attachments/1110618287924072449/1153937841240428554/tetonka._sillouhette_of_a_woman_akin_to_a_character_card_in_a_v_e31ccb07-3808-4895-985f-f64383a2e323.png",
    ];

    switch (currentInputField) {
      case 1:
        return (
          <>
            <h2>Create a test</h2>
            <p>
              Pick an interesting test name, describe what the test is about,
              and list the possible personality results.
            </p>
            <div className="createInputFieldContainer" id="testNameInput">
              <input
                className=""
                placeholder="Enter Test name"
                required
                type="text"
                name="testName"
                value={testData.testName}
                onChange={handleTestNameInput}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="createInputFieldContainer" id="descriptionInput">
              <img
                id="imageEffect"
                src={
                  testData.testPic ||
                  "https://cdn.discordapp.com/attachments/1110618287924072449/1154237337694371914/tetonka._paper_and_pen_meant_to_represent_a_test_white_backgrou_2c40e828-46cf-4ba1-9fbb-2ddbf2a41a12.png"
                }
              />
              <h2>Add image link</h2>
              <textarea
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter link for test display image/icon"
                type="text"
                name="testPic"
                value={testData.testPic}
                onChange={handleTestPicInput}
                required
              />
              <h2>Add a description</h2>

              <textarea
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="enter description for test... ie --This test is used to determine what kind of test you enjoy most!"
                type="text"
                name="description"
                value={testData.description}
                onChange={handleDescriptionInput}
                required
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="resultsH2"> Personality Results:</h2>
            <div className="resultsFormContainer">
              <div className="customCard">
                <h3>{testData.results[0].a}</h3>
                <img
                  className="placeholderImage"
                  src={testData.results[0].image || placeholderImages[0]}
                />
                {/* Input for 'a' */}
                <div className="resultInputContainer">
                  <input
                    type="text"
                    name="a"
                    value={testData.results[0].a}
                    onChange={(e) => handleFormInput(e, 0)}
                    placeholder="Personality name"
                    required
                    maxlength="14"
                  />
                  {/* Input for 'image' */}
                  <input
                    type="text"
                    name="image"
                    value={testData.results[0].image}
                    onChange={(e) => handleFormInput(e, 0)}
                    placeholder="Enter image link"
                    required
                  />
                </div>
              </div>

              <div className="customCard">
                <h3>{testData.results[1].b}</h3>
                <img
                  className="placeholderImage"
                  src={testData.results[1].image || placeholderImages[1]}
                />
                <div className="resultInputContainer">
                  <input
                    type="text"
                    name="b"
                    value={testData.results[1].b}
                    onChange={(e) => handleFormInput(e, 1)}
                    placeholder="Personality name"
                    maxlength="14"
                    required
                  />

                  {/* Input for 'image' */}
                  <input
                    type="text"
                    name="image"
                    value={testData.results[1].image}
                    onChange={(e) => handleFormInput(e, 1)}
                    placeholder="Enter image link"
                    required
                  />
                </div>
              </div>

              <div className="customCard">
                <h3>{testData.results[2].c}</h3>
                <img
                  className="placeholderImage"
                  src={testData.results[2].image || placeholderImages[2]}
                />
                <div className="resultInputContainer">
                  <input
                    type="text"
                    name="c"
                    value={testData.results[2].c}
                    onChange={(e) => handleFormInput(e, 2)}
                    placeholder="Personality name"
                    maxlength="14"
                    required
                  />

                  {/* Input for 'image' */}
                  <input
                    type="text"
                    name="image"
                    value={testData.results[2].image}
                    onChange={(e) => handleFormInput(e, 2)}
                    placeholder="Enter image link"
                    required
                  />
                </div>
              </div>

              <div className="customCard">
                <h3>{testData.results[3].d}</h3>
                <img
                  className="placeholderImage"
                  src={testData.results[3].image || placeholderImages[3]}
                />
                <div className="resultInputContainer">
                  <input
                    type="text"
                    name="d"
                    value={testData.results[3].d}
                    onChange={(e) => handleFormInput(e, 3)}
                    placeholder="Personality name"
                    maxlength="14"
                    required
                  />

                  {/* Input for 'image' */}
                  <input
                    type="text"
                    name="image"
                    value={testData.results[3].image}
                    onChange={(e) => handleFormInput(e, 3)}
                    placeholder="Enter image link"
                    required
                  />
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(props.URL + "create", testData);
      console.log("test post successful", response);
      localStorage.setItem("newTestId", response.data._id);
      var resultsJsonString = JSON.stringify(testData.results);
      localStorage.setItem("createdResults", resultsJsonString);
      console.log(testData.results);
      navigate("/question-add");
    } catch (error) {
      console.error("error posting test", error);
    }
  };

  const handleTestNameInput = (event) => {
    const { value } = event.target;
    setTestData((previousData) => ({ ...previousData, testName: value }));
    setIsNextButtonEnabled(value.length > 1);
  };

  const handleDescriptionInput = (event) => {
    const { value } = event.target;
    setTestData((previousData) => ({ ...previousData, description: value }));
    setIsNextButtonEnabled(value.length > 1);
  };

  const handleTestPicInput = (event) => {
    const { value } = event.target;
    setTestData((previousData) => ({ ...previousData, testPic: value }));
    setIsNextButtonEnabled(value.length > 8);
  };

  const handleFormInput = (event, index) => {
    const { name, value } = event.target;

    setTestData((previousData) => {
      const updatedResults = [...previousData.results];
      updatedResults[index][name] = value;
      return { ...previousData, results: updatedResults };
    });
    setIsNextButtonEnabled(value.length > 1);
  };
  console.log(testData);

  return (
    <div className="masterPageContainer createPage">
      <form onSubmit={handleFormSubmit} className="createTestForm">
        {/* Render the current step */}
        {renderCurrentInputField()}

        {currentInputField < 3 && (
          <button
            className="boldThing text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            onClick={handleNextClick}
            disabled={!isNextButtonEnabled}
          >
            NEXT
          </button>
        )}

        {/* Submit button */}
        {currentInputField === 3 && (
          <button
            className="boldThing text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            type="submit"
            disabled={!isNextButtonEnabled}
          >
            Add Questions
          </button>
        )}
        {currentInputField > 1 && (
          <button onClick={handleBackClick}>BACK</button>
        )}
      </form>
    </div>
  );
}
