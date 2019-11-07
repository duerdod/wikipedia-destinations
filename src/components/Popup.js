import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import { PopupContext } from '../context/PopupContext';
import theme from '../Theme';

const Backdrop = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 100;
  background: black;
  opacity: 0.3;
`;

const PopupContainer = styled(animated.div)`
  position: absolute;
  z-index: 200;
  left: 50%;
  top: 50%;
  box-shadow: ${theme.boxShadow};
  @media screen and (max-width: 40em) {
    left: 10%;
    right: 10%;
    top: 2%;
  }
`;

const Popup = ({ children, id, className, style }) => {
  const { popupId, hidePopup, hideWithBackdrop } = useContext(PopupContext);

  const transition = useTransition(id === popupId, null, {
    config: { duration: 75, tension: 300 },
    from: { transform: 'scale(0)', opacity: 0 },
    enter: { transform: 'scale(1)', opacity: 1 },
    leave: { transform: 'scale(0)', opacity: 0 }
  });

  return id === popupId
    ? createPortal(
        <>
          {transition.map(({ item, key, props }) => {
            return (
              item && (
                <PopupContainer className={className} key={key} style={props}>
                  {children}
                </PopupContainer>
              )
            );
          })}
          {id === popupId && (
            <Backdrop onClick={hideWithBackdrop ? hidePopup : undefined} />
          )}
        </>,
        document.getElementById('modalRoot')
      )
    : null;
};

export default Popup;
