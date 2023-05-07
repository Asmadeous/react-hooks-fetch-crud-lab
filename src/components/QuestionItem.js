import React, { useState } from "react";

function QuestionItem({ question, onDelete, setQuestions }) {
  const { id, prompt, answers, correctIndex } = question;

  const [newIndex, setNewIndex] = useState(correctIndex);

  function deleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then((r) => r.json())
      .then(() => onDelete(question));
  }

  function updateClick(event) {
    const newCorrectIndex = parseInt(event.target.value);
    setNewIndex(newCorrectIndex);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        correctIndex: newCorrectIndex,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setQuestions((questions) => {
          const updatedQuestions = questions.map((q) => {
            if (q.id === data.id) {
              return data;
            } else {
              return q;
            }
          });
          return updatedQuestions;
        });
      });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={updateClick}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={deleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

