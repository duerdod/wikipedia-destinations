import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { PopupContext } from '../context/PopupContext';
import theme from '../Theme';
import Popup from './Popup';
import { buttonStyle, InnerContainer } from './Settings';

const StyledInnerContainer = styled(InnerContainer)`
  p {
    margin: 0.5em 0;
    line-height: 1.6;
    font-size: 1rem;
    max-width: 400px;
  }

  h2,
  h5 {
    color: ${theme.color.blue.hex};
  }

  h2 {
    font-weight: 800;
  }

  img {
    width: 50%;
    margin: 1rem 0 0.5rem 0;
  }
`;

const Button = styled.button`
  text-transform: uppercase;
  font-weight: 800;
  ${buttonStyle}
  margin-top: 0.5rem;
  &:hover {
    background: ${theme.color.beige.tint[2]};
  }
`;

const RandomArticle = ({
  show = false,
  description = '',
  title = '',
  extract = '',
  source = null,
  setArticle,
  setRandomArticle
}) => {
  const { showPopup, hidePopup, setHideWithBackdrop } = useContext(
    PopupContext
  );
  setHideWithBackdrop(false);
  useEffect(() => {
    if (show) {
      return showPopup('randomArticle');
    }
    return () => showPopup();
    // eslint-disable-next-line
  }, [show]);

  return (
    <Popup id="randomArticle">
      <StyledInnerContainer>
        <h2>You got: {title}</h2>
        <h5>{description}</h5>
        {<img src={source} alt={`Probably a ${title}`} />}
        <p>{extract}</p>
        <Button
          color="green"
          type="button"
          onClick={() => {
            setArticle({ type: 'DESTINATION', destination: title });
            hidePopup();
          }}
        >
          Accept
        </Button>
        <Button
          color="red"
          type="button"
          onClick={() => {
            setRandomArticle(null);
            hidePopup();
          }}
        >
          Decline
        </Button>
      </StyledInnerContainer>
    </Popup>
  );
};

export default RandomArticle;
