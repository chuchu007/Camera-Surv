import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const userList = await Auth.listUsers();
        setUsers(userList.Users);
      } catch (error) {
        console.log('Error fetching users', error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.Username}>
            <p>Username: {user.Username}</p>
            <p>Email: {user.Attributes.find(attr => attr.Name === 'email').Value}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
