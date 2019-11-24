import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../context/GameContext';
import { PopupContext } from '../context/PopupContext';
import theme from '../Theme';
import ReminderPopup from './ReminderPopup';

const OuterContainer = styled.section`
  text-transform: uppercase;
  text-align: center;
  position: relative;
  z-index: 1;

  .outer {
    border-radius: 6px;
    color: ${theme.color.blue.hex};
    padding: 3px 3px 0 3px;
    z-index: 2;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -22px;
    background-image: linear-gradient(
      to bottom,
      ${p => p.theme.color.red.hex} 51%,
      ${p => p.theme.color.red.hex} 71%,
      ${p => p.theme.color.white.hex} 72%,
      ${p => p.theme.color.white.hex} 100%
    );
    .inner {
      background: ${theme.color.white.hex};
      border-radius: 3px;
      padding: 0.2rem 0.7rem 0 0.7rem;
      font-family: ${theme.titleFont};
      font-weight: 800;
      font-size: 1.5rem;
    }
  }
`;

const InnerContainer = styled.div`
  border: 3px solid ${p => p.theme.color.red.hex};
  border-radius: 7px;
  padding: 0.4rem 1rem 0.5rem 1rem;
  max-width: 500px;
  margin: 1rem auto;
  background: ${theme.color.white.hex};

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  /* justify-items: center;
  align-items: center;
  position: relative; */

  h2,
  h3,
  button {
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
  color: ${theme.color.blue.hex};
  white-space: pre-wrap;
  button {
    font-size: 0.95rem;
    padding: 0 1rem;
    color: ${theme.color.blue.hex};
    white-space: pre-wrap;
    cursor: pointer;
  }
  &.title {
    color: ${theme.color.red.hex};
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
  color: ${theme.color.red.hex};
  &:after {
    display: block;
    content: 'Steps';
    font-size: 0.7rem;
    color: ${theme.color.blue.hex};
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Stats = () => {
  const {
    gameState: { articles, steps }
  } = useContext(GameContext);

  const { showPopup } = useContext(PopupContext);

  const { start, destination } = articles;
  return (
    <OuterContainer>
      <div className="outer">
        <div className="inner">Yo scores</div>
      </div>
      <InnerContainer>
        <Destination>
          <Destinations className="title">Depature</Destinations>
          <Destinations>{start && start.title}</Destinations>
        </Destination>
        <Step>{steps}</Step>
        <Destination>
          <Destinations className="title">Bound for</Destinations>
          <Destinations>
            <button onClick={() => showPopup('reminder')}>
              {destination && destination.title}
            </button>
          </Destinations>
          {articles.destination && (
            <ReminderPopup article={articles.destination} />
          )}
        </Destination>
      </InnerContainer>
    </OuterContainer>
  );
};

export default Stats;
