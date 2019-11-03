// import 'reset-css';
import './index.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import Article from './components/Article';

const Container = styled.section`
  background: inherit;
  padding: 1rem 2rem;
`;

function App() {
  return (
    <Router>
      <Container>
        <Route path={'/wiki/:article'} component={Article} />
      </Container>
    </Router>
  );
}

export default App;
