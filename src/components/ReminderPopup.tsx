import { usePopup } from '../context/PopupContext';
import type { WikiSummary } from '../lib/types';
import Popup from './Popup';
import { Button, Card } from './ui';

/** A reminder of where the player is headed, opened from the scoreboard. */
export default function ReminderPopup({ article }: { article: WikiSummary }) {
  const { hidePopup } = usePopup();
  const { title, description, thumbnail, extract } = article;

  return (
    <Popup id="reminder" preventBodyScroll={false} closeOnBackdropClick={false}>
      <Card className="[&_h2]:font-extrabold [&_h2]:text-blue-0 [&_h5]:text-blue-0">
        <h2>{title}</h2>
        <h5>{description}</h5>
        {thumbnail && <img className="my-2 w-1/2" src={thumbnail} alt={`Probably a ${title}`} />}
        <p className="my-2 max-w-[400px] text-base leading-relaxed">{extract}</p>
        <Button color="green" className="mt-4 w-full uppercase" type="button" onClick={hidePopup}>
          Continue
        </Button>
      </Card>
    </Popup>
  );
}
