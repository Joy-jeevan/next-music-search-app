import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#009ABF',
        },
        background: {
            default: '#FFFFFF',
            paper: '#F8F8F8',
        },
        text: {
            primary: '#000000',
            secondary: '#525252',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
        },
    },
    shape: {
        borderRadius: 0,
    },
});
