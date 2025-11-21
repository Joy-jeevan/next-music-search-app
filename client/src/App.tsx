import React from 'react';
import styled from 'styled-components';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { theme } from './theme';
import './styles/global.scss';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ResultsList from './components/ResultsList';
import ResultDetail from './components/ResultDetail';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--background);
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router >
        <AppContainer>
          <Header />
          <Main>
            <Routes>
              <Route path="/" element={
                <>
                  <SearchForm />
                  <ResultsList />
                </>
              } />
              <Route path="/result/:id" element={<ResultDetail />} />
            </Routes>
          </Main>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
