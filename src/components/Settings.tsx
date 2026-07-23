import { usePopup } from '../context/PopupContext';
import Popup from './Popup';
import { Button, ButtonLink, ButtonRow, Card } from './ui';

export default function Settings() {
  const { hidePopup } = usePopup();
  return (
    <Popup id="settings">
      <Card>
        <h2 className="mb-12 text-center font-extrabold uppercase text-blue-2">Options</h2>
        <ButtonRow>
          <ButtonLink color="red" href="/">
            End game
          </ButtonLink>
          <Button color="green" onClick={hidePopup}>
            Continue
          </Button>
        </ButtonRow>
      </Card>
    </Popup>
  );
}
