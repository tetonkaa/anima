"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./main.css";
import { Routes, Route, Link } from "react-router-dom";
import { ReactComponent as Loading } from "../../assets/loading.svg";
import { ReactComponent as Blob1 } from "../../assets/blob-haikei(1).svg";
import { ReactComponent as Blob2 } from "../../assets/blob-haikei(2).svg";
import { ReactComponent as Blob3 } from "../../assets/blob-haikei(3).svg";
import { ReactComponent as Blob4 } from "../../assets/blob-haikei(4).svg";
export default function MainPage(props) {
  const [tests, setTests] = useState([]);
  const [testList, setTestList] = useState();

  async function getTestInfo() {
    const { data } = await axios.get(props.URL);
    // console.log(data);
    return data;
  }

  useEffect(() => {
    getTestInfo().then((data) => setTests(data));
  }, []);

  const handleTestNavigator = (testId) => {
    localStorage.setItem("currentTestId", testId);
    props.setTestId(testId);
  };

  useEffect(() => {
    setTestList({ tests }.tests.docs);
    console.log(tests);
  }, [tests]);

  console.log(props.testId);
  function loaded() {
    return (
      <div class="mainPageContainer">
        <div className="mainPageSvg">
          <Blob1 />
          <Blob2 />
          <Blob3 />
          <Blob4 />
        </div>
        {tests.slice(0, 4).map((test, i) => {
          return (
            <div className="mainCardContainer">
              <Link
                to="/test"
                key={test._id}
                href="#"
                className="flex mainPageCards flex-col items-center bg-white rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                onClick={() => handleTestNavigator(test._id)}
              >
                <img
                  className="object-cover w-full rounded-t-lg  md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={test.testPic}
                  alt=""
                />
                <div className="flex flex-col justify-between pl-4 leading-normal">
                  <h5 className="font-bold">
                    {test.testName}
                  </h5>
                  <p className="mb-3">
                    {test.description}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }

  return tests.length > 0 ? (
    loaded()
  ) : (
    <div className="loadingSvg">
      <Loading />
    </div>
  );
}
