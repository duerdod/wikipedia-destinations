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
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const buttonStyle = p => css`
  background: ${theme.color[p.color].hex};
  padding: 1rem 1.5rem;
  color: ${theme.color.blue.hex};
  font-family: ${theme.titleFont};
  font-size: 0.75rem;
  color: ${theme.color.white.hex};
  font-weight: 800;
  border-radius: 6px;
  transition: all ${theme.transition};
  margin: 0 0.5rem;
  cursor: pointer;
  display: flex;
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
  const { hidePopup } = useContext(PopupContext);
  return (
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
  );
};

export default Settings;
