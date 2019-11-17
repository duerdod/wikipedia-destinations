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
  ${buttonStyle}
  text-transform: uppercase;
  font-weight: 800;
  margin: 0.5rem 0 0 0;
  width: 100%;
  &:hover {
    background: ${theme.color.beige.tint[2]};
  }
`;

const RandomArticle = ({
  show = false,
  description = '',
  title = '',
  extract = '',
  thumbnail = null,
  resetDestination,
  setAsDestination
}) => {
  const { showPopup, hidePopup, popupId } = useContext(PopupContext);
  console.log('why do I render? even');
  useEffect(() => {
    showPopup('randomArticle');
    return () => resetDestination;
    // eslint-disable-next-line
  }, [show]);

  return (
    popupId === 'randomArticle' && (
      <Popup
        id="randomArticle"
        preventBodyScroll={false}
        closeOnBackdropClick={false}
      >
        <StyledInnerContainer>
          <h2>{title}</h2>
          <h5>{description}</h5>
          {<img src={thumbnail} alt={`Probably a ${title}`} />}
          <p>{extract}</p>

          <Button
            color="green"
            type="button"
            onClick={() => {
              setAsDestination(title);
              hidePopup();
            }}
          >
            Accept
          </Button>
          <Button
            color="red"
            type="button"
            onClick={() => {
              resetDestination();
              hidePopup();
            }}
          >
            Decline
          </Button>
        </StyledInnerContainer>
      </Popup>
    )
  );
};

export default RandomArticle;
