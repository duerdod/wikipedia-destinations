import React, { useContext } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { PopupContext } from '../context/PopupContext';
import Stats from './Stats';
// import Crumbs from './Crumbs';
// import theme from '../Theme';

const HeaderContainer = styled.header`
  .buttons {
    text-align: center;
  }
`;

const Button = styled.button`
  cursor: pointer;
  margin-bottom: 1rem;
`;

const showSettingsOn = ['wiki'];

const Header = () => {
  const { showPopup } = useContext(PopupContext);
  const { pathname } = useLocation();

  return (
    <HeaderContainer>
      {/* <Crumbs /> */}
      <Stats />
      {showSettingsOn.includes(pathname) && (
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
      )}
    </HeaderContainer>
  );
};

export default Header;
