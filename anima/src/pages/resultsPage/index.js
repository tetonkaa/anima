export default function ResultsPage(props)
async function getTestResults() {
    const { data } = await axios.get(props.URL + "test-questions/" + thisTest);
    setQuestions(data);
    return data;
  }


{
  return (
    <>
      <h1>Results Page{props.userResult}</h1>
    </>
  );
}
