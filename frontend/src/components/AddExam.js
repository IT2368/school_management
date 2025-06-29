import React, { useState } from 'react';
import axios from 'axios';

function AddExam() {
  const [exam, setExam] = useState({
    title: "", subject: "", class: "", examDate: "", duration: "", totalMarks: ""
  });

  const handleChange = (e) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/exams", exam)
      .then(() => alert("Exam Added!"))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" onChange={handleChange} placeholder="Title" required /><br />
      <input name="subject" onChange={handleChange} placeholder="Subject" required /><br />
      <input name="class" onChange={handleChange} placeholder="Class" required /><br />
      <input type="date" name="examDate" onChange={handleChange} required /><br />
      <input name="duration" onChange={handleChange} placeholder="Duration" required /><br />
      <input type="number" name="totalMarks" onChange={handleChange} placeholder="Total Marks" required /><br />
      <button type="submit">Add Exam</button>
    </form>
  );
}

export default AddExam;
