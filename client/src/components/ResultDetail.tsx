import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Box, Button, Typography, Card, CardMedia, CardContent, Grid, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ResultDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const item = useSelector((state: RootState) =>
        state.search.results.find(r =>
            (r.trackId?.toString() === id) ||
            (r.collectionId?.toString() === id) ||
            (r.artistId?.toString() === id)
        )
    );

    if (!item) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h5">Item not found</Typography>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mt: 2 }}>
                    Back to Search
                </Button>
            </Box>
        );
    }

    const image = item.artworkUrl100?.replace('100x100', '600x600') || item.artworkUrl100;
    const title = item.trackName || item.collectionName || item.artistName;
    const subtitle = item.artistName;

    return (
        <Box sx={{ p: 3 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
                Back
            </Button>
            <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, boxShadow: 3 }}>
                {image && (
                    <CardMedia
                        component="img"
                        sx={{ width: { xs: '100%', md: 400 }, height: { xs: 'auto', md: 400 }, objectFit: 'cover' }}
                        image={image}
                        alt={title}
                    />
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h4" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" component="div" gutterBottom>
                            {subtitle}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <Chip label={item.kind || item.wrapperType} color="primary" variant="outlined" sx={{ mr: 1 }} />
                            {item.primaryGenreName && <Chip label={item.primaryGenreName} variant="outlined" />}
                        </Box>

                        <Grid container spacing={2}>
                            {item.collectionName && (
                                <Grid size={12}>
                                    <Typography variant="body1"><strong>Collection:</strong> {item.collectionName}</Typography>
                                </Grid>
                            )}
                            {item.releaseDate && (
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="body1"><strong>Release Date:</strong> {new Date(item.releaseDate).toLocaleDateString()}</Typography>
                                </Grid>
                            )}
                            {item.trackPrice !== undefined && (
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="body1"><strong>Price:</strong> {item.trackPrice} {item.currency}</Typography>
                                </Grid>
                            )}
                            {item.collectionPrice !== undefined && (
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="body1"><strong>Collection Price:</strong> {item.collectionPrice} {item.currency}</Typography>
                                </Grid>
                            )}
                        </Grid>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    );
};

export default ResultDetail;
