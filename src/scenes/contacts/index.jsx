import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import Header from "../../components/Header";
import { Box } from "@mui/material";
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
    <Box m="20px">
          {/* HEADER */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Users" subtitle="User management console" />
            </Box>
    </Box>
  );
}

export default UserList;
