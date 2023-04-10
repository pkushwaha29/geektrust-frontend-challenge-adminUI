import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { TableContainer, Paper, AppBar, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchBar from './components/search-bar/search-bar.component';
import EditDialog from './components/edit-dialog/edit-dialog.component';
import UserTable from './components/user-table/user-table.component';

// Creating custom theme
const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    neutral: {
      main: "white"
    }
  },
});

function App() {
  // State variables
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingUser, setEditingUser] = useState(null);

  // Fetching users data from API and setting the state
  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      setUsers(response.data);
    }
    fetchUsers();
  }, []);

  // Handling change in search text
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setPage(0);
  };

  // Handling row click in user table
  const handleRowClick = (user) => {
    const selectedIndex = selected.indexOf(user);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, user);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  // Checking if a user is selected
  const isSelected = (user) => selected.indexOf(user) !== -1;

  // Handling delete of selected users
  const handleDeleteSelected = () => {
    setUsers(users.filter((user) => !selected.includes(user)));
    setSelected([]);
  };

  // Handling delete of a user
  const handleDelete = (user) => {
    setUsers(users.filter((u) => u.id !== user.id));
    setSelected(selected.filter((u) => u.id !== user.id));
  };

  // Handling change in page number
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handling change in number of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Setting the editing user
  const handleEdit = (user) => {
    setEditingUser(user);
  };

   // Handling save after editing user data in edit user dialog
  const handleEditSave = () => {
    setUsers(users.map((user) => {
      if (user.id === editingUser.id) {
        return editingUser;
      }
      return user;
    }));
    setEditingUser(null);
  };

  // Handling cancel in edit user dialog
  const handleEditCancel = () => {
    setEditingUser(null);
  };


  // Handling any field change in edit user dialog
  const handleFieldChange = (fieldName, value) => {
    setEditingUser({ ...editingUser, [fieldName]: value })
  };

  // Filtering users based on name, email, and role
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.role.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [users, searchText]);

  // calculating number of empty rows if rows are less than page size
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredUsers.length - page * rowsPerPage);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar variant="regular" sx={{ marginY: '10px' }}>
          <SearchBar searchText={searchText} handleSearchChange={handleSearchChange} />
        </Toolbar>
      </AppBar>

      <TableContainer component={Paper} >
        <UserTable
          emptyRows={emptyRows}
          users={filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          selected={selected}
          setSelected={setSelected}
          handleRowClick={handleRowClick}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleDeleteSelected={handleDeleteSelected}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          filteredUsers={filteredUsers}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </TableContainer >

      {editingUser &&
        <EditDialog
          open={true}
          editingUser={editingUser}
          handleFieldChange={handleFieldChange}
          handleEditSave={handleEditSave}
          handleEditCancel={handleEditCancel} />
      }

    </ThemeProvider>
  );
}

export default App;