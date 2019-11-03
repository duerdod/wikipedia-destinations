import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme, { Reset } from './Theme';
import { StatsProvider } from './components/StatsProvider';
import Article from './components/Article';
import Stats from './components/Stats';

const Container = styled.section`
  background: inherit;
  padding: 1rem 2rem;
  @media screen and (max-width: 40em) {
    padding: 0;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <StatsProvider>
        <Router>
          <Container>
            <Stats />
            <Route path={'/wiki/:article'} component={Article} />
          </Container>
        </Router>
      </StatsProvider>
    </ThemeProvider>
  );
}

export default App;
