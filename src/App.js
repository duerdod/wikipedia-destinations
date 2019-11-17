import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme, { Reset } from './Theme';
import { GameContext } from './context/GameContext';
import Article from './components/Article';
// import StartForm from './components/Start';
import StartForm from './components/StartForm';
import Header from './components/Header';
import Settings from './components/Settings';
import HowTo, { HowToOpener } from './components/HowTo';

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
    <ThemeProvider theme={theme}>
      <Reset />
      <Container>
        <Header />
        <Settings />
        <Route path={'/wiki/:article'} component={Article} />
        <Route path={'/'} component={StartForm} />
        <HowTo />
        <HowToOpener />
      </Container>
    </ThemeProvider>
  );
}

export default App;
