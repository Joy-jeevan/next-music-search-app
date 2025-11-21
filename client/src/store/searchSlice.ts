import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { SearchState, SearchResponse } from '../types';

const initialState: SearchState = {
    query: '',
    results: [],
    loading: false,
    error: null,
    hasMore: true,
    offset: 0,
};

export const fetchResults = createAsyncThunk(
    'search/fetchResults',
    async ({ term, offset }: { term: string; offset: number }, { rejectWithValue }) => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
            const response = await axios.get<SearchResponse>(`${apiUrl}/api/search`, {
                params: { term, limit: 10, offset },
            });
            return response.data;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to fetch results';
            return rejectWithValue(message);
        }
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        resetSearch(state) {
            state.results = [];
            state.offset = 0;
            state.hasMore = true;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchResults.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchResults.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.results.length < 10) {
                    state.hasMore = false;
                }

                const argOffset = action.meta.arg.offset;

                if (argOffset === 0) {
                    state.results = action.payload.results;
                } else {
                    // Filter out duplicates
                    const newResults = action.payload.results.filter(
                        (newItem) => !state.results.some((existingItem) => existingItem.trackId === newItem.trackId && existingItem.collectionId === newItem.collectionId && existingItem.artistId === newItem.artistId)
                    )

                    if (newResults.length === 0 && action.payload.results.length > 0) {
                        state.hasMore = false;
                    }

                    state.results = [...state.results, ...newResults];
                }

                state.offset = argOffset + action.payload.results.length;
            })
            .addCase(fetchResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setQuery, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
