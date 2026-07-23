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

function LoadingSkeleton() {
  return (
    <>
      <div className="my-4 h-12 w-2/5 bg-[#042a44]" />
      <div className="my-4 h-80 w-full bg-[#042a44]" />
    </>
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
      <div className="mx-auto max-w-[850px] px-7">
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
