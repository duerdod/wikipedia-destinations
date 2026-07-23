import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonColor = 'green' | 'red' | 'beige';

// Full class strings (not interpolated) so Tailwind can see them at build time.
const COLOR: Record<ButtonColor, string> = {
  green: 'bg-green-0 hover:bg-green-2',
  red: 'bg-red-0 hover:bg-red-2',
  beige: 'bg-beige-0 hover:bg-beige-2',
};

const BASE =
  'inline-flex items-center justify-center whitespace-nowrap rounded-md px-6 py-4' +
  ' font-title text-[0.95rem] font-extrabold text-paper transition-all duration-[400ms]' +
  ' cursor-pointer disabled:cursor-default disabled:opacity-60';

function cx(color: ButtonColor, className?: string): string {
  return `${BASE} ${COLOR[color]} ${className ?? ''}`;
}

export function Button({
  color,
  className,
  ...rest
}: { color: ButtonColor } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cx(color, className)} {...rest} />;
}

export function ButtonLink({
  color,
  className,
  ...rest
}: { color: ButtonColor } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cx(color, className)} {...rest} />;
}

/** Horizontal row of equally-sized action buttons. */
export function ButtonRow({ children }: { children: ReactNode }) {
  return <div className="flex justify-around gap-4 [&>*]:flex-1">{children}</div>;
}

/** The white card that every popup's content sits inside. */
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`flex flex-col rounded-[3px] bg-paper px-8 py-4 font-title text-ink ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
