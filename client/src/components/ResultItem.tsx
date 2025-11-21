import React from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Box } from '@mui/material';
import { Link } from 'react-router';
import { ITunesResult } from '../types';

interface ResultItemProps {
  item: ITunesResult;
}

const ResultItem: React.FC<ResultItemProps> = ({ item }) => {
  const image = item.artworkUrl100?.replace('100x100', '400x400') || item.artworkUrl100;
  const title = item.trackName || item.collectionName || item.artistName;
  const subtitle = item.artistName !== title ? item.artistName : item.primaryGenreName;
  const type = item.kind || item.wrapperType;
  const id = item.trackId || item.collectionId || item.artistId;

  return (
    <Link to={`/result/${id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 0, boxShadow: 'none', border: '1px solid #eee', '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.1)' } }}>
        <Box sx={{ position: 'relative', paddingTop: '100%' }}>
          {image ? (
            <CardMedia
              component="img"
              image={image}
              alt={title}
              sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'grey.300' }} />
          )}
          <Chip label={type} size="small" sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.7)', color: 'white', borderRadius: 0, textTransform: 'uppercase', fontWeight: 'bold', fontSize: '0.7rem' }} />
        </Box>
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ResultItem;
