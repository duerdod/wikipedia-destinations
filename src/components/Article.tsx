import { useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { usePopup } from '../context/PopupContext';
import { useWikiArticle } from '../hooks/useWikiArticle';
import { useAnchorScroll } from '../hooks/useAnchorScroll';
import { parseDisambiguation } from '../lib/disambiguation';
import Bound from './Bound';
import DisambiguationPopup from './DisambiguationPopup';
import Error from './Error';

const SKELETON_LINES = ['w-full', 'w-11/12', 'w-full', 'w-5/6', 'w-full', 'w-full', 'w-2/3', 'w-full', 'w-4/5'];

function LoadingSkeleton() {
  return (
    <div className="rounded-[6px] bg-white px-8 py-6 max-sm:px-4" aria-busy="true" aria-label="Loading article">
      <div className="skeleton mb-6 h-8 w-1/2" />
      <div className="space-y-3">
        {SKELETON_LINES.map((w, i) => (
          <div key={i} className={`skeleton h-4 ${w}`} />
        ))}
      </div>
    </div>
  );
}

export default function Article() {
  const { article } = useParams<{ article: string }>();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const {
    incrementSteps,
    mergeCrumbs,
    setCurrentPageid,
    gameState: { inDestination },
  } = useGame();
  const { showPopup, hidePopup } = usePopup();

  const { loading, error, html, title, pageid, disambiguation } = useWikiArticle(article);
  const options = useMemo(
    () => (disambiguation ? parseDisambiguation(html) : []),
    [disambiguation, html],
  );

  useAnchorScroll();

  // Offer the meaning picker each time we land on a disambiguation page.
  useEffect(() => {
    if (disambiguation) showPopup('disambiguation');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageid, disambiguation]);

  // Tell the game which article we're on, so it can detect the destination.
  useEffect(() => {
    if (pageid) setCurrentPageid(pageid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageid]);

  // Count each newly-loaded article once (ref guard survives StrictMode).
  const counted = useRef<number | null>(null);
  useEffect(() => {
    if (!pageid || counted.current === pageid) return;
    counted.current = pageid;
    // A disambiguation page is a chooser, not a move — don't count it.
    if (disambiguation) return;
    incrementSteps();
    if (title) mergeCrumbs(title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageid, title, disambiguation]);

  // Links in the article HTML are already limited to in-game targets by the
  // edge function; intercept clicks and route them through the SPA.
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (e.target as HTMLElement).closest('a');
    const href = anchor?.getAttribute('href');
    if (!href) return;
    e.preventDefault();
    if (href.startsWith('#')) navigate({ pathname, hash: href });
    else navigate(href);
  };

  return (
    <>
      {inDestination && <Bound />}
      <div className="mx-auto max-w-[960px] px-7 max-sm:px-1">
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <Error title="Are you lost?" />
        ) : (
          <>
            <h1 className="my-4 font-title text-[2.5rem] font-extrabold text-beige-0">
              {title}
            </h1>
            {disambiguation && (
              <DisambiguationPopup
                title={title}
                options={options}
                onSelect={(o) => {
                  hidePopup();
                  navigate(o.href);
                }}
              />
            )}
            <div
              className="fetched-article"
              onClick={handleClick}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </>
        )}
      </div>
    </>
  );
}
