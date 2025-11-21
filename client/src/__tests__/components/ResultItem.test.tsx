import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ResultItem from '../../components/ResultItem';
import { ITunesResult } from '../../types';

const mockItem: ITunesResult = {
    wrapperType: 'track',
    kind: 'song',
    artistId: 1,
    collectionId: 1,
    trackId: 1,
    artistName: 'Test Artist',
    collectionName: 'Test Album',
    trackName: 'Test Track',
    artworkUrl100: 'http://example.com/image.jpg',
    primaryGenreName: 'Pop',
};

describe('ResultItem', () => {
    it('renders track information correctly', () => {
        render(
            <MemoryRouter >
                <ResultItem item={mockItem} />
            </MemoryRouter>
        );

        expect(screen.getByText('Test Track')).toBeInTheDocument();
        expect(screen.getByText('Test Artist')).toBeInTheDocument();
        expect(screen.getByText('song')).toBeInTheDocument();
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', 'http://example.com/image.jpg');
    });

    it('renders collection name if track name is missing', () => {
        const collectionItem = { ...mockItem, trackName: undefined, kind: 'album' };
        render(
            <MemoryRouter>
                <ResultItem item={collectionItem} />
            </MemoryRouter>
        );

        expect(screen.getByText('Test Album')).toBeInTheDocument();
    });

    it('renders artist name if track and collection names are missing', () => {
        const artistItem = { ...mockItem, trackName: undefined, collectionName: undefined, kind: 'artist' };
        render(
            <MemoryRouter>
                <ResultItem item={artistItem} />
            </MemoryRouter>
        );

        expect(screen.getByText('Test Artist')).toBeInTheDocument();
    });
});
