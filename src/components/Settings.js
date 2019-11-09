import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import Popup from './Popup';
import theme from '../Theme';
import { PopupContext } from '../context/PopupContext';

export const InnerContainer = styled.div`
  background: ${theme.color.white.hex};
  color: ${theme.color.blue.hex};
  font-family: ${theme.titleFont};
  /* padding: 2rem 5rem; */
  border-radius: 3px;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-weight: 800;
  text-align: center;
  color: ${theme.color.blue.tint[2]};
  margin-bottom: 3rem;
  text-transform: uppercase;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-around;

  button,
  a {
    margin: 0 0.5rem;
  }
`;

export const buttonStyle = p => css`
  background: ${theme.color[p.color].hex};
  padding: 1rem 1.5rem;
  color: ${theme.color.blue.hex};
  font-family: ${theme.titleFont};
  font-size: 0.95rem;
  color: ${theme.color.white.hex};
  font-weight: 800;
  border-radius: 6px;
  transition: all ${theme.transition};
  margin: 0;
  cursor: pointer;
  display: flex;
  width: 50%;
  justify-content: center;
  align-content: center;
  white-space: nowrap;
  &&&&:hover {
    background: ${theme.color[p.color].tint[2]};
  }
`;

const Button = styled.button`
  ${buttonStyle};
`;

const Reset = styled.a`
  ${buttonStyle};
`;

const Settings = () => {
  const { hidePopup, popupId } = useContext(PopupContext);
  return popupId === 'settings' ? (
    <Popup id="settings" className="center">
      <InnerContainer>
        <Title>Options</Title>
        <Buttons>
          <Reset color="red" href="/">
            End game
          </Reset>
          <Button color="green" onClick={hidePopup}>
            Continue
          </Button>
        </Buttons>
      </InnerContainer>
    </Popup>
  ) : null;
};

export default Settings;
