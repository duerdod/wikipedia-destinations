import { useEffect } from 'react';
import { usePopup } from '../context/PopupContext';
import Popup from './Popup';
import { Button, Card } from './ui';

interface RandomArticleProps {
  title: string;
  description: string;
  extract: string;
  thumbnail: string | null;
  resetDestination: () => void;
  setAsDestination: (title: string) => void;
}

export default function RandomArticle({
  title,
  description,
  extract,
  thumbnail,
  resetDestination,
  setAsDestination,
}: RandomArticleProps) {
  const { showPopup, hidePopup } = usePopup();

  useEffect(() => {
    showPopup('randomArticle');
  }, [showPopup]);

  return (
    <Popup id="randomArticle" preventBodyScroll={false} closeOnBackdropClick={false}>
      <Card className="[&_h2]:font-extrabold [&_h2]:text-blue-0 [&_h5]:text-blue-0">
        <h2>{title}</h2>
        <h5>{description}</h5>
        {thumbnail && (
          <img className="my-2 w-1/2" src={thumbnail} alt={`Probably a ${title}`} />
        )}
        <p className="my-2 max-w-[400px] text-base leading-relaxed">{extract}</p>
        <Button
          color="green"
          className="mt-2 w-full uppercase"
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
          className="mt-2 w-full uppercase"
          type="button"
          onClick={() => {
            resetDestination();
            hidePopup();
          }}
        >
          Decline
        </Button>
      </Card>
    </Popup>
  );
}
