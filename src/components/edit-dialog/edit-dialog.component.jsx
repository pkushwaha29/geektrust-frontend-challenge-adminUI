import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { TextField } from '@mui/material';

const EditDialog = ({ editingUser, open, handleEditSave, handleEditCancel, handleFieldChange }) => {

  return (
    <Dialog open={open}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          fullWidth
          value={editingUser.name}
          onChange={(event) =>
            handleFieldChange('name', event.target.value)
          }
        />
        <TextField
          margin="dense"
          id="email"
          label="Email"
          fullWidth
          value={editingUser.email}
          onChange={(event) =>
            handleFieldChange('email', event.target.value)
          }
        />
        <TextField
          margin="dense"
          id="role"
          label="Role"
          fullWidth
          value={editingUser.role}
          onChange={(event) =>
            handleFieldChange('role', event.target.value)
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleEditSave} variant='contained' color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;