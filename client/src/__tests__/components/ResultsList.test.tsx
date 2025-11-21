import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import ResultsList from '../../components/ResultsList';
import { makeStore } from '../../store/store';

// Mock IntersectionObserver
beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
});

describe('ResultsList', () => {
    it('renders loading state', () => {
        const store = makeStore({
            search: {
                results: [],
                loading: true,
                error: null,
                query: 'test',
                hasMore: true,
                offset: 0,
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter >
                    <ResultsList />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/loading more/i)).toBeInTheDocument();
    });

    it('renders error state', () => {
        const store = makeStore({
            search: {
                results: [],
                loading: false,
                error: 'Test Error',
                query: 'test',
                hasMore: true,
                offset: 0,
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter >
                    <ResultsList />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/error: test error/i)).toBeInTheDocument();
    });

    it('renders no results state', () => {
        const store = makeStore({
            search: {
                results: [],
                loading: false,
                error: null,
                query: 'test',
                hasMore: true,
                offset: 0,
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter >
                    <ResultsList />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/no results found for "test"/i)).toBeInTheDocument();
    });

    it('renders results', () => {
        const store = makeStore({
            search: {
                results: [
                    { trackId: 1, artistName: 'Artist 1', trackName: 'Track 1', wrapperType: 'track' } as any,
                    { trackId: 2, artistName: 'Artist 2', trackName: 'Track 2', wrapperType: 'track' } as any,
                ],
                loading: false,
                error: null,
                query: 'test',
                hasMore: true,
                offset: 0,
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ResultsList />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Track 1')).toBeInTheDocument();
        expect(screen.getByText('Track 2')).toBeInTheDocument();
    });
});
