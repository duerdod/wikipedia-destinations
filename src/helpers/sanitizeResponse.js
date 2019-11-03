const sanitizeResponse = pages =>
  pages ? Object.keys(pages).map(id => pages[id]) : [];

export default sanitizeResponse;
