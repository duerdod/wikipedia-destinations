import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Popup from './Popup';
import { GameContext } from '../context/GameContext';
import { PopupContext } from '../context/PopupContext';
import { buttonStyle, Buttons } from './Settings';
import { StyledInnerContainer as InnerContainer } from './HowTo';

const StyledInnerContainer = styled(InnerContainer)`
  h2 {
    font-size: 1.7rem;
  }
  h3 {
    text-align: left;
    font-size: 1.2rem;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
  }
`;

const Button = styled.button`
  ${buttonStyle}
  width: 50%;
`;

// TODO:
/* 
  Include link to each article.
*/

const Bound = () => {
  const { crumbs } = useContext(GameContext);
  const { showPopup, popupId } = useContext(PopupContext);

  // console.log(destinations);
  useEffect(() => {
    showPopup('winner');
    return () => showPopup();
    // eslint-disable-next-line
  }, []);

  return (
    popupId === 'winner' && (
      <Popup id="winner" preventBodyScroll={false}>
        <StyledInnerContainer>
          <h2> 🎉 Congratulations 🎉</h2>
          <h3>Steps taken:</h3>
          <ol>
            {crumbs.map((crumb, i) => (
              <li key={i}>{crumb}</li>
            ))}
          </ol>
          <Buttons>
            <Button color="green">Play again</Button>
            <Button color="red">Exit</Button>
          </Buttons>
        </StyledInnerContainer>
      </Popup>
    )
  );
};

export default Bound;
