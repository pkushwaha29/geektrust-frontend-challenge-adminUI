import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

function SearchBar(props) {
  const { searchText, handleSearchChange } = props;

  return (
    <TextField
      color="neutral"
      label="Search by name, email or role"
      value={searchText}
      onChange={handleSearchChange}
      sx={{ "fieldset": { borderColor: 'white' }, width: '100%', color: 'white' }}
      InputLabelProps={{ style: { color: 'white' } }}
      InputProps={{
        style: { color: "white" },
        startAdornment: (
          <InputAdornment position="start" color="neutral">
            <SearchIcon color="neutral" />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;