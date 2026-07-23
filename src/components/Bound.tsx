import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { usePopup } from '../context/PopupContext';
import Popup from './Popup';
import { ButtonLink, ButtonRow, Card } from './ui';

/** The winner screen, shown once the current article is the destination. */
export default function Bound() {
  const {
    crumbs,
    gameState: { articles },
  } = useGame();
  const { showPopup } = usePopup();

  useEffect(() => {
    showPopup('winner');
  }, [showPopup]);

  return (
    <Popup id="winner">
      <Card className="[&_h2]:text-[1.7rem] [&_h3]:ml-2 [&_h3]:mt-2 [&_h3]:text-left [&_h3]:text-[1.2rem]">
        <h2 className="text-center font-extrabold text-blue-0">
          <span role="img" aria-label="Congrats">
            🎉{' '}
          </span>
          Congratulations
          <span role="img" aria-label="Congrats">
            {' '}
            🎉
          </span>
        </h2>
        <h3>Steps taken:</h3>
        <ol className="mb-4 ml-6 list-decimal">
          {crumbs.map((crumb, i) => (
            <li key={i}>{crumb}</li>
          ))}
          <li>{articles.destination?.title}</li>
        </ol>
        <ButtonRow>
          <ButtonLink color="green" href="/">
            Play again
          </ButtonLink>
          <ButtonLink color="red" href="/">
            Exit
          </ButtonLink>
        </ButtonRow>
      </Card>
    </Popup>
  );
}
