import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Popup from './Popup';
import { GameContext } from '../context/GameContext';
import { PopupContext } from '../context/PopupContext';

const Bound = () => {
  const { destinations } = useContext(GameContext);
  const { showPopup } = useContext(PopupContext);

  // console.log(destinations);
  useEffect(() => {
    showPopup('winner');
    return () => showPopup();
    // eslint-disable-next-line
  }, []);

  return (
    <Popup id="winner">
      <div>hejsan</div>
      <div>hejdå</div>
    </Popup>
  );
};

export default Bound;
