export default function questionCreate() {
  const [createdQuestion, setCreatedQuestion] = useState({
    question: "",
    answerChoices: [],
    testId: localStorage.getItem("newTestId"),
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(props.URL + "/add-question", createdQuestion);
      console.log("question post successful", response);
    } catch (error) {
      console.error("error posting test", error);
    }
  };

  const handleQuestionInput = (event) => {
    const { value } = event.target;
    setCreatedQuestion((previousData) => ({
      ...previousData,
      question: value,
    }));
  };

  return <></>;
}
