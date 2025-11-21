import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header', () => {
    it('renders title "NEXT TUNES"', () => {
        render(<Header />);
        expect(screen.getByText(/NEXT TUNES/i)).toBeInTheDocument();
    });

    it('renders subtitle text', () => {
        render(<Header />);
        expect(screen.getByText(/SEARCH FOR YOUR FAVOURITE MUSIC/i)).toBeInTheDocument();
    });
});
