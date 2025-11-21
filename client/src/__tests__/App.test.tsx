import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../App';
import { makeStore } from '../store/store';

test('renders search for artists text', () => {
  const store = makeStore({
    search: {
      query: '',
      results: [],
      loading: false,
      error: null,
      hasMore: true,
      offset: 0,
    },
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const headerElement = screen.getByText(/NEXT TUNES/i);
  expect(headerElement).toBeInTheDocument();
});
