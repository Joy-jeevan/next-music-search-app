import searchReducer, { setQuery, resetSearch, fetchResults } from './searchSlice';
import { SearchState } from '../types';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('searchSlice', () => {
    const initialState: SearchState = {
        query: '',
        results: [],
        loading: false,
        error: null,
        hasMore: true,
        offset: 0,
    };

    it('should handle initial state', () => {
        expect(searchReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setQuery', () => {
        const actual = searchReducer(initialState, setQuery('test'));
        expect(actual.query).toEqual('test');
    });

    it('should handle resetSearch', () => {
        const modifiedState: SearchState = {
            ...initialState,
            results: [{ artistName: 'Test' } as any],
            offset: 10,
            hasMore: false,
            error: 'Some error',
        };
        const actual = searchReducer(modifiedState, resetSearch());
        expect(actual).toEqual(initialState);
    });

    describe('fetchResults', () => {
        it('should handle pending', () => {
            const action = { type: fetchResults.pending.type };
            const state = searchReducer(initialState, action);
            expect(state.loading).toEqual(true);
            expect(state.error).toEqual(null);
        });

        it('should handle fulfilled with new results', () => {
            const mockResults = [{ trackId: 1, artistName: 'Test Artist' }];
            const action = {
                type: fetchResults.fulfilled.type,
                payload: { resultCount: 1, results: mockResults },
                meta: { arg: { term: 'test', offset: 0 } },
            };
            const state = searchReducer(initialState, action);
            expect(state.loading).toEqual(false);
            expect(state.results).toEqual(mockResults);
            expect(state.offset).toEqual(1);
        });

        it('should handle fulfilled with appending results', () => {
            const initialWithResults: SearchState = {
                ...initialState,
                results: [{ trackId: 1, artistName: 'Existing' } as any],
                offset: 1,
            };
            const mockNewResults = [{ trackId: 2, artistName: 'New' }];
            const action = {
                type: fetchResults.fulfilled.type,
                payload: { resultCount: 1, results: mockNewResults },
                meta: { arg: { term: 'test', offset: 1 } },
            };
            const state = searchReducer(initialWithResults, action);
            expect(state.results).toHaveLength(2);
            expect(state.offset).toEqual(2);
        });

        it('should handle rejected', () => {
            const action = {
                type: fetchResults.rejected.type,
                payload: 'Error message',
            };
            const state = searchReducer(initialState, action);
            expect(state.loading).toEqual(false);
            expect(state.error).toEqual('Error message');
        });
    });
});
