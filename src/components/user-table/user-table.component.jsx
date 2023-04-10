import React from 'react';
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import UserTableFooter from './user-table-footer/user-table-footer.component';

const UserTable = ({ users, emptyRows, selected, handleRowClick, handleDelete, handleEdit, handleDeleteSelected, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, filteredUsers, setSelected }) => {
    const isSelected = (user) => selected.indexOf(user) !== -1;
    const headerRowStyle = {
        fontWeight:'700',
        fontSize:'20px'
    }
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={selected.length > 0 && selected.length < users.length}
                                checked={selected.length === users.length}
                                onChange={() => {
                                    if (selected.length === users.length) {
                                        setSelected([]);
                                    } else {
                                        setSelected(users);
                                    }
                                }}
                                inputProps={{ 'aria-label': 'select all members' }}
                            />
                        </TableCell>
                        <TableCell sx={headerRowStyle}>Name</TableCell>
                        <TableCell sx={headerRowStyle}>Email</TableCell>
                        <TableCell sx={headerRowStyle}>Role</TableCell>
                        <TableCell sx={headerRowStyle} align='right'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => {
                        const isUserSelected = isSelected(user);
                        return (
                            <TableRow
                                key={user.id}
                                hover
                                onClick={() => handleRowClick(user)}
                                role="checkbox"
                                aria-checked={isUserSelected}
                                selected={isUserSelected}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox checked={isUserSelected} />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</TableCell>
                                <TableCell align='right'>
                                    <IconButton
                                        aria-label="edit"
                                        color="primary"
                                        onClick={() => handleEdit(user)}
                                        size="small"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        color="secondary"
                                        onClick={() => handleDelete(user)}
                                        size="small"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 56 * emptyRows }}>
                            <TableCell colSpan={5} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <UserTableFooter
                handleDeleteSelected={handleDeleteSelected}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                page={page}
                filteredUsers={filteredUsers}
                selected={selected}
                rowsPerPage={rowsPerPage}
            />
        </>
    );
};

export default UserTable;
