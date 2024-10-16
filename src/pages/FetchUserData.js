import React, { useState, useEffect } from 'react';

const FetchUserData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>{`${user.firstName} ${user.lastName} - ${user.email}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchUserData;
