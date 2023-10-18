const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/coaching', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const studentSchema = new mongoose.Schema({
  name: String,
  studentClass: String,  // Changed from 'class' to 'studentClass'
  marks: Number
});

const Student = mongoose.model('Student', studentSchema);

app.use(bodyParser.json());

// Use the cors middleware with default options
app.use(cors());

// Create a new student
app.post('/api/students', async (req, res) => {
  try {
    const { name, studentClass, marks } = req.body;
    const student = new Student({ name, studentClass, marks });
    await student.save();
    res.status(201).json({ success: true, message: 'Student added successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student by ID
app.put('/api/students/:id', async (req, res) => {
  try {
    const { name, studentClass, marks } = req.body;
    const student = await Student.findByIdAndUpdate(req.params.id, { name, studentClass, marks }, { new: true });
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ success: false, message: 'Student not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
