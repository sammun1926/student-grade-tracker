import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './StudentDetails.css';

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState(null);

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const response = await fetch(`http://localhost:9292/students/${id}`);
      const data = await response.json();
      setStudent(data);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const handleInputChange = (e) => {
    setUpdatedStudent({
      ...updatedStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = () => {
    setEditing(true);
    setUpdatedStudent(student);
  };

  const handleUpdateClick = async () => {
    try {
      const response = await fetch(`http://localhost:9292/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudent),
      });
      if (response.ok) {
        setStudent(updatedStudent);
        setEditing(false);
      }
    } catch (error) {
      console.error('Error updating student details:', error);
    }
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className='card'>
      <h2>Student Details</h2>
      <h3>Name: {student.name}</h3>
      <h3>Student ID: {student.student_id}</h3>
      <h3>Grade: {student.grade}</h3>
      {/* Add any other relevant student details */}
      {editing ? (
        <>
          <input
            type="text"
            name="name"
            value={updatedStudent.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="student_id"
            value={updatedStudent.student_id}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="grade"
            value={updatedStudent.grade}
            onChange={handleInputChange}
          />
          {/* Add other input fields for additional student details */}
          <button onClick={handleUpdateClick}>Update</button>
        </>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
      <Link to="/">Back to Students</Link>
    </div>
  );
};

export default StudentDetails;
