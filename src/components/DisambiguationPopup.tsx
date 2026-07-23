import type { DisambigOption } from '../lib/disambiguation';
import Popup from './Popup';
import { Card } from './ui';

/**
 * Lists the meanings of a disambiguation page and calls `onSelect` with the
 * chosen one. Visibility is controlled by the parent via the popup context
 * (id "disambiguation"); this component only renders the choices.
 */
export default function DisambiguationPopup({
  title,
  options,
  onSelect,
}: {
  title: string;
  options: DisambigOption[];
  onSelect: (option: DisambigOption) => void;
}) {
  return (
    <Popup id="disambiguation">
      <Card className="max-h-[70vh]">
        <h2 className="mb-1 text-center font-extrabold text-blue-0">{title}</h2>
        <p className="mb-3 text-center text-sm text-blue-2">
          This can mean several things — pick one:
        </p>
        <ul className="-mx-2 min-h-0 flex-1 overflow-y-auto">
          {options.map((o) => (
            <li key={o.href}>
              <button
                type="button"
                onClick={() => onSelect(o)}
                className="block w-full cursor-pointer rounded px-2 py-2 text-left hover:bg-beige-1"
              >
                <span className="font-extrabold text-blue-0">{o.title}</span>
                {o.gloss && <span className="text-blue-2"> — {o.gloss}</span>}
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </Popup>
  );
}
