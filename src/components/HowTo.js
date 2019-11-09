import React, { useContext } from 'react';
import styled from 'styled-components';
import { PopupContext } from '../context/PopupContext';
import theme from '../Theme';
import Popup from './Popup';
import { buttonStyle, InnerContainer } from './Settings';

export const StyledInnerContainer = styled(InnerContainer)`
  padding: 1.5rem 1rem;
  h1,
  h2,
  h3 {
    font-weight: 800;
    text-align: center;
    margin-bottom: 0.5rem;
    color: ${theme.color.blue.hex};
  }
  ol {
    counter-reset: item;
    margin: 0 0 1.5em;
    padding: 0;
    > li {
      counter-increment: item;
      list-style-type: none;
      margin: 0 0 0.7rem 0;
      padding: 0 0 0 2rem;
      text-indent: -2rem;
      &::before {
        content: counter(item) '.';
        display: inline-block;
        font-weight: bold;
        padding-right: 0.5rem;
        text-align: right;
        width: 1.5rem;
        font-size: 1.2rem;
        color: ${theme.color.blue.hex};
      }
    }
  }
`;

const Button = styled.button`
  ${buttonStyle}
  text-transform: uppercase;
  font-weight: 800;
  margin-top: 1rem;
  font-size: 1rem;
  &:hover {
    background: ${theme.color.beige.tint[1]};
  }
`;

const StyledHowToOpener = styled.button`
  cursor: pointer;
  font-weight: 800;
  margin-top: 1rem;
  text-transform: uppercase;
  color: ${theme.color.blue.tint[5]};
  font-size: 0.9rem;
`;

export function HowToOpener() {
  const { showPopup } = useContext(PopupContext);

  return (
    <div style={{ textAlign: 'center' }}>
      <StyledHowToOpener onClick={() => showPopup('howTo')}>
        How to
      </StyledHowToOpener>
    </div>
  );
}

const RandomArticle = () => {
  const { hidePopup, popupId } = useContext(PopupContext);

  return popupId === 'howTo' ? (
    <Popup id="howTo">
      <StyledInnerContainer>
        <h1>How to play</h1>
        <ol>
          <li>Set departure, the article from where your journey begins.</li>
          <li>
            Either decide a destination yourself or be somewhat daring and
            select a random one. You’ll get a summary and an image in case you
            don’t know what you’re looking for.
          </li>
          <li>
            Try to find your destination in a few steps as possible. You’re
            going forward by clicking the links inside the article.
          </li>
        </ol>
        {/* <h2>Some gotchas</h2>
        <ol>
          <li>
            If you're vague in your decisions you might find yourself in a
            redirect article, e.g. the emotional article is a redirect to
            Emotion.
          </li>
        </ol> */}
        <Button color="green" onClick={hidePopup}>
          got it
        </Button>
      </StyledInnerContainer>
    </Popup>
  ) : null;
};

export default RandomArticle;
