import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import ResultDetail from '../../components/ResultDetail';
import { makeStore } from '../../store/store';

describe('ResultDetail', () => {
    it('displays item details when item is found', () => {
        const mockItem = {
            trackId: 123,
            trackName: 'Test Track',
            artistName: 'Test Artist',
            artworkUrl100: 'https://example.com/image.jpg',
            kind: 'song',
            primaryGenreName: 'Rock',
            wrapperType: 'track'
        };

        const store = makeStore({
            search: {
                query: 'test',
                results: [mockItem],
                loading: false,
                error: null,
                hasMore: true,
                offset: 0,
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/result/123']}>
                    <Routes>
                        <Route path="/result/:id" element={<ResultDetail />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Test Track')).toBeInTheDocument();
        expect(screen.getByText('Test Artist')).toBeInTheDocument();
    });

    it('shows "Item not found" when item does not exist', () => {
        const store = makeStore({
            search: {
                query: 'test',
                results: [],
                loading: false,
                error: null,
                hasMore: true,
                offset: 0,
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/result/999']}>
                    <Routes>
                        <Route path="/result/:id" element={<ResultDetail />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Item not found/i)).toBeInTheDocument();
        expect(screen.getByText(/Back to Search/i)).toBeInTheDocument();
    });

    it('displays back button', () => {
        const mockItem = {
            trackId: 123,
            trackName: 'Test Track',
            artistName: 'Test Artist',
            wrapperType: 'track'
        };

        const store = makeStore({
            search: {
                query: 'test',
                results: [mockItem],
                loading: false,
                error: null,
                hasMore: true,
                offset: 0,
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/result/123']}>
                    <Routes>
                        <Route path="/result/:id" element={<ResultDetail />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Back/i)).toBeInTheDocument();
    });

    it('displays artwork image when available', () => {
        const mockItem = {
            trackId: 123,
            trackName: 'Test Track',
            artistName: 'Test Artist',
            artworkUrl100: 'https://example.com/artwork100x100.jpg',
            wrapperType: 'track'
        };

        const store = makeStore({
            search: {
                query: 'test',
                results: [mockItem],
                loading: false,
                error: null,
                hasMore: true,
                offset: 0,
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/result/123']}>
                    <Routes>
                        <Route path="/result/:id" element={<ResultDetail />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const image = screen.getByAltText('Test Track');
        expect(image).toBeInTheDocument();
        const src = image.getAttribute('src');
        expect(src).toMatch(/\.(jpg|jpeg|png)$/i); // Verify image is present by extension
    });
});
