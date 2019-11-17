import React, { useContext } from 'react';
// import styled from 'styled-components';
import { PopupContext } from '../context/PopupContext';
import { ArticleContext } from '../context/ArticleContext';
// import theme from '../Theme';
import Popup from './Popup';
import { Button, StyledInnerContainer } from './RandomArticle';

const ArticleReminder = () => {
  const { hidePopup, popupId } = useContext(PopupContext);
  const {
    articleState //: { title, description, thumbnail, extract }
  } = useContext(ArticleContext);

  return (
    popupId === 'reminder' && (
      <Popup
        id="reminder"
        preventBodyScroll={false}
        closeOnBackdropClick={false}
      >
        <StyledInnerContainer>
          {/* <h2>{title}</h2>
          <h5>{description}</h5>
          {<img src={thumbnail} alt={`Probably a ${title}`} />}
          <p>{extract}</p> */}
          <Button color="green" type="button" onClick={hidePopup}>
            Continue
          </Button>
        </StyledInnerContainer>
      </Popup>
    )
  );
};

export default ArticleReminder;
