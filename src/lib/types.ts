/** A cleaned, ready-to-render article from our own /api/wiki edge function. */
export interface WikiArticle {
  title: string;
  pageid: number;
  displaytitle: string;
  html: string;
  /** True when the page just lists several meanings (e.g. "Rom"). */
  disambiguation: boolean;
}

/** A lightweight article summary from Wikipedia's REST API (card previews). */
export interface WikiSummary {
  pageid: number | null;
  title: string;
  description: string;
  extract: string;
  thumbnail: string | null;
  titles: string | null;
  /** REST page type: "standard", "disambiguation", "mainpage", ... */
  type: string;
}

/** The two endpoints of a game: where you start and where you're headed. */
export interface GameArticles {
  start: WikiSummary | null;
  destination: WikiSummary | null;
}

export interface GameState {
  usedRandomizer: boolean;
  isStarted: boolean;
  articles: GameArticles;
  inDestination: boolean;
  currentPageId: number;
  steps: number;
}
