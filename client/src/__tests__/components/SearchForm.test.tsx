import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import SearchForm from '../../components/SearchForm';
import { makeStore } from '../../store/store';

describe('SearchForm', () => {
    let store: ReturnType<typeof makeStore>;

    beforeEach(() => {
        store = makeStore({
            search: {
                query: '',
                results: [],
                loading: false,
                error: null,
                hasMore: true,
                offset: 0,
            },
        });
        jest.spyOn(store, 'dispatch');
    });

    it('renders search input and button', () => {
        render(
            <Provider store={store}>
                <SearchForm />
            </Provider>
        );

        expect(screen.getByPlaceholderText(/search for artists/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    it('updates local state on input change', () => {
        render(
            <Provider store={store}>
                <SearchForm />
            </Provider>
        );

        const input = screen.getByPlaceholderText(/search for artists/i);
        fireEvent.change(input, { target: { value: 'test query' } });
        expect(input).toHaveValue('test query');
    });

    it('dispatches actions on submit', () => {
        render(
            <Provider store={store}>
                <SearchForm />
            </Provider>
        );

        const input = screen.getByPlaceholderText(/search for artists/i);
        const button = screen.getByRole('button', { name: /search/i });

        fireEvent.change(input, { target: { value: 'test query' } });
        fireEvent.click(button);

        expect(store.dispatch).toHaveBeenCalledTimes(3);
        // Note: We can't easily check exact action equality for thunks without more setup,
        // but we can check if dispatch was called.
    });

    it('does not dispatch if query is empty', () => {
        render(
            <Provider store={store}>
                <SearchForm />
            </Provider>
        );

        const button = screen.getByRole('button', { name: /search/i });
        fireEvent.click(button);

        expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('clears input when clear icon is clicked', () => {
        render(
            <Provider store={store}>
                <SearchForm />
            </Provider>
        );

        const input = screen.getByPlaceholderText(/search for artists/i);
        fireEvent.change(input, { target: { value: 'test query' } });
        expect(input).toHaveValue('test query');

        const clearButton = screen.getByLabelText(/clear search/i);
        fireEvent.click(clearButton);

        expect(input).toHaveValue('');
    });

    it('resets search results and input when reset button is clicked', () => {
        render(
            <Provider store={store}>
                <SearchForm />
            </Provider>
        );

        const input = screen.getByPlaceholderText(/search for artists/i);
        fireEvent.change(input, { target: { value: 'test query' } });

        const resetButton = screen.getByRole('button', { name: /reset/i });
        fireEvent.click(resetButton);

        expect(input).toHaveValue('');
        expect(store.dispatch).toHaveBeenCalledTimes(2); // setQuery('') and resetSearch()
    });
});
