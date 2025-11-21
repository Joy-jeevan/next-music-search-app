import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { AppDispatch, RootState } from '../store/store';
import { fetchResults, resetSearch, setQuery } from '../store/searchSlice';

const SearchForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: RootState) => state.search.query);
  const [localQuery, setLocalQuery] = useState(query);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      dispatch(setQuery(localQuery));
      dispatch(resetSearch());
      dispatch(fetchResults({ term: localQuery, offset: 0 }));
    }
  };

  const handleClearInput = () => {
    setLocalQuery('');
  };

  const handleReset = () => {
    setLocalQuery('');
    dispatch(setQuery(''));
    dispatch(resetSearch());
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'center', p: 3, position: 'sticky', top: 0, zIndex: 100, bgcolor: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
      <TextField
        aria-label="Search for artists, albums, or songs"
        placeholder="Search for artists, albums, or songs..."
        fullWidth
        variant="outlined"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        sx={{ maxWidth: 600 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: localQuery && (
              <InputAdornment position="end">
                <IconButton onClick={handleClearInput} edge="end" aria-label="clear search">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
            sx: { borderRadius: 0 }
          }
        }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ ml: 2, borderRadius: 0, px: 4 }}>
        SEARCH
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleReset} sx={{ ml: 2, borderRadius: 0, px: 4 }}>
        RESET
      </Button>
    </Box>
  );
};

export default SearchForm;
