import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Students.css'; 

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9292/students')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched students:', data);
        setStudents(data);
      })
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  return (
    <div className="container">
      <h2>Students</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>
                <Link to={`/student/${student.id}`} className="link">
                  {student.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
