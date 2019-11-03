// import 'reset-css';
import './index.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import { StatsProvider } from './components/StatsProvider';
import Article from './components/Article';
import Stats from './components/Stats';

const Container = styled.section`
  background: inherit;
  padding: 1rem 2rem;
`;

function App() {
  return (
    <StatsProvider>
      <Router>
        <Container>
          <Stats></Stats>
          <Route path={'/wiki/:article'} component={Article} />
        </Container>
      </Router>
    </StatsProvider>
  );
}

export default App;
