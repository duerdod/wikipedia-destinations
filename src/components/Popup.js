import React, { useContext, useEffect } from 'react';
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
  width: 450px;
  max-width: 100%;
  max-height: 100%;
  padding: 16px;
  top: 50%;
  left: 50%;
  @media screen and (max-width: 40em) {
    left: 0%;
    right: 0%;
    top: 2%;
    &&& {
      transform: translate(0%, 0%) !important;
    }
    &.center {
      top: 50%;
    }
  }
`;

const Popup = ({
  children,
  id,
  className,
  preventBodyScroll = true,
  closeOnBackdropClick = true
}) => {
  const { popupId, hidePopup } = useContext(PopupContext);

  const transition = useTransition(id === popupId, null, {
    config: { duration: 75, tension: 300 },
    from: { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
    enter: { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
    leave: { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }
  });

  useEffect(() => {
    function closeOnEsc(e) {
      if (e.key === 'Escape') {
        return hidePopup();
      }
      return;
    }
    const [body] = document.getElementsByTagName('body');

    if (popupId && preventBodyScroll) {
      body.classList.add('popup-open');
      body.addEventListener('keydown', closeOnEsc);
    } else {
      body.classList.remove('popup-open');
    }
    return () => {
      body.classList.remove('popup-open');
      body.removeEventListener('keydown', closeOnEsc);
    };
  }, [hidePopup, popupId, preventBodyScroll]);

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
            <Backdrop onClick={closeOnBackdropClick && hidePopup} />
          )}
        </>,
        document.getElementById('modalRoot')
      )
    : null;
};

export default Popup;
