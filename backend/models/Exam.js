const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: String,
  subject: String,
  class: String,
  examDate: Date,
  duration: String,
  totalMarks: Number
});

module.exports = mongoose.model('Exam', examSchema);
