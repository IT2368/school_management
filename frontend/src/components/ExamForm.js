// src/components/ExamForm.js
import React, { useState, useEffect } from 'react';
import './ExamPage.css';

function ExamForm({ onSubmit, initialData, isEditing, onCancelEdit }) {
  const [exam, setExam] = useState({
    title: "", subject: "", class: "", examDate: "", duration: "", totalMarks: ""
  });

  useEffect(() => {
    if (initialData) {
      setExam(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(exam, isEditing);
    if (!isEditing) {
      setExam({ title: "", subject: "", class: "", examDate: "", duration: "", totalMarks: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="exam-form">
      <h3>{isEditing ? "✏️ Edit Exam" : "➕ Add Exam"}</h3>
      <input name="title" placeholder="Title" value={exam.title} onChange={handleChange} required />
      <input name="subject" placeholder="Subject" value={exam.subject} onChange={handleChange} required />
      <input name="class" placeholder="Class" value={exam.class} onChange={handleChange} required />
      <input type="date" name="examDate" value={exam.examDate?.slice(0, 10)} onChange={handleChange} required />
      <input name="duration" placeholder="Duration" value={exam.duration} onChange={handleChange} required />
      <input type="number" name="totalMarks" placeholder="Total Marks" value={exam.totalMarks} onChange={handleChange} required />
      <button type="submit">{isEditing ? "Update Exam" : "Add Exam"}</button>
      {isEditing && <button type="button" onClick={onCancelEdit} style={{ marginTop: "10px", backgroundColor: "#aaa" }}>Cancel</button>}
    </form>
  );
}

export default ExamForm;
