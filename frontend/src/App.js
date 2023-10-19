import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', studentClass: '', marks: '' });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/students/');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/students/', formData);
      fetchStudents();
      setFormData({ name: '', studentClass: '', marks: '' });
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/students/${id}`, {
        name: formData.name,
        studentClass: formData.studentClass,
        marks: formData.marks
      });
      fetchStudents();
      setFormData({ name: '', studentClass: '', marks: '' });
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const listItemStyle = {
    margin: '10px 0',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const buttonStyle = {
    marginLeft: '10px',
    cursor: 'pointer',
    backgroundColor: '#4cf50',
    color: 'orange',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 16px'
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Coaching Institute Students</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          style={{ padding: '8px', margin: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          name="studentClass"
          placeholder="Class"
          value={formData.studentClass}
          onChange={handleInputChange}
          required
          style={{ padding: '8px', margin: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          name="marks"
          placeholder="Marks"
          value={formData.marks}
          onChange={handleInputChange}
          required
          style={{ padding: '8px', margin: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={buttonStyle}>
          Add Student
        </button>
      </form>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {students.map((student) => (
          <li key={student._id} style={listItemStyle}>
            {student.name} - Class: {student.studentClass}, Marks: {student.marks}
            <button onClick={() => handleUpdate(student._id)} style={buttonStyle}>
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
