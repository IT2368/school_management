// src/components/ExamPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExamForm from './ExamForm';
import './ExamPage.css';

function ExamPage() {
  const [exams, setExams] = useState([]);
  const [editExam, setEditExam] = useState(null);

  const fetchExams = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/exams");
      setExams(res.data);
    } catch (err) {
      console.error("Error fetching exams", err);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/exams/${id}`);
      fetchExams();
    } catch (err) {
      alert("Failed to delete exam");
    }
  };

  const handleEdit = (exam) => {
    setEditExam(exam);
  };

  const handleFormSubmit = async (data, isEdit) => {
    if (isEdit) {
      await axios.put(`http://localhost:5000/api/exams/${data._id}`, data);
      setEditExam(null);
    } else {
      await axios.post("http://localhost:5000/api/exams", data);
    }
    fetchExams();
  };

  return (
    <div className="exam-page">
      <h2>📘 Exam Module</h2>
      <ExamForm
        onSubmit={handleFormSubmit}
        initialData={editExam}
        isEditing={!!editExam}
        onCancelEdit={() => setEditExam(null)}
      />
      <h3>All Exams</h3>
      <ul className="exam-list">
        {exams.map(exam => (
          <li key={exam._id}>
            <div>
              <strong>{exam.title}</strong> - {exam.subject} - Class {exam.class}<br />
              📅 {new Date(exam.examDate).toDateString()} | ⏱ {exam.duration} | 📝 {exam.totalMarks} marks
            </div>
            <div className="exam-buttons">
              <button className="edit-btn" onClick={() => handleEdit(exam)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(exam._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExamPage;
