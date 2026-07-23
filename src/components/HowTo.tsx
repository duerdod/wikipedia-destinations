import { usePopup } from '../context/PopupContext';
import Popup from './Popup';
import { Button, Card } from './ui';

export function HowToOpener() {
  const { showPopup } = usePopup();
  return (
    <div className="text-center">
      <button
        className="mt-4 cursor-pointer text-[0.9rem] font-extrabold uppercase text-blue-5"
        onClick={() => showPopup('howTo')}
      >
        How to
      </button>
    </div>
  );
}

export default function HowTo() {
  const { hidePopup } = usePopup();
  return (
    <Popup id="howTo">
      <Card className="[&_h1]:mb-2 [&_h1]:text-center [&_h1]:font-extrabold [&_h1]:text-blue-0">
        <h1>How to play</h1>
        <ol className="mb-6 list-decimal space-y-3 pl-6 marker:font-bold marker:text-blue-0">
          <li>Set departure, the article from where your journey begins.</li>
          <li>
            Either decide a destination yourself or be somewhat daring and select a random one.
            You’ll get a summary and an image in case you don’t know what you’re looking for.
          </li>
          <li>
            Try to find your destination in as few steps as possible. You go forward by clicking
            the links inside the article.
          </li>
        </ol>
        <Button color="green" className="w-full uppercase" onClick={hidePopup}>
          Got it
        </Button>
      </Card>
    </Popup>
  );
}
