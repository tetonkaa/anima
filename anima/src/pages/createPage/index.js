import axios from "axios";
import { useState, useEffect } from "react";
import "./main.css";
import { useNavigate } from "react-router-dom";

export default function CreatePage(props) {
  const [testData, setTestData] = useState({
    //create default test state
    testName: "",
    category: [],
    description: "",
    results: [
      { a: "Result 1", image: "", link: "" },
      { b: "Result 2", image: "", link: "" },
      { c: "Result 3", image: "", link: "" },
      { d: "Result 4", image: "", link: "" },
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
    e.preventDefault(e);
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
            <div className="startCreateTest" id="testNameInput">
              <p className="text-center">
                Pick an interesting test name, describe what the test is about,
                and list the possible personality results.
              </p>
              <div className="createOptions">
                <input
                  placeholder="Enter test name"
                  required
                  type="text"
                  name="testName"
                  value={testData.testName}
                  onChange={handleTestNameInput}
                />

                <select
                  id="createCategories"
                  name="tags"
                  required
                  onChange={handleCategoryInput}
                >
                  <option value="null" disabled selected>
                    Select test Category
                  </option>
                  <option value="personality">Personality</option>
                  <option value="food">Food</option>
                  <option value="gaming">Gaming</option>
                  <option value="fashion">Fashion</option>
                  <option value="television">Television</option>
                  <option value="technology">Technology</option>
                  <option value="misc">Miscellaneous</option>
                </select>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2>Create a test</h2>
            <div className="createDescription">
              <div
                className="createImage"
                style={{
                  backgroundImage: `url(${
                    testData.testPic ||
                    "https://cdn.discordapp.com/attachments/1110618287924072449/1154237337694371914/tetonka._paper_and_pen_meant_to_represent_a_test_white_backgrou_2c40e828-46cf-4ba1-9fbb-2ddbf2a41a12.png"
                  })`,
                }}
              >
                <h1>This is your test cover image</h1>
              </div>
              <div className="descriptionFields">
                <h2>Add image link</h2>
                <div class="tooltip">
                  <div class="top">
                    <h3>Linking images</h3>
                    <ul>
                      <li>When adding images to D3fine, its best to use dedicated image hosting sites- imgur.com is great for this.</li>
                      <li>Be sure to include the entire image link</li>
                    </ul>
                    <i></i>
                  </div>
                  <textarea
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter link for test display image/icon"
                    type="text"
                    name="testPic"
                    value={testData.testPic}
                    onChange={handleTestPicInput}
                    required
                  />
                </div>
                <h2>Add a description</h2>

                <textarea
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter description for your test."
                  type="text"
                  name="description"
                  value={testData.description}
                  onChange={handleDescriptionInput}
                  required
                />
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="resultsH2"> Personality Results:</h2>
            <div className="resultsFormContainer">
              <div className="customCard">
                <img
                  className="placeholderImage"
                  src={testData.results[0].image || placeholderImages[0]}
                />
                <h3>{testData.results[0].a}</h3>
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
                  <input
                    type="text"
                    name="link"
                    value={testData.results[0].link}
                    onChange={(e) => handleFormInput(e, 0)}
                    placeholder="Enter description link"
                    required
                  />
                </div>
              </div>

              <div className="customCard">
                <img
                  className="placeholderImage"
                  src={testData.results[1].image || placeholderImages[1]}
                />
                <h3>{testData.results[1].b}</h3>
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
                  <input
                    type="text"
                    name="link"
                    value={testData.results[1].link}
                    onChange={(e) => handleFormInput(e, 1)}
                    placeholder="Enter description link"
                    required
                  />
                </div>
              </div>

              <div className="customCard">
                <img
                  className="placeholderImage"
                  src={testData.results[2].image || placeholderImages[2]}
                />
                <h3>{testData.results[2].c}</h3>
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
                  <input
                    type="text"
                    name="link"
                    value={testData.results[2].link}
                    onChange={(e) => handleFormInput(e, 2)}
                    placeholder="Enter description link"
                    required
                  />
                </div>
              </div>

              <div className="customCard">
                <img
                  className="placeholderImage"
                  src={testData.results[3].image || placeholderImages[3]}
                />
                <h3>{testData.results[3].d}</h3>
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
                  <input
                    type="text"
                    name="link"
                    value={testData.results[3].link}
                    onChange={(e) => handleFormInput(e, 3)}
                    placeholder="Enter description link"
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
    setIsNextButtonEnabled(value.length > 1 && testData.category !== "null");
  };

  const handleCategoryInput = (event) => {
    const { value } = event.target;
    setTestData((previousData) => ({ ...previousData, category: value }));
    setIsNextButtonEnabled(value !== "null" && testData.testName.length >= 1);
  };

  const handleDescriptionInput = (event) => {
    const { value } = event.target;
    setTestData((previousData) => ({ ...previousData, description: value }));
    setIsNextButtonEnabled(value.length > 1 && testData.testPic.length > 8);
  };

  const handleTestPicInput = (event) => {
    const { value } = event.target;
    setTestData((previousData) => ({ ...previousData, testPic: value }));
    setIsNextButtonEnabled(value.length > 8 && testData.description.length > 1);
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
    <div className="">
      <div className="svgLinesBg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="1440"
          height="560"
          preserveAspectRatio="none"
          viewBox="0 0 1440 560"
        >
          <g mask='url("#SvgjsMask1123")' fill="none">
            <path
              id="line1"
              d="M875.64-78.29C708.67-50.98 627.01 352.66 356.45 355.8 85.88 358.94-29.02 227.96-162.75 227"
              stroke="rgba(51, 121, 194, 0.58)"
              stroke-width="1"
            ></path>
            <path
              id="line2"
              d="M778.44-4.78C623.85 7.9 515.73 320.22 250.05 320.38-15.63 320.54-135.99 111.53-278.34 107.58"
              stroke="rgba(51, 121, 194, 0.58)"
              stroke-width="3"
            ></path>
            <path
              id="line3"
              d="M1234.37-62.69C1083.09-18.11 1048.4 399.84 816.84 410.19 585.28 420.54 608.08 340.19 399.32 340.19 190.55 340.19 87.63 409.95-18.21 410.19"
              stroke="rgba(51, 121, 194, 0.58)"
              stroke-width="2"
            ></path>
            <path
              id="line4"
              d="M717.07-106.36C621.65-91.92 673.74 119.56 416.52 135.91 159.3 152.26-21.18 388.16-184.59 393.51"
              stroke="rgba(51, 121, 194, 0.58)"
              stroke-width=".7"
            ></path>
            <path
              id="line5"
              d="M1108.82-3.9C969.92 12.83 891.46 322.39 655.99 324.91 420.53 327.43 429.58 254.91 203.17 254.91-23.25 254.91-135.11 324.7-249.66 324.91"
              stroke="rgba(51, 121, 194, 0.58)"
              stroke-width="2"
            ></path>
          </g>
          <defs>
            <mask id="SvgjsMask1123">
              <rect width="1440" height="560" fill="#ffffff"></rect>
            </mask>
          </defs>
        </svg>
      </div>
      <form onSubmit={handleFormSubmit} className="createTestForm">
        {renderCurrentInputField()}

        {currentInputField < 3 && (
          <button
            className="nextButton"
            onClick={handleNextClick}
            disabled={!isNextButtonEnabled}
          >
            <p className="text-button">NEXT</p>
          </button>
        )}

        {currentInputField === 3 && (
          <button
            className="nextButton"
            type="submit"
            disabled={!isNextButtonEnabled}
          >
            <p className="text-button">Next</p>
          </button>
        )}
        {currentInputField > 1 && (
          <button onClick={handleBackClick}>BACK</button>
        )}
      </form>
    </div>
  );
}
