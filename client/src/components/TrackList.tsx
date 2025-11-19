import React from 'react';

const TrackList: React.FC<{ tracks: { id: number; title: string; artist: string }[] }> = ({ tracks }) => {
    return (
        <div>
            <h2>Track List</h2>
            <ul>
                {tracks.map(track => (
                    <li key={track.id}>
                        {track.title} by {track.artist}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrackList;