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
  max-width: 450px;
  left: 50%;
  top: 40%;
  box-shadow: ${theme.boxShadow};
`;

const InnerContainer = styled.div`
  background: ${theme.color.white};
  color: ${theme.color.background};
  font-family: ${theme.titleFont};
  padding: 2rem 5rem;
  border-radius: 3px;
`;

const Popup = ({ children }) => {
  const { showPopup: show, setShowPopup } = useContext(PopupContext);

  const transition = useTransition(show, null, {
    config: { duration: 75, tension: 300 },
    from: { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
    enter: { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
    leave: { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }
  });

  return createPortal(
    <>
      {transition.map(({ item, key, props }) => {
        return (
          item && (
            <PopupContainer key={key} style={props}>
              <InnerContainer>{children}</InnerContainer>
            </PopupContainer>
          )
        );
      })}
      {show && <Backdrop onClick={setShowPopup} />}
    </>,
    document.getElementById('modalRoot')
  );
};

export default Popup;
