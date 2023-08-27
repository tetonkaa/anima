import axios from "axios";
import { useState, useEffect } from "react";
export default function CreatePage(props) {
  const [testData, setTestData] = useState({
    //create default test state
    testName: "",
    description: "",
    results: [
      { a: "", imagelink: "" },
      { b: "", imagelink: "" },
      { c: "", imagelink: "" },
      { d: "", imagelink: "" },
    ],
    testPic: "",
    user: "",
  });

  useEffect(() => {
    if (Object.keys(props.user).length > 0) {
      setTestData((testData) => {
        const value = props.user[Object.keys(props.user)[4]];
        return { ...testData, user: value };
      });
      console.log(testData.user + "User assigned to test create");
      console.log(props.user[Object.keys(props.user)[4]] + "log in on create");
    } else {
      console.log("not signed in");
      console.log(testData.user);
    }
  }, [props.user]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(props.URL + "create", testData);
      console.log("test post successful" + response.data);
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
    <>
      <form onSubmit={handleFormSubmit} className="createTestForm">
        <div className="mb-6">
          <label
            htmlFor="testName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Test Name:
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
            Description:
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
            Cover Image
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

        <div class="mb-6">
          Results
          {/* Input for 'a' */}
          <input
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            type="text"
            name="a"
            value={testData.results[0].a}
            onChange={(e) => handleFormInput(e, 0)}
            placeholder="Enter value for 'a'"
            required
          />
          {/* Input for 'imagelink' */}
          <input
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            type="text"
            name="imagelink"
            value={testData.results[0].imagelink}
            onChange={(e) => handleFormInput(e, 0)}
            placeholder="Enter image link"
            required
          />
        </div>

        <div class="mb-6">
          {/* Input for 'b' */}
          <input
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            type="text"
            name="b"
            value={testData.results[1].b}
            onChange={(e) => handleFormInput(e, 1)}
            placeholder="Enter value for 'b'"
            required
          />

          {/* Input for 'imagelink' */}
          <input
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            type="text"
            name="imagelink"
            value={testData.results[1].imagelink}
            onChange={(e) => handleFormInput(e, 1)}
            placeholder="Enter image link"
            required
          />
        </div>

        <div class="mb-6">
          {/* Input for 'c' */}
          <input
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            type="text"
            name="c"
            value={testData.results[2].c}
            onChange={(e) => handleFormInput(e, 2)}
            placeholder="Enter value for 'c'"
            required
          />

          {/* Input for 'imagelink' */}
          <input
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            type="text"
            name="imagelink"
            value={testData.results[2].imagelink}
            onChange={(e) => handleFormInput(e, 2)}
            placeholder="Enter image link"
            required
          />
        </div>

        <div>
          {/* Input for 'd' */}
          <input
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            type="text"
            name="d"
            value={testData.results[3].d}
            onChange={(e) => handleFormInput(e, 3)}
            placeholder="Enter value for 'd'"
            required
          />

          {/* Input for 'imagelink' */}
          <input
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            type="text"
            name="imagelink"
            value={testData.results[3].imagelink}
            onChange={(e) => handleFormInput(e, 3)}
            placeholder="Enter image link"
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
