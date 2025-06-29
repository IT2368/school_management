import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExamList() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/exams")
      .then(res => setExams(res.data));
  }, []);

  const deleteExam = (id) => {
    axios.delete(`http://localhost:5000/api/exams/${id}`)
      .then(() => setExams(exams.filter(e => e._id !== id)));
  };

  return (
    <div>
      <h2>Exam List</h2>
      {exams.map(exam => (
        <div key={exam._id}>
          {exam.title} - {exam.subject} - {new Date(exam.examDate).toDateString()}
          <button onClick={() => deleteExam(exam._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ExamList;
