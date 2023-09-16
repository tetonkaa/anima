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
      { a: "", image: "" },
      { b: "", image: "" },
      { c: "", image: "" },
      { d: "", image: "" },
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

  const handleNextClick = () => {
    // You can add validation logic here if needed
    // For example, if the current step is the description and you want to ensure it's not empty.

    // Move to the next step
    setCurrentInputField(currentInputField + 1);
  };

  const handleBackClick = () => {
    setCurrentInputField(currentInputField - 1);
  };

  const renderCurrentInputField = () => {
    switch (currentInputField) {
      case 1:
        return (
          <>
            <h2>
              <Typewriter
                options={{
                  strings: ["Create a Test"],
                  autoStart: true,
                  loop: false,
                  deleteSpeed: 1000000000,
                  cursor: "~",
                  delay: 40
                }}
              />
            </h2>
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
          <div className="createInputFieldContainer" id="descriptionInput">
            <h2>
              {" "}
              <Typewriter
                options={{
                  strings: ["Add a description"],
                  autoStart: true,
                  loop: false,
                  deleteSpeed: 1000000000,
                  cursor: "~",
                  delay: 40
                }}
              />
            </h2>

            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="enter description for test... ie --This test is used to determine what kind of test you enjoy most!"
              required
              type="text"
              name="description"
              value={testData.description}
              onChange={handleDescriptionInput}
            />
          </div>
        );
      case 3:
        return (
          <div className="resultsFormContainer">
            <h2>Cover Image:</h2>

            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter link for test display image/icon"
              required
              type="text"
              name="testPic"
              value={testData.testPic}
              onChange={handleTestPicInput}
            />
          </div>
        );
      case 4:
        return (
          <>
            <h2>Results:</h2>
            <div className="resultsFormContainer">
              <div>
                {/* Input for 'a' */}
                <input
                  type="text"
                  name="a"
                  value={testData.results[0].a}
                  onChange={(e) => handleFormInput(e, 0)}
                  placeholder="Enter value for 'a'"
                  required
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

              <div class="mb-6">
                {/* Input for 'b' */}
                <input
                  type="text"
                  name="b"
                  value={testData.results[1].b}
                  onChange={(e) => handleFormInput(e, 1)}
                  placeholder="Enter value for 'b'"
                  required
                />

                {/* Input for 'image' */}
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="image"
                  value={testData.results[1].image}
                  onChange={(e) => handleFormInput(e, 1)}
                  placeholder="Enter image link"
                  required
                />
              </div>

              <div class="mb-6">
                {/* Input for 'c' */}
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="c"
                  value={testData.results[2].c}
                  onChange={(e) => handleFormInput(e, 2)}
                  placeholder="Enter value for 'c'"
                  required
                />

                {/* Input for 'image' */}
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="image"
                  value={testData.results[2].image}
                  onChange={(e) => handleFormInput(e, 2)}
                  placeholder="Enter image link"
                  required
                />
              </div>

              <div>
                {/* Input for 'd' */}
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="d"
                  value={testData.results[3].d}
                  onChange={(e) => handleFormInput(e, 3)}
                  placeholder="Enter value for 'd'"
                  required
                />

                {/* Input for 'image' */}
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="image"
                  value={testData.results[3].image}
                  onChange={(e) => handleFormInput(e, 3)}
                  placeholder="Enter image link"
                  required
                />
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

  return (
    <div className="masterPageContainer createPage">
      <form onSubmit={handleFormSubmit} className="createTestForm">
        {/* Render the current step */}
        {renderCurrentInputField()}

        {/* NEXT button */}
        {currentInputField < 4 && (
          <button
            className="boldThing text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            onClick={handleNextClick}
            disabled={!isNextButtonEnabled}
          >
            NEXT
          </button>
        )}

        {/* Submit button */}
        {currentInputField === 4 && (
          <button
            className="submit-button"
            type="submit"
            disabled={!isNextButtonEnabled}
          >
            Add Questions
          </button>
        )}
      </form>
    </div>
  );
}
