import type { ReactNode } from 'react';
import { useGame } from '../context/GameContext';
import { usePopup } from '../context/PopupContext';
import ReminderPopup from './ReminderPopup';

function Label({ children, title }: { children?: ReactNode; title?: boolean }) {
  return (
    <h3
      className={
        'whitespace-pre-wrap px-4 text-[0.95rem] ' + (title ? 'text-red-0' : 'text-ink')
      }
    >
      {children}
    </h3>
  );
}

export default function Stats() {
  const {
    gameState: { articles, steps },
  } = useGame();
  const { showPopup } = usePopup();
  const { start, destination } = articles;

  return (
    <section className="relative z-[1] text-center uppercase">
      {/* "Yo scores" tab overlapping the top of the board */}
      <div className="absolute left-1/2 top-[-22px] z-[2] -translate-x-1/2 rounded-md p-[3px_3px_0_3px] text-ink bg-[linear-gradient(to_bottom,#ed1250_51%,#ed1250_71%,#f7f7f7_72%,#f7f7f7_100%)]">
        <div className="rounded-[3px] bg-paper px-3 pt-[0.2rem] font-title text-2xl font-extrabold">
          Yo scores
        </div>
      </div>

      <div className="mx-auto my-4 grid max-w-[500px] grid-cols-3 grid-rows-1 select-none rounded-[7px] border-[3px] border-red-0 bg-paper px-4 pb-2 pt-[0.4rem] font-title font-extrabold uppercase">
        <div className="grid grid-cols-1 grid-rows-[20px_1fr]">
          <Label title>Departure</Label>
          <Label>{start?.title}</Label>
        </div>

        <h2 className="relative px-8 py-9 text-[6rem] leading-[0.4] text-red-0 after:absolute after:bottom-[5px] after:left-1/2 after:block after:-translate-x-1/2 after:text-[0.7rem] after:text-ink after:content-['Steps']">
          {steps}
        </h2>

        <div className="grid grid-cols-1 grid-rows-[20px_1fr]">
          <Label title>Bound for</Label>
          <Label>
            <button className="cursor-pointer" onClick={() => showPopup('reminder')}>
              {destination?.title}
            </button>
          </Label>
          {destination && <ReminderPopup article={destination} />}
        </div>
      </div>
    </section>
  );
}
