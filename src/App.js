import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme, { Reset } from './Theme';
import AppProvider from './context/contexts';
import Article from './components/Article';
import StartForm from './components/Start';
import Header from './components/Header';
import Settings from './components/Settings';

const Container = styled.section`
  background: inherit;
  padding: 1rem 2rem;
  margin-top: 1rem;
  @media screen and (max-width: 40em) {
    padding: 2rem 0.5rem;
  }
`;

function App() {
  return (
    <Router>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <Reset />
          <Container>
            <Header />
            <Settings />
            <Route path={'/wiki/:article'} component={Article} />
            <Route path={'/'} component={StartForm} />
          </Container>
        </ThemeProvider>
      </AppProvider>
    </Router>
  );
}

export default App;
