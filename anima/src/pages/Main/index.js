"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./main.css";
import { Routes, Route, Link } from "react-router-dom";
import {ReactComponent as Loading} from '../../assets/loading.svg'
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
      <>
        {tests.slice(0, 4).map((test, i) => {
          return (
            <div class="">
            <Link
              to="/test"
              key={test._id}
              href="#"
              className="flex mainPageCards flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={() => handleTestNavigator(test._id)}
            >
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={test.testPic}
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {test.testName}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {test.description}
                </p>
              </div>
            </Link>
            </div>
          );
        })}
      </>
    );
  }

  return tests.length > 0 ? (
    loaded()
  ) : (
    <div className="loadingSvg">
      {/* <h1 className=" loader animate__animated animate__pulse animate__infinite 	infinite"> Loading...</h1> */}
    <Loading />
    </div>
  );
}
