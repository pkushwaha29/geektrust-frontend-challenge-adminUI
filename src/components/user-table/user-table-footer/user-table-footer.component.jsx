import React from 'react';
import { Grid, Button, TablePagination } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const UserTableFooter = ({ handleDeleteSelected, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, selected, filteredUsers }) => {
    return (
        <Grid container spacing={2} marginY={1} paddingX={2}>
            <Grid item xs={6}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: 2 }}
                    startIcon={<DeleteIcon />}
                    disabled={selected.length === 0}
                    onClick={handleDeleteSelected}
                >
                    Delete selected
                </Button>
            </Grid>
            <Grid item xs={6}>
                <TablePagination showFirstButton showLastButton
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </Grid>
    );
};

export default UserTableFooter;
