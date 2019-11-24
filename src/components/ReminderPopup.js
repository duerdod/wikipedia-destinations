import React, { useContext } from 'react';
import styled from 'styled-components';
import { PopupContext } from '../context/PopupContext';
import Popup from './Popup';
import { Button as ThemeButton } from './Settings';
import { StyledInnerContainer as InnerContainer } from './RandomArticle';

const Button = styled(ThemeButton)`
  margin-top: 1rem;
  width: 100%;
`;

const ArticleReminder = ({
  article: { title = '', description = '', thumbnail = '', extract = '' }
}) => {
  const { hidePopup, popupId } = useContext(PopupContext);

  return (
    popupId === 'reminder' && (
      <Popup
        id="reminder"
        preventBodyScroll={false}
        closeOnBackdropClick={false}
      >
        <InnerContainer>
          <h2>{title}</h2>
          <h5>{description}</h5>
          {<img src={thumbnail} alt={`Probably a ${title}`} />}
          <p>{extract}</p>
          <Button color="green" type="button" onClick={hidePopup}>
            Continue
          </Button>
        </InnerContainer>
      </Popup>
    )
  );
};

export default ArticleReminder;
