import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme, { Reset } from './Theme';
import { StatsProvider } from './components/StatsProvider';
import { PopupProvider } from './context/PopupContext';
import Article from './components/Article';
import StartForm from './components/StartForm';
import Stats from './components/Stats';

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
    <div className="app">
      <ThemeProvider theme={theme}>
        <Reset />
        <Router>
          <PopupProvider>
            <StatsProvider>
              <Container>
                <Stats />
                <Route path={'/wiki/:article'} component={Article} />
                <Route path={'/'} component={StartForm} />
              </Container>
            </StatsProvider>
          </PopupProvider>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
