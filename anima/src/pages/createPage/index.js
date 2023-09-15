import axios from "axios";
import { useState, useEffect } from "react";
import "./main.css";
import { Link, useNavigate } from "react-router-dom";
import QuestionCreateComponent from "../../components/questionCreateComponent/questionCreateComponent";

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
  };

  const handleDescriptionInput = (event) => {
    const { value } = event.target;
    setTestData((previousData) => ({ ...previousData, description: value }));
  };

  const handleTestPicInput = (event) => {
    const { value } = event.target;
    setTestData((previousData) => ({ ...previousData, testPic: value }));
  };

  const handleFormInput = (event, index) => {
    const { name, value } = event.target;

    setTestData((previousData) => {
      const updatedResults = [...previousData.results];
      updatedResults[index][name] = value;
      return { ...previousData, results: updatedResults };
    });
  };

  return (
    <div class="masterPageContainer">
      <form onSubmit={handleFormSubmit} className="createTestForm">
        <button class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
          Help
        </button>
        <div className="mb-6">
          <label
            htmlFor="testName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <h2>Test Name:</h2>
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Test name"
            required
            type="text"
            name="testName"
            value={testData.testName}
            onChange={handleTestNameInput}
          />
        </div>
        <div class="mb-6">
          <label
            for="description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <h2>Description:</h2>
          </label>
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
        <div class="mb-6">
          <label
            for="testPic"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <h2>Cover Image:</h2>
          </label>
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

        {/*result input fields*/}
        <h2>Results:</h2>
        <div className="resultsFormContainer">
          <div>
            {/* Input for 'a' */}
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="a"
              value={testData.results[0].a}
              onChange={(e) => handleFormInput(e, 0)}
              placeholder="Enter value for 'a'"
              required
            />
            {/* Input for 'image' */}
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        <button
          class=" d3Button text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
          type="submit"
        >
          Add Questions
        </button>
      </form>
    </div>
  );
}
