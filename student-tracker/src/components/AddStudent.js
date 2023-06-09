import React, { useState } from 'react';
import './AddStudent.css'; // Import the CSS file

const AddStudent = () => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [grade, setGrade] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newStudent = {
      name,
      studentId,
      grade,
    };

    try {
      const response = await fetch('http://localhost:9292/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        const createdStudent = await response.json();
        console.log(createdStudent); // Assuming the server responds with the newly created student data
      } else {
        console.error('Request failed:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Clear form inputs after submission
    setName('');
    setStudentId('');
    setGrade('');
  };

  return (
    <div className="container">
      <h2>Add Student</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Student ID:</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>
        <div>
          <label>Grade:</label>
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddStudent;
