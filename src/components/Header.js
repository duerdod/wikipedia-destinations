import React from 'react';
// import styled from 'styled-components';
import Stats from './Stats';
import Crumbs from './Crumbs';

const Header = () => {
  return (
    <header>
      <Crumbs />
      <Stats />
    </header>
  );
};

export default Header;
