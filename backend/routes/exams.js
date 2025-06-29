const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');

// Add new exam
router.post('/', async (req, res) => {
  const newExam = new Exam(req.body);
  await newExam.save();
  res.status(201).json(newExam);
});

// Get all exams
router.get('/', async (req, res) => {
  const exams = await Exam.find();
  res.json(exams);
});

// Delete exam
router.delete('/:id', async (req, res) => {
  await Exam.findByIdAndDelete(req.params.id);
  res.json({ message: "Exam deleted" });
});

module.exports = router;
