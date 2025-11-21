import React, { useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, CircularProgress, Box } from '@mui/material';
import { RootState, AppDispatch } from '../store/store';
import { fetchResults } from '../store/searchSlice';
import ResultItem from './ResultItem';

const ResultsList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { results, loading, error, hasMore, query, offset } = useSelector((state: RootState) => state.search);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    console.log("Intersecting! Fetching more...", { query, offset });
                    dispatch(fetchResults({ term: query, offset }));
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore, query, offset, dispatch]
    );

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', p: 4 }}>
                <Typography color="error">Error: {error}</Typography>
            </Box>
        );
    }

    if (results.length === 0 && !loading && query) {
        return (
            <Box sx={{ textAlign: 'center', p: 4 }}>
                <Typography color="text.secondary" variant="h6">No results found for "{query}"</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(4, 1fr)',
                    lg: 'repeat(5, 1fr)'
                },
                gap: 2
            }}>
                {results.map((item, index) => {
                    if (results.length === index + 1) {
                        return (
                            <div key={`${item.trackId || item.collectionId || item.artistId}-${index}`} ref={lastElementRef}>
                                <ResultItem item={item} />
                            </div>
                        );
                    } else {
                        return (
                            <div key={`${item.trackId || item.collectionId || item.artistId}-${index}`}>
                                <ResultItem item={item} />
                            </div>
                        );
                    }
                })}
            </Box>
            {loading && (
                <Box sx={{ textAlign: 'center', p: 4, width: '100%' }}>
                    <CircularProgress />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Loading more...</Typography>
                </Box>
            )}
        </Box>
    );
};

export default ResultsList;
