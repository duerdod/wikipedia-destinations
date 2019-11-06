import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../context/GameContext';
import { PopupContext } from '../context/PopupContext';
import theme from '../Theme';
import Popup from './Popup';

const OuterContainer = styled.section`
  text-transform: uppercase;
  text-align: center;
  position: relative;
  z-index: 1;
  margin-top: 5rem;

  .outer {
    border-radius: 6px;
    color: ${theme.color.background};
    padding: 3px 3px 0 3px;
    z-index: 2;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -22px;
    background-image: linear-gradient(
      to bottom,
      ${p => p.theme.color.primary} 51%,
      ${p => p.theme.color.primary} 71%,
      ${p => p.theme.color.white} 72%,
      ${p => p.theme.color.white} 100%
    );
    .inner {
      background: ${theme.color.white};
      border-radius: 3px;
      padding: 0.2rem 0.7rem 0 0.7rem;
      font-family: ${theme.titleFont};
      font-weight: 800;
      font-size: 1.5rem;
    }
  }
`;

const InnerContainer = styled.div`
  border: 3px solid ${p => p.theme.color.primary};
  border-radius: 7px;
  padding: 0.4rem 1rem 0.5rem 1rem;
  max-width: 500px;
  margin: 1rem auto;
  background: ${theme.color.white};

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  /* justify-items: center;
  align-items: center;
  position: relative; */

  h2,
  h3 {
    font-family: ${theme.titleFont};
    text-transform: uppercase;
    font-weight: 800;
  }

  @media screen and (max-width: 40em) {
  }

  * {
    -webkit-touch-callout: none; /* iOS Safari */
    user-select: none;
  }
`;

const Destinations = styled.h3`
  font-size: 0.95rem;
  padding: 0 1rem;
  color: ${theme.color.background};
  white-space: pre-wrap;
  &.title {
    color: ${theme.color.primary};
  }
`;

const Destination = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 20px 1fr;
`;

const Step = styled.h2`
  font-size: 6rem;
  padding: 2.2rem 2rem;
  line-height: 0.4;
  position: relative;
  color: ${theme.color.primary};
  &:after {
    display: block;
    content: 'Steps';
    font-size: 0.7rem;
    color: ${theme.color.primary};
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Reset = styled.a`
  color: ${theme.color.background};
  font-family: ${theme.titleFont};
  font-size: 0.65rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  cursor: pointer;
  margin-bottom: 1rem;
`;

const Stats = () => {
  const {
    steps,
    destinations: { start, destination }
  } = useContext(GameContext);

  const { showPopup } = useContext(PopupContext);

  return (
    <OuterContainer>
      <div className="outer">
        <div className="inner">Yo scores</div>
      </div>
      <InnerContainer>
        <Destination>
          <Destinations className="title">Depature</Destinations>
          <Destinations>{start}</Destinations>
        </Destination>
        <Step>{steps}</Step>
        <Destination>
          <Destinations className="title">Bound</Destinations>
          <Destinations>{destination}</Destinations>
        </Destination>
      </InnerContainer>
      <Popup id="settings">
        <Reset href="/">Restart</Reset>
      </Popup>
      <Button
        onClick={() => showPopup('settings')}
        style={{ fontSize: '2rem' }}
      >
        <span role="img" aria-label="settings">
          ⚙️
        </span>
      </Button>
    </OuterContainer>
  );
};

export default Stats;
