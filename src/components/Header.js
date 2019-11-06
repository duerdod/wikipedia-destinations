import React, { useContext } from 'react';
import styled from 'styled-components';
import { PopupContext } from '../context/PopupContext';
import Stats from './Stats';
import Crumbs from './Crumbs';
import theme from '../Theme';

const HeaderContainer = styled.header`
  .buttons {
    text-align: center;
  }
`;

const Button = styled.button`
  cursor: pointer;
  margin-bottom: 1rem;
`;

const Header = () => {
  const { showPopup } = useContext(PopupContext);
  return (
    <HeaderContainer>
      {/* <Crumbs /> */}
      <Stats />
      <div className="buttons">
        <Button
          onClick={() => showPopup('settings')}
          style={{ fontSize: '2rem' }}
        >
          <span role="img" aria-label="settings">
            ⚙️
          </span>
        </Button>
      </div>
    </HeaderContainer>
  );
};

export default Header;
