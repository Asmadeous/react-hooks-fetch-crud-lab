import React,{useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions , setQuestions }) {

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((questions) => setQuestions(questions))
  }, [setQuestions])
  
  function deleteHandler(deleteQuestion) {
    const updatedQuestions = questions.filter((question) => question.id !== deleteQuestion.id)
    setQuestions(updatedQuestions)
  }

  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => <QuestionItem key={question.id} question={question} onDelete={deleteHandler} setQuestions={setQuestions} />)}</ul>
    </section>
  );
}

export default QuestionList;
